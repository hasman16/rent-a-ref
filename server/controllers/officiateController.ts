export default function OfficiateController(
  models,
  ResponseService,
  SendGridService
) {
  const sequelize = models.sequelize;
  const Match = models.Match;
  const Officiating = models.Officiating;
  const User = models.User;
  const attributes = [
    'id',
    'email',
    'authorization',
    'can_organize',
    'can_referee',
    'status'
  ];

  function findUser(user_id, t) {
    return User.findById(user_id, {
      transaction: t
    });
  }

  function findMatch(match_id, t) {
    const Match = models.Match;
    return Match.findById(match_id, {
      transaction: t
    });
  }

  function findOfficiate(user_id, match_id, t) {
    const Officiating = models.Officiating;
    return Officiating.findOne(
      {
        where: {
          user_id,
          match_id
        }
      },
      {
        transaction: t
      }
    );
  }

  function matchScheduleByUser(req, res) {
    const Officiating = models.Officiating;
    const Match = models.Match;
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause, {
      where: {},
      include: [
        {
          model: User,
          where: {
            id: req.params.user_id
          },
          through: {
            attributes: ['id', 'email', 'can_referee', 'status']
          }
        }
      ]
    });

    Match.findAndCountAll(whereClause)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function officialsByMatch(req, res) {
    const Officiating = models.Officiating;
    const Match = models.Match;
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause, {
      where: {},
      attributes: ['id', 'email', 'can_referee', 'status'],
      include: [
        {
          model: Match,
          where: {
            id: req.params.match_id
          },
          through: {
            attributes: ['id']
          }
        }
      ]
    });

    User.findAndCountAll(whereClause)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function createOfficiate(user_id, match_id, t) {
    return Officiating.create(
      {
        user_id,
        match_id
      },
      {
        transaction: t
      }
    );
  }

  function unassignOfficial(officiate_id, user_id, match_id, t) {
    findMatch(match_id, t);

    return Officiating.destroy(
      {
        where: {
          id: officiate_id
        }
      },
      {
        transaction: t
      }
    );
  }

  async function cancelAssignments(match_id, transaction) {
    return Officiating.destroy(
      {
        where: {
          match_id
        }
      },
      {
        transaction
      }
    );
  }

  function canAssignOrRemove(value): boolean {
    return value === 'pending' || value === 'none' || value === 'active';
  }

  async function addOfficialToMatch(req, res) {
    const sequelize = models.sequelize;
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;
    const relation = {
      user_id,
      match_id
    };

    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findById(match_id, { transaction });
      let user = await User.findById(user_id, { transaction });
      let officiate = await Officiating.findOne(
        {
          where: relation
        },
        { transaction }
      );

      if (officiate) {
        throw new Error('Referee is already officiating this match.');
      }
      if (!match) {
        throw new Error('Match does not exist.');
      }
      if (!canAssignOrRemove(match.status)) {
        throw new Error('Match is locked.');
      }
      if (!user || user.can_referee != 'active') {
        throw new Error('User is not an active referee.');
      }
      let isOfficiating = await Officiating.create(relation, { transaction });

      if (!isOfficiating) {
        throw new Error('Referee was not assigned to match.');
      }
      await transaction.commit();
      ResponseService.success(res, isOfficiating);
    } catch (error) {
      transaction.rollback(transaction);
      //ResponseService.exception(res, error);
      ResponseService.exception(res, 'Referee was not assigned to match.', 400);
    }
  }

  async function removeOfficialFromMatch(req, res) {
    const sequelize = models.sequelize;
    const Match = sequelize.Match;
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;
    const canRemove = (value: string) =>
      value === 'pending' || value === 'none' || value === 'active';
    const message = 'Referee was not removed from match : ' + match_id;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findById(match_id, { transaction });
      let officiate = await Officiating.findOne(
        {
          where: {
            user_id,
            match_id
          }
        },
        { transaction }
      );

      if (officiate) {
        throw new Error('Referee is not officiating this match.');
      }
      if (!match) {
        throw new Error('Match does not exist.');
      }
      if (!canRemove(match.status)) {
        throw new Error('You can not remove referee from this match.');
      }

      let isOfficiating = await Officiating.destroy(
        {
          where: {
            id: officiate.id
          }
        },
        { transaction }
      );

      if (!isOfficiating) {
        throw new Error('Referee was not removed from match.');
      }
      await transaction.commit();
      ResponseService.success(
        res,
        'Referee has been removed from match:' + match_id
      );
    } catch (err) {
      transaction.rollback(transaction);
      ResponseService.exception(res, message);
    }
  }

  return {
    matchScheduleByUser,
    addOfficialToMatch,
    removeOfficialFromMatch
  };
}

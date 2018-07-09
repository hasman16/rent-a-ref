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

  function matchScheduleByUser(req, res) {
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

  function canAssignOrRemove(value): boolean {
    return value === 'pending' || value === 'none' || value === 'active';
  }

  function getDummyPromise() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('x');
      }, 0);
    });
  }

  async function addOfficialToMatch(req, res) {
    let executeMethod = async (user, match, officiate, transaction) => {
      if (officiate) {
        throw new Error('Referee is already officiating this match. ');
      }
      let isOfficiating = await Officiating.create(
        {
          user_id: user.id,
          match_id: match.id,
          status: 'pending'
        },
        { transaction }
      );

      if (!isOfficiating) {
        throw new Error('Referee was not assigned to match.');
      }

      SendGridService.sendEmail({
        to: user.email,
        from: 'admin@rentaref.com',
        subject: 'You have been assign a match.',
        content:
          'You have been assigned a new match. Go to your schedule accept or decline.'
      });
      return getDummyPromise();
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function removeOfficialFromMatch(req, res) {
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;
    const message = 'Referee was not removed from match : ' + match_id;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findById(match_id, { transaction });
      let user = await User.findById(user_id, { transaction });
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

  async function cancelMatch(req, res) {
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;
    const message = 'Referee was not removed from match : ' + match_id;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      let areCancelled = await Officiating.update(
        {
          status: 'cancelled'
        },
        {
          where: {
            match_id
          }
        },
        { transaction }
      );

      if (!areCancelled) {
        throw new Error('Failed to cancel referees.');
      }
      await transaction.commit();
      ResponseService.success(
        res,
        'Referees have been removed from match:' + match_id
      );
    } catch (err) {
      transaction.rollback(transaction);
      ResponseService.exception(res, message);
    }
  }

  async function declineMatch(req, res) {
    let executeMethod = async (user, match, officiate, transaction) => {
      if (!officiate) {
        throw new Error('Referee is not officiating this match. ');
      }
      let isDeclined = await Officiating.update(
        {
          status: 'declined'
        },
        {
          where: {
            user_id: user.id,
            match_id: match.id
          }
        },
        { transaction }
      );

      if (!isDeclined) {
        throw new Error('Referee was not unassigned from match.');
      }

      SendGridService.sendEmail({
        to: user.email,
        from: 'admin@rentaref.com',
        subject: 'Match Declined.',
        content: 'You chose to decline match: ' + match.id
      });
      return getDummyPromise();
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function acceptMatch(req, res) {
    let executeMethod = async (user, match, officiate, transaction) => {
      if (!officiate) {
        throw new Error('Referee is not officiating this match. ');
      }
      let isAccepted = await Officiating.update(
        {
          status: 'accepted'
        },
        {
          where: {
            user_id: user.id,
            match_id: match.id
          }
        },
        { transaction }
      );

      if (!isAccepted) {
        throw new Error('Match was not accepted.');
      }

      SendGridService.sendEmail({
        to: user.email,
        from: 'admin@rentaref.com',
        subject: 'Match Accepted.',
        content: 'You chose to accept match: ' + match.id
      });
      return getDummyPromise();
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function operateOnMatch(req, res, executeMethod) {
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;

    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findById(match_id, { transaction });
      let user = await User.findById(user_id, { transaction });
      let officiate = await Officiating.findOne(
        {
          where: {
            user_id,
            match_id
          }
        },
        { transaction }
      );
      if (!match) {
        throw new Error('Match does not exist.');
      }
      if (!canAssignOrRemove(match.status)) {
        throw new Error('You can not be removed from this match.');
      }

      await executeMethod(user, match, officiate, transaction);
      await transaction.commit();
      ResponseService.success(
        res,
        'Operation on match ' + match_id + ' was successful.'
      );
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, 'Operation failed!', 400);
    }
  }

  return {
    matchScheduleByUser,
    addOfficialToMatch,
    removeOfficialFromMatch,
    acceptMatch,
    declineMatch,
    cancelMatch
  };
}

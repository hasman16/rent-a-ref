import * as _ from 'lodash';
import * as moment from 'moment-timezone';

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

  async function refereeSchedule(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const Op = models.sequelize.Op;
    const Address = models.Address;
    const Phone = models.Phone;
    const whereClause = Object.assign(clause, {
      where: {},
      include: [
        {
          model: User,
          where: {
            id: req.params.user_id
          },
          through: {
            where: {
              status: {
                [Op.notLike]: '%decline%'
              }
            }
          }
        }
      ]
    });

    let transaction;

    try {
      transaction = await sequelize.transaction();
      const result = await Match.findAndCountAll(whereClause, {
        transaction
      });

      const whereOfficiate = Object.assign(
        {
          where: {
            id: {
              [Op.in]: _.map(result.rows, item => item.id)
            }
          },
          include: [
            {
              model: User,
              attributes: ['id', 'email'],
              through: {
                where: {
                  status: {
                    [Op.notLike]: '%decline%'
                  }
                }
              }
            },
            {
              model: Address
            },
            {
              model: Phone
            }
          ]
        },
        {}
      );

      const matchOfficiate = await Match.findAndCountAll(whereOfficiate, {
        transaction
      });

      await transaction.commit();

      ResponseService.success(res, matchOfficiate);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 400);
    }
  }

  function officialsByMatch(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(
      {
        where: {},
        attributes: ['id', 'email', 'can_referee', 'status'],
        include: [
          {
            model: Match,
            attributes: ['id', 'status'],
            where: {
              id: req.params.match_id
            },
            required: false
          }
        ]
      },
      clause
    );

    User.findAndCountAll(whereClause)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  async function matchOfficials(req, res) {
    const Op = models.sequelize.Op;
    const Address = models.Address;
    const Phone = models.Phone;
    const Person = models.Person;
    const Image = models.Image;

    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(
      {
        where: {},
        attributes: ['id', 'email'],
        include: [
          {
            model: Person,
            attributes: ['firstname', 'middlenames', 'lastname']
          },
          {
            model: Address
          },
          {
            model: Phone
          },
          {
            model: Image
          },
          {
            model: Match,
            attributes: ['id', 'status'],
            where: {
              id: req.params.match_id
            },
            through: {
              where: {
                status: {
                  [Op.like]: '%accept%'
                }
              }
            }
          }
        ]
      },
      clause
    );
    User.findAndCountAll(whereClause)
      .then(result => ResponseService.success(res, result))
      .catch(error => ResponseService.exception(res, error));
  }

  function canAssignOrRemove(value): boolean {
    return value === 'pending' || value === 'none' || value === 'active';
  }

  async function addOfficialToMatch(req, res) {
    let executeMethod = async (
      transaction,
      user,
      match,
      officiate,
      position,
      pay
    ) => {
      let isOfficiating;
      if (officiate) {
        const status = _.lowerCase(officiate.status);
        if (status === 'accepted') {
          throw new Error('Referee is already officiating this match.');
        } else if (status === 'declined') {
          isOfficiating = await Officiating.update(
            {
              status: 'pending'
            },
            {
              where: {
                user_id: user.id,
                match_id: match.id
              }
            },
            { transaction }
          );
        } else {
          throw new Error('Unable to assign referee to this match.');
        }
      } else {
        isOfficiating = await Officiating.create(
          {
            user_id: user.id,
            match_id: match.id,
            status: 'pending',
            position: position,
            pay: pay
          },
          { transaction }
        );
      }

      if (!isOfficiating) {
        throw new Error('Referee was not assigned to match.');
      }

      SendGridService.sendEmail({
        to: user.email,
        from: 'admin@rentaref.com',
        subject: 'You have been assigned a match.',
        content:
          'You have been assigned a new match. Go to your schedule to Accept or Decline.'
      });
      return Promise.resolve('Referee was assigned to match');
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function removeOfficialFromMatch(req, res) {
    const match_id = req.params.match_id;
    const user_id = req.params.user_id;
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

      if (!officiate) {
        throw new Error('Referee is not officiating this match.');
      }
      if (!match) {
        throw new Error('Match does not exist.');
      }
      let timeLocked = await ResponseService.byPassTimeLockIfAdmin(req, match);

      let isOfficiating = await Officiating.destroy(
        {
          where: {
            user_id,
            match_id
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

  async function deleteMatch(req, res) {
    const match_id = req.params.match_id;
    const message = 'Referee was not removed from match : ' + match_id;
    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findOne(
        {
          where: {
            id: match_id
          },
          include: [
            {
              model: User
            }
          ]
        },
        { transaction }
      );

      if (!match) {
        throw new Error('Match not found.');
      }
      if (!canAssignOrRemove(match.status)) {
        throw new Error(
          'A match can only be cancelled if it is pending or active.'
        );
      }
      let timeLocked = await ResponseService.byPassTimeLockIfAdmin(req, match);

      let areCancelled = await Officiating.destroy(
        {
          where: {
            match_id
          }
        },
        { transaction }
      );

      if (!areCancelled) {
        throw new Error('Failed to delete match.');
      }

      await transaction.commit();

      match.user.forEach(user => {
        SendGridService.sendEmail({
          to: user.email,
          from: 'admin@rentaref.com',
          subject: 'Match cancelled and delete match:' + match_id,
          content:
            'The Administrator of Rent-A-Ref cancelled and deleted match: ' +
            match.id
        });
      });
      ResponseService.success(
        res,
        'Match cancelled and Referees have been removed from match:' + match_id
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
      let match = await Match.findOne(
        {
          where: {
            id: match_id
          },
          include: [
            {
              model: User
            }
          ]
        },
        { transaction }
      );

      if (!match) {
        throw new Error('Match not found.');
      }
      if (!canAssignOrRemove(match.status)) {
        throw new Error(
          'A match can only be cancelled if it is pending or active.'
        );
      }
      let timeLocked = await ResponseService.byPassTimeLockIfAdmin(req, match);

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
        throw new Error('Failed to cancel match.');
      }

      await transaction.commit();

      match.user.forEach(user => {
        SendGridService.sendEmail({
          to: user.email,
          from: 'admin@rentaref.com',
          subject: 'Match Cancelled' + match_id,
          content:
            'The Administrator of Rent-A-Ref cancelled match: ' + match.id
        });
      });
      ResponseService.success(
        res,
        'Match cancelled and Referees have been removed from match:' + match_id
      );
    } catch (err) {
      transaction.rollback(transaction);
      ResponseService.exception(res, message);
    }
  }

  async function declineMatch(req, res) {
    let executeMethod = async (
      transaction,
      user,
      match,
      officiate,
      position
    ) => {
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
      return Promise.resolve('Referee declined to officiate match');
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function acceptMatch(req, res) {
    let executeMethod = async (
      transaction,
      user,
      match,
      officiate,
      positon
    ) => {
      if (!officiate) {
        throw new Error('Referee is not officiating this match. ');
      }

      let invitesAccepted = await Officiating.count({
        where: {
          match_id: match.id,
          status: 'accepted'
        }
      });

      if (invitesAccepted >= match.referees) {
        throw new Error('This match has a full set of referees');
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
      return Promise.resolve('Referee accepted match');
    };

    operateOnMatch(req, res, executeMethod);
  }

  async function operateOnMatch(req, res, executeMethod) {
    const Address = models.Address;
    const body = ResponseService.getItemFromBody(req);
    const match_id = body.match_id;
    const user_id = body.user_id;
    const position = body.position;
    const pay = body.pay;

    let transaction;

    try {
      transaction = await sequelize.transaction();
      let match = await Match.findOne(
        {
          where: {
            id: match_id
          },
          include: [
            {
              model: Address
            }
          ]
        },
        { transaction }
      );
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
      let timeLocked = await ResponseService.byPassTimeLockIfAdmin(req, match);

      await executeMethod(transaction, user, match, officiate, position, pay);
      await transaction.commit();
      ResponseService.success(
        res,
        'Operation on match ' + match_id + ' was successful.'
      );
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 400);
    }
  }

  return {
    refereeSchedule,
    matchOfficials,
    officialsByMatch,
    addOfficialToMatch,
    removeOfficialFromMatch,
    acceptMatch,
    declineMatch,
    cancelMatch
  };
}

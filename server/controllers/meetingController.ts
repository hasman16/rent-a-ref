import { AddressModel, MeetingModel, PhoneModel } from './../types/index';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';

export default function meetingController(models, ResponseService) {
  const Meeting = models.Meeting;
  const attributes = [
    'id',
    'event_name',
    'start_date',
    'end_date',
    'event_type',
    'venue_name',
    'status',
    'kids_referees',
    'teens_referees',
    'adults_referees',
    'kids_refs_pay',
    'teens_refs_pay',
    'adults_refs_pay'
  ];

  function returnMeeting(res, meeting, status = 200) {
    let newMeeting: MeetingModel = <MeetingModel>ResponseService.deleteItemDates(
      event
    );
    newMeeting.id = meeting.id;
    ResponseService.success(res, newMeeting, status);
  }

  function getAll(req, res) {
    const clause = ResponseService.produceSearchAndSortClause(req);

    Meeting.findAndCountAll(clause)
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getAllByOrganization(req, res) {
    let clause = ResponseService.produceSearchAndSortClause(req);
    const whereClause = Object.assign(clause.where, {
      organization_id: req.params.organization_id
    });
    clause.where = whereClause;

    Meeting.findAndCountAll(clause)
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function getOne(req, res) {
    const Address = models.Address;
    const Phone = models.Phone;

    Meeting.find({
      where: {
        id: req.params.meeting_id
      },
      include: [
        {
          model: Address
        },
        {
          model: Phone
        }
      ]
    })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function create(req, res) {
    const meeting: MeetingModel = <MeetingModel>ResponseService.getItemFromBody(
      req
    );

    Meeting.create(meeting)
      .then(newMeeting => {
        returnMeeting(res, newMeeting, 201);
      })
      .catch(error => ResponseService.exception(res, error));
  }

  function update(req, res) {
    const meeting: MeetingModel = <MeetingModel>ResponseService.getItemFromBody(
      req
    );

    Meeting.update(meeting, {
      where: {
        id: req.params.meeting_id
      }
    })
      .then(result => ResponseService.success(res, 'Event updated'))
      .catch(error => ResponseService.exception(res, error));
  }

  async function deleteOne(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    const Match = models.Match;
    const meeting_id = req.params.meeting_id;
    const whereClause = {
      where: {
        id: meeting_id
      },
      include: [
        {
          model: Address
        },
        {
          model: Phone
        },
        {
          model: Match
        }
      ]
    };
    let transaction;
    console.log('delete MeetingController');
    try {
      transaction = await sequelize.transaction();
      const result = await Meeting.findOne(whereClause, {
        transaction
      });
      console.log('meeting is:', result);
      if (result) {
        throw new Error('Meeting does not exist.');
      }
      console.log('meeting:', 1);

      const matches: any[] = result.matches;
      const address = result.address;
      const phone = result.phones;
      if (matches.length > 0) {
        throw new Error('This meeting has ' + matches.length + ' matches.');
      }
      console.log('meeting:', 2);

      if (address) {
        await Address.destroy(
          {
            where: {
              id: address.id
            }
          },
          {
            transaction
          }
        );
        console.log('meeting:', 3);
      }
      if (phone) {
        await Phone.destroy(
          {
            where: {
              id: phone.id
            }
          },
          {
            transaction
          }
        );
        console.log('meeting:', 4);
      }
      console.log('meeting:', 5);

      await Meeting.destroy(
        {
          where: {
            id: meeting_id
          }
        },
        {
          transaction
        }
      );
      console.log('meeting:', 6);

      await transaction.commit();

      ResponseService.success(res, {
        success: true,
        message: 'Event deleted'
      });
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error, 400);
    }
  }

  function addTimeToDate(time, date) {
    return ResponseService.addTimeToDate(time, date);
  }

  function calculateDate(date, timezone_id) {
    return ResponseService.calculateDate(date, timezone_id);
  }

  function fixTime(timezone_id, date, time) {
    return calculateDate(addTimeToDate(time, date), timezone_id);
  }

  function processTime(meeting, timeZone) {
    const timeFixer = _.partial(fixTime, meeting.timezone_id);

    meeting.start_date = timeFixer(meeting.start_date, meeting.start_time);
    meeting.end_date = timeFixer(meeting.end_date, meeting.end_time);
  }

  async function createMeetingAddressPhone(req, res) {
    const sequelize = models.sequelize;
    const Address = models.Address;
    const Phone = models.Phone;
    let meeting: MeetingModel = <MeetingModel>ResponseService.getItemFromBody(
      req
    );
    const address: AddressModel = ResponseService.deleteItemDates(
      meeting.address
    );
    const phone: PhoneModel = ResponseService.deleteItemDates(meeting.phone);

    delete meeting.address_id;
    delete meeting.phone_id;
    delete meeting.address;
    delete meeting.phone;

    meeting.organization_id = req.params.organization_id;
    meeting.status = 'pending';

    let transaction, newMeeting, newAddress, newPhone;
    try {
      transaction = await sequelize.transaction();

      let timeZone = await ResponseService.workoutTimeZone(address);
      ResponseService.setTimeZone(meeting, timeZone.googleTimeZone);

      address.lat = timeZone.location.lat;
      address.lng = timeZone.location.lng;

      processTime(meeting, timeZone);

      newAddress = await Address.create(address, { transaction });
      meeting.address_id = newAddress.id;
      if (phone) {
        newPhone = await Phone.create(phone, { transaction });
        meeting.phone_id = newPhone.id;
      }
      newMeeting = await Meeting.create(meeting, { transaction });
      transaction.commit();
      ResponseService.success(res, newMeeting, 201);
    } catch (error) {
      transaction.rollback(transaction);
      ResponseService.exception(res, error);
    }
  }

  function getMeetingAddress(req, res) {
    this.getOne(req, res);
  }

  function updateMeetingAddress(req, res) {
    const Address = models.Address;
    const address: AddressModel = ResponseService.deleteItemDates(req);

    Meeting.find({
      where: {
        id: req.params.meeting_id
      }
    })
      .then(meeting => {
        return Address.update(address, {
          where: {
            id: req.params.address_id
          }
        });
      })
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  function deleteMeetingAddress(req, res) {}

  function getPrices(req, res) {
    const sequelize = models.sequelize;
    const Price = models.Price;
    Price.findAll()
      .then(results => ResponseService.success(res, results))
      .catch(error => ResponseService.exception(res, error));
  }

  return {
    getAll,
    getAllByOrganization,
    getOne,
    create,
    update,
    deleteOne,
    getPrices,
    getMeetingAddress,
    createMeetingAddressPhone,
    updateMeetingAddress,
    deleteMeetingAddress
  };
}

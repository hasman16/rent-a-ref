"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function meetingController(models, ResponseService) {
    var Meeting = models.Meeting;
    var attributes = [
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
    function returnMeeting(res, meeting, status) {
        if (status === void 0) { status = 200; }
        var newMeeting = ResponseService.deleteItemDates(event);
        newMeeting.id = meeting.id;
        ResponseService.success(res, newMeeting, status);
    }
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Meeting.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getAllByOrganization(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        var whereClause = Object.assign(clause.where, {
            organization_id: req.params.organization_id
        });
        clause.where = whereClause;
        Meeting.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        var Address = models.Address;
        var Phone = models.Phone;
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
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function create(req, res) {
        var meeting = ResponseService.getItemFromBody(req);
        Meeting.create(meeting)
            .then(function (newMeeting) {
            returnMeeting(res, newMeeting, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var meeting = ResponseService.getItemFromBody(req);
        Meeting.update(meeting, {
            where: {
                id: req.params.meeting_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Event updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Address, Phone, Match, meeting_id, whereClause, transaction, result, matches, address, phone, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Address = models.Address;
                        Phone = models.Phone;
                        Match = models.Match;
                        meeting_id = req.params.meeting_id;
                        whereClause = {
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
                        console.log('delete MeetingController');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, Meeting.findOne(whereClause, {
                                transaction: transaction
                            })];
                    case 3:
                        result = _a.sent();
                        console.log('meeting is:', result);
                        if (result) {
                            throw new Error('Meeting does not exist.');
                        }
                        console.log('meeting:', 1);
                        matches = result.matches;
                        address = result.address;
                        phone = result.phones;
                        if (matches.length > 0) {
                            throw new Error('This meeting has ' + matches.length + ' matches.');
                        }
                        console.log('meeting:', 2);
                        if (!address) return [3 /*break*/, 5];
                        return [4 /*yield*/, Address.destroy({
                                where: {
                                    id: address.id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 4:
                        _a.sent();
                        console.log('meeting:', 3);
                        _a.label = 5;
                    case 5:
                        if (!phone) return [3 /*break*/, 7];
                        return [4 /*yield*/, Phone.destroy({
                                where: {
                                    id: phone.id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 6:
                        _a.sent();
                        console.log('meeting:', 4);
                        _a.label = 7;
                    case 7:
                        console.log('meeting:', 5);
                        return [4 /*yield*/, Meeting.destroy({
                                where: {
                                    id: meeting_id
                                }
                            }, {
                                transaction: transaction
                            })];
                    case 8:
                        _a.sent();
                        console.log('meeting:', 6);
                        return [4 /*yield*/, transaction.commit()];
                    case 9:
                        _a.sent();
                        ResponseService.success(res, {
                            success: true,
                            message: 'Event deleted'
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_1, 400);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
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
        var timeFixer = _.partial(fixTime, meeting.timezone_id);
        meeting.start_date = timeFixer(meeting.start_date, meeting.start_time);
        meeting.end_date = timeFixer(meeting.end_date, meeting.end_time);
    }
    function createMeetingAddressPhone(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sequelize, Address, Phone, meeting, address, phone, transaction, newMeeting, newAddress, newPhone, timeZone, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sequelize = models.sequelize;
                        Address = models.Address;
                        Phone = models.Phone;
                        meeting = ResponseService.getItemFromBody(req);
                        address = ResponseService.deleteItemDates(meeting.address);
                        phone = ResponseService.deleteItemDates(meeting.phone);
                        delete meeting.address_id;
                        delete meeting.phone_id;
                        delete meeting.address;
                        delete meeting.phone;
                        meeting.organization_id = req.params.organization_id;
                        meeting.status = 'pending';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, sequelize.transaction()];
                    case 2:
                        transaction = _a.sent();
                        return [4 /*yield*/, ResponseService.workoutTimeZone(address)];
                    case 3:
                        timeZone = _a.sent();
                        ResponseService.setTimeZone(meeting, timeZone.googleTimeZone);
                        address.lat = timeZone.location.lat;
                        address.lng = timeZone.location.lng;
                        processTime(meeting, timeZone);
                        return [4 /*yield*/, Address.create(address, { transaction: transaction })];
                    case 4:
                        newAddress = _a.sent();
                        meeting.address_id = newAddress.id;
                        if (!phone) return [3 /*break*/, 6];
                        return [4 /*yield*/, Phone.create(phone, { transaction: transaction })];
                    case 5:
                        newPhone = _a.sent();
                        meeting.phone_id = newPhone.id;
                        _a.label = 6;
                    case 6: return [4 /*yield*/, Meeting.create(meeting, { transaction: transaction })];
                    case 7:
                        newMeeting = _a.sent();
                        transaction.commit();
                        ResponseService.success(res, newMeeting, 201);
                        return [3 /*break*/, 9];
                    case 8:
                        error_2 = _a.sent();
                        transaction.rollback(transaction);
                        ResponseService.exception(res, error_2);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
    function getMeetingAddress(req, res) {
        this.getOne(req, res);
    }
    function updateMeetingAddress(req, res) {
        var Address = models.Address;
        var address = ResponseService.deleteItemDates(req);
        Meeting.find({
            where: {
                id: req.params.meeting_id
            }
        })
            .then(function (meeting) {
            return Address.update(address, {
                where: {
                    id: req.params.address_id
                }
            });
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteMeetingAddress(req, res) { }
    function getPrices(req, res) {
        var sequelize = models.sequelize;
        var Price = models.Price;
        Price.findAll()
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    return {
        getAll: getAll,
        getAllByOrganization: getAllByOrganization,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getPrices: getPrices,
        getMeetingAddress: getMeetingAddress,
        createMeetingAddressPhone: createMeetingAddressPhone,
        updateMeetingAddress: updateMeetingAddress,
        deleteMeetingAddress: deleteMeetingAddress
    };
}
exports.default = meetingController;
//# sourceMappingURL=meetingController.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function MatchController(models, ResponseService) {
    var Match = models.Match;
    var attributes = ['id'];
    function returnMatch(res, match, status) {
        if (status === void 0) { status = 200; }
        var newMatch = ResponseService.deleteItemDates(match);
        newMatch.id = match.id;
        ResponseService.success(res, newMatch, status);
    }
    function getAll(req, res) {
        var clause = ResponseService.produceSearchAndSortClause(req);
        Match.findAndCountAll(clause)
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getAllByMatch(req, res) {
        Match.findAll({
            where: {
                game_id: req.params.game_id
            }
        })
            .then(function (results) { return ResponseService.success(res, results); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function getOne(req, res) {
        var Address = models.Address;
        var Phone = models.Phone;
        Match.find({
            where: {
                id: req.params.match_id
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
        var match = ResponseService.getItemFromBody(req);
        Match.create(match)
            .then(function (newMatch) {
            returnMatch(res, newMatch, 201);
        })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function update(req, res) {
        var match = ResponseService.getItemFromBody(req);
        Match.update(match, {
            where: {
                id: req.params.match_id
            }
        })
            .then(function (result) { return ResponseService.success(res, 'Match updated'); })
            .catch(function (error) { return ResponseService.exception(res, error); });
    }
    function deleteOne(req, res) {
        var match_id = req.params.match_id;
        function doDelete(match) {
            return Match.destroy({
                where: {
                    id: match.id
                }
            });
        }
        ResponseService.findObject(match_id, 'Match', res, doDelete, 204);
    }
    function createMatchAddressPhone(req, res) {
        var _this = this;
        var sequelize = models.sequelize;
        var Address = models.Address;
        var Phone = models.Phone;
        var createMatch = function (t, match) {
            return Match.create(match, { transaction: t });
        };
        var createPhone = function (t, phone, match) {
            return Phone.create(phone, { transaction: t }).then(function (newPhone) {
                match.phone_id = newPhone.id;
                return createMatch(t, match);
            });
        };
        var match = ResponseService.getItemFromBody(req);
        console.log('match:', match);
        var address = ResponseService.deleteItemDates(match.address);
        console.log('address:', address);
        var phone = ResponseService.deleteItemDates(match.phone);
        console.log('phone:', phone);
        delete match.address_id;
        delete match.phone_id;
        delete match.address;
        delete match.phone;
        match.game_id = req.params.game_id;
        match.status = 'pending';
        console.log(' in match controller');
        sequelize
            .transaction(function (t) {
            return Address.create(address, { transaction: t }).then(function (newAddress) {
                //match.address_id = newAddress.id;
                return phone ? createPhone(t, phone, match) : createMatch(t, match);
            });
        })
            .then(function (result) {
            var aMatch = ResponseService.deleteItemDates(result);
            ResponseService.success(res, aMatch, 201);
        })
            .catch(function (error) { return _this.exception(res, error); });
    }
    function getMatchAddress(req, res) {
        this.getOne(req, res);
    }
    function updateMatchAddress(req, res) { }
    function deleteMatchAddress(req, res) { }
    return {
        getAll: getAll,
        getAllByMatch: getAllByMatch,
        getOne: getOne,
        create: create,
        update: update,
        deleteOne: deleteOne,
        getMatchAddress: getMatchAddress,
        createMatchAddressPhone: createMatchAddressPhone,
        updateMatchAddress: updateMatchAddress,
        deleteMatchAddress: deleteMatchAddress
    };
}
exports.default = MatchController;
//# sourceMappingURL=matchController.js.map
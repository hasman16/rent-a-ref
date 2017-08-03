"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendgrid = require("sendgrid");
exports.default = new (function () {
    function SendGridService() {
        this.sg = sendgrid(process.env.SENDGRID_API_KEY);
    }
    SendGridService.prototype.sendEmail = function (setter) {
        var helper = sendgrid.mail;
        var from_email = new helper.Email(setter.from);
        var to_email = new helper.Email(setter.to);
        var subject = setter.subject;
        var content = new helper.Content('text/plain', 'Hello, Email!');
        var mail = new helper.Mail(from_email, subject, to_email, content);
        var request = this.sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
        return this.sg.API(request);
    };
    return SendGridService;
}());
//# sourceMappingURL=sendGrid.js.map
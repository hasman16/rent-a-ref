"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendgrid = require("sendgrid");
exports.default = new (function () {
    function SendGridService() {
        //if (process.env.SENDGRID_API_KEY) {
        //this.sg = sendgrid(process.env.SENDGRID_API_KEY);
        this.sg = sendgrid("F8oJA2llR36JFVCtF8KNPw");
        this.enabled = true;
        //}
    }
    SendGridService.prototype.sendEmail = function (setter) {
        var value;
        if (this.enabled) {
            var sg_1 = this.sg;
            var helper_1 = sendgrid.mail;
            var from_email_1 = new helper_1.Email(setter.from);
            var subject_1 = setter.subject;
            var content_1 = new helper_1.Content('text/plain', setter.content);
            var emails = setter.to.map(function (emailAddress) {
                var to_email = new helper_1.Email(emailAddress);
                var mail = new helper_1.Mail(from_email_1, subject_1, to_email, content_1);
                var request = sg_1.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });
                return sg_1.API(request);
            });
            value = Promise.all(emails)
                .then(function (result) { return console.log('email sent:', result); })
                .catch(function (error) { return console.log('error:', error); });
        }
        return value;
    };
    return SendGridService;
}());
//# sourceMappingURL=sendGridService.js.map
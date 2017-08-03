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
            var helper = sendgrid.mail;
            var from_email = new helper.Email(setter.from);
            var to_email = new helper.Email('hasman16@gmail.com');
            var subject = setter.subject;
            var content = new helper.Content('text/plain', setter.content);
            var mail = new helper.Mail(from_email, subject, to_email, content);
            var request = this.sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });
            value = this.sg.API(request)
                .then(function (result) { return console.log('email sent:', result); })
                .catch(function (error) { return console.log('error:', error); });
            ;
        }
        return value;
    };
    return SendGridService;
}());
//# sourceMappingURL=sendGridService.js.map
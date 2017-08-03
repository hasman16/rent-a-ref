"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendgrid = require("sendgrid");
exports.default = new (function () {
    function SendGridService() {
        if (process.env.SENDGRID_API_KEY) {
            this.sg = sendgrid(process.env.SENDGRID_API_KEY);
            this.enabled = true;
        }
    }
    SendGridService.prototype.sendEmail = function (setter) {
        var value;
        if (this.enabled) {
            var to = setter.to;
            if (!Array.isArray(setter.to)) {
                to = [setter.to];
            }
            ;
            var emailAddresses = to.map(function (emailAddress) {
                return {
                    email: emailAddress
                };
            });
            var request = this.sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: {
                    personalizations: [
                        {
                            to: emailAddresses,
                            subject: setter.subject
                        }
                    ],
                    from: {
                        email: setter.from
                    },
                    content: [
                        {
                            type: 'text/plain',
                            value: setter.content
                        }
                    ],
                },
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
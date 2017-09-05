import * as sendgrid from 'sendgrid';

export default new class SendGridService {
  sg;
  enabled;
  constructor() {
    if (process.env.SENDGRID_API_KEY) {
      this.sg = sendgrid(process.env.SENDGRID_API_KEY);
      this.enabled = true;
    }
  }

  sendEmail(setter) {
    let value;

    if (this.enabled) {
      let to = setter.to;
      if (!Array.isArray(setter.to)) {
        to = [setter.to];
      };
      const emailAddresses = to.map((emailAddress) => {
        return {
          email: emailAddress
        };
      });

      const request = this.sg.emptyRequest({
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
        .then(result => console.log('email sent:', result))
        .catch(error => console.log('error:', error));
    }
    return value;
  }
}

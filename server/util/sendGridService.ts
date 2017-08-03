import * as sendgrid from 'sendgrid';

export default new class SendGridService {
  helper;
  sg;
  enabled;
  constructor() {
    //if (process.env.SENDGRID_API_KEY) {
    //this.sg = sendgrid(process.env.SENDGRID_API_KEY);
    this.sg = sendgrid("F8oJA2llR36JFVCtF8KNPw");
    this.enabled = true;
    //}
  }

  sendEmail(setter) {
    let value;

    if (this.enabled) {
      const sg = this.sg;
      const helper = sendgrid.mail;
      const from_email = new helper.Email(setter.from);
      const subject = setter.subject;
      const content = new helper.Content('text/plain', setter.content);

      const emails = setter.to.map(emailAddress => {
        let to_email = new helper.Email(emailAddress);
        let mail = new helper.Mail(from_email, subject, to_email, content);

        let request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        return sg.API(request);
      });

      value = Promise.all(emails)
        .then(result => console.log('email sent:', result))
        .catch(error => console.log('error:', error));
    }
    return value;
  }
}

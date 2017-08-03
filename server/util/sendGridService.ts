import * as sendgrid from 'sendgrid';

export default new class SendGridService {
  helper;
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
    console.log('setter:', setter);
    if (this.enabled) {
      console.log("ok enabled ===================");
      const helper = sendgrid.mail;
      const from_email = new helper.Email(setter.from);
      const to_email = new helper.Email('hasman16@gmail', 'smylydon@gmail.com');
      const subject = setter.subject;
      const content = new helper.Content('text/plain', 'Hello, Email!');
      const mail = new helper.Mail(from_email, subject, to_email, content);

      const request = this.sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      value = this.sg.API(request);
    }
    return value;
  }
}

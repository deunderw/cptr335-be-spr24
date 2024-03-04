const mailjet = require('node-mailjet');
const mailjetApiKeyPublic = process.env.MJ_APIKEY_PUBLIC;
const mailjetApiKeyPrivate = process.env.MJ_APIKEY_PRIVATE;
const mailjetClient = mailjet.apiConnect(mailjetApiKeyPublic, mailjetApiKeyPrivate);

const sendEmail = async (username) => {
    const request = mailjetClient.post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: { 
                        Email: 'noreply@cs.ucollege.edu',
                        Name: 'cptr335 class'
                    },
                    To: [
                        {
                            Email: username,
                            Name: 'Your Majesty',
                        }
                    ],
                    Subject: 'Super Secret Link',
                    TextPart: 'This is top secret!',
                    HTMLPart: '<h3>Test</h3><p>If you are seeing this message, then Mailjet is working!</p>',
                },
            ],
        });
    const response = await request;
    console.log(response.body);
};

module.exports = {
    sendEmail,
}
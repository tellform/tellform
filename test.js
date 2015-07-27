var nodemailer = require('nodemailer'),
config = require('./config/config');
console.log('Start script');

var transporter = nodemailer.createTransport(config.mailer.options);

var verifyMailOptions = {
        to: '1nsphq+9hg2ghgtblstc@sharklasers.com',
		from: 'Do Not Reply <user@gmail.com>',
        subject: 'Confirm your account',
        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    };

transporter.sendMail(verifyMailOptions , function(err, info){
	if (err) console.log(err.message);
        else console.log(info.response);

});

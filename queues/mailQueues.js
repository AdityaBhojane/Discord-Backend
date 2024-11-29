import Queue from 'bull';
import mailer from '../config/mailerConfig.js'
import redisConfig from '../config/redisConfig.js';

const mailQueue = new Queue('mailQueue',{
    redis:redisConfig
});


mailQueue.process(async(job)=>{
    const emailData = job.data;
    console.log("Processing Email", emailData);
    try {
        const response = await mailer.sendMail(emailData);
        console.log("Email sent", response)
    } catch (error) {
        console.log("Error in processing email", error);
    }
});


export const addEmailToMailQueue = async (emailData)=>{
    console.log("initiating process");
    try {
        await mailQueue.add(emailData);
        console.log('email added in queue')
    } catch (error) {
        console.log('error in adding mail to queue', error)
    }
}
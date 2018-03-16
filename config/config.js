module.exports = {
    app: {
		title: 'Slack Reminder Server',
		description: 'Slack Reminder Server',
		keywords: 'Slack Reminder Server'
    },
    dbconfig:{
        mongodb:{
            host:process.env.MONGODB_HOST || 'localhost',
            port:process.env.MONGODB_HOST || '27127',
            db:process.env.MONGODB_DB || 'reminderbot_dev',
        }
    },
    Slack_Client_Id : process.env.SLACK_CLIENT_ID || '323105054656.329496864595',
    Slack_Client_Secret: process.env.SLACK_CLIENT_SECRET || 'f1295940925fc54b588e3636eaaa6665',
    Slack_Redirect_url: process.env.SLACK_REDIRECT_URL ||'http://localhost:3000/auth',
    Slack_Auth_Access_url: process.env.SLACK_AUTH_ACCESS_URL || 'https://slack.com/api/oauth.access',
	port: process.env.PORT || 3000,
}
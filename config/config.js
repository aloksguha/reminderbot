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
    Slack_Client_Id : process.env.SLACK_CLIENT_ID || '323105054656.323954295283',
    Slack_Client_Secret: process.env.SLACK_CLIENT_SECRET || 'ccd2a9149a30efe7bbc31e79cf4cbbb0',
    Slack_Redirect_url: process.env.SLACK_REDIRECT_URL ||'http://localhost:3000/auth',
    Slack_Auth_Access_url: process.env.SLACK_AUTH_ACCESS_URL || 'https://slack.com/api/oauth.access',
	port: process.env.PORT || 3000,
}
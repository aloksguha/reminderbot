const config = require('../config/config');
/**
 * mainController.js
 *
 * @description :: Server-side logic for managing mains.
 */
module.exports = {
    /**
     * mainController.list()
     */
    list: function (req, res) {
      html = `<html>
      <head>
          <title>TCI Slack Bot</title>
      </head>
      <body>
          <a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=${config.Slack_Client_Id}&state=alok"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
      </body>
      </html>`
      res.send(html);
    },
     /**
     * mainController.create()
     */
    create: function (req, res) {
        res.json({});
      }
};

const config = require('./../config/config');

/**
 * auth2Controller.js
 *
 * @description :: Server-side logic for managing auth2s.
 */
module.exports = {

    /**
     * auth2Controller.handleCallback()
     */
    handleCallback: function (req, res) {
        console.log('get')
        console.log(req.body);
        console.log(req.query.code);
        
        var code = req.query.code;
        var state = req.query.state;
    
        var options = {
            'url': config.Slack_Auth_Access_url,
            'qs':{
                'code':code,
                'client_id':config.Slack_Client_Id,
                'client_secret':config.Slack_Client_Secret
    
            },
            'method': 'GET',
            'headers': {
                'content-type': 'application/x-www-form-urlencoded'
            }
        };
    
        function callback(error, response, body) {
            console.log(error);
            console.log(body);
            res.send("Thanks..")
            // do some savings
        
        }
        request(options, callback); 
    }
};

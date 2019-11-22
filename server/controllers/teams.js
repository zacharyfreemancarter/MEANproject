var apiKey='68363871c0414e539556e9857ac6b09a'
const request = require('request')

module.exports = {
    index:function(req,res){
        request('https://api.sportsdata.io/v3/nfl/scores/json/Teams?key='+apiKey,
        {json:true}, function(err,response,body){
            if(err){
                return console.log(err)
            }
            else{
                res.json(body)
            }
        })
    }
}
var apiKey='68363871c0414e539556e9857ac6b09a'
const request = require('request')

module.exports = {
    index:function(req,res){
        console.log(req.params.id)
        request('https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByTeam/2019/'+req.params.id+'?key='+apiKey,
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
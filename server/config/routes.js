const teams = require('../controllers/teams.js');
const seasons = require('../controllers/seasons.js')
const players = require('../controllers/players')

module.exports = function(app){
    app.get('/api/teams',(req,res)=>{
        teams.index(req,res)
    }),
    app.get('/api/seasons',(req,res)=>{
        seasons.index(req,res)
    })
    app.get('/api/teams/:id/players',(req,res)=>{
        players.index(req,res)
    })
    app.all("**",(req,res,next)=>{
        res.sendFile(path.resolve("../public/dist/public/index.html"))
    })
}
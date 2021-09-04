const express = require('express');
const route = express.Router();
const User = require('../model/candidateModel');
const Score = require('../model/candidateScoreModel')
const mongoose = require('mongoose');



route.post('/addCandidate',async(req,res)=>{
    
    try{
        const newCandidate = {
            name:req.body.name,
            email:req.body.email
        }
        let candidate = await User.findOne({email:newCandidate.email})
        if(candidate){
            return res.send('Candidate already register')
        }else{
            candidate = await User.create(newCandidate)
            return res.send(candidate)
        }

    }catch(error){
        console.log(error)
    }

})

route.get('/showCandidate', async(req,res)=>{
    try {
        let candidate = await User.find({})
        return res.send(candidate)
    } catch (err) {
        console.log(err)
        
    }
})

route.post('/addScore/:candidateId', async(req,res)=>{
    
    try{
        cadidateId = mongoose.Types.ObjectId(req.params.cadidateId)
        const scoreTest = {
            firstRound:req.body.firstRound,
            secondRound:req.body.secondRound,
            thirdRound:req.body.thirdRound,
            candidate:cadidateId
        }
        let candidateScore = await Score.create(scoreTest)
        return res.send(candidateScore)

    }catch(err){
        console.log(err)
    }
})


route.get('/highestScorer',async(req,res)=>{
    try {
        const highestScorer = await Score.aggregate()
        res.send(highestScorer)
    } catch (err) {
        console.log(err)
    }
})

route.get('/highestScore', async(req,res)=>{
    try {
        candidateId = mongoose.Types.ObjectId(req.params.candidateId)
        const highestScore = await Score.aggregate([
            {
                $group:{
                    _id:"$candidateId",
                    avgFirstRound: { $avg: "$firstRound" },
                    avgSeconsRound: { $avg: "$secondRound" },
                    avgthirdRound: { $avg: "$thirdRound" }
                }
            }
        ])
            res.send([{
                avgFirstRound: highestScore[0].avgFirstRound, 
                avgSeconsRound: highestScore[0].avgSeconsRound, 
                avgthirdRound: highestScore[0].avgthirdRound
            }])
        
        
      } catch (err) {
        console.log(err)
      }
})

route.get('/showScore', async(req,res)=>{
    try {
        let story = await Score.find({})
        .populate({path:'candidate' ,model:'Candidate'});
        let firstRoundHighest = 0;
        let secondRoundHighest = 0;
        let thirdRoundHighest = 0;
        story.forEach(scores => {
            if(scores.firstRound > firstRoundHighest) {
                firstRoundHighest = scores.firstRound;
            };
            if(scores.secondRound > secondRoundHighest) {
                secondRoundHighest = scores.secondRound;
            };
            if(scores.thirdRound > thirdRoundHighest) {
                thirdRoundHighest = scores.thirdRound;
            };
        });
        
        return res.send({firstRoundHighest, secondRoundHighest, thirdRoundHighest});
    } catch (err) {
        console.log(err)
    }
})
module.exports = route

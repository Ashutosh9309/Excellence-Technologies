const mongoose = require('mongoose')


const candidateTestScore = new mongoose.Schema({
    candidate:{
        type: mongoose.Types.ObjectId,
        ref:'Candidate'
    },
    firstRound:{
        type:Number,
        required:true
    },
    secondRound:{
        type:Number,
        required:true
    },
    thirdRound:{
        type:Number,
        required:true
    },
    
})

module.exports = mongoose.model('testScore', candidateTestScore)


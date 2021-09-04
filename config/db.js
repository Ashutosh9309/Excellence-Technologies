const mongoose = require('mongoose')
const URL = "mongodb://localhost:27017/studentScore"

const mongoDb = async()=>{
    try {
        mongoose.connect(URL)
        console.log('data base connected')
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = mongoDb



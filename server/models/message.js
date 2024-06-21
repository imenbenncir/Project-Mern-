const mongoose = require ('mongoose');


const MessageSchema= new mongoose.Schema({

    username:{
        type : String,
        required:[true, 'Username must be present .'],
        minlength :[3, 'Username must be at least  3 .'],
        trim:true
    },
    email:{
        type : String,
        required:[true, "Email must be present."],
    },
    message:{
        type: String,
        minlength :[10, 'Message must be at least  10 .'],
    
    }

}
,{timestamps: true}

)
module.exports= mongoose.model('Message',MessageSchema);
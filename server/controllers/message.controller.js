const Message = require('../models/message');

module.exports.findAllMessages = (req,res)=>{

    Message.find()
    .then((message)=> res.json(message))
    .catch((err)=> res.json(err));   
};


// Read One By ID
module.exports.findOneMessage = (req, res) => {
    Message.findOne({ _id: req.params.id })
        .then(oneMessage => {
            res.json(oneMessage);
        })
        .catch((err) => res.json(err));
}

// // Read All Messages By user ID
// module.exports.findMessageByUser = (req, res) => {
//     Message.find({ user: req.params.id })
//         .then(oneMessage => {
//             res.json(oneMessage);
//         })
//         .catch((err) => res.json(err));
// }

// CREATE
module.exports.createNewMessage = (req, res) => {
    
    Message.create({ ...req.body})
        .then((newlyCreatedMessage) => {
            res.json(newlyCreatedMessage)
        })
        .catch((err) => {
            res.status(400).json(err)
            console.log(err);
        });
}
// UPDATE
module.exports.updateExistingMessage = (req, res) => {
    Message.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updateMessage) => {
            res.json(updateMessage)
        })
        .catch((err) => res.status(400).json(err));
};
// DELETE   
module.exports.DeleteOneMessage = (req, res) => {
    Message.deleteOne({ _id: req.params.id })
        .then((deletedMessage) => {
            res.json(deletedMessage)
        })
        .catch((err) => res.json(err));
};

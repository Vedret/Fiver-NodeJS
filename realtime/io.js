const User = require('../models/user');
const Order = require('../models/order');
const Message = require('../models/message');
const async = require('async');


module.exports = function(io) {

  io.on('connection', function(socket) {

    const user = socket.request.user;
    console.log(user.name);
    const orderId=socket.request.session.orderId;
    console.log(orderId);

    socket.join(orderId);

    // First emit message than save it to db
    socket.on('chatTo',(data)=>{
      async.waterfall([
        //Emit
        function(callback){
          io.in(orderId).emit('incomingChat',{
            message:data.message,sender:user.name,senderImage:user.photo,senderId:user._id
          });
          let message = new Message();
          message.owner=user._id;
          message.content=data.message;
          message.save((err)=>{
            callback(err,message);
          })
        },
        //Save parsed message
        function(message,callback){
          //save order object
          Order.update({_id:orderId },{$push:{messages:message._id}},function(err,count){
            console.log(count);
          }          
          )
        }
      ]);
      });
    });
  };


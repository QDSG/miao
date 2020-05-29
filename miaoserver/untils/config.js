var mongoose=require('mongoose');
var nodemailer=require('nodemailer');

var Mongoose={
    url:'mongodb://localhost:27017/miao',
    connect(){
        mongoose.connect(this. url,{
            useNewUrlParser: true,
            useUnifiedTopology: true     //这个即是报的警告
          },(err)=>{
            if(err){
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        })
    }
};

var Email={
    config:{
        host: "smtp.qq.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '454572457@qq.com', // generated ethereal user
            pass: 'tknbyeppwduebibj' // generated ethereal password
            // user: '1970890423@qq.com', // generated ethereal user
            // pass: 'ljxywvmnrzhncabf' // generated ethereal password
        }   
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    },
    get time(){
        return Date.now();
    }
};
var Heads={
    baseUrl:'http://localhost:3000/uploads/'
};
module.exports={
    Mongoose,
    Email,
    Heads
};
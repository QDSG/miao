var {Email,Heads}=require('../untils/config.js');
var UserModel=require('../models/users.js');
var fs = require('fs');
var url = require('url');
var { setCrypto , createVerify } = require('../untils/base.js');

var login=async(req,res,next)=>{
    var {username,password,verifyImg}=req.body;
    if(verifyImg!==req.session.verifyImg){
        res.send({
            msg:'验证码输入不正确',
            status:-2
        });
        return;
    }
    var result=await UserModel.findLogin({
        username,
        password: setCrypto(password)
    });
    if(result){
        req.session.username=username;
        req.session.isAdmin=result.isAdmin;
        req.session.userHead=result.userHead;
        if(result.isFreeze){
            res.send({
                msg:'账号已经被冻结',
                status:-2
            });
        }else{
            res.send({
                msg:'登录成功',
                status:0
            });
        }
        
    }else{
        res.send({
        msg:'登录失败',
        status:-3
        });
    }
};

var register=async(req,res,next)=>{
    var{username,password,email,verify}=req.body;
    if(email!==req.session.email||verify!==req.session.verify){
        res.send({
            title:'验证码',
            msg:'验证码错误',
            status:-1
         });
         return;
    }

    if((Email.time-req.session.time)/1000>60){
        res.send({
            msg:'验证码已过期',
            status:-3
         });
         return;
    }


    // if( (Email.time - req.session.time)/1000 > 60 ){
	// 	res.send({
	// 		msg : '验证码已过期',
	// 		status : -3
	// 	});
	// 	return;
	// }

    var result=await UserModel.save({
        username,
        password:setCrypto(password),
        email,
    });
    if(result){
        res.send({
            msg:'注册成功',
            status:0
        });
    }else{
        res.send({
            msg:'注册失败',
            status:-2
        });
    }
};

var verify=async(req,res,next)=>{
    // res.send({
    //   msg:'ceshi',
    //   status:0
    // });
    var email=req.query.email;
    var verify=Email.verify;

    req.session.verify=verify;
    req.session.email=email;
    req.session.time=Email.time;
    
    var mailOptions = {
        from: '喵喵超市 454572457@qq.com',
        to: email,
        subject: '喵喵超市邮箱验证码',
        text: '验证码：' + verify
    }
    /*
    var mailOptions = {
        from: '猪哥超市 1970890423@qq.com',
        to: email,
        subject: '猪哥超市邮箱验证码',
        text: '验证码：' + Email.verify
    }*/

    Email.transporter.sendMail(mailOptions,(err)=>{
        
        if(err){
            res.send({
                msg : '验证码发送失败',
                status : -1
            });
        }
        else{
            res.send({
                msg : '验证码发送成功',
                status : 0
            });
        }

    });

    
    };

var logout=async(req,res,next)=>{
    req.session.username='';
    res.send({
        msg : '退出成功',
        status : 0
    });
    };

var getUser=async(req,res,next)=>{
    if(req.session.username){
        res.send({
        msg : '获取用户信息成功',
        status : 0,
        data:{
            username:req.session.username,
            isAdmin:req.session.isAdmin,
            userHead:req.session.userHead,
        }
        });
    }
    else{
        res.send({
        msg : '获取用户信息失败',
        status : -1,
        });
  }
};

var findPassword=async(req,res,next)=>{
    var{email,password,verify}=req.body;
    if(email==req.session.email&&verify==req.session.verify){
        var result=await UserModel.updatePassword(email,setCrypto(password));
        if(result){
          res.send({
              msg:'修改密码成功',
              status:0
          });
        }else{
          res.send({
              msg:'修改密码失败',
              status:-2
        });
        }
    }
    else{
        res.send({
        msg : '验证码错误',
        status : -1,
        });
    }
};

var verifyImg=async(req,res,next)=>{
    var result=await createVerify(req,res);
    if(result){
        res.send(result);
    }
};
var verifyImg = async (req,res,next)=>{
	var result = await createVerify(req,res);
	if(result){
		res.send(result);
	}
}

var uploadUserHead=async(req,res,next)=>{
    console.log(req.file);
    await fs.rename(
        'public/uploads/' + req.file.filename , 
        'public/uploads/' + req.session.username + '.jpg' ,
            (err)=>{
                if(err) throw err;
            }
        );
    var result=await UserModel.updateUserHead(req.session.username,url.resolve(Heads.baseUrl,req.session.username+'.jpg'));
    if(result){
        res.send({
            msg:'上传头像成功',
            status:0,
            data:{
                userHead:url.resolve(Heads.baseUrl,req.session.username+'.jpg')
            }
        });
        return;
    }else{
        res.send({
            msg:'上传头像失败',
            status:-2
        });
        return;
    }
}

module.exports={
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    verifyImg,
    uploadUserHead
};
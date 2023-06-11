const User = require('../models/user');
exports.getLogin = (req,res,next) =>{
    console.log(req.session.isLoggedIn);
    res.render('auth/login',{
        path:'/login',
        pageTitle:'login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req,res,next)=>{
    User.findById('64770c7ed840b9aca7b7dba1')
    .then(user=>{
        req.session.isLoggedIn = true;
        req.session.user = user
        req.session.save(err=>{
            console.log(err)
            res.redirect('/')
        })
    })
    .catch((erro)=>{console.log(erro);})
    
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy(erro=>{
        res.redirect('/')
    })
}
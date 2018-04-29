const express = require('express');
const router = express.Router();
const tbl_user = require('../models/user');
const jwt = require('jsonwebtoken');

/**
 * router 사용법
 * GET: router.get()
 * POST: router.post()
 * PUT: router.put()
 * DELETE: router.delete()
 *
 * res 사용법
 * res.send(): 문자열로 응답
 * res.json(): 제이슨(Json) 객체로 응답
 * res.render(): 제이드 템플릿을 렌더링
 * res.sendfile(): 파일 다운로드
 */


/*
let testUser = {
    id: "userid",
    password: "userpw"
};
*/

router.use((req, res, next) => {
    if('/login' != req.url && '/' != req.url){
        console.log('jwt check');
        const token = req.headers['x-access-token'] || req.query.token
        /*if(!token){
            return res.status(403).json({
                success : false,
                message : 'not logged in'
            })
        }*/
    
        try{
            const decoded = jwt.verify(token, req.app.get('jwt-secret'));
            req.jwtcheck = true;
            next();
        }catch(err){
            req.jwtcheck = false;
            res.status(500).send(err);
        }
    }
    next();
});

router.post('/', (req, res) => {

    tbl_user.create(req.body)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send(err)
        });
});
 
router.post('/login', (req, res) => {
    let id = req.body.user_id;
    let pw = req.body.user_pw;
    const secret = req.app.get('jwt-secret')

    tbl_user.findOneByUserId(id)
        .then((user) => {
            if(user.password !== pw) {
                return res.status(404).send({ err: `${pw}를(을) 찾을 수 없습니다.` });
            } else {
                
                 if(user.password !== pw) {
                    return res.status(404).send({ err: `비밀번호가 틀렸습니다.` });
                } else {
                     
                    jwt.sign(
                    {
                        _id: user._id,
                        username: user.username,
                        admin: user.admin
                    }, 
                    secret, 
                    {
                        expiresIn: '7d',
                        issuer: 'velopert.com',
                        subject: 'userInfo'
                    }, (err, token) => {
                          res.json( { message: 'logged in successfully', 'token' : token, 'user' : user});
                    })
                }

            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err);
        });
});

router.get('/check', (req, res) => {
    const token = req.headers['x-access-token'] || req.query.token
   
    if(!token){
        return res.status(403).json({
            success : false,
            message : 'not logged in'
        })
    }

    try{ 
        const decoded = jwt.verify(token, req.app.get('jwt-secret'));
    }catch(err){
         res.json({ success : 'false' });
    }
    
    res.json({ success : 'true' });
   
});

module.exports = router;
const express = require('express');
const tbl_user = require('../models/user');
const Board = require('../models/board');
const Seq = require('../models/seq');
const jwt = require('jsonwebtoken');
const router = express.Router();
 
/*
 * Method : GET
 * @params req : 전체 게시글 가져오기.
 * @params res : vue List.component.js의 boardList()
 */
 
router.use((req, res, next) => {

    if('/login' != req.url){
    const token = req.headers['x-access-token'] || req.query.token
    /*if(!token){
        return res.status(403).json({
            success : false,
            message : 'not logged in'
        })
    }*/
    
        try{
             // res.json({ success : 'true' });
            req.jwtcheck = true;
            const decoded = jwt.verify(token, req.app.get('jwt-secret'));
            next();
        }catch(err){
            // res.json({ success : 'false' });
            req.jwtcheck = false;
            res.status(500).send(err);
        }
    }

});

router.get('/list', (req, res, next) => {
    
    /* models/board.js */
    Board.findAll({})
        .then(result => {
            res.status(200).send({ 'token' : req.jwtcheck, 'result': result });
        })
        .catch(err => {
            res.status(500).send(err)
        });
});
 
/*
 * Method : GET
 * @params req : 게시물 상세보기를 위한 데이터,
 * @params res : vue List.component.html의 router-link to를 통한 이동
 */
 
router.get('/read/:no', (req, res) => {
    let boardId = req.params.no;
    Board.findOneBoardData(boardId)
        .then(result => {
            res.status(200).send({ 'token' : req.jwtcheck, 'result': result });
        })
        .catch(err => {
            res.status(500).send(err);
        })
});
 
/*
 * Method : DELETE
 * @params req : 게시물 삭제를 위한 데이터,
 * @params res : vue View.component.js의 boardDelete()
 */
 
router.delete('/:no', (req, res) => {
    /* 삭제할 게시글 번호 */
    let boardId = req.params.no;
    Board.deleteBoard(boardId)
        .then(result => {
            res.status(200).send({ 'token' : req.jwtcheck, 'result': "success" });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
 
 
/*
 * Method : POST
 * @params req : 게시물 저장을 위한 데이터,
 * @params res : vue Write.component.js의 boardSave()
 */
 
router.post('/', (req, res) => {
    
    let reqBody = req.body;
    let board = {};
 
    Seq.getBoardCount()
        .then((result) => {
            board.no = result.count;
        })
        .then(() => {
            board.title = reqBody.title;
            board.contents = reqBody.contents;
            board.register = reqBody.register;
            board.registedAt = reqBody.registedAt;
            //route.post의 getBoardCount의 두 번째 then부분에 추가 (82라인)
            board.imageData = reqBody.image;
            const imageInfo = reqBody.imageInfo;
            board.imageContentType = imageInfo.imageFormat;
            board.imageName = imageInfo.imageName;
            board.imageSize = imageInfo.imageSize;

            Board.saveBoard(board)
                .then(result => {
                    res.status(200).send({ 'token' : req.jwtcheck, 'result': result });
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        });
});
 
 
/*
 * Method : PUT
 * @params req : 데이터 수정을 위한 글 번호 , 제목 , 내용
 * @params res : vue Modify.component.js 의 boarAdjust()
 */
router.put('/', (req, res) => {
    const reqBody = req.body;
 
    let no = reqBody.no;
    let updateBoard = {};
    updateBoard.title = reqBody.title;
    updateBoard.contents = reqBody.contents;

    //Board.updateBoard() 위에 추가
    updateBoard.imageData = reqBody.image;
    const imageInfo = reqBody.imageInfo;
    updateBoard.imageContentType = imageInfo.imageFormat;
    updateBoard.imageName = imageInfo.imageName;
    updateBoard.imageSize = imageInfo.imageSize;

    Board.updateBoard(no ,  updateBoard)
        .then(result=>{
            res.status(200).send({ 'token' : req.jwtcheck, 'result': result });
        })
        .catch(err=>{
            res.status(500).send(err);
        })
});

module.exports = router;
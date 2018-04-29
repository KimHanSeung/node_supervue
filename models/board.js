const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let boardSchema = new Schema({
    no : {type: Number , required:true},
    title : { type:String , trim : true , required : true} ,
    contents : {type : String , trim: true},
    registedAt: { type: Date, default: Date.now  },
    register : {type : String , trim : true},
    //boardSchema 아래 부분에 추가
    imageData: {type : String},
    imageContentType: {type: String},
    imageName: {type: String},
    imageSize: {type: Number}
});
 
/*
 * all board list
 * 현재 존재하는 게시물 전체 list를 return
 */
boardSchema.statics.findAll = function() {
    return this.find({});
};
 
/*
 * findOne boardNo를 조건으로 해당 게시글의 정보 return
 */
boardSchema.statics.findOneBoardData = function(boardNo){
    // 기존방식 : return this.findOne({"no":boardNo});
    // queryBuilder : return this.findOne().where("no").eq(boardNo);
    return this.findOne().where("no").eq(boardNo);
};
 
/*
 * save board data
 * 작성한 게시글을 req로 받아서 db에 save
 */
boardSchema.statics.saveBoard = function(req) {
    const boardData = new this(req);
    return boardData.save();
};
 
/* updateBoard */
boardSchema.statics.updateBoard = function(userNo , req) {
    return this.update({"no" : userNo} , {$set : req} , {upsert : true});
 
};
 
/*
 * deleteBoard
 * boardDataNo를 조건으로 해당 게시물 삭제
*/
boardSchema.statics.deleteBoard = function( boardDataNo) {
 
    // 기존방식 :  return this.remove({no:boardDataNo});
    // queryBuilder : return this.remove().where("no").equals(boardDataNo);
    return this.remove().where("no").equals(boardDataNo);
};
 
 
module.exports = mongoose.model('Board', boardSchema);
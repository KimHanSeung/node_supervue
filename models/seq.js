const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
 
let seqSchema = new Schema({
    seq : { type:String , trim : true , required : true} ,
    count : { type:Number , trim : true , required : true}
});
 
 
/* find 후 update . 데이터는 update하기 전의 데이터를 가져옴. */
 seqSchema.statics.getBoardCount = function(){
    return  this.findOneAndUpdate({seq:"boardIndex" }, { $inc : {count : 1}});
}
 
 
module.exports = mongoose.model('Seq', seqSchema);
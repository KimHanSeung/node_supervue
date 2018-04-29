const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new mongoose.Schema({
        id: {type : String, trim : true, required : true, lowercase : true},
        password: {type : String, required : true},
    },
    {
        timestamps: true
    }
);
userSchema.index({id : 1});
 
userSchema.statics.create = function (users) {
    const tbl_user = new this(users);
    return tbl_user.save();
};
 
userSchema.statics.findOneByUserId = function (id) {
    return this.findOne({'id' : id});
};
 
module.exports = mongoose.model('tbl_user', userSchema);
 
//mongoose ODM : http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
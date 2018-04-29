const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    name: String,
    year: String,
    director: String,
    poster: String,
    published_date: { type: Date, default: Date.now  }
});

movieSchema.statics.findAll = function () {
    return this.find({});
};

movieSchema.statics.findByObjectId = function (objectId) {
    return this.findById(objectId);
};

movieSchema.statics.saveMovie = function (req) {
    let movie = new this(req);
    return movie.save(movie);
};

movieSchema.statics.updateMovie = function (objectId, req) {
    return this.update({"_id": objectId}, {$set: req}, {upsert:true});
};

movieSchema.statics.deleteMovie = function (objectId) {
    return this.remove({ _id: objectId });
};

module.exports = mongoose.model('Movie', movieSchema);
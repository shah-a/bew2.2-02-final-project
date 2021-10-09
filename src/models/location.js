const mongoose = require('mongoose');

const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', select: false }
}, { timestamps: true });

// eslint-disable-next-line func-names, prefer-arrow-callback
LocationSchema.post('findOneAndDelete', function (location, next) {
  location.model('User').updateOne(
    { _id: location.user._id },
    { $pull: { locations: location._id } },
    next
  );
});

const model = mongoose.model('Location', LocationSchema);

module.exports = model;

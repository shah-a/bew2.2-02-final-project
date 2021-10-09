const { Location, User } = require('../models');

const getAll = (req, res) => {
  Location.find({ user: req.user._id }).lean()
    .select(['name', 'lat', 'long'])
    .then((locations) => {
      res.json({ locations });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  Location.findOne({ _id: req.params.locationId, user: req.user._id }).lean()
    .populate('user', ['username'])
    .then((location) => {
      if (location) {
        return res.json({ location });
      }
      return res.status(404).json({ message: 'No location found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const postOne = (req, res) => {
  const newLocation = new Location(req.body);
  newLocation.user = req.user._id;

  newLocation.save()
    .then(() => User.findById(req.user._id))
    .then((user) => {
      user.locations.push(newLocation);
      return user.save();
    })
    .then(() => {
      res.json({
        message: `Successfully added '${newLocation.name}'.`,
        new_location: newLocation
      });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const putOne = (req, res) => {
  const filter = { _id: req.params.locationId, user: req.user._id };
  const update = { name: req.body.name, lat: req.body.lat, long: req.body.long };

  Location.findOneAndUpdate(filter, update).populate('user', ['username'])
    .setOptions({ runValidators: true, new: true })
    .then((location) => {
      if (location) {
        return res.json({
          message: `Successfully updated '${location.name}'.`,
          updated_location: location
        });
      }
      return res.status(404).json({ message: 'No location found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const deleteOne = (req, res) => {
  // Using `lean()` here would break LocationSchema's `post` hook
  Location
    .findOneAndDelete({ _id: req.params.locationId, user: req.user._id })
    .populate('user', ['username'])
    .then((location) => {
      if (location) {
        return res.json({
          message: `Successfully deleted '${location.name}'.`,
          deleted_location: location
        });
      }
      return res.status(404).json({ message: 'No location found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = {
  getAll,
  getOne,
  postOne,
  putOne,
  deleteOne
};

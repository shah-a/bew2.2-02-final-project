const { adhan } = require('../utils');
const { Location } = require('../models');

const getAll = (req, res) => {
  const { prayer } = req.query;
  const { year, month, day } = req.query;
  const outputs = {};

  Location.find({ user: req.user._id }).lean()
    .then((queries) => {
      if (queries.length > 0) {
        queries.forEach((query, i) => {
          const locId = query._id;
          const locName = query.name;
          const { lat, long } = query;
          // eslint-disable-next-line object-curly-newline
          outputs[`location_${i + 1}`] = adhan({ prayer, locId, locName, lat, long, year, month, day });
        });
        return res.json(outputs);
      }
      return res.status(404).json({ message: 'No locations found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

const getOne = (req, res) => {
  const { prayer } = req.query;
  const { year, month, day } = req.query;

  Location.findOne({ _id: req.params.locationId, user: req.user._id }).lean()
    .then((query) => {
      if (query) {
        const locId = query._id;
        const locName = query.name;
        const { lat, long } = query;
        // eslint-disable-next-line object-curly-newline
        return res.json(adhan({ prayer, locId, locName, lat, long, year, month, day }));
      }
      return res.status(404).json({ message: 'No location found.' });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

module.exports = { getAll, getOne };

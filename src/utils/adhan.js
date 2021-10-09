const { PrayerTimes, Coordinates, CalculationMethod } = require('adhan');

const adhanTimes = (context) => {
  const { prayer } = context;
  const { locId, locName } = context;
  const { lat, long } = context;
  const { year, month, day } = context;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const coords = new Coordinates(lat, long);
  const date = (year && month && day) ? new Date(year, parseInt(month, 10) - 1, day) : new Date();
  const params = CalculationMethod.NorthAmerica();

  const adhan = new PrayerTimes(coords, date, params);

  if (['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(prayer)) {
    return {
      location_id: locId,
      location_name: locName,
      date: adhan.date.toLocaleDateString(),
      display_timezone: timezone,
      prayer_time: {
        [prayer]: adhan[prayer].toLocaleTimeString()
      }
    };
  }

  const result = {
    location_id: locId,
    location_name: locName,
    date: adhan.date.toLocaleDateString(),
    display_timezone: timezone,
    sunrise: adhan.sunrise.toLocaleTimeString(),
    prayer_times: {
      fajr: adhan.fajr.toLocaleTimeString(),
      dhuhr: adhan.dhuhr.toLocaleTimeString(),
      asr: adhan.asr.toLocaleTimeString(),
      maghrib: adhan.maghrib.toLocaleTimeString(),
      isha: adhan.isha.toLocaleTimeString()
    }
  };

  return result;
};

module.exports = adhanTimes;

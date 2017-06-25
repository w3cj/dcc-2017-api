const fetch = require('node-fetch');

const SCHEDULE_URL = 'http://register.growtix.com/mobileApp/newApp/2310';

let scheduleData = null;

/* eslint-disable */
function getSchedule() {
  if (scheduleData) {
    return Promise.resolve(scheduleData);
  }
  return fetch(SCHEDULE_URL)
    .then(res => res.json())
    .then((jsonData) => {
      scheduleData = jsonData;
      return scheduleData;
    });
}

module.exports = {
  getSchedule,
};

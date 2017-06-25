const fetch = require('node-fetch');

const SCHEDULE_URL = 'http://register.growtix.com/mobileApp/newApp/2310';
const SCHEDULE_FILE = './schedule.json';

const fs = require('fs');

let scheduleData = null;

/* eslint-disable */
function getSchedule() {
  if (scheduleData) {
    return Promise.resolve(scheduleData);
  }
  return new Promise((resolve) => {
    fs.exists(SCHEDULE_FILE, (exists) => {
      if (exists) {
        scheduleData = require(`.${SCHEDULE_FILE}`);
        return resolve(scheduleData);
      }

      return fetch(SCHEDULE_URL)
        .then(res => res.text())
        .then((jsonData) => {
          fs.writeFile(SCHEDULE_FILE, jsonData, () => {
            scheduleData = require(`.${SCHEDULE_FILE}`);
            resolve(scheduleData);
          });
        });
    });
  });
}

module.exports = {
  getSchedule,
};

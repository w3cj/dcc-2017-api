const express = require('express');

const schedule = express.Router();
const { getSchedule } = require('../lib/ScheduleManager');

schedule.get('/', (req, res) => {
  getSchedule()
    .then((data) => {
      res.json(data.VenueLocation);
    });
});

module.exports = schedule;

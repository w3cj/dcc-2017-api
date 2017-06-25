const express = require('express');

const schedule = express.Router();
const { getSchedule } = require('../lib/ScheduleManager');

schedule.get('/', (req, res) => {
  getSchedule()
    .then((data) => {
      res.json(data.EventDays);
    });
});

schedule.get('/:day', (req, res, next) => {
  getSchedule()
    .then((data) => {
      const dayIndex = data.EventDays.indexOf(req.params.day);

      if (dayIndex !== -1) {
        res.json(data.Schedule[dayIndex][req.params.day]);
      } else {
        next();
      }
    });
});

module.exports = schedule;

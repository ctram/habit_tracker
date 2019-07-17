import moment from 'moment';

const DAY_IDX_TO_NAME = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday'
}

export default function priorDays(num_days = 6, startingDate = new Date()) {
  let res = [];
  let m = moment(startingDate);

  for (let i = 0; i < num_days; i++) {
    const dayIdx = m.day();
    const dayName = DAY_IDX_TO_NAME[dayIdx];
    const dateNum = m.date();
    const monthNum = m.month() + 1; // months start at index 0, so we add 1 to get "normal" index.

    res.unshift({ dayName, monthNum, dateNum, dayIdx})

    m.subtract(1, 'days');
  }

  return res;
}

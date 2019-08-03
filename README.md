# Habit Tracker
Mobile friendly application for logging and tracking habits from day to day.


<img style="margin-bottom: 30px; border-radius: 3px;" src="https://res.cloudinary.com/dt6ccpxqd/image/upload/v1564790952/habit-tracker-calendar_xwmqpd.png"
/>
<img style="margin-bottom: 30px; border-radius: 3px;" src="https://res.cloudinary.com/dt6ccpxqd/image/upload/v1564790955/habit-tracker-habits-index_jjfg4w.png"
/>
<img style="margin-bottom: 30px; border-radius: 3px; max-width: 300px;" src="https://res.cloudinary.com/dt6ccpxqd/image/upload/v1564790953/habit-tracker-mobile_awrrdg.png"
 style="max-width: 300px"/>

## Live Demo
[http://habit-tracker-1.herokuapp.com](http://habit-tracker-1.herokuapp.com)

## Features
- Mobile friendly.
- Track unlimited number of habits.
- Displays number of days of greatest streak.
- Log and track habits on a calendar, if viewport is wide enough.

## Requirements
- Rails 5.2
- Ruby 2.6
- Postgres
- Node.js
- Yarn.js

## Installation
- Clone this repo.
- Go to local folder.
- Ensure Postgres is running.
- Install gems by running the following in the terminal.
  - `bundle install`
- Install Node packages
  - `yarn install`
- Create the database
  - `rails db:create`
- Run migrations
  - `rails db:migrate`
- Start application
  - `rails server`
- Application is now running at `localhost:3000`.

## Todo
- Different types of habits:
  - Habits that are performed multiple times a day.
  - Habits that need not be performed on consecutive days.
  - Goals for habits.
- Export habit data to CSV.
- Offline mode.

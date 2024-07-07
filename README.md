# SchedU - Another level of timetable personalisation 📆

![logoWithName (1)](https://github.com/alterVega/SchedU/assets/164298842/ecac7372-214d-4c5a-9f8f-1580afc54a0e)

SchedU is a revolutionary Timetable scheduling app which leverages **data analytics** and **machine learning**, with a touch of **designer tools** to grant users 100% autonomy in personalising their schedule in whatever way they want, just like an artist given a blank canvas! Features like the *weekly workload projector* which is derived from past trends, *work-time tracker*, and an *automatic smart re-scheduler* will leverage data tools to give users incredible insights into their pattern of work.



## A quick introductory video 📹

https://youtu.be/6agKeX77MMk



## Core features ⚙️

### Calendar and Agenda
Create Events from the Calendar page for any date, which then can be accessed through weekly Agenda page

<img width="329" alt="Schedule" src="https://github.com/alterVega/SchedU/assets/164298842/a1378298-32ab-4fba-8a89-12bc070c1b39">

<img width="630" alt="Agenda" src="https://github.com/alterVega/SchedU/assets/164298842/427b31be-35be-4185-816b-385ad63919ff">

<img width="626" alt="EventCreation" src="https://github.com/alterVega/SchedU/assets/164298842/9b2e7ac4-0463-4497-a561-b1e4b5423e07">


### Profile page
<img width="328" alt="Profile" src="https://github.com/alterVega/SchedU/assets/164298842/83ab8f79-7048-465c-92aa-2ec85c604620">

### Work-time tracker
Track and record amount of time spent on different categories of tasks, glean statistics such as average time spent 

<img width="327" alt="Time tracker" src="https://github.com/alterVega/SchedU/assets/164298842/da3bfefb-fe0e-4f19-8d3e-47f2ff512c2c">

### Weekly workload projector
Crafted from insights from historical work-time data, receive estimates on projected workload for the week

### Designer tools 
Design and customize your timetable interface in whatever way you look with custom design elements 



## Installation 🔨

1. Clone the repository

   ```bash
   git clone https://github.com/alterVega/SchedU.git
   ```

3. Install dependencies

   ```bash
   cd frontend
   npm install
   npm install --save react-native-calendars
   npm install @react-native-community/datetimepicker --save
   npm install react-native-vector-icons
   npm install react-native-svg
   yarn add react-native-countdown-circle-timer
   ```
   Database:
   ```bash
   npx expo install expo-sqlite
   npx expo install expo-file-system expo-asset
   ```

2. Start the app

   ```bash
    npx expo start
   ```


## Tech stack 🧑‍💻
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Database: MySQL

Frontend: React Native



In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).








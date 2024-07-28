# SchedU - Taking Timetable Personalisation Seriously! 📆

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

### Work tracker
Obtain a countdown timer of your current task, based on the current time. Track and record the amount of time spent on the current task, glean statistics in minutes saved on the current task, and mark Task as complete!

<img width="324" alt="Screenshot 2024-07-28 at 3 52 24 PM" src="https://github.com/user-attachments/assets/23ea0e84-9c82-4998-8643-22733e81a839">

<img width="328" alt="Screenshot 2024-07-28 at 3 54 02 PM" src="https://github.com/user-attachments/assets/c7ebb652-3186-4298-9f40-bf39d8fc02e1">


### Weekly workload projector
Receive an estimated workload value for the current week, based on your scheduled events lying in the same week

<img width="346" alt="Screenshot 2024-07-28 at 4 35 33 PM" src="https://github.com/user-attachments/assets/70c8e6b3-29f3-409f-a407-de7554051dd2">



### Designer tools 
Design and customize your timetable interface in whatever way you look with custom design elements 

![Design](https://github.com/user-attachments/assets/50ea391a-9686-4860-bc4a-0bfaad0187af)

![Calendar customization](https://github.com/user-attachments/assets/605671c5-2c78-4fc8-bb8f-dbf227fe3bed)

![Calendar customization 2](https://github.com/user-attachments/assets/dbdae4ed-bcc2-4cbd-a977-99f1342ca874)




## Installation 🔨

1. Clone the repository

   ```bash
   git clone https://github.com/alterVega/SchedU.git
   ```

2. Go into directory 
   ```bash
   cd frontend
   ```

3. Install dependencies
   ```bash
   npm install
   npm install --save react-native-calendars
   npm install @react-native-community/datetimepicker --save
   npm install react-native-vector-icons
   npm install react-native-svg
   npm install react-native-countdown-circle-timer
   npx expo install @react-native-picker/picker
   npm install react-native-color-picker
   ```
   Database (SQLite Set Up):
   ```bash
   npx expo install expo-sqlite
   npx expo install expo-file-system expo-asset
   ```

4. Start the app

   ```bash
    npm start
   ```
**Note that you may have to close and re-open the project files on your code editor after installing the dependencies if you run into any errors**


## Alternatively, if you have the Expo Go app installed on your tablet/phone

   <img width="208" alt="Screenshot 2024-07-28 at 3 44 06 PM" src="https://github.com/user-attachments/assets/13cd0ab2-ae6c-4464-aca1-b21a4298ed73">



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






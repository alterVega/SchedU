import { StyleSheet, Image, Platform, ImageBackground, TouchableOpacity, Modal, Button} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicon from "react-native-vector-icons/Octicons";
import  Entypo from 'react-native-vector-icons/Entypo';
import React, { useState } from 'react';
import { CountdownCircleTimer, countdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";

export const ProfilePortion = ({ navigation }) => {  
  // db  
  const db = useSQLiteContext();

  //Recieve duration for the current task for the timer
  const durationValue = async function getDuration() {
    const resultDuration = await db.getAllAsync(
      `SELECT ROUND(endTime - startTime) / 60000 AS duration
      FROM Events
      WHERE datetime(startTime / 1000, 'unixepoch') <= datetime('now') AND
      datetime(ROUND(endTime / 1000), 'unixepoch') >= datetime('now');`)
    console.log(resultDuration);
    return resultDuration[0]['duration'];
  }

  // query to calculate total hours for the current week
  async function getProjector() {
    const resultProjector = await db.getAllAsync(
      `SELECT SUM(ROUND((endTime - startTime) / 60000)) AS duration
      FROM Events
      WHERE DATETIME(ROUND(startTime / 1000), 'unixepoch') BETWEEN date('now', 'weekday 0', '-6 days') AND date('now', 'weekday 0', '0 days')
        AND startTime IS NOT NULL;
      `)
    console.log(resultProjector[0]['duration']);
    return resultProjector[0]['duration'];
  }
  
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [isCountdownPlaying, setCountdownPlaying] = useState(false);
  const [projectorValue, setProjectorValue] = useState(0);
  const [trackerValue, setTrackerValue] = useState(0);

  React.useEffect(() => {
    async function getProjector() {
      const resultProjector = await db.getAllAsync(
        `SELECT SUM(ROUND((endTime - startTime) / 60000)) AS duration
        FROM Events
        WHERE DATETIME(ROUND(startTime / 1000), 'unixepoch') BETWEEN date('now', 'weekday 0', '-6 days') AND date('now', 'weekday 0', '0 days')
          AND startTime IS NOT NULL;
        `)
        setProjectorValue(resultProjector[0]['duration']);
      }
      getProjector();
    }, []);

  React.useEffect(() => {
    async function getDuration() {
      const resultDuration = await db.getAllAsync(
        `SELECT ROUND(endTime - startTime) / 60000 AS duration
        FROM Events
        WHERE datetime(startTime / 1000, 'unixepoch') <= datetime('now') AND
        datetime(ROUND(endTime / 1000), 'unixepoch') >= datetime('now');`)
      setTrackerValue(resultDuration[0]['duration']);
    }
    getDuration();
  }, []);


  return (
    <ImageBackground
      source={require("@/assets/images/noticeboardbg.png")}
      style={styles.screen}
    >
      <View style={styles.profile}>
        <FeatherIcon name="user" size={100} />
      </View>
      <ImageBackground
        source={require("@/assets/images/profileBackground.png")}
        style={styles.paper}
      >
        <View style={styles.workTracker}>
          <View>
            <Ionicon name="hourglass" size={60} color="brown" />
          </View>
          <TouchableOpacity style={styles.label} onPress= {() => setModalVisible2(true)}>
            <ThemedText type="subtitle" fontSize>
              Work-time tracker
            </ThemedText>
          </TouchableOpacity>
          <Modal visible={ModalVisible2} animationType='slide' presentationStyle='pageSheet'>
            <View style={styles.projectorPop}>
                <Button
                  title='Begin task'
                  color='midnightblue'
                  onPress={() => setCountdownPlaying(true)}
                 />
              <View style ={styles.countdown}>
              <CountdownCircleTimer
              isPlaying={isCountdownPlaying}
              duration={trackerValue}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              onComplete={() => setCountdownPlaying(false)}>
              {({ remainingTime }) => <Text>{remainingTime}</Text>}
              </CountdownCircleTimer>
              </View>
              <Button
                  title='Finish'
                  color='midnightblue'
                  onPress={() => setCountdownPlaying(false)}
                />
              <Button
                  title='Close'
                  color='midnightblue'
                  onPress={() => setModalVisible2(false)}
                />
            </View>
          </Modal>
        </View>
        <View style={styles.projector}>
          <View>
            <MaterialIcon name="projector" size={60} color="black" />
          </View>
          <TouchableOpacity style={styles.label} onPress= {() => {setModalVisible(true)}}>
            <ThemedText type="subtitle" fontSize>
              Workload projector
            </ThemedText>
          </TouchableOpacity>
          <Modal visible={ModalVisible} animationType='slide' presentationStyle='pageSheet' >
            <View style ={styles.projectorPop}>
              <ThemedText type ='subtitle'>
                Your expected workload for the week is
              </ThemedText>
              <View>
              <Text type ='subtitle' style={styles.projectedhours}>
                {projectorValue} minutes 
              </Text>
              </View>
              <View style={styles.clock}>
                <Entypo name='clock' size={60}/>
              </View>
              <View>
                <Button
                  title='Close'
                  color='midnightblue'
                  onPress={() => setModalVisible(false)}
                />
                </View>
            </View>
          </Modal>
        </View>
        <View style={styles.customization}>
          <View>
            <Octicon name="paintbrush" size={60} color="purple" />
          </View>
          <View style={styles.label}>
            <ThemedText type="subtitle" fontSize>
              Design
            </ThemedText>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: 50,
    marginLeft: 40,
  },
  label: {
    alignSelf: "left",
    fontSize: 50,
    marginTop: 20,
  },
  paper: {
    marginTop: 20,
    flex: 1,
  },
  workTracker: {
    flexDirection: "row",
    marginTop: 60,
    marginLeft: 60,
  },
  clock: {
    marginLeft: 155,
  },
  projector: {
    marginTop: 45,
    marginLeft: 60,
    flexDirection: "row",
  },
  projectorPop: {
    backgroundColor: 'white',
  },
  customization: {
    marginTop: 45,
    marginLeft: 60,
    flexDirection: "row",
  },
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  font: {
    fontWeight: "bold",
  },
  countdown: {
    justifyContent: 'center',
    marginLeft: 95
  },
  projectedhours: {
    fontSize: 50,
    marginLeft: 65
  }
});


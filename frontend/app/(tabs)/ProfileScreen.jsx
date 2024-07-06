import { StyleSheet, Image, Platform, ImageBackground, TouchableOpacity, Modal, Button} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicon from "react-native-vector-icons/Octicons";
import  Entypo from 'react-native-vector-icons/Entypo';
import { useState } from 'react';
import { CountdownCircleTimer, countdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite/next";

//Recieve duration for the current task for the timer
async function getDuration() {
  const result = await db.getAllAsync<Transaction>(
    `SELECT TIMESTAMPDIFF(MINUTE, endTime, startTime) AS duration
    FROM Events
    WHERE CURRENT_TIMESTAMP BETWEEN startTime AND endTime;`)
}

export const ProfilePortion = ({ navigation }) => {
  // db  
  const db = useSQLiteContext();

  // query to calculate total hours for the current week
  async function getProjector() {
    const result = await db.getAllAsync(
      `SELECT SUM(strftime('%s', endTime) - strftime('%s', startTime)) / 60 AS duration
      FROM Events
      WHERE date(startTime) BETWEEN date('now', 'weekday 0', '-6 days') AND date('now', 'weekday 0', '0 days')
        AND startTime IS NOT NULL;
      `)
    console.log(result);
  }
  const projectorDuration = getProjector().duration;

  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [isCountdownPlaying, setCountdownPlaying] = useState(false);
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
              duration={7}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
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
          <TouchableOpacity style={styles.label} onPress= {() => setModalVisible(true)}>
            <ThemedText type="subtitle" fontSize>
              Workload projector
            </ThemedText>
          </TouchableOpacity>
          <View>
          <Text>
            {projectorDuration}
          </Text>
          </View>
          <Modal visible={ModalVisible} animationType='slide' presentationStyle='pageSheet' >
            <View style ={styles.projectorPop}>
              <TouchableOpacity onPress = {() => getProjector()}>
              <ThemedText type ='subtitle'>
                Your expected workload for the week 
              </ThemedText>
              </TouchableOpacity>
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
  }
});

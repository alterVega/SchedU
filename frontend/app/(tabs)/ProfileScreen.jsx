import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Button,
  View,
  Text,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicon from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useSQLiteContext } from "expo-sqlite/next";
import { GlobalStyleContext } from "../globalStyle";
import { useLoadFonts } from "../useFonts";
import Slider from "@react-native-community/slider";
import FontPicker from "../FontPicker";

export const ProfilePortion = ({ navigation }) => {
  const db = useSQLiteContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isCountdownPlaying, setCountdownPlaying] = useState(false);
  const [projectorValue, setProjectorValue] = useState(0);
  const [trackerValue, setTrackerValue] = useState(0);
  const [selectedFont, setSelectedFont] = useState("default");
  const [fontColor, setFontColor] = useState({ r: 0, g: 0, b: 0 });
  const [backgroundColor, setBackgroundColor] = useState({
    r: 255,
    g: 255,
    b: 255,
  });

  const { globalStyle, setGlobalStyle } = useContext(GlobalStyleContext);
  const fontsLoaded = useLoadFonts();

  useEffect(() => {
    async function getProjector() {
      const resultProjector = await db.getAllAsync(
        `SELECT SUM(ROUND((endTime - startTime) / 60000)) AS duration
        FROM Events
        WHERE DATETIME(ROUND(startTime / 1000), 'unixepoch') BETWEEN date('now', 'weekday 0', '-6 days') AND date('now', 'weekday 0', '0 days')
          AND startTime IS NOT NULL;`
      );
      setProjectorValue(resultProjector[0]["duration"]);
    }
    getProjector();
  }, []);

  useEffect(() => {
    async function getDuration() {
      const resultDuration = await db.getAllAsync(
        `SELECT ROUND(endTime / 1000 - unixepoch()) AS duration
        FROM Events
        WHERE datetime(startTime / 1000, 'unixepoch') <= datetime('now') AND
        datetime(ROUND(endTime / 1000), 'unixepoch') >= datetime('now');`
      );
      setTrackerValue(resultDuration[0]["duration"]);
    }
    getDuration();
  }, []);

  const applyGlobalStyle = () => {
    setGlobalStyle({
      color: `rgb(${fontColor.r}, ${fontColor.g}, ${fontColor.b})`,
      fontFamily: selectedFont,
      backgroundColor: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`,
    });
    setModalVisible3(false);
  };

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

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
        <View style={styles.verticalSpacing}>
          <View style={styles.workTracker}>
            <View>
              <Ionicon name="hourglass" size={60} color="brown" />
            </View>
            <TouchableOpacity
              style={styles.label}
              onPress={() => setModalVisible2(true)}
            >
              <Text style={styles.subtitle}>Work-time tracker</Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible2}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <View style={styles.modalContent}>
                <Button
                  title="Begin task"
                  color="midnightblue"
                  onPress={() => setCountdownPlaying(true)}
                />
                <View style={styles.countdown}>
                  <CountdownCircleTimer
                    isPlaying={isCountdownPlaying}
                    duration={trackerValue}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    onComplete={() => setCountdownPlaying(false)}
                  >
                    {({ remainingTime }) => <Text>{remainingTime}</Text>}
                  </CountdownCircleTimer>
                </View>
                <Button
                  title="Finish"
                  color="midnightblue"
                  onPress={() => setCountdownPlaying(false)}
                />
                <Button
                  title="Close"
                  color="midnightblue"
                  onPress={() => setModalVisible2(false)}
                />
              </View>
            </Modal>
          </View>

          <View style={styles.projector}>
            <View>
              <MaterialIcon name="projector" size={60} color="black" />
            </View>
            <TouchableOpacity
              style={styles.label}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.subtitle}>Workload projector</Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <View style={styles.modalContent}>
                <Text style={styles.subtitle}>
                  Your expected workload for the week is
                </Text>
                <View>
                  <Text type="subtitle" style={styles.projectedhours}>
                    {projectorValue} minutes
                  </Text>
                </View>
                <View style={styles.clock}>
                  <Entypo name="clock" size={60} />
                </View>
                <View>
                  <Button
                    title="Close"
                    color="midnightblue"
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
            <TouchableOpacity
              style={styles.label}
              onPress={() => {
                setModalVisible3(true);
              }}
            >
              <Text style={styles.subtitle}>Design</Text>
            </TouchableOpacity>
            <Modal
              visible={modalVisible3}
              animationType="slide"
              presentationStyle="pageSheet"
            >
              <View style={styles.modalContent}>
                <Text style={styles.subtitle}>Choose your design</Text>
                <FontPicker
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                  fontColor={fontColor}
                />
                <View>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: `rgb(${fontColor.r}, ${fontColor.g}, ${fontColor.b})`,
                      },
                    ]}
                  >
                    Select Font Color:
                  </Text>
                  <View style={styles.sliderContainer}>
                    <Text>R</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={fontColor.r}
                      onValueChange={(value) =>
                        setFontColor({ ...fontColor, r: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{fontColor.r}</Text>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Text>G</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={fontColor.g}
                      onValueChange={(value) =>
                        setFontColor({ ...fontColor, g: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{fontColor.g}</Text>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Text>B</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={fontColor.b}
                      onValueChange={(value) =>
                        setFontColor({ ...fontColor, b: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{fontColor.b}</Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`,
                      },
                    ]}
                  >
                    Select Background Color:
                  </Text>
                  <View style={styles.sliderContainer}>
                    <Text>R</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={backgroundColor.r}
                      onValueChange={(value) =>
                        setBackgroundColor({ ...backgroundColor, r: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{backgroundColor.r}</Text>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Text>G</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={backgroundColor.g}
                      onValueChange={(value) =>
                        setBackgroundColor({ ...backgroundColor, g: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{backgroundColor.g}</Text>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Text>B</Text>
                    <Slider
                      minimumValue={0}
                      maximumValue={255}
                      step={1}
                      value={backgroundColor.b}
                      onValueChange={(value) =>
                        setBackgroundColor({ ...backgroundColor, b: value })
                      }
                      style={styles.slider}
                    />
                    <Text>{backgroundColor.b}</Text>
                  </View>
                </View>
                <Button
                  title="Apply"
                  color="midnightblue"
                  onPress={applyGlobalStyle}
                />
                <Button
                  title="Close"
                  color="midnightblue"
                  onPress={() => setModalVisible3(false)}
                />
              </View>
            </Modal>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profile: {
    marginTop: 50,
    marginLeft: 40,
  },
  label: {
    fontSize: 20,
    marginTop: 20,
  },
  paper: {
    marginTop: 20,
    flex: 1,
  },
  workTracker: {
    flexDirection: "row",
    alignSelf: "center",
  },
  clock: {
    justifyContent: "center",
    alignItems: "center",
  },
  projector: {
    marginTop: 45,
    alignSelf: "center",
    flexDirection: "row",
  },
  projectorPop: {
    backgroundColor: "white",
  },
  customization: {
    marginTop: 45,
    alignSelf: "center",
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
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
  },
  projectedhours: {
    fontSize: 50,
    marginLeft: 65,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  verticalSpacing: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
});

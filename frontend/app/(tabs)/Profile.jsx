import { StyleSheet, Image, Platform, ImageBackground } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Octicon from "react-native-vector-icons/Octicons";

export default function Profile() {
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
          <View style={styles.label}>
            <ThemedText type="subtitle" fontSize>
              Weekly hours
            </ThemedText>
          </View>
        </View>
        <View style={styles.projector}>
          <View>
            <MaterialIcon name="projector" size={60} color="black" />
          </View>
          <View style={styles.label}>
            <ThemedText type="subtitle" fontSize>
              Workload projector
            </ThemedText>
          </View>
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
  projector: {
    marginTop: 45,
    marginLeft: 60,
    flexDirection: "row",
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
});

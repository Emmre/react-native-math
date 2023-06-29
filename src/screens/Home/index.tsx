import React, { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Box, Center, Text, VStack } from "native-base";
import { useBearStore } from "./../../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const { setSettings } = useBearStore();

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      const settingsString = await AsyncStorage.getItem("settings");
      if (settingsString !== null) {
        const settings = JSON.parse(settingsString);
        setSettings(settings);
      } else {
        console.log("No settings found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        style={styles.container}
        bg={{
          linearGradient: {
            colors: ["lightBlue.300", "violet.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Text fontSize="2xl" bold mb="40px" color="#FFF5EE">
          Welcome to the game!
        </Text>
        <VStack space={4} alignItems="center">
          <Center
            w="64"
            h="20"
            bg="primary.50"
            rounded="md"
            shadow={3}
            onTouchStart={() => navigation.navigate("Play")}
          >
            <Text color="#15803d" fontSize="lg">
              Play
            </Text>
          </Center>
          <Center
            w="64"
            h="20"
            bg="primary.100"
            rounded="md"
            shadow={3}
            onTouchStart={() => navigation.navigate("About")}
          >
            <Text color="#16a34a" fontSize="lg">
              About
            </Text>
          </Center>
          <Center
            w="64"
            h="20"
            bg="primary.200"
            rounded="md"
            shadow={3}
            onTouchStart={() => navigation.navigate("Settings")}
          >
            <Text color="#15803d" fontSize="lg">
              Settings
            </Text>
          </Center>
        </VStack>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    color: "#fff",
  },
});

export default HomeScreen;

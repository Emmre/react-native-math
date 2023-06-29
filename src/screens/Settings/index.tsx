import React, { FC, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ArrowBackIcon,
  Button,
  Center,
  CheckIcon,
  Container,
  Flex,
  HStack,
  Switch,
  Text,
} from "native-base";
import { useBearStore } from "./../../store";
import { saveSettings } from "../../utils";

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: FC<SettingsScreenProps> = ({ navigation }) => {
  const { settings, setSettings } = useBearStore();
  const [newSettings, setNewSettings] = React.useState({
    sound: settings.sound,
    vibration: settings.vibration,
  });

  useEffect(() => {
    getSettings();
    // AsyncStorage.clear();
  }, []);

  const getSettings = async () => {
    try {
      const settingsString = await AsyncStorage.getItem("settings");
      if (settingsString !== null) {
        const settings = JSON.parse(settingsString);
        setSettings(settings);
        setNewSettings({
          sound: settings.sound,
          vibration: settings.vibration,
        });
      } else {
        console.log("No settings found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = async () => {
    await saveSettings(newSettings);
    await getSettings();
    navigation.goBack();
  };

  return (
    <Center py={4} mt={8}>
      <Container
        w="100%"
        h="100%"
        p={4}
        borderRadius={16}
        bg={{
          linearGradient: {
            colors: ["#ff7f00", "#ffcc00"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Flex flex={1} justifyContent="center" w="100%">
          <HStack alignItems="center" justifyContent="space-between" mb={8}>
            <Text fontSize="xl" bold color="secondary.50">
              SOUND
            </Text>
            <Switch
              offTrackColor="gray.50"
              onTrackColor="success.400"
              onThumbColor="success.700"
              offThumbColor="gray.400"
              size="lg"
              defaultIsChecked={settings.sound}
              isChecked={newSettings.sound}
              onValueChange={(value) =>
                setNewSettings({
                  ...newSettings,
                  sound: value,
                })
              }
            />
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="xl" bold color="secondary.50">
              VIBRATION
            </Text>
            <Switch
              offTrackColor="gray.50"
              onTrackColor="success.400"
              onThumbColor="success.700"
              offThumbColor="gray.400"
              size="lg"
              defaultIsChecked={settings.vibration}
              isChecked={newSettings.vibration}
              onValueChange={(value) =>
                setNewSettings({
                  ...newSettings,
                  vibration: value,
                })
              }
            />
          </HStack>
        </Flex>
        <Button.Group width="100%" size="lg">
          <Button
            size="md"
            flex={1}
            borderColor="primary.800"
            borderWidth={2}
            borderRadius={6}
            backgroundColor="primary.800"
            leftIcon={<ArrowBackIcon color="#fff" />}
            onPress={() => navigation.goBack()}
          >
            <Text fontSize={16} shadow={3} color="secondary.50">
              Back
            </Text>
          </Button>
          <Button
            size="md"
            flex={1}
            borderColor="success.600"
            borderWidth={2}
            borderRadius={6}
            backgroundColor="success.600"
            onPress={() => onSave()}
            rightIcon={<CheckIcon color="#fff" />}
          >
            <Text fontSize={16} shadow={3} color="secondary.50">
              Save
            </Text>
          </Button>
        </Button.Group>
      </Container>
    </Center>
  );
};

export default SettingsScreen;

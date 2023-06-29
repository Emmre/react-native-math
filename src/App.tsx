import * as React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StageScreen,
  HomeScreen,
  PlayScreen,
  AboutScreen,
  SettingsScreen,
  GameScreen,
} from "./screens";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs();
  LogBox.ignoreAllLogs(true);
  console.warn = () => null;

  const config = {
    dependencies: {
      "linear-gradient": require("react-native-linear-gradient").default,
    },
  };

  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Play" component={PlayScreen} />
          <Stack.Screen name="Stage" component={StageScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;

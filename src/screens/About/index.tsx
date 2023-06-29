import React, { FC } from "react";
import { Button, Text, View } from "react-native";

interface AboutScreenProps {
  navigation: any;
}

const AboutScreen: FC<AboutScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate("Stage")}
      />
    </View>
  );
};

export default AboutScreen;

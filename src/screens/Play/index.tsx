import React, { FC } from "react";
import { Text, Center, HStack, VStack, Container, Box } from "native-base";

interface PlayScreenProps {
  navigation: any;
}

const PlayScreen: FC<PlayScreenProps> = ({ navigation }) => {
  const GAME = [
    ["SUMMARY", "MINUS"],
    ["MULTIPLY", "DIVIDE"],
  ];

  const COLOR = ["danger.400", "tertiary.400", "warning.400", "info.400"];

  return (
    <Center>
      <Container w="100%" h="100%">
        <VStack flex={1} justifyContent="center" alignItems="center" space={4}>
          <Text fontSize="4xl" bold color="orange.400">
            Choose a game!
          </Text>
          {GAME.map((row, rowIndex) => (
            <HStack key={rowIndex} space={4}>
              {row.map((item, colIndex) => (
                <Box
                  flex={1}
                  p={8}
                  key={colIndex}
                  bg={COLOR[rowIndex * 2 + colIndex]}
                  rounded="md"
                  shadow={3}
                  onTouchStart={() =>
                    navigation.navigate("Stage", {
                      game: item,
                    })
                  }
                >
                  <Text
                    textAlign="center"
                    color="#fff"
                    fontWeight="bold"
                    shadow={4}
                  >
                    {item}
                  </Text>
                </Box>
              ))}
            </HStack>
          ))}
        </VStack>
      </Container>
    </Center>
  );
};

export default PlayScreen;

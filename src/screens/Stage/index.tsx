import React, { FC } from "react";
import { Box, Center, Container, HStack, Text, VStack } from "native-base";

interface StageScreenProps {
  navigation: any;
  route: any;
}

const StageScreen: FC<StageScreenProps> = ({ route, navigation }) => {
  const { game } = route.params;
  const difficultLevel = [
    ["EASY", "MEDIUM"],
    ["HARD", "EXTREME"],
  ];
  const COLOR = ["#42C4AE", "#FFC107", "#F44336", "#9C27B0"];
  return (
    <>
      <Center>
        <Container w="100%" h="100%">
          <VStack
            flex={1}
            justifyContent="center"
            alignItems="center"
            space={4}
          >
            <Text fontSize="3xl" bold color="orange.400">
              Choose a difficulty!
            </Text>
            {difficultLevel.map((row, rowIndex) => (
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
                      navigation.navigate("Game", {
                        game: game,
                        difficulty: difficultLevel[rowIndex][colIndex],
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
    </>
  );
};

export default StageScreen;

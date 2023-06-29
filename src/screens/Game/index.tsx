import React, { useState, useEffect, FC } from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import { Center, Container, Text, Modal, Button } from "native-base";

interface GameScreen {
  route: any;
  navigation?: any;
}

const GameScreen: FC<GameScreen> = ({ route }) => {
  const { game, difficulty } = route.params;
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    generateQuestion(game, difficulty);
  }, [difficulty, game]);

  const onClose = () => {
    setIsGameOver(false);
    generateQuestion(game, difficulty);
    setScore(0);
  };

  const generateQuestion = (game: string, difficulty: string) => {
    let min = 0;
    let max = 0;

    if (difficulty === "EASY") {
      min = 1;
      max = 500;
    } else if (difficulty === "MEDIUM") {
      min = 500;
      max = 1000;
    } else if (difficulty === "HARD") {
      min = 1000;
      max = 9999;
    } else if (difficulty === "EXTREME") {
      min = 9999;
      max = 999999;
    }

    let question = "";
    let correctAnswer: number | null = null;
    let num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    let num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    if (game === "SUMMARY") {
      correctAnswer = num1 + num2;
      question = `${num1} + ${num2} = ?`;
    } else if (game === "MINUS") {
      correctAnswer = num1 - num2;
      question = `${num1} - ${num2} = ?`;
    } else if (game === "MULTIPLY") {
      correctAnswer = num1 * num2;
      question = `${num1} * ${num2} = ?`;
    } else if (game === "DIVIDE") {
      let quotient: number;
      do {
        quotient = num1 / num2;
        num2 = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (quotient % 1 !== 0);

      correctAnswer = quotient;
      question = `${num1} / ${num2} = ?`;
      if (quotient === 0) {
        question = `${num1} / ${num2} ≈ ?`;
      }
    }

    const answer1 = correctAnswer;
    const deviation = 5;
    const randomValues: number[] = [];

    while (randomValues.length < 3) {
      let randomValue: number;
      do {
        randomValue =
          Math.floor(Math.random() * (2 * deviation + 1)) +
          (correctAnswer! - deviation);
      } while (
        randomValue <= 0 ||
        randomValue === correctAnswer ||
        randomValues.includes(randomValue)
      );

      randomValues.push(randomValue);
    }

    const newAnswer = [answer1, ...randomValues];
    newAnswer.sort(() => Math.random() - 0.5);

    const correctAnswerIndex = newAnswer.indexOf(answer1);

    setQuestion(question);
    setAnswers(newAnswer);
    setCorrectAnswerIndex(correctAnswerIndex);
    setIsAnswered(false);
  };

  const handleAnswerSelection = (answerIndex: number) => {
    if (isAnswered) {
      return;
    }

    setSelectedAnswerIndex(answerIndex);
    setIsAnswered(true);

    if (answerIndex === correctAnswerIndex) {
      setScore(score + 10);
      setTimeout(() => {
        if (!isGameOver) {
          generateQuestion(game, difficulty);
        }
      }, 0);
    } else {
      Vibration.vibrate();
      setTimeout(() => {
        setIsGameOver(true);
      }, 500);
    }
  };

  const getBackgroundColor = (index: number) => {
    if (!isAnswered) {
      return "gray";
    }

    if (correctAnswerIndex === index) {
      return "green";
    } else if (selectedAnswerIndex === index) {
      return "red";
    }
    return "gray";
  };

  return (
    <>
      <Center bg="muted.300" textAlign="right">
        <Container>
          <Text bold fontSize="xl" ml="auto" mt={8}>
            Score: {score}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text bold fontSize="2xl" mb={24}>
              {question}
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              <View style={{ flex: 1, marginRight: 16 }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: getBackgroundColor(0),
                  }}
                  onPress={() => handleAnswerSelection(0)}
                >
                  <Text bold fontSize="xl">
                    {answers[0]}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: getBackgroundColor(1),
                  }}
                  onPress={() => handleAnswerSelection(1)}
                >
                  <Text bold fontSize="xl">
                    {answers[1]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginRight: 16 }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: getBackgroundColor(2),
                  }}
                  onPress={() => handleAnswerSelection(2)}
                >
                  <Text bold fontSize="xl">
                    {answers[2]}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 50,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    borderColor: "gray",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: getBackgroundColor(3),
                  }}
                  onPress={() => handleAnswerSelection(3)}
                >
                  <Text bold fontSize="xl">
                    {answers[3]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Container>
      </Center>
      <Modal
        isOpen={isGameOver}
        avoidKeyboard
        justifyContent="center"
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>You've finished the game!</Modal.Header>
          <Modal.Body>
            <Text fontSize="md" mb="4">
              Your score is: {score}
            </Text>
            <Text fontSize="md">Do you want to play again?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button flex="1" onPress={() => onClose()}>
              Start Again
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default GameScreen;

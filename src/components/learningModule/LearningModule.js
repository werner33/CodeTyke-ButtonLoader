import React from "react";
import ProgressBar from "../progressBar/ProgressBar";
import SelectionBox from "../selectionBox/SelectionBox";
import Button from "../button/Button";
import Intro from "../intro/Intro";

import "./Styles.scss";

const LearningModule = ({ setGameStatus, gameStatus }) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);

  let currentQuestion = quizData.questionArr
    ? quizData.questionArr[currentQuestionId]
    : {};

  React.useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = () => {
    fetch("http://localhost:8080/problems")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuizData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    setLoading(true);

    if (currentQuestionId < quizData.totalQuestions - 1) {
      setTimeout(function () {
        setCurrentQuestionId(currentQuestionId + 1);
        setLoading(false);
      }, 700);
    } else if (!isComplete) {
      setIsComplete(true);
    } else {
      setCurrentQuestionId(0);
      setIsComplete(false);
      setGameStatus("new");
    }
  };
  let possibleAnswers = [];
  if (currentQuestion.possibleAnswers) {
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />;
    });
  }

  return (
    <div className="learningModule">
      {currentQuestion.title && !isComplete && (
        <>
          <ProgressBar
            total={quizData.totalQuestions + 1}
            current={currentQuestion.id + 1}
          />
          <div className="learningModule__header">
            <div className="learningModule__title">{currentQuestion.title}</div>
            <div className="learningModule__subHeader">
              {currentQuestion.additionalInfo}
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">{possibleAnswers}</div>
            <div className="learningModule__submitButtonContainer">
              <Button
                label="Submit"
                leftIcon="👍"
                rightIcon={loading}
                inactive={loading ? true : false}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </>
      )}
      {isComplete && (
        <Intro
          message="Congratulations. You've completed this level!"
          buttonLabel="Play again"
          buttonClick={handleSubmit}
        />
      )}
    </div>
  );
};

export default LearningModule;

import { Box, Button, Grid } from "@mui/material";
import GridOptions from "../components/GridOptions";
import Question from "../components/Question";
import { jsQuestions } from "../constants/Questions";
import React, { useState } from "react";
import { stat } from "../constants/Status";
import FinalSubmitButton from "../components/FinalSubmitButton";
import Checkbox from "@mui/material/Checkbox";
import NumberNav from "../components/NumberNav";
import { col, row } from "../constants/FlexStyles";

const Quiz = (props: { name: string; lang: string }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number>(-1);
  const [answers, setAnswer] = useState<any>([{}]);
  const [matchData, setMatchData] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [currentStatus, setCurrentStatus] = useState<any[]>(stat);
  const [checked, setChecked] = React.useState([true, false, false, false]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let val = checked;
    val[i] = event.target.checked;
    setChecked([...val]);
  };

  const handleQChange = (curr: number, type: number) => {
    if (type === +1 && currentIndex !== 4) {
      setCurrentIndex(curr + 1);
    } else if (type === -1 && currentIndex !== 0) {
      setCurrentIndex(curr - 1);
    }
    setCurrentAnswerIndex(-1);
  };

  const handleClickedAnswer = (index: number) => {
    setCurrentAnswerIndex(index);
  };

  const handleFillBlanks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    let index = jsQuestions[2].answerOptions.findIndex(
      (x) => x.answerText === e.currentTarget.value
    );
    if (index === -1) {
      setCurrentAnswerIndex(1);
    } else {
      setCurrentAnswerIndex(index);
    }
  };

  const updateCircle = (curr: number) => {
    const update = currentStatus;
    let index = currentStatus.findIndex((x) => x.qi === curr);

    update[index].status = true;
    setCurrentStatus(update);
  };

  const handleSaveAnswer = (curr: number, ansIndex: number) => {
    if (ansIndex === -1 && curr < 3) alert("Select an Answer");
    else {
      var checkedAnswers: any[] = [];
      if (curr === 3) {
        const indexes = checked.flatMap((x, i) => (x ? i : []));
        checkedAnswers = jsQuestions[curr].answerOptions.filter((x, i) => {
          if (i === indexes[i]) return x;
        });
      }

      let currAns = {
        qi: curr,
        q: jsQuestions[curr].questionText,
        a: jsQuestions[curr].answerOptions.filter((x) => x.isCorrect),
        ca:
          curr !== 3
            ? jsQuestions[curr].answerOptions.filter((_, i) => i === ansIndex)
            : checkedAnswers,
      };

      if (answers !== [{}]) {
        let prevAns = answers;
        let ind = prevAns.findIndex((x: { qi: number }) => x.qi === curr);
        console.log(prevAns);

        // if current Q doesnt exist
        if (ind === -1) {
          prevAns.push(currAns);
          setAnswer(prevAns);
        } else {
          prevAns[ind] = currAns;
          setAnswer(prevAns);
        }
      } else {
        let thisOnlyRunsOnce = [currAns];
        setAnswer(thisOnlyRunsOnce);
      }
      if (currentIndex !== 4) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          ...row,
          height: "10vh",
          width: "100vw",
          justifyContent: "center",
        }}
      >
        {currentStatus.map((x, i) => (
          <NumberNav
            key={i}
            qNumber={x.qi + 1}
            setCurrentIndex={setCurrentIndex}
            status={x.status}
            currIndex={currentIndex}
            mapIndex={i}
          />
        ))}
      </Box>
      <Box
        sx={{
          ...row,
          height: "10vh",
          width: "100vw",
          justifyContent: "center",
        }}
      >
      
      </Box>
      <Box
        sx={{
          ...row,
          justifyContent: "space-evenly",
          width: "100vw",
          height: "70vh",
          backgroundColor: "#E5E5E5",
        }}
      >
        <Button
          role="prev-q"
          variant="text"
          onClick={() => handleQChange(currentIndex, -1)}
          disabled={currentIndex === 0}
        >
          ◀️
        </Button>
        <Box
          sx={{
            backgroundColor: "white",
            width: "56vw",
            my: 3,
            p: 1,
            borderRadius: 2,
          }}
        >
          <>
            <Question
              q={jsQuestions[currentIndex].questionText}
              index={currentIndex}
            />
            {(currentIndex <= 1 || currentIndex === 4) && (
              <Grid
                container
                spacing={2}
                rowSpacing={4}
                columnSpacing={3}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                {jsQuestions[currentIndex].answerOptions.map((x, i: number) => (
                  <GridOptions
                    ans={
                      answers[currentIndex + 1] === undefined
                        ? {}
                        : answers[currentIndex + 1].ca[0]
                    }
                    key={i}
                    options={x.answerText}
                    ansIndex={i}
                    clickedAns={(ansI: number) => handleClickedAnswer(ansI)}
                    currIndex={currentIndex}
                    mapIndex={i}
                    setMatchData={setMatchData}
                  />
                ))}
              </Grid>
            )}
            {currentIndex === 2 && (
              <Box>
                <input
                  placeholder="enter ans"
                  type="text"
                  onChange={handleFillBlanks}
                  value={inputValue}
                />
                declarations are immutable (var/let/const)
              </Box>
            )}
            {currentIndex === 3 && (
              <Box
                sx={{
                  ...col,
                  justifyContent: "center",
                }}
              >
                {jsQuestions[currentIndex].answerOptions.map((x, i: number) => (
                  <Box key={i}>
                    {x.answerText}
                    <Checkbox
                      data-testid={`checkbox-${i}`}
                      checked={checked[i]}
                      onChange={(e) => handleCheckboxChange(e, i)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            <Box
              sx={{
                ...row,
                height: "10vh",
                width: "100%",
                justifyContent: "center",
                mt: "2rem",
              }}
            >
              <Button
                size="large"
                role={"save-button"}
                sx={{ color: "green", border: "1px solid green" }}
                onClick={() => {
                  handleSaveAnswer(currentIndex, currentAnswerIndex);
                  updateCircle(currentIndex);
                }}
              >
                Save
              </Button>
            </Box>
          </>
        </Box>
        <Button
          role="next-q"
          variant="text"
          onClick={() => handleQChange(currentIndex, +1)}
          disabled={currentIndex === 4}
        >
          ▶️
        </Button>
      </Box>
      <FinalSubmitButton data={answers} matchData={matchData} />
    </>
  );
};

export default Quiz;

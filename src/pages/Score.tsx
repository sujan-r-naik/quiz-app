import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useLocation } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

type LocationStateProps = {
  trues: number;
  ans: any[];
};

const Score = () => {
  const location = useLocation();
  const state = location?.state as LocationStateProps;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "49vw",
          overflowY: "scroll",
          p: 1,
        }}
      >
        {state.ans.map((x: any, i: number) => (
          <Box
            key={i}
            sx={{
              width: "42vw",
              my: 3,
              backgroundColor:
                x.a[0].isCorrect === x.ca[0].isCorrect ? "#d6ffde" : "#ffd6d6",
              borderRadius: 1,
              border: "solid 1px #777",
              p: 1,
            }}
          >
            <Typography
              role={`Display-Question-${i}`}
              sx={{ fontSize: "1.4rem", fontWeight: 600 }}
            >
              {x.q}
            </Typography>
            <Typography role={`Display-Correct-Answer-${i}`}>
              Correct Answer:{" "}
              {i === 4 ? JSON.stringify(x.a[0].answerText) : x.a[0].answerText}
            </Typography>
            <Typography role={`Display-Chosen-Answer-${i}`}>
              Your Answer:
              {i === 4
                ? JSON.stringify(x.ca[0].answerText)
                : x.ca[0].answerText}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          height: "100%",
          width: "49vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 7,
        }}
      >
        <Pie
          role="score-piechart"
          data={{
            labels: ["Correct", "Wrong"],
            datasets: [
              {
                label: "Quiz Answers",
                data: [state.trues, 5 - state.trues],
                backgroundColor: ["#d6ffde", "#ffd6d6"],
                borderColor: ["green", "red"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </Box>
    </Box>
  );
};

export default Score;

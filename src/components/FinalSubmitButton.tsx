import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { matchq } from "../constants/Questions";

const FinalSubmitButton = (props: { data: any[]; matchData: any }) => {
  const navigate = useNavigate();

  const handleSub = () => {
    if (props.data.length !== 0) {
      let ans = props.data.filter((x) => Object.keys(x).length !== 0);

      var trues = 0;
      for (let i = 0; i < ans.length; i++) {
        if (ans[i].a[0] === ans[i].ca[0]) {
          trues++;
        }
      }

      if (
        Object.entries(props.matchData).sort().toString() ===
        Object.entries(matchq).sort().toString()
      )
        trues++;

      let len = `${trues}`;
      ans[4] = {
        qi: 4,
        q: "Match the Following",
        a: [
          {
            answerText: matchq,
            isCorrect: true,
          },
        ],
        ca: [
          {
            answerText: props.matchData,
            isCorrect:
              Object.entries(props.matchData).sort().toString() ===
              Object.entries(matchq).sort().toString(),
          },
        ],
      };
      console.log(ans);
      navigate("/score", {
        state: {
          trues: trues,
          ans: ans,
        },
      });
    }
  };

  return (
    <Box
      role="fsubHolder"
      sx={{
        height: "10vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button role="fsub" sx={{ alignSelf: "center" }} onClick={handleSub}>
        Final Submit
      </Button>
    </Box>
  );
};

export default FinalSubmitButton;

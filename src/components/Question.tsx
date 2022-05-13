import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { col, row } from "../constants/FlexStyles";

interface IQuestion {
  q: string;
  index: number;
}

const fixQuestion = (str: string) => {
  const newString = str.replace(
    "Match the following JavaScript function with their description: ",
    ""
  );
  const words = newString.split(" | ");
  const colA = words.filter((x, i) => {
    if (i % 2 === 0) return x;
  });
  const colB = words.filter((x, i) => {
    if (i % 2 !== 0) return x;
  });
  return [colA, colB];
};

const Question = (props: IQuestion) => {
  return (
    <>
      {props.index === 4 ? (
        <>
          <p style={{ textAlign: "center", marginBottom: "7px" }}>
            Match the Following (eg: 1: a, 2: b)
          </p>
          <Box sx={{ width: "100%", mb: "2rem", ...row }}>
            <Box sx={{ ...col, width: "40%" }}>
              {fixQuestion(props.q)[0].map((x, i) => (
                <Typography role={"match-qa"} key={i} sx={{ fontSize: "0.8rem" }}>
                  {x}
                </Typography>
              ))}
            </Box>
            <Box sx={{ ...col, width: "50%" }}>
              {fixQuestion(props.q)[1].map((x, i) => (
                <Typography role={"match-qb"} key={i} sx={{ fontSize: "0.8rem" }}>
                  {x}
                </Typography>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", mb: "2rem" }}>
          <Typography role={"normal-q"} sx={{ fontSize: "1rem" }}>{props.q}</Typography>
        </Box>
      )}
    </>
  );
};

export default Question;

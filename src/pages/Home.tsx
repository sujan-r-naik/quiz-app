import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface IHome {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  lang: string;
}

const Home = (props: IHome) => {
  const navigate = useNavigate();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setName(e.currentTarget.value);
  const handleLang = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setLang(e.target.value);

  const handleSubmit = () => {
    if (props.name !== "" && props.lang !== "") {
      navigate("/quiz");
    } else {
      alert("Fill name ");
    }
  };

  useEffect(() => {
    if (Object.keys(localStorage).length !== 0) {
      localStorage.clear();
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#E5E5E5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30vw",
            backgroundColor: "LightGray",
            borderRadius: 3,
            p: "1rem",
            color: "#000",
          }}
        >
          <Typography>Enter Your Details</Typography>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            {[
              <TextField
                inputProps={{ "data-testid": "name-inp" }}
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={handleName}
                value={props.name}
              />,
              
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>,
            ].map((x, i) => (
              <Grid key={i} item xs={6}>
                <Box sx={{ p: 1 }}>{x}</Box>
              </Grid>
            ))}
          </Grid>
          <Button role="sub-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;

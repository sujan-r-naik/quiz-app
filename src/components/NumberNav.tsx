import Button from "@mui/material/Button";

const NumberNav = (props: {
  currIndex: number;
  mapIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  qNumber: number;
  status: boolean;
}) => {
  return (
    <Button
      role="number-nav"
      sx={{
        backgroundColor: props.status
          ? "lightgreen"
          : props.currIndex === props.mapIndex
          ? "#b8d2fc"
          : "#eee",
        mx: 3,
      }}
      onClick={() => props.setCurrentIndex(props.mapIndex)}
    >
      {props.qNumber}
    </Button>
  );
};

export default NumberNav;

import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GridOptions from "../components/GridOptions";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

test("Snapshot of NumberNav component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <GridOptions
        ans={{}}
        options={"A"}
        ansIndex={0}
        clickedAns={() => {}}
        currIndex={1}
        mapIndex={1}
        setMatchData={() => {}}
      />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Quiz,", () => {
  test("does the sub components of gridOptions work at index !=4", () => {
    render(
      <BrowserRouter>
        <GridOptions
          ans={{}}
          options={"A"}
          ansIndex={0}
          clickedAns={() => {}}
          currIndex={0}
          mapIndex={1}
          setMatchData={() => {}}
        />
      </BrowserRouter>
    );

    let a = screen.getByRole("gridOpt-1");
    let b = screen.getByRole("optopt");
    let c = screen.getByRole("optBtn");
    expect(a).toBeInTheDocument();
    expect(b).toBeInTheDocument();
    expect(c).toBeInTheDocument();
  });

  test("does the sub components of gridOptions work at index ===4", () => {
    render(
      <BrowserRouter>
        <GridOptions
          ans={{}}
          options={"A"}
          ansIndex={0}
          clickedAns={() => {}}
          currIndex={4}
          mapIndex={3}
          setMatchData={() => {}}
        />
      </BrowserRouter>
    );

    let a = screen.getByRole("gridOpt4");
    let matchinp = screen.getByTestId("match-inp") as HTMLInputElement;
    expect(a).toBeInTheDocument();
    expect(matchinp).toBeInTheDocument();

    userEvent.type(matchinp, "K");
    expect(screen.getByRole("textbox")).toHaveValue("Hello,\nWorld!");
  });
});

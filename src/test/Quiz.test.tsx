import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Quiz from "../pages/Quiz";

test("Snapshot of Quiz component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <Quiz lang={"English"} name={"XYZ"} />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Quiz,", () => {
  test("are the next and previous buttons present", () => {
    render(
      <BrowserRouter>
        < Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let btnPrev = screen.getByRole("prev-q");
    expect(btnPrev).toBeInTheDocument();

    let btnNext = screen.getByRole("next-q");
    expect(btnNext).toBeInTheDocument();
  });

  test("is the save button present", () => {
    render(
      <BrowserRouter>
        <Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let btnSave = screen.getByRole("save-button");
    expect(btnSave).toBeInTheDocument();
  });
});

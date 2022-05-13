import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Question from "../components/Question";
import renderer from "react-test-renderer";

test("Snapshot of NumberNav component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <Question q={"Question"} index={4} />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Quiz,", () => {
  test("does the sub components of question work", () => {
    render(
      <BrowserRouter>
        <Question q={"Question"} index={4} />
      </BrowserRouter>
    );

    let matchqa = screen.getByRole("match-qa");
    expect(matchqa).toBeInTheDocument();
  });
});

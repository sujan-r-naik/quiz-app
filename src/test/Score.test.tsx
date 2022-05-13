import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Score from "../pages/Score";
import renderer from "react-test-renderer";

let answer = {
  qi: 1,
  q: "console.log() is used to read input from the user",
  a: [
    {
      answerText: "False",
      isCorrect: true,
    },
  ],
  ca: [
    {
      answerText: "False",
      isCorrect: true,
    },
  ],
};

const mockr = {
  pathname: "/score",
  hash: "",
  search: "",
  key: "",
  state: {
    trues: 3,
    ans: [answer, answer],
  },
};

test("Snapshot of Score component", () => {
  const comp = renderer.create(
    <MemoryRouter initialEntries={[mockr]}>
      <Score />
    </MemoryRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Score,", () => {
  test("does it render", () => {
    render(
      <MemoryRouter initialEntries={[mockr]}>
        <Score />
      </MemoryRouter>
    );

    let btnNext = screen.getByRole("Display-Question-0");
    expect(btnNext).toBeInTheDocument();

    let btnPrev = screen.getByRole("Display-Correct-Answer-0");
    expect(btnPrev).toBeInTheDocument();
  });
});

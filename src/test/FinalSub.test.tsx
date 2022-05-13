import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FinalSubmitButton from "../components/FinalSubmitButton";

test("Snapshot of Home component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <FinalSubmitButton data={[]} matchData={[{}]} />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Home,", () => {
  test("does the sub components of finalSubmit work", () => {
    render(
      <BrowserRouter>
        <FinalSubmitButton data={[]} matchData={[]} />
      </BrowserRouter>
    );

    let a = screen.getByRole("fsub");
    let b = screen.getByRole("fsubHolder");
    expect(a).toBeInTheDocument();
    expect(b).toBeInTheDocument();
  });

  test("does fn work", () => {
    render(
      <BrowserRouter>
        <FinalSubmitButton
          data={[
            {
              qi: 4,
              q: "",
              a: [
                {
                  answerText: "",
                  isCorrect: true,
                },
              ],
              ca: [
                {
                  answerText: "",
                  isCorrect: true,
                },
              ],
            },
          ]}
          matchData={[{}]}
        />
      </BrowserRouter>
    );

    let btn = screen.getByRole("fsub");
    expect(btn).toBeInTheDocument();

    let a = fireEvent.click(btn);
    expect(a).toBeTruthy();
  });
});

import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NumberNav from "../components/NumberNav";
import renderer from "react-test-renderer";

test("Snapshot of NumberNav component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <NumberNav
        qNumber={4}
        setCurrentIndex={() => {}}
        status={false}
        currIndex={4}
        mapIndex={3}
      />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Quiz,", () => {
  test("does the sub component numbernav work", () => {
    render(
      <BrowserRouter>
        <NumberNav
          qNumber={4}
          setCurrentIndex={() => {}}
          status={false}
          currIndex={4}
          mapIndex={3}
        />
      </BrowserRouter>
    );

    let btn = screen.getByRole("number-nav");
    expect(btn).toBeInTheDocument();

    expect(fireEvent.click(btn)).toBeTruthy();
  });
});

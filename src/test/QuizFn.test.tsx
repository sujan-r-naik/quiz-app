import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Quiz from "../pages/Quiz";

describe("In Quiz,", () => {
  test("click on next or prev", () => {
    render(
      <BrowserRouter>
        <Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let btnNext = screen.getByRole("next-q");
    expect(btnNext).toBeInTheDocument();
    expect(fireEvent.click(btnNext)).toBeTruthy();

    let btnPrev = screen.getByRole("prev-q");
    expect(btnPrev).toBeInTheDocument();
    expect(fireEvent.click(btnPrev)).toBeTruthy();
  });

  test("click on answer", () => {
    render(
      <BrowserRouter>
        <Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let option = screen.getByRole("gridOpt-0");
    expect(option).toBeInTheDocument();
    expect(fireEvent.click(option)).toBeTruthy();

    let savebtn = screen.getByRole("save-button");
    expect(savebtn).toBeInTheDocument();
    expect(fireEvent.click(savebtn)).toBeTruthy();
  });

  test("fill in blanks", () => {
    render(
      <BrowserRouter>
        <Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let btnNext = screen.getByRole("next-q");
    expect(btnNext).toBeInTheDocument();

    //to third Q
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);

    const ansInp = screen.getByPlaceholderText("enter ans");
    expect(ansInp).toBeInTheDocument();
    fireEvent.change(ansInp, {
      target: { value: "let" },
    });
  });

  test("tick checkbox", () => {
    render(
      <BrowserRouter>
        <Quiz lang={"English"} name={"XYZ"} />
      </BrowserRouter>
    );

    let btnNext = screen.getByRole("next-q");
    expect(btnNext).toBeInTheDocument();

    //to fourth Q
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);

    const check = screen.getByTestId("checkbox-2");
    expect(check).toBeInTheDocument();
    expect(fireEvent.click(check)).toBeTruthy();

    //save
    let savebtn = screen.getByRole("save-button");
    expect(savebtn).toBeInTheDocument();
    expect(fireEvent.click(savebtn)).toBeTruthy();
  });
});

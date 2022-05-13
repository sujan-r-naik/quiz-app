import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

test("Snapshot of Home component", () => {
  const comp = renderer.create(
    <BrowserRouter>
      <Home lang={""} name={"K"} setName={() => {}} setLang={() => {}} />
    </BrowserRouter>
  );
  let tree = comp.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("In Home,", () => {
  test("are all fields present", () => {
    render(
      <BrowserRouter>
        <Home lang={""} name={"K"} setName={() => {}} setLang={() => {}} />
      </BrowserRouter>
    );
    const heading = screen.getByText(/Enter Your Details/i);
    expect(heading).toBeInTheDocument();

    const nameInput = screen.getByTestId("name-inp");
    expect(nameInput).toBeInTheDocument();

    const languageInput = screen.getByTestId("lang-inp");
    expect(languageInput).toBeInTheDocument();

    const submitButton = screen.getByRole(/sub-button/i);
    expect(submitButton).toBeInTheDocument();

    const age = screen.getByLabelText(/Enter Age/i);
    expect(age).toBeInTheDocument();

    const gender = screen.getByLabelText(/Gender/i);
    expect(gender).toBeInTheDocument();
  });

  test("submit", () => {
    render(
      <BrowserRouter>
        <Home lang={""} name={"K"} setName={() => {}} setLang={() => {}} />
      </BrowserRouter>
    );

    const nameInput = screen.getByTestId("name-inp") as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(nameInput, {
      target: { value: "Kevin" },
    });

    let btn = screen.getByRole("sub-button");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });
});

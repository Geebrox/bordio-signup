import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import App from "../components/App";

describe("<App />", () => {
  test("should contain a sign up form, which should be visible", async () => {
    const { findByTestId } = render(<App />);

    const signUpFormContainer = await findByTestId("signUpFormContainer");

    expect(signUpFormContainer).toBeVisible();

    const signUpFormContainerButton = await findByTestId("formActionButton");

    expect(signUpFormContainerButton).toBeDisabled();
  });
});

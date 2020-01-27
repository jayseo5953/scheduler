import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

describe("Tests for Appointment components", () =>{
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

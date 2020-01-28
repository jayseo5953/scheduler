import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Tests for Appointment components", () =>{

  const interviewers =  [
    {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  // <Form name={props.interview.student} value={props.interview.interviewer ? props.interview.interviewer.id:null} interviewers={props.interviewers} onCancel={back} onSave={save}
  //     />}


  it("renders without student name", () => {
    const { getByTestId } = render(<Form name={""} value={interviewers[0].id} interviewers={interviewers} />);
    expect(getByTestId("student-name-input")).toHaveValue("");
  });

  it("renders with student name", () => {
    const { getByTestId } = render(<Form name={"Jay"} value={interviewers[0].id}interviewers={interviewers} />);
    expect(getByTestId("student-name-input")).toHaveValue("Jay");
  });

  it("validates that the student name is not blank", () => {
   
    const onSave = jest.fn();
    
    const { getByText } = render(
    <Form 
      name={""} 
      interviewers={interviewers} 
      onSave={onSave}
    />
    );

    fireEvent.click(getByText('save', { exact: false }))

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
    
  });

  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
    <Form 
      name={"Lydia Miller-Jones"} 
      interviewers={interviewers} 
      onSave={onSave}
    />);

    /* 3. Click the save button */
    fireEvent.click(getByText('save', { exact: false }))

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});

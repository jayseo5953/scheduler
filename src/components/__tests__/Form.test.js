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

  it("validates that the interviewer is not selected", () => {
   
    const onSave = jest.fn();
    const { getByText } = render(
    <Form 
      name={"Jay"} 
      interviewers={interviewers} 
      onSave={onSave}
      value={null}
    />
    );

    fireEvent.click(getByText('save', { exact: false }))
    expect(getByText(/interviewer must be selected/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

  });

  // xit("calls onSave function when the name and interviewer are defined", () => {
  
  //   const onSave = jest.fn();
  //   const { getByText, queryByText } = render(
  //   <Form 
  //     name={"Lydia Miller-Jones"} 
  //     interviewers={interviewers} 
  //     onSave={onSave}
  //     value={1}
  //   />);
  
  //   fireEvent.click(getByText('save', { exact: false }))

  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });


  it("submits the name entered by the user", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} value={1}/>
    );
  
    const input = getByPlaceholderText("Enter Student Name");
  
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByText("Save"));
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} value={1} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

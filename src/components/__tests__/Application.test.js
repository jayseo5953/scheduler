import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, prettyDOM, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe('Application tests', ()=>{
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const {getByText} = render(<Application />);
    return waitForElement(()=>getByText('Monday'))
      .then(()=>{
        fireEvent.click(getByText('Tuesday'));
        expect(getByText('Leopold Silvers')).toBeInTheDocument();
      })
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);

    await waitForElement(()=>getByText(container, 'Archie Cohen'))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0];

  
    fireEvent.click(getByAltText(appointment, 'Add'));

    const input = getByPlaceholderText(appointment, /enter student name/i);

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    // debug();

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    
    await waitForElementToBeRemoved(()=> getByText(appointment, /saving/i));
    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();
    expect(getByAltText(appointment, /delete/i)).toBeInTheDocument();
    expect(getByAltText(appointment, /edit/i)).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/no spots remaining/i)).toBeInTheDocument()
 
    // console.log(prettyDOM(appointment));
    
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async ()=>{
    const {container, debug} = render(<Application />);

    await waitForElement(()=>getByText(container, 'Archie Cohen'))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];
    // debug(appointment)
    fireEvent.click(getByAltText(appointment, "Delete"))

    expect(getByText(appointment, /confirm/i)).toBeInTheDocument();
    fireEvent.click(getByText(appointment, /confirm/i))


    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(()=> getByText(appointment, /deleting/i))

    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/2 spots remaining/i)).toBeInTheDocument()
  })


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const {container, debug} = render(<Application />);

    await waitForElement(()=>getByText(container, 'Archie Cohen'))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Edit"));

    const input = getByTestId(appointment, "student-name-input")
    expect(input).toHaveValue("Archie Cohen")

    fireEvent.change(input, {target: {value: "Jay Seo" }})
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElementToBeRemoved(()=> getByText(appointment, "SAVING"));

    expect(getByText(appointment, 'Jay Seo')).toBeInTheDocument();
    expect(getByAltText(appointment, /delete/i)).toBeInTheDocument();
    expect(getByAltText(appointment, /edit/i)).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/1 spot remaining/i)).toBeInTheDocument()
  })
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const {container, debug} = render(<Application />);

    await waitForElement(()=>getByText(container, 'Archie Cohen'))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0];

  
    fireEvent.click(getByAltText(appointment, 'Add'));

    const input = getByPlaceholderText(appointment, /enter student name/i);

    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    // debug();

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    
    await waitForElementToBeRemoved(()=> getByText(appointment, /saving/i));
    
    expect(getByText(appointment, "ERROR_SAVE")).toBeInTheDocument();
    expect(getByAltText(appointment, 'Close')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByText(appointment, 'Save')).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/1 spot remaining/i)).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const {container, debug} = render(<Application />);

    await waitForElement(()=>getByText(container, 'Archie Cohen'))

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1];
    // debug(appointment)
    fireEvent.click(getByAltText(appointment, "Delete"))

    expect(getByText(appointment, /confirm/i)).toBeInTheDocument();
    fireEvent.click(getByText(appointment, /confirm/i))


    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElementToBeRemoved(()=> getByText(appointment, /deleting/i))

    expect(getByText(appointment, "ERROR_DELETE")).toBeInTheDocument();
    expect(getByAltText(appointment, 'Close')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/1 spot remaining/i)).toBeInTheDocument()
  });


})


// "loads data, edits an interview and keeps the spots remaining for Monday the same"
// "shows the save error when failing to save an appointment"
// "shows the delete error when failing to delete an existing appointment"
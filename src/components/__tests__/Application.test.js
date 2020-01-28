import React from "react";

import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";

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
    expect(getByAltText(appointment, /delete/i)).toBeInTheDocument();
    expect(getByAltText(appointment, /edit/i)).toBeInTheDocument();

    const dayListItems = getAllByTestId(container, "day");
    const dayListItem = dayListItems.find(day=> queryByText(day, 'Monday'));
    
    expect(getByText(dayListItem,/no spots remaining/i)).toBeInTheDocument()
 
    // console.log(prettyDOM(appointment));
    
  });
  
  


})



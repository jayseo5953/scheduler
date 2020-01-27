import React, {useState} from 'react';
import InterviewerList from '../InterviewerList.js';
import Button from '../Button.js';
import { validate } from '@babel/types';

export default function Form (props) {
  
  const [name, setName] = useState(props.name || "")
  const [error, setError] = useState("")
  const [interviewer, setInterviewer] = useState(props.value || null)
  
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  
  function validate() {
    if (!name) {
      setError("Student name cannot be blank!");
      return ;
    }
    if (!interviewer) {
      setError("Interviewer must be selected!")
      return;
    }
    props.onSave(name, interviewer)
  }



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event=>event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name='name'
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event)=>setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={()=>validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}
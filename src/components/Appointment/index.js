import React, { useEffect } from "react";
import "./styles.scss";
import Header from "./Header.js";
import Show from "./Show.js";
import Empty from "./Empty.js";
import Form from "./Form.js";
import Status from "./Status.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";

import useVisualMode from "hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition("SAVING");

    props
      .bookInterview(props.id, interview)
      .then(res => {
        console.log("booked an interview ");

        transition(SHOW);
      })
      .catch(err => {
        console.log(typeof err);
        transition(ERROR_SAVE, true);
      });
  }

  function confirm() {
    transition(CONFIRM);
  }

  function remove() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(res => {
        console.log("canceled an interview");
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
        console.log("came to catch", err);
      });
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }

    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, mode, transition]);

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          value={
            props.interview.interviewer ? props.interview.interviewer.id : null
          }
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {(mode === SAVING || mode === DELETING) && <Status message={mode} />}
      {(mode === ERROR_SAVE || mode === ERROR_DELETE) && (
        <Error message={mode} onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to DELETE?"}
          onCancel={back}
          onConfirm={remove}
        />
      )}
    </article>
  );
}

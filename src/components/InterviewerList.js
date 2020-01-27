import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem.js'
import PropTypes from 'prop-types'

export default function InterviewerList ({interviewers, value, onChange}) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(int=>{
          return (<InterviewerListItem 
          key={int.id}
          name={int.name}
          avatar={int.avatar}
          selected={int.id === value}
          onChange={(event)=>{onChange(int.id)}}
          />)
        })}
      </ul>
    </section>
  )
};
import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from 'classnames';


export default function InterviewerListItem ({name, avatar, onChange, selected}) {

  let itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return(
   <li 
   className={itemClass}
   onClick={()=>onChange()}
    >
     <img 
     className="interviewers__item-image"
     src={avatar} 
     alt={name} 
     />

    {selected&&name}
   </li>
  )
}
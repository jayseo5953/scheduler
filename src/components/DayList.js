import React from "react";
import "components/DayListItem.scss";

import DayListItem from './DayListItem.js'

export default function DayList(props) {

  return (<ul>
    {props.days.map(day => {
    return <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay} />
  })}
  </ul>);
};
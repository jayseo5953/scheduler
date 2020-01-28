import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';

export default function DayListItem(props) {
  const formatSpots = (arg) => {
    if (arg) {
      if (arg === 1) {
        return arg + " spot remaining"
      } else  {
        return arg + " spots remaining"
      }
    }
    return "no spots remaining"
  }

  let name = props.name;
  let spots = formatSpots(props.spots);

  let itemClass = classNames("day-list__item",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  return (
  <li data-testid="day" onClick={()=>{props.setDay(name)}} className={itemClass}>
    <h2 className= "text --regular">{name}</h2>
    <h3 className= "text --light">{spots}</h3>
  </li>
  )
}
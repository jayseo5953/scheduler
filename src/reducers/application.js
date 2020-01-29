import { getAppointmentsForDay } from "../helpers/selectors.js"

export const SET_DAY = 'SET_DAY';
export const SET_APP_DATA = 'SET_APP_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {

  switch (action.type) {
    case 'SET_APP_DATA' :
      // return { ...state, ...action.appointments}
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }

    case 'SET_DAY' :
      return {...state, day: action.day}

    case 'SET_INTERVIEW' :
      // Updating the appointments
      const appointment = { ...state.appointments[action.id], interview: action.interview}
      const appointments = {...state.appointments, [action.id]: appointment}
    
      // take the updated state and copy
      let newState = { ...state, appointments}

      // see how many slots are null

      //found a bug where different days' remaining seats are not updating
      let newDays = [...newState.days]
      for (let day of newDays) {

        const slotsForDay = getAppointmentsForDay(newState, day.name);
        const slotsNull = slotsForDay.filter((app)=>{
        return !app.interview
        
        })
        const newSpots = slotsNull.length;

        day.spots = newSpots;
        // const days = state.days.map((d) =>{
        //   if (d.name === state.day) {
        //    return  { ...d, spots: newSpots }
        //   } else {
        //     return d;
        //   }
        // });
      }

      return {...newState, days:newDays};
      
      default :
        throw new Error (
          `Tried to reduce with unsupported action type: ${action.type}`
        )
  }
}
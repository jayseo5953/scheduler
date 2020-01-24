import React, { useEffect, useReducer} from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors.js"


const SET_DAY = 'SET_DAY';
const SET_APP_DATA = 'SET_APP_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';


function reducer(state, action) {

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
      const newState = { ...state, appointments}

      // see how many slots are null
      const slotsForDay = getAppointmentsForDay(newState,newState.day);
      const slotsNull = slotsForDay.filter((app)=>{
        return !app.interview
      })
      const newSpots = slotsNull.length;
    
      const days = state.days.map((d) =>{
        if (d.name === state.day) {
         return  { ...d, spots: newSpots }
        } else {
          return d;
        }
      });
      return  {...newState, days}
      
      default :
        throw new Error (
          `Tried to reduce with unsupported action type: ${action.type}`
        )
  }
}

export default function useApplicationData () {
  const [ state, dispatch ] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }) 

  function setDay (day) {
    dispatch({type: SET_DAY, day})
  };


  function bookInterview(id, interview, transition) {
  
    if (!interview.student || !interview.interviewer)
    {
      return Promise.reject('Require input missing. Please fill out your name and select an interviewer!')
    } else {
      return axios.put(`/api/appointments/${id}`,{ interview })
      .then((res)=>{
        dispatch({type: SET_INTERVIEW, id, interview})
      })
    }
  }

  function cancelInterview (id) {

    return axios.delete(`/api/appointments/${id}`)
      .then((res)=>{
        dispatch({type: SET_INTERVIEW, id, interview: null})
      })
  }

  useEffect(()=>{
    const days = axios.get('/api/days');
    const apps = axios.get('/api/appointments');
    const ints = axios.get('/api/interviewers');

    Promise.all([
      Promise.resolve(days),
      Promise.resolve(apps),
      Promise.resolve(ints)
    ])
    .then((all)=>{
      const days= all[0].data;
      const appointments= all[1].data;
      const interviewers= all[2].data;
     
      dispatch({type: SET_APP_DATA, days, appointments, interviewers})
    })
  },[])

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview }
}
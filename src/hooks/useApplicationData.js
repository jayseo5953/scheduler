import React, { useEffect, useReducer} from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APP_DATA, SET_INTERVIEW } from "../reducers/application"


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


  function bookInterview(id, interview) {
  
      return axios.put(`/api/appointments/${id}`,{ interview })
      .then((res)=>{
        const action ={type: SET_INTERVIEW, id, interview}
        dispatch(action)
      })
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

   
   useEffect(()=>{
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(url)
 
    ws.onmessage = (e) => {
      const content = JSON.parse(e.data)
      const {type, id, interview} = content;
      console.log("Message received:",content)
      if (type === 'SET_INTERVIEW') {
        console.log("did dispatch")
        dispatch(content)
        if (interview) {
        
        }
      }
    }
      return () => ws.close()
    },[])
    

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview }
}
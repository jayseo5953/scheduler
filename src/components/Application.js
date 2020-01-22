import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment"
import Appointment from "./Appointment/index.js"
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors.js";

import { getInterview } from "../helpers/selectors.js";



export default function Application(props) {


  // const [ day, setDay ] = useState("Monday")
  // const [ days, setDays ] = useState([]);
  // const [ appointments, setAppointments ] = useState({}) 

  const [ state, setState ] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }) 

  const setDay = day => setState({ ...state, day });

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
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  })


  const appointments = getAppointmentsForDay(state, state.day);

//   const schedule = appointments.map((appointment) => {
//   const interview = getInterview(state, appointment.interview);

//   return (
//     <Appointment
//       key={appointment.id}
//       id={appointment.id}
//       time={appointment.time}
//       interview={interview}
//     />
//   );
// });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} 
        setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          // appointments.map((app)=>{
          //   return (
          //     <Appointment key={app.id} {...app} />
          //   );
          // })
          appointments.map((appointment) => {
            const interview = getInterview(state, appointment.interview);
          
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
              />
            );
          })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


// if i refresh fast, it returns proxy error

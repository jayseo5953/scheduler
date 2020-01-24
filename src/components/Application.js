import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "./Appointment"
import Appointment from "./Appointment/index.js"
import { getAppointmentsForDay } from "../helpers/selectors.js";
import { getInterview } from "../helpers/selectors.js";
import { getInterviewersForDay } from "../helpers/selectors.js";
import useApplicationData from "../hooks/useApplicationData.js"



export default function Application(props) {
  // const [ state, setState ] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // }) 

  // const setDay = day => setState({ ...state, day });

  // useEffect(()=>{
  //   const days = axios.get('/api/days');
  //   const apps = axios.get('/api/appointments');
  //   const ints = axios.get('/api/interviewers');

  //   Promise.all([
  //     Promise.resolve(days),
  //     Promise.resolve(apps),
  //     Promise.resolve(ints)
  //   ])
  //   .then((all)=>{
  //     setState(prev => ({ 
  //       ...prev, 
  //       days: all[0].data, 
  //       appointments: all[1].data,
  //       interviewers: all[2].data
  //     }))
  //   })
  // },[])

  // function bookInterview(id, interview) {

  //   const appointment = { ...state.appointments[id], interview:{ ...interview } }
  //   const appointments = { ...state.appointments, [id]: appointment }

   
  //   return axios.put(`/api/appointments/${id}`,{ interview })
  //   .then((res)=>{
   
  //     setState({...state, appointments})
  //   })

  // }
 
  // function cancelInterview (id) {
  //   const appointment = { ...state.appointments[id], interview: null}
  //   const appointments = { ...state.appointments, [id]: appointment}

  //   return axios.delete(`/api/appointments/${id}`)
  //     .then((res)=>{
     
  //       setState({...state, appointments})
  //     })
     
  // }

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
          appointments.map((appointment) => {
            const interview = getInterview(state, appointment.interview);
            
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewers}
                bookInterview={bookInterview}
                cancelInterview={cancelInterview}
              />
            );
          })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


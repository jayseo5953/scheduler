export function getAppointmentsForDay(state, day) {

  
  const wantedDay = state.days.filter(a => a.name === day);
  let wantedApp=[];

  if(wantedDay.length){

    for (let app_id of wantedDay[0].appointments) {
      for (let app in state.appointments) {
        if (app_id == app) {
          wantedApp.push(state.appointments[app]);
        }
      }
    }
  
  }

  return wantedApp;
}


export function getInterview( state, appointment ) {

  if (appointment) {
    let result = {};
    let id = appointment.interviewer
  
    result.student = appointment.student
    result.interviewer = state.interviewers[id]
  
    return result
  } 
 

  return null
    
   
}


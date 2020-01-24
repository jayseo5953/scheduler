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

export function getInterviewersForDay(state, day) {

  
  const wantedDay = state.days.filter(a => a.name === day);

  let wantedInterviewer=[];

  if(wantedDay.length){
    for (let interviewer_id of wantedDay[0].interviewers) {
      for (let int in state.interviewers) {
        if (interviewer_id == int) {
          wantedInterviewer.push(state.interviewers[int]);
        }
      }
    }
  }
  
  return wantedInterviewer;
}




export function getInterview( state, interview ) {

  if (interview) {
    let result = {};
    let id = interview.interviewer
  
    result.student = interview.student
    result.interviewer = state.interviewers[id]
  
    return result
  } 

  return null
}
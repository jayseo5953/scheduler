import React, {useState} from 'react';

export default function useVisualMode (initMode) {

  const [ mode, setMode ] = useState(initMode);
  const [ history, setHistory ] = useState([initMode])


  function transition (newVal, replace=false) {
    setMode(newVal)
    if (replace) {
      setHistory((prev) => {
        const replacedHistory = prev.slice(0);
        replacedHistory.pop();
       return [ ...replacedHistory, newVal]
      })
    } else {
      setHistory((prev)=>[...prev, newVal] )
    }
  }

  function back () {
    if (history.length>1){
     const prevMode = history[history.length-2]
     const newHistory = [...history];
     newHistory.pop()
     setMode(prevMode)
     setHistory((prev)=>{
       const newHis = [...prev];
       newHis.pop();
       return newHis;
     })
     
    }
  
  }

  return {
    mode,
    transition,
    back
  }
};
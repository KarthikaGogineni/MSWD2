import React, { useState } from 'react'

const Button=(props)=>{

  return(
  <div>
  <button onClick={props.handleAgree}>Agree</button>
  <button onClick={props.handleNeutral}>Neutral</button>
  <button onClick={props.handleDisagree}>Disagree</button>
  <br/>
  <br/>
  </div>
  )
  }
const StatisticsLine=({txt,value})=>{

  return(
    <div>
    <table>
    <tbody>  
    <tr><td>{txt}</td><td>{value}</td></tr>
   
    </tbody>
    </table>
  </div>
  )

  }

const Statistics=({name,agree,neutral,disagree,all,avg,positive})=>{
  if (agree === 0 & neutral === 0 & disagree === 0) {
    return (
      <p>No feedback given</p>
    )
    }
  return(
    <div>
    <h1>{name}</h1>
    <br/> 
    <StatisticsLine txt="Agree" value={agree}/>
    <StatisticsLine txt="Neutral" value={neutral} />
    <StatisticsLine txt="Disagree" value={disagree}/>
    <StatisticsLine txt="All"   value={all}/>
    <StatisticsLine txt="Avg"   value={avg}/>
    <StatisticsLine txt="Positive" value={positive+" %"} />
    </div>
  )
  }
const App = () => {
  const name="statistics"
  const [agree, setAgree] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [disagree, setDisagree] = useState(0)

  const handleAgree=()=>{
    setAgree(agree+1)
  }
  const handleNeutral=()=>{
    setNeutral(neutral+1)
  }
  const handleDisagree=()=>{
    setDisagree(disagree+1)
  }
  let all=0
  let avg=0
  let positive=0
  if(agree+neutral+disagree>0)
  {all=agree+neutral+disagree}
  if(((agree-disagree)/all)>0)
  {avg=(agree-disagree)/all}
  if(((agree/all)*100)>0)
  {positive=(agree/all)*100}
  return (
    <div>
    <h1>give feedback</h1>
    <Button handleAgree={handleAgree} handleNeutral={handleNeutral} handleDisagree={handleDisagree}/>
    <Statistics name={name} agree={agree} neutral={neutral} disagree={disagree} all={all} avg={avg} positive={positive}/>
    </div>
  )
  }


export default App
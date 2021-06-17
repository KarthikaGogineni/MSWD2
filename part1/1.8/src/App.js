import React ,{ useState } from 'react'

const Statistics=(props)=>{

  return(
  <div>
  <h1>{props.name}</h1>
  <br/>
  <table>
  <tbody>  
  <tr><td>Agree</td><td>{props.agree}</td></tr>
  <tr><td>Neutral</td><td>{props.neutral}</td></tr>
  <tr><td>Disagree</td><td>{props.disagree}</td></tr>
  <tr><td>All</td><td>{props.all}</td></tr>
  <tr><td>Average</td><td>{props.avg}</td></tr>
  <tr><td>Positive</td><td>{props.positive} %</td></tr>
 
  </tbody>
  </table>
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
    <button onClick={handleAgree}>Agree</button>
    <button onClick={handleNeutral}>Neutral</button>
    <button onClick={handleDisagree}>Disagree</button>
    <br/>
    <br/>
    <Statistics name={name} agree={agree} neutral={neutral} disagree={disagree} all={all} avg={avg} positive={positive}/>
    </div>
  )
}


export default App
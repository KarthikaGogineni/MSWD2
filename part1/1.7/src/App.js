import React ,{ useState } from 'react'


const App = () => {
  // tallenna napit omaan tilaansa
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
      <h1>statistics</h1>
      <br/>
      <table>
      <tbody>  
      <tr><td>Agree</td><td>{agree}</td></tr>
      <tr><td>Neutral</td><td>{neutral}</td></tr>
      <tr><td>Disagree</td><td>{disagree}</td></tr>
      <tr><td>All</td><td>{all}</td></tr>
      <tr><td>Average</td><td>{avg}</td></tr>
      <tr><td>Positive</td><td>{positive}%</td></tr>
     
      </tbody>
      </table>
    </div>
  )
}


export default App

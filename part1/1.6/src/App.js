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
      </tbody>
      </table>
    </div>
  )
}


export default App
import React, { useState } from 'react'

const Button=(props)=>{

  return(
    <div>
    <button onClick={props.handleVotes}>Vote</button>&nbsp;
    <button onClick={props.random} >Next Anecdote</button>
    </div>
  )

}
const Display=({text,votes=0,random,handleVotes})=>{
  return (
    <div>    
      <div>
        {text}
      </div>
      <div>
        has {votes} votes
      </div>
      <Button handleVotes={handleVotes} random={random}/>
    </div>    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(0)
  const random=()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))

    }
  const handleVotes=()=>{
    const selectedVoteCount = votes[selected] || 0
    setVotes({ 
      ...votes,[selected]: selectedVoteCount + 1 
    })


  }

  return (
    <div>
   <Display   text={anecdotes[selected]} votes={votes[selected]} handleVotes={handleVotes} random={random}/>

    </div>
  )
}

export default App

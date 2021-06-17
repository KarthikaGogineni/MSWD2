import React from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>
         {props.course}
      </h1>
    </div>
  )
}

const Part=(props)=>{

return (
  <div>
      <p>
        {props.part1}  {props.exercises1}
      </p>
      <p>
        {props.part2}  {props.exercises2}
      </p>
      <p>
        {props.part3}  {props.exercises3}
      </p>
      <p>
        {props.part4}  {props.exercises4}
      </p>      
  </div>
)
}
const Content = (props) => {
  return (
    <div>
      <Part part1={props.part1} exercises1={props.exercises1}/>
      <Part part2={props.part2} exercises2={props.exercises2}/>
      <Part part3={props.part3} exercises3={props.exercises3}/>
      <Part part4={props.part4} exercises4={props.exercises4}/>
      </div>
  )
}

const Total=(props)=>{
  return(
  <div>
      <h4>Total of {props.total} exercises </h4>
  </div>
  )
}

const Course=(props)=>{

return(
  <div>
      <Header course={props.course.name} />
      <Content part1={props.course.parts[0].name} exercises1={props.course.parts[0].exercises}/>
      <Content part2={props.course.parts[1].name} exercises2={props.course.parts[1].exercises}/>
      <Content part3={props.course.parts[2].name} exercises3={props.course.parts[2].exercises}/>
      <Content part4={props.course.parts[3].name} exercises4={props.course.parts[3].exercises}/>
      <Total total={props.course.parts[0].exercises+props.course.parts[1].exercises+props.course.parts[2].exercises+props.course.parts[3].exercises}/>         
       </div>
)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return (
    <div>
    <Course course={course}/>
    </div>
  )

  }
export default App;

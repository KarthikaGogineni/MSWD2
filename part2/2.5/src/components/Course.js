const Header = ({ course }) => {
  return (
      <h1>{course.name}</h1>
  )
}

const Part = (props) => {
  return (
      <p>
          {props.part.name} {props.part.exercises}
      </p>
  )
}

const Content = ({ course }) => {
  return (
      <div>
          {course.parts.map((part) => <Part part={part} />)}
      </div>
  )
}


const Total = ({ course }) => {
const total = course.parts.reduce((total, part) => total + part.exercises, 0)
return (
   <h4>total of {total} exercises</h4>
		
	);
}

const Course = ({ course }) => {
  return (
      <div>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
      </div>
  )
}

export default Course
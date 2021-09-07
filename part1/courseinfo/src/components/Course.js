import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {

  const total = course.parts.reduce(function (previousValue, currentValue) {
    console.log('what is happening', previousValue, currentValue)
    return previousValue + currentValue.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
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
      {course.parts.map(part => (
        <div>
          <Part part={part} />
        </div>
      ))}
    </div>
  )
}

const Course = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web developement curriculum</h1>
      {courses.map(course => (
        <div>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>)
      )}
    </div>
  )
}

export default Course
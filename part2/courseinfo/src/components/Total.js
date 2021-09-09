import React from 'react'

const Total = ({ course }) => {
    
    const sum = course.parts.reduce( (previous ,part) => {
        return previous + part.exercises
    }, 0)
    return(
      <b>Number of exercises {sum}</b>
    ) 
  }

export default Total
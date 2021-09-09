import React from 'react'

const Total = ({ course }) => {
    let sum = 0;
    for (let i = 0; i<course.parts.length; i++){
        sum += course.parts[i].exercises
    }
    return(
      <b>Number of exercises {sum}</b>
    ) 
  }

export default Total
import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
    
    /*return (
      <div>
        <Part part={course.parts[0]} />
        <Part part={course.parts[1]} />
        <Part part={course.parts[2]} />
      </div>
    )*/
    return (
        <div>
          {course.parts.map( 
              (part, i) =>
               <Part key={i} part={part} />
            )}
        </div>
      )
  }
export default Content;
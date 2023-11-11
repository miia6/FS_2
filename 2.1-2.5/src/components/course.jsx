import React from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>
};

const Total = ({ sum }) => {
  return <p>Number of exercises {sum}</p>
};

const Part = ({ part }) => {
  return (
    <>
      {part.name} {part.exercises}
    </>
  )
};

const Content = ({ course }) => {
  const sumOfExercises = course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 
    0,
  );
  return (
    <div>
      { course.parts.map( part => (
        <p key={part.id}>
          <Part part={part} />
        </p>
      ))}
      <p style={{ fontWeight: 'bold'}}>
        total of {sumOfExercises} exercises</p>
    </div>
  )
};


const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
};

export default Course;

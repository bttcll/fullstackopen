import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistic = (props) => {
    return (<p>{props.text} {props.value}</p>)
  }

  // do not define a component within another component
  const Statistics = () => {

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = good / all * 100;

    const Display = () => {
      if (all > 0) {
        return (
          <div>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
          </div>
        )
      }
      else {
        return (
          <div>No feedback given</div>
        )
      }
    }

    return (
      <div>
        <h1>statistics</h1>
        <Display />
      </div>
    )
  }

  const Button = (props) => {
    if ("good" === props.text)
      return (<button onClick={() => setGood(props.value + 1)}>{props.text}</button>)
    else if ("neutral" === props.text)
      return (<button onClick={() => setNeutral(props.value + 1)}>{props.text}</button>)
    else
      return (<button onClick={() => setBad(props.value + 1)}>{props.text}</button>)

  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button value={good} text="good" />
      <Button value={neutral} text="neutral" />
      <Button value={bad} text="bad" />
      <Statistics />
    </div>
  )
}

export default App
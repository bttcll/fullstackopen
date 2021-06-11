import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = good / all * 100;

    const Display = () => {
      if (all > 0) {
        return (
          <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive}%</p>
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

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics />
    </div>
  )
}

export default App
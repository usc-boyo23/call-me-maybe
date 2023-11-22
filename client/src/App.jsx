import { useState } from 'react'
import './App.css'

export default function App() {
  const [sonper, setSonper] = useState({})

  const handlePost = () => {
    fetch('http://localhost:3000/sonper/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sonper),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <div className="App">
      <div>
        <h1>POST</h1>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setSonper({ ...sonper, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            name="age"
            id="age"
            onChange={(e) => setSonper({ ...sonper, age: e.target.value })}
          />
        </div>
        <button onClick={handlePost}>Submit</button>
      </div>
    </div>
  )
}

import { useState } from 'react'
import './App.css'

let initialTasks = [
  { id: 1, task: 'water plants', isChecked: false },
  { id: 2, task: 'wash dishes', isChecked: true }
]


function App() {
  const [tasks, setTask] = useState(initialTasks)
  const [text, setText] = useState('')

  const tasksList = tasks.map(t =>
    <div key={t.id}>
      <input type='checkbox' checked={t.isChecked} onChange={() => checkTask(t.id)} />
      {t.isChecked ? <s>{t.task}</s> : t.task}
      <button onClick={() => deleteTask(t.id)}>⨉</button>
    </div>
  )

  let checkTask = (id) => {
    let updatedTasks = tasks.map(t => {

      if (t.id === id) {
        t.isChecked = !t.isChecked
        return t
      }
      return t
    });
    setTask(updatedTasks)
  }

  let addTask = () => {
    if (text) {
      setTask([...tasks, { id: tasks.length + 1, task: text, isChecked: false }])
      setText('')
    }
  }

  let deleteTask = (id) => {
    let updatedTasks = tasks.filter(t => {

      if (t.id !== id) {
        return t
      }

    });
    setTask(updatedTasks)
  }


  let onInput = (e) => {
    let inputText = e.currentTarget.value;
    console.log(inputText)
    setText(inputText)
  }


  return (
    <>
      <div>
        <input value={text} onInput={(e) => onInput(e)} />
        <button onClick={addTask}>Add Task</button>
        {tasksList}
      </div>
    </>
  )
}





export default App

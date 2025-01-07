import { useState, ChangeEvent } from "react"

type Task = {
    id: number,
    description: string,
    isChecked: boolean
}

const initialTasks: Task[] = [
    { id: 1, description: 'water plants', isChecked: false },
    { id: 2, description: 'wash dishes', isChecked: false },
    { id: 3, description: 'cook dinner', isChecked: false },
    { id: 4, description: 'wipe the dust', isChecked: false },
    { id: 5, description: 'vacuum the room', isChecked: false },
]


const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [completedTasks, setCompletedTasks] = useState<Task[]>([])
    const [counter, setCounter] = useState<number>(tasks.length)
    const [taskInput, setTaskInput] = useState<string>('')

    const tasksList = tasks.map(task =>
        <div key={task.id} className="taskItem">
            <div>
                <input type='checkbox' checked={task.isChecked} onChange={() => checkTask(task.id)} />
                <p>{task.isChecked ? <s>{task.description}</s> : task.description} </p>
            </div>
            <button onClick={() => deleteTask(task.id)}>⨉</button>
        </div>
    )



    const ckeckedTasksList = completedTasks.map(task =>
        <div key={task.id} className="taskItem">
            <div>
                <input type='checkbox' checked={task.isChecked} onChange={() => checkTask(task.id)} />
                <p>{task.isChecked ? <s>{task.description}</s> : task.description} </p>
            </div>
            <button onClick={() => deleteTask(task.id)}>⨉</button>
        </div>
    )

    const checkTask = (id: number): void => {
        const checkedTask = { ...tasks[id - 1], isChecked: true }
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks)
        setCompletedTasks([...completedTasks, checkedTask])
    }

    const addTask = (): void => {
        if (taskInput.trim()) {
            const newTask: Task = {
                id: counter + 1,
                description: taskInput,
                isChecked: false
            }
            setCounter(counter + 1)
            setTasks([...tasks, newTask])
            setTaskInput('')
        }
    }

    const deleteTask = (id: number): void => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTaskInput(e.target.value)
    }


    return (
        <div className="taskListWrapper">
            <h1>Things to do</h1>
            <div className="inputWrapper">
                <input value={taskInput} onInput={handleInputChange} placeholder="Write a task..." />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="taskList">
                {tasksList}
            </div>
            <h2>COMPLETED</h2>
            <div className="completedTaskList">
                {ckeckedTasksList}
            </div>
        </div>
    )
}

export default TaskList;
import { useState, ChangeEvent } from "react"

type Task = {
    id: number,
    description: string,
    isChecked: boolean
}

const initialTasks: Task[] = [
    { id: 1, description: 'water plants', isChecked: false },
    { id: 2, description: 'wash dishes', isChecked: true }
]


const TaskList = () => {
    const [tasks, setTask] = useState<Task[]>(initialTasks)
    const [counter, setCounter] = useState<number>(tasks.length)
    const [taskInput, setTaskInput] = useState<string>('')

    const tasksList = tasks.map(task =>
        <div key={task.id}>
            <input type='checkbox' checked={task.isChecked} onChange={() => checkTask(task.id)} />
            {task.isChecked ? <s>{task.description}</s> : task.description}
            <button onClick={() => deleteTask(task.id)}>⨉</button>
        </div>
    )

    const checkTask = (id: number): void => {
        const updatedTasks = tasks.map(task =>
            task.id === id
                ? { ...task, isChecked: !task.isChecked }
                : task
        );
        setTask(updatedTasks)
    }

    const addTask = (): void => {
        if (taskInput.trim()) {
            const newTask: Task = {
                id: counter + 1,
                description: taskInput,
                isChecked: false
            }
            setCounter(counter + 1)
            setTask([...tasks, newTask])
            setTaskInput('')
        }
    }

    const deleteTask = (id: number): void => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTask(updatedTasks)
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTaskInput(e.target.value)
    }


    return (
        <div>
            <div>
                <input value={taskInput} onInput={handleInputChange} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                {tasksList}
            </div>
        </div>
    )
}

export default TaskList;
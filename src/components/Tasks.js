import Task from './Task'
//setTasks, function that updates the state
const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
           {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/> 
                // key={task.id} parent of the list should have a key prop
           ))} 
        </>
    )
}

export default Tasks

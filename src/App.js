import {useState, useEffect} from 'react' //Hook useState
import {BrowserRouter as Router, Route} from 'react-router-dom'


import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

//Stores the events

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false) 
  
  // const [todo, setTasks] = useState([
  //   {
  //       id:1,
  //       text:'Doctors Appointment',
  //       day:'Feb 5th at 2:30pm',
  //       reminder:true,
  //   },
  //   {
  //       id:2,
  //       text:'Meeting at School',
  //       day:'Feb 6th at 1:30pm',
  //       reminder:true,
  //   },
  // ])

  const [todo, setTasks] = useState([])


  // JSON server

  useEffect(()=>{
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

    }
    getTasks()
  },[])

  // Fetch Tasks
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch invididual task
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  
  // const addTask = (task) => {
  //   const id = Math.floor(Math.random() * 10000)+1 
  //   //adds id and all the properties and values from task
  //   const newTask = {id, ...task}
  //   setTasks([...todo,newTask])
  // }

  //Add Task with JSON

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })

  const data = await res.json() 
  setTasks([...todo,data])
  }


  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    setTasks(todo.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const tasktoToggle = await fetchTask(id)
    const updTask = {...tasktoToggle,
    reminder: !tasktoToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    // Changes task reminder to true or false {...task}: spreads across all of the task properties and values
    setTasks(todo.map((task) => task.id === id ? {
      ...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
    <div className="container">
      {/* Error of type due to Header.propTypes in Header.js */}
      {/* <Header title={1}/>  */}
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}/> 
      <Route path='/' exact render={(props)=>(
        <> 
          {/* Ternary operator without an ?, doesn't have an else */}
          {showAddTask && <AddTask onAdd={addTask}/>}
          { todo.length > 0 ? <Tasks tasks= {todo} onDelete={deleteTask} onToggle = {toggleReminder}/> : 'No pending tasks'}
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  )
}

export default App;

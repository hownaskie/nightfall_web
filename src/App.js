import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from './components/Api';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks((success) => {
      setTasks(success)
    }, (error) => console.log(error))
  }, [])

  const fetchTasks = async (success, error) => {
    await api.get('/')
      .then((res) => success(res.data))
      .catch((err) => error(err))
  }

  const fetchTask = async (id, success, error) => {
    await api.get(`/${id}`)
      .then((res) => success(res))
      .catch((err) => error(err))
  }

  const addTask = async (task) => {
    await api.post('/', task)
      .then((res) => setTasks([...tasks, res.data]))
      .catch((err) => console.log(err))
  }

  const deleteTask = async (id) => {
    await api.delete(`/${id}`)
      .then((res) => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.log(err))
  }

  const toggleReminder = async (id) => {
    fetchTask(id, (success) => {
      const updateTask = { ...success.data, reminder: !success.data.reminder };
      api.put(`/${id}`, updateTask)
        .then(res => {
          setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: res.data.reminder } : task))
        })
        .catch(err => console.log(err))
    }, (error) => console.log(error))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        <Route path='/' exact render={(props) => (
          <>
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : (
              <h3>No current task</h3>
            )}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

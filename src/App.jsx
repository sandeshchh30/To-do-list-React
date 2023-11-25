import { TodoProvider } from './contexts'
import './App.css'
import { useEffect, useState } from 'react'
import TodoForm from './components/TodoForm'
import Todolist from './components/Todolist'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  }

  const updateTodo = (id, todo) => {
    setTodos(todos.map((prevTodo) => prevTodo.id === id ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='w-full bg-gray-900 h-screen flex flex-col items-center'>

        <div className='text-2xl md:text-5xl font-semibold my-10 md:my-16 text-white'>
          Manage Your Todos
        </div>

        <div className='w-[70%] md:w-[50%]'>
          <TodoForm />
        </div>

        <div className='w-[70%] md:w-[50%]'>
          {todos.map((todo) => (
            <Todolist key={todo.id} todoObj={todo}/>
          ))}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App

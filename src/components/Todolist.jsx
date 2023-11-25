import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useTodo } from '../contexts'

export default function Todolist({todoObj}) {
    const {deleteTodo, updateTodo, toggleComplete} = useTodo()
    const [isEditing, setIsEditing] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todoObj.todo)
    const [isChecked, setIsChecked] = useState(false)


    const delTodo = () => {
        deleteTodo(todoObj.id)
    }

    const editTodo = () => {
        setIsEditing(false)
        updateTodo(todoObj.id, {...todoObj , todo: todoMsg})
    }

    const checkTodo = () =>{
        setIsChecked((prev) => !prev)
        toggleComplete(todoObj.id)
    }

    return (
        <>
            <div className={`w-full flex justify-between ${todoObj.completed ? "bg-blue-200" : "bg-green-200"} rounded-lg mt-5 py-2 px-2`}>

                <div className='w-[85%] md:w-[92%] flex space-x-2'>                  
                    <input 
                        type="checkbox"
                        className='w-4'
                        checked={todoObj.completed}
                        onChange={checkTodo}
                    />
                    <div className={`text-lg font-semibold ${todoObj.completed ? "line-through" : null}`}>
                        {isEditing && 
                            <input 
                                type='text'
                                className='px-2 rounded-sm bg-green-100 outline-none border-b-2 border-black w-[40vw]'
                                value={todoMsg}
                                onKeyDown={(e) => e.key === "Enter" ? editTodo() : null}
                                onChange={(e) => setTodoMsg(e.target.value)}
                            />
                        }
                        {!isEditing && todoMsg}
                    </div>
                </div>

                <div className='w-[15%] md:w-[8%] flex justify-around'>

                    <button className={`${todoObj.completed ? "text-gray-500" : null}`}  disabled={todoObj.completed} onClick={()=>setIsEditing(true)}>
                        {!isEditing ? <FontAwesomeIcon icon={faPenToSquare} /> : 
                            <div onClick={editTodo}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </div>  
                        }
                    </button>

                    <button className={`${todoObj.completed ? "text-gray-500" : null}`} disabled={todoObj.completed} onClick={delTodo}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>

            </div>
        </>
    )
}

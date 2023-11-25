import React, { useState } from 'react'
import { useTodo } from '../contexts';

export default function TodoForm() {
    const {addTodo} = useTodo()
    const [todo, setTodo] = useState("")

    const submit = (e) => {
        e.preventDefault();
        
        if(!todo) return;
        addTodo({id: Date.now(), todo, completed: false})
        setTodo("")
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className='w-full flex text-sm mb-3'>
                    <input
                        placeholder='Write Todo...' 
                        className='w-[80%] md:w-[90%] px-4 py-2 md:text-lg outline-none rounded-l-lg font-medium'
                        type="text" 
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button 
                        type='submit'
                        className='w-[20%] md:w-[10%] bg-green-700 rounded-r-lg text-white flex items-center justify-center md:text-xl cursor-pointer hover:font-semibold hover:bg-gray-800 hover:text-green-600'
                    >
                        Add
                    </button>
                </div>
            </form>
        </>
    )
}

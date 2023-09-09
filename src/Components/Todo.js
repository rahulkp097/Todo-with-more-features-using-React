import React, { useState,useRef,useEffect } from 'react'
import './Todo.css'

import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';



function Todo() {

    const  [todo,setTodo]=useState("")
    const [todos,setTodos]=useState([])
    const [editId,setEditId]=useState(0)

    const addTodo=()=>{
       if(todo!=="" ){
        setTodos([...todos,{list:todo,id:Date.now(),status:false}])
        
        setTodo('')
       }
       if(editId){
        const editTodo=todos.find((e)=>e.id==editId)
        const updateTodo=todos.map((e)=>e.id===editTodo.id ? (e= {id:e.id, list:todo}):(e= {id:e.id, list:e.list}))
       setTodos(updateTodo)
       setEditId(0)
    }
    }

    const handleSumbit=(e)=>{
        e.preventDefault()
    }

    const inputRef=useRef("null")

    useEffect(()=>{
         inputRef.current.focus()
    })

    const deleteTodo=(id)=>{
      setTodos(   todos.filter((e)=>e.id!==id))
        
    }

    const complteTodo=(id)=>{

      let complete=todos.map((e)=>{
        if(e.id===id){
            return ({...e,status: !e.status})
        }
        return e
      })

      setTodos(complete)

    }

    const editTodo=(id)=>{
      const editTodo = todos.find((to)=> to.id ===id)
      setTodo(editTodo.list)
      setEditId(editTodo.id)
    }

  return (
    <div className='Container'>
      <h2>TODO APP</h2>

    <form className='form-group' onSubmit={handleSumbit}>
        <input type="text" ref={inputRef} value={todo} placeholder='Enter your Todo' onChange={(e)=>setTodo(e.target.value)} />
        <button onClick={addTodo}>{editId? "EDIT" : "ADD"}</button>
    </form>

    <div className='list'>
        <ul>
            {todos.map((to)=>(
                
                 <li className='list-items'>
                    <div className='list-items-list' id={to.status?'list_item':"" }>
                    {to.list}
                    </div>
                    
                    <span >
                        <IoMdDoneAll onClick={()=>complteTodo(to.id)} className='list-items-icons'  id='complete' title='Complete'/>
                        <FiEdit onClick={()=>editTodo(to.id)} className='list-items-icons' id='edit' title='Edit'/>
                        <MdDelete onClick={()=>deleteTodo(to.id)}  className='list-items-icons' id='delete' title='Delete'/>
                    </span>
                 </li>
            ))}
           
        </ul>
    </div>

    </div>
  )
}

export default Todo

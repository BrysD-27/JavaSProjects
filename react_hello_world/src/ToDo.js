import React, { useState } from 'react';

const TodoForm = (props) => {
  return <form className="todo-form" />
}

const TodoList = (props) => {
  return <div className="todo-list" />
}

const Todo = (props) => {
    const [todoList, setTodoList] = useState([]);

    function addTodo(todo){

    }
    
  return <div className="todo">
    <TodoForm />
    <TodoList />
  </div>
}

export default Todo;
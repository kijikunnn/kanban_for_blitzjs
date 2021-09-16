import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import deleteTodo from "app/todos/mutations/deleteTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import React, { useState, VFC } from "react"
import { MenuIcon } from "./MenuIcon"
import { TodoCard } from "./TodoCard"

export const Todos: VFC = () => {
  const [{ todos }] = useQuery(getTodos, { orderBy: { id: "asc" } })
  const [updateTodoMutation] = useMutation(updateTodo)
  const [deleteTodoMutation] = useMutation(deleteTodo)

  console.log(todos)

  const editDate = (date) => {
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()

    return `${y}/${m}/${d}`
  }

  return (
    <ul className="w-[400px] ">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoCard todo={todo} />
        </li>
      ))}
    </ul>
  )
}

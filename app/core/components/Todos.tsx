import deleteTodo from "app/todos/mutations/deleteTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import React, { useState, VFC } from "react"
import { TodoCard } from "./TodoCard"

type Props = {
  state: string
}

export const Todos: VFC<Props> = (props) => {
  const [{ todos }] = useQuery(getTodos, { orderBy: { id: "desc" } })

  return (
    <ul className="w-[400px] ">
      {todos.map((todo) =>
        todo.state === props.state.toLowerCase() ? (
          <li key={todo.id}>
            <TodoCard todo={todo} />
          </li>
        ) : null
      )}
    </ul>
  )
}

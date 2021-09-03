import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import deleteTodo from "app/todos/mutations/deleteTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import React, { VFC } from "react"

export const TodoCard: VFC = () => {
  const [{ todos }, { refetch }] = useQuery(getTodos, { orderBy: { id: "asc" } })
  const [updateTodoMutation] = useMutation(updateTodo)
  const [deleteTodoMutation] = useMutation(deleteTodo)

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoForm
            initialValues={todo}
            onSubmit={async (values) => {
              try {
                await updateTodoMutation(values)
                refetch()
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteTodoMutation({ id: todo.id })
                refetch()
              }
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}

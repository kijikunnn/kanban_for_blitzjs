import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import deleteTodo from "app/todos/mutations/deleteTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import React, { useState, VFC } from "react"
import { MenuIcon } from "./MenuIcon"

export const TodoCard: VFC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [{ todos }, { refetch }] = useQuery(getTodos, { orderBy: { id: "asc" } })
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
    <ul className="w-[400px]">
      {todos.map((todo) => (
        <li key={todo.id}>
          <div className="h-36 p-5 w-full bg-bgMain rounded-lg flex flex-col">
            <div className="flex items-center justify-between">
              {isEdit ? (
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
              ) : (
                <div className="text-2xl font-bold">{todo.title}</div>
              )}
              <div>
                <MenuIcon />
              </div>
            </div>
            <div className="my-auto">icon</div>
            <p className="font-bold text-textSub1">{editDate(todo.updatedAt)}</p>
          </div>
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

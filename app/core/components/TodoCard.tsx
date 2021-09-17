import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import deleteTodo from "app/todos/mutations/deleteTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import React, { useState, VFC } from "react"
import { MenuIcon } from "./MenuIcon"

type PROPS = {
  todo: any
}

export const TodoCard: VFC<PROPS> = (props) => {
  const todo = props.todo
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [{}, { refetch }] = useQuery(getTodos, { orderBy: { id: "desc" } })
  const [updateTodoMutation] = useMutation(updateTodo)
  const [deleteTodoMutation] = useMutation(deleteTodo)

  const editDate = (date) => {
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()

    return `${y}/${m}/${d}`
  }

  const updateTodoState = async () => {
    switch (todo.state) {
      case "todo":
        await updateTodoMutation({ ...todo, state: "doing" })
        refetch()
        break
      case "doing":
        await updateTodoMutation({ ...todo, state: "done" })
        refetch()
        break
      default:
        break
    }
  }

  return (
    <div
      // onBlur={() => setOpenModal(false)}
      className=" mb-4 relative h-36 p-5 w-full bg-bgMain rounded-lg flex flex-col"
    >
      <div className="flex items-center justify-between">
        {isEdit ? (
          <TodoForm
            initialValues={todo}
            onSubmit={async (values) => {
              try {
                await updateTodoMutation(values)
                setIsEdit(false)
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
          <div className="hover:cursor-pointer" onClick={() => setOpenModal(true)}>
            <button type="button" aria-expanded="true" aria-haspopup="true">
              <MenuIcon />
            </button>
          </div>

          {openModal ? (
            <div
              className="z-10 absolute right-0 top-10 p-2 rounded-lg border-borderMain border bg-bgMain"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="flex flex-col w-44 justify-start" role="none">
                {todo.state !== "done" ? (
                  <>
                    <div
                      onClick={updateTodoState}
                      role="button"
                      className="text-xs text-textMain font-bold border-b border-borderMain"
                    >
                      Move To {todo.state === "todo" ? "Doing" : "Done"}
                    </div>
                    <div
                      onClick={() => setIsEdit(true)}
                      role="button"
                      className="text-xs text-textMain font-bold mt-2 border-b border-borderMain"
                    >
                      Edit Task
                    </div>
                  </>
                ) : null}
                <div
                  className="text-xs text-accent font-bold mt-2 border-b border-borderMain"
                  role="button"
                  onClick={async () => {
                    if (window.confirm("This will be deleted")) {
                      await deleteTodoMutation({ id: todo.id })
                      refetch()
                    }
                  }}
                >
                  Delete Task
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="my-auto">icon</div>
      <p className="font-bold text-textSub1">{editDate(todo.updatedAt)}</p>
    </div>
  )
}

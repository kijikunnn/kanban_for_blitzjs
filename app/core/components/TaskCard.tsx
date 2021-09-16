import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import createTodo from "app/todos/mutations/createTodo"
import getTodos from "app/todos/queries/getTodos"
import { useQuery, useMutation } from "blitz"
import { useState, VFC } from "react"
import { Todos } from "./Todos"

type Props = {
  state: string
}

const CreateTodo: VFC = () => {
  const [isType, setIsType] = useState<boolean>(false)
  const [{}, { refetch }] = useQuery(getTodos, { orderBy: { id: "asc" } })
  const [createTodoMutation] = useMutation(createTodo)

  if (isType) {
    return (
      <div className="mb-4 px-5 py-3 relative w-full bg-bgMain rounded-lg">
        <TodoForm
          onBlur={() => setIsType(false)}
          placeholder={"New Task"}
          onSubmit={async (values) => {
            try {
              await createTodoMutation(values)
              setIsType(false)
              refetch()
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    )
  } else {
    return (
      <button
        className="mb-4 w-full bg-bgMain h-14 rounded-lg text-2xl text-theme font-bold"
        onClick={() => setIsType(true)}
      >
        &#65291; Add Task
      </button>
    )
  }
}

export const TaskCard: VFC<Props> = (props) => {
  return (
    <div className=" min-h-full mx-auto bg-bgSub border border-borderMain my-7 rounded-2xl px-5">
      <div className="text-2xl font-bold ml-2 my-5">{props.state}</div>
      {props.state === "Todo" ? <CreateTodo /> : null}
      <Todos />
    </div>
  )
}

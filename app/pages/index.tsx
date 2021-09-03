import { Image, BlitzPage, useMutation, useRouter, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import logo from "public/logo.png"
import { FORM_ERROR, TodoForm } from "app/todos/components/TodoForm"
import createTodo from "app/todos/mutations/createTodo"
import getTodos from "app/todos/queries/getTodos"
import { Suspense, VFC } from "react"
import updateTodo from "app/todos/mutations/updateTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"

const Todo: VFC = () => {
  const [{ todos }, { refetch }] = useQuery(getTodos, { orderBy: { id: "asc" } })
  const [createTodoMutation] = useMutation(createTodo)
  const [updateTodoMutation] = useMutation(updateTodo)
  const [deleteTodoMutation] = useMutation(deleteTodo)

  return (
    <div>
      <TodoForm
        submitText="Create Todo"
        onSubmit={async (values) => {
          try {
            const todo = await createTodoMutation(values)
            refetch()
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <TodoForm
              submitText="Update Todo"
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
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div className="logo">
          <Image src={logo} alt="blitzjs" />
        </div>
        <p>
          <strong>Congrats!</strong>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Todo />
        </Suspense>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

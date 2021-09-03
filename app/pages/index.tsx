import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Suspense, VFC } from "react"
import { TaskCard } from "app/core/components/TaskCard"

const Home: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskCard state="Todo" />
        <TaskCard state="Doing" />
        <TaskCard state="Done" />
      </Suspense>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home

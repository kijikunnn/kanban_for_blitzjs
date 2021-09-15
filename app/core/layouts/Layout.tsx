import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "kanban_for_blitzjs"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-bgMain ">
        <header className="w-full h-20 border-b-4 border-borderMain">header and icon</header>
        <main className="grid grid-cols-3">{children}</main>
      </div>
    </>
  )
}

export default Layout

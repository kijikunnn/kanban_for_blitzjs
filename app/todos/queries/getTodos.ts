import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTodosInput extends Pick<Prisma.TodoFindManyArgs, "orderBy"> {}

export default resolver.pipe(async ({ orderBy }: GetTodosInput) => {
  const todos = await db.todo.findMany({ orderBy })

  return {
    todos,
  }
})

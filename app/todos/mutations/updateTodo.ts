import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTodo = z.object({
  id: z.number(),
  title: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateTodo), async ({ id, ...data }) => {
  const todo = await db.todo.update({ where: { id }, data })

  return todo
})

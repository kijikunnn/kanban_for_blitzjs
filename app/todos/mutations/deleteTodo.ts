import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTodo = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTodo), async ({ id }) => {
  const todo = await db.todo.deleteMany({ where: { id } })

  return todo
})

import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTodo = z.object({
  title: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTodo), async (input) => {
  const todo = await db.todo.create({ data: input })

  return todo
})

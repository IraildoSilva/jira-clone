import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { loginSchema, registerSchema } from '../schemas'

const app = new Hono()
  .post('/login', zValidator('json', loginSchema), (c) => {
    const { email, password } = c.req.valid('json')

    console.log({ email, password })

    return c.json({ email, password })
  })
  .post('/register', zValidator('json', registerSchema), async (c) => {
    const { email, name, password } = c.req.valid('json')

    console.log({ email, name, password })

    return c.json({ email, name, password })
  })

export default app

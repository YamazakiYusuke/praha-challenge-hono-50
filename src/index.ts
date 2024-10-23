import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    text: 'hello world',
  }, 200)
})

app.post('/', async (c) => {
  const contentType = c.req.header('Content-Type');
  if (contentType !== 'application/json') {
    return c.json({ error: 'Content-Type must be application/json' }, 400);
  }

  try {
    const body = await c.req.json();
    return c.json(body, 201);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return c.json({ error: 'Invalid JSON' }, 400);
  }
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

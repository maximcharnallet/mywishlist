import { buildApp } from './app'

const app = buildApp()
const PORT = parseInt(process.env.PORT || '3008', 10)

const start = async () => {
  try {
    await app.ready()
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
    console.log(`✅ Documentation API on http://localhost:${PORT}/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
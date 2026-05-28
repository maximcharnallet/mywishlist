import fastify from 'fastify'

const app = fastify({logger: true})

const PORT = parseInt(process.env.PORT || '3002', 10)

const start = async () => {
  try {
    await app.ready()
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`Serveur prêt sur http://localhost:${PORT}`)
    console.log(`Documentation API sur http://localhost:${PORT}/docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
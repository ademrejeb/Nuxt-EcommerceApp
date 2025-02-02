const express = require("express")
const { Nuxt, Builder } = require("nuxt")
const app = express()

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js")
config.dev = !(process.env.NODE_ENV === "production")

const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 3000

app.set("port", port)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log("Server listening on http://" + host + ":" + port) // eslint-disable-line no-console
  console.log("API Url: "+ process.env.NUXT_API_URL)
}

start()

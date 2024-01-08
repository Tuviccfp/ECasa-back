const {server, app} = require('./app')

server.listen(8080, () => {
    console.log(`Server in port ${8080}`)
})
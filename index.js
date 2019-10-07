const express = require('express');

const server = express();
server.use(express.json())

const ProjectRouter = require('./projectRouter')
server.use('/api/projects', ProjectRouter);

const ActionRouter = require('./actionRouter')
server.use('/api/actions', ActionRouter)

server.listen(8000, () => console.log('listening on 8000'))


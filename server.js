const express = require('express');

const ProjectsRouter = require('./projects/projectsRouter');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectsRouter);

module.exports = server;
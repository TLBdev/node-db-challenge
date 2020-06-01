const express = require('express');
const db = require('../data/db-config')
const Projects = require('./projectsModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find()
        .then(Projects => {
            res.json(Projects);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get Projects' });
        });
});

// router.get('/:id', (req, res) => {
//     let payload = {
//         id: 0,
//         name: '  ',
//         description: '  ',
//         completed: false,
//         tasks: [],
//         resources: []
//     }


//     db('project_resource')
//         .join('resources', 'project_resource.id', 'resources.id')
//         .join('projects', 'project_resource.project_id', 'projects.id')
//         .where('project_resource.project_id', req.params.id)
//         .select('resources.resource_name')
//         .then(reso => {
//             console.log(reso)
//             payload.resources = reso
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: 'Failed to get Projects' });

//         });

//     db('projects').where('projects.id', req.params.id)
//         .then(Projects => {
//             payload.id = Projects[0].id
//             payload.name = Projects[0].project_name
//             payload.description = Projects[0].description
//             payload.completed = Projects[0].completed ? true : false

//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: 'Failed to get Projects' });

//         });
//     db('tasks').where('project_id', req.params.id)
//         .then(tasks => {
//             payload.tasks = tasks
//             res.json(payload)

//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({ message: 'Failed to get Projects' });

//         });


// });

router.get('/tasks', (req, res) => {
    Projects.findTask()
        .then(Projects => {
            res.json(Projects);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get Projects' });
        });
});
router.get('/:id/resources', (req, res) => {
    Projects.findResources()
        .then(Projects => {
            res.json(Projects);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to get Projects' });
        });
});

router.post('/:id/tasks', (req, res) => {
    const schemeData = req.body;

    Projects.addTask(schemeData, req.params.id)
        .then(scheme => {
            res.status(201).json(scheme);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new scheme' });
        });
});

router.post('/:id/resources', (req, res) => {
    const schemeData = req.body;

    Projects.addResource(schemeData)
        .then(scheme => {
            res.status(201).json(scheme);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new scheme' });
        });
});

router.post('/', (req, res) => {
    const projectData = req.body;
    console.log(projectData)
    Projects.add(projectData)
        .then(project => {
            res.status(201).json(project);

        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create new scheme' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Projects.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find scheme with given id' });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to delete scheme' });
        });
});

module.exports = router;
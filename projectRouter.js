const express = require('express');
const Project = require('./data/helpers/projectModel')
const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(project => res.status(200).json(project))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error getting project" })
        })
})

router.post('/', validateProject, (req, res) => {
    const { name, description } = req.body;
    Project.insert({ name, description })
        .then(project => res.status(201).json(project))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error posting project" })
        })

})

router.put('/:id', validateProjectId, validateProject, (req,res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    Project.update(id, {name, description})
        .then(update => res.status(200).json(update))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error updating" })
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Project.remove(id)
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error deleting project" })
        })
})
//middleware
function validateProjectId(req, res, next) {
    console.log(req.params)
    const { id } = req.params;
    Project.get(id)
        .then(project => {
            console.log(project)
            if (!project) {
                res.status(404).json({ error: "project with Id not found" })
            } else {
                next()
            }
        });
}

function validateProject(req, res, next) {
    console.log(req.body)
    const { name, description } = req.body
    if(!name || !description) {
        return res.status(400).json({ error: "must have valid credentials name:, description:"  })
    }
    if(typeof name !== "string"||typeof description !== "string") {
        return res.status(400).json({ error: "must be a string" })
    }
    next()
}
module.exports = router;
const express = require('express')
const Action = require('./data/helpers/actionModel')
const Project = require('./data/helpers/projectModel')
const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(action => res.status(200).json(action))
        .catch(err => {
            consol.log(err)
            res.status(500).json({ error: "Error getting action" })
        })
})

router.post('/:id', validateProjectId, validateAction, (req, res) => {
    const { id: project_id } = req.params;
    const { description, notes } = req.body;
    Action.insert({project_id, notes, description})
        .then(action => res.status(200).json(action))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error posting action" })
        })
})

router.put('/', (req, res) => {
    const { id: project_id }
})

//router.delete('/', (req, res) => {

//})
//middleware
function validateAction(req, res, next) {
    const { id: project_id } = req.params;
    const { description, notes } = req.body;
    if(!description || !notes) {
        return res.status(400).json({ error: "need proper credentials, description:, notes:" })
    }
    next();
}

function validateActionId(req, res, next) {
    const { id } = req.params;
    Action.get(id)
        .then(action => {
            if (!action) {
                return res.status(404).json({ error: "action with Id not found" })
            }
        })
}

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
module.exports = router
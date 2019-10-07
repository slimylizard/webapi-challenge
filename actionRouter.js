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

router.put('/:project_id', validateProjectId, validateActionId, validateAction, (req, res) => {
    console.log('here')
    const { project_id } = req.params
    const {id, discription, notes} = req.body
    Action.update(id, {discription, notes})
        .then(update => {
            console.log(req.body)
            res.status(200).json(update)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error updating" })
        })
})

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
    const { id } = req.body
    console.log("hi from VAI", id)
    Action.get(id)
        .then(action => {
            console.log('hi from then',action)
            if(!action){
                res.status(404).json({ error: "action not found" })
            } else{
                next()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error getting actions" })
        })

}
function validateProjectId(req, res, next) {
    console.log("first", req.params)
    const { project_id } = req.params;
    Project.get(project_id)
        .then(project => {
            console.log(project)
            if (!project) {
                console.log('before error')
                res.status(404).json({ error: "project with Id not found" })
            } else {
                next()
            }
        })
        .catch(err => {
            console.log(err)
        })
}
module.exports = router
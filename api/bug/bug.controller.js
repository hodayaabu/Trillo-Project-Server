// Bug CRUDL API
import { bugService } from './bug.service.js';


// List
export async function getBugs(req, res) {
    try {
        const filterBy = {
            title: req.query.filterBy.title || '',
            severity: +req.query.filterBy.severity || 0,
            labels: req.query.filterBy.labels || [],
            pageIdx: req.query.filterBy.pageIdx || undefined
        }
        const sortBy = {
            fieldSort: req.query.sortBy.fieldSort || '',
            dir: req.query.sortBy.dir || '',
        }
        const bugs = await bugService.query(filterBy, sortBy)
        res.send(bugs)
    } catch (err) {
        res.status(400).send(`Couldn't get bugs`)
    }
}

// Get
export async function getBug(req, res) {
    const { bugId } = req.params

    const visitedBugs = req.cookies.visitedBugs ? JSON.parse(req.cookies.visitedBugs) : []
    try {
        if (visitedBugs.length === 3 && !visitedBugs.includes(bugId)) {
            console.log('User visited at the following bugs:', visitedBugs)
            res.cookie('visitedBugs', JSON.stringify(visitedBugs), { maxAge: 1000 * 7 })
            return res.status(401).send('Wait for a bit')
        }
        if (!visitedBugs.includes(bugId)) visitedBugs.push(bugId)

        const bug = await bugService.getById(bugId)

        res.cookie('visitedBugs', JSON.stringify(visitedBugs))
        res.send(bug)
    } catch (err) {
        res.status(400).send(`Couldn't get bug`)
    }
}


// // Delete
export async function removeBug(req, res) {
    const { bugId } = req.params

    try {
        await bugService.remove(bugId)
        res.send('Deleted OK')
    } catch (err) {
        res.status(400).send(`Couldn't remove bug`)
    }
}


// // Save
export async function addBug(req, res) {
    const { title, severity, description, labels } = req.body
    const bugToSave = { title, severity: +severity, description, labels }

    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        res.status(400).send(`Couldn't save bug`)
    }
}

export async function updateBug(req, res) {

    const { _id, severity, description, labels } = req.body
    const bug = await bugService.getById(_id)
    const bugToSave = {...bug, severity: +severity, description: description, labels: labels }

    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        res.status(400).send(`Couldn't update bug`)
    }
}
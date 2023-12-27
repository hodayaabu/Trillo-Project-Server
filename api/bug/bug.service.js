import { loggerService } from '../../services/logger.service.js'
import { utilService } from './../../services/util.service.js';

export const bugService = {
    query,
    getById,
    remove,
    save
}

var bugs = utilService.readJsonFile('./data/bug.json')
const PAGE_SIZE = 3

async function query(filterBy = {}, sortBy = {}) {
    try {
        let bugsToReturn = [...bugs]

        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            bugsToReturn = bugsToReturn.filter(bug => regExp.test(bug.title))
        }

        if (filterBy.severity) {
            bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.severity)
        }

        if (filterBy.labels.length !== 0) {
            bugsToReturn = bugsToReturn.filter(item => {
                return filterBy.labels.every(label => {
                    return item.labels.includes(label)
                })
            })
        }

        if (filterBy.pageIdx !== undefined) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            bugsToReturn = bugsToReturn.slice(startIdx, startIdx + PAGE_SIZE)
        }

        bugsToReturn = sortByField(bugsToReturn, sortBy)

        return bugsToReturn

    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

function sortByField(bugsToReturn, sortBy) {

    var field = sortBy.fieldSort
    if (field === 'title') {
        bugsToReturn.sort((a, b) => {
            let fa = a.title.toLowerCase(),
                fb = b.title.toLowerCase();
            const dir = sortBy.dir === "desc" ? -1 : 1
            if (fa > fb) {
                return -1 * dir;
            }
            if (fa < fb) {
                return 1 * dir;
            }
            // if (sortBy.dir == "desc") {
            //     if (fa > fb) {
            //         return -1;
            //     }
            //     if (fa < fb) {
            //         return 1;
            //     }
            // }
            // else {
            //     if (fa < fb) {
            //         return -1;
            //     }
            //     if (fa > fb) {
            //         return 1;
            //     }
            // }
            return 0;
        });

    } else if (field === 'severity') {
        bugsToReturn.sort((a, b) => {
            if (sortBy.dir == "desc") {
                return b.severity - a.severity;
            } else {
                return a.severity - b.severity;
            }
        });
    } else if (field === 'createdAt') {
        bugsToReturn.sort((a, b) => {
            let da = new Date(a.createdAt),
                db = new Date(b.createdAt);

            if (sortBy.dir == "desc") {
                return db - da;
            } else {
                return da - db;
            }

        });
    }
    return bugsToReturn
}


async function getById(bugId) {
    try {
        var bug = bugs.find(bug => bug._id === bugId)
        if (!bug) throw `Couldn't find bug with _id ${bugId}`
        return bug
    } catch (err) {
        loggerService.error(err)
        throw (err)
    }
}

async function remove(bugId) {
    try {
        const idx = bugs.findIndex(bug => bug._id === bugId)
        if (idx === -1) throw `Couldn't find bug with _id ${bugId}`
        bugs.splice(idx, 1)

        utilService._saveListDataToFile('./data/bug.json', bugs)

    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            var idx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (idx === -1) throw `Couldn't find bug with _id ${bugToSave._id}`
            bugs.splice(idx, 1, bugToSave)
        } else {
            bugToSave._id = utilService.makeId()
            bugToSave.createdAt = Date.now()
            bugs.push(bugToSave)
        }
        await utilService._saveListDataToFile('./data/bug.json', bugs)
        return bugToSave

    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

function getSortFunction() {
    return () => {

    }
}
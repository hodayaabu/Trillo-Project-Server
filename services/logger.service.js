import fs from 'fs'

export const loggerService = {
    debug(...args) { if (process.env.NODE_NEV === 'production') return doLog('DEBUG', ...args) },
    info(...args) { doLog('INFO', ...args) },
    warn(...args) { doLog('WARN', ...args) },
    error(...args) { doLog('ERROR', ...args) }
}

// Logs dir
const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

// Define the time format
function getTime() {
    const now = new Date()
    const locale = 'he'
    return `${now.toLocaleDateString(locale)}-${now.toLocaleTimeString(locale)}`
}

function isError(e) {
    return e && e.stack && e.message
}

function doLog(level, ...args) {

    const strs = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )
    var line = strs.join(' ')
    const store = asyncLocalStorage.getStore()  // ASK - Async? Should we add it?
    const userId = store?.loggedinUser?._id
    const userIdStr = userId ? `(userId: ${userId})` : ''
    line = `[${getTime()}] ${level}: ${line} ${userIdStr}\n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) => {
        if (err) console.log('FATAL: cannot write to log file')
    })
}


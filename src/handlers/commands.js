import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const COMMANDS_DIR = path.resolve('./src/commands')

function findCommandFiles(dir) {
    let files = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            files = files.concat(findCommandFiles(fullPath))
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            files.push(fullPath)
        }
    }

    return files
}

export async function loadCommands() {
    const commands = new Map()

    if (!fs.existsSync(COMMANDS_DIR)) {
        console.warn('[commands] la carpeta src/commands no existe.')
        return commands
    }

    const files = findCommandFiles(COMMANDS_DIR)

    for (const file of files) {
        const relativeDir = path.relative(COMMANDS_DIR, path.dirname(file))
        const category = relativeDir === '' ? 'general' : relativeDir

        try {
            const imported = await import(pathToFileURL(file).href)
            const command = imported.default

            if (!command?.name || typeof command.execute !== 'function') {
                console.warn(`[Comandos] "${file}" fue ignorado: falta "name" o "execute".`)
                continue
            }

            command.category = command.category || category

            if (commands.has(command.name.toLowerCase())) {
                console.warn(`[Comandos] nombre duplicado "${command.name}" en "${file}".`)
            }

            commands.set(command.name.toLowerCase(), command)

            if (Array.isArray(command.aliases)) {
                for (const alias of command.aliases) {
                    commands.set(alias.toLowerCase(), command)
                }
            }

            console.log(`[Comandos] cargado: ${command.name} (${command.category})`)
        } catch (error) {
            console.error(`[Comandos] error al cargar "${file}":`, error)
        }
    }

    return commands
}
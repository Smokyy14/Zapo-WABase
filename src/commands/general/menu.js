import { prefix } from '../../config.js'

export default {
    name: 'menu',
    aliases: ['comandos'],
    category: 'general',
    description: 'Lista de comandos disponibles',

    async execute({ message, commands }) {
        const uniqueCommands = [...new Set(commands.values())]

        let menu = `*Tengo ${uniqueCommands.length} comandos para tu disposición:*\n`

        menu += '\n*GENERAL*\n'
        menu += commandsData('general')

    //  menu += '\n\n*MULTIMEDIA*\n' Como ejemplo, commandsData obtiene el nombre de la categoria.
    //  menu += commandsData('multimedia') Se imprime de esta forma para facilitar la decoración e importación de comandos

        menu += `\n\n> *Prefijo actual: ${prefix}*`

        await message.reply(menu)

        function commandsData(category) {
            return uniqueCommands
                .filter(command => command.category === category)
                .map(command =>
                    `${prefix}${command.name} ${command.usage || ''}`
                )
                .join('\n')
        }
    }
}
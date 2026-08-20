import { prefix } from '../../config.js';
import { forwardedFromChannel } from '../../utils/tools.js';

function getUptime() {
    const time = process.uptime()

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    const uptime = `Tiempo encendido: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

    return uptime
}

export default {
    name: "bot",
    aliases: ["status"],
    category: "general",
    description: "Indica el estado del bot.",

    async execute({ message, client, commands }) {
        let status
        const comandos = [...new Set(commands.values())]

        status = 'Estado del bot:\n\n'

        status += `${getUptime()}\n`
        status += `Comandos: ${comandos.length}\n`
        status += `Prefijo: \`${prefix}\`\n\n`

        status += "Unete al canal para obtener información."

        await message.reply({ type: 'image', 
                           // media: '',
                          //  mimetype: 'image/jpeg',
                              caption: status }, {
                                contextInfo: forwardedFromChannel({
                                     jid: "120363346885841195@newsletter", 
                                     name: "Ejemplo"
                              })
                            });
    }
}

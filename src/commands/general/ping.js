export default {
    name: 'ping',
    aliases: ['p'],
    category: 'general',
    description: 'Mide la latencia del bot.',

    execute: async ({ message, client }) => {
        const start = performance.now()
        const toEdit = await message.reply('🏓 Pong!')
        const latency = performance.now() - start
        
        await toEdit.edit(`Latencia: ${latency.toFixed(0)}ms`)
    }
}
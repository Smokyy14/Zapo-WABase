const mediaTypes = {
    imageMessage: 'image',
    videoMessage: 'video',
    audioMessage: 'audio'
}

export default {
    name: 'view',
    aliases: ['antiview'],
    category: 'multimedia',
    description: 'Permite ver las fotos de unica vez.',

    execute: async ({ message }) => {
        const quoted = message.quoted

        if (!quoted) {
            return message.reply('Tenés que citar una imagen, un video o un audio.')
        }

        const sendType = mediaTypes[quoted.type]

        if (!sendType) {
            return message.reply('Solo puedo descargar imágenes o videos citados.')
        }

        try {
            const bytes = await quoted.download()
            const mimetype = quoted.message[quoted.type]?.mimetype

            await message.reply({
                type: sendType,
                media: bytes,
                mimetype,
                caption: quoted.text
            })
        } catch (error) {
            console.error('[View] Error al descargar el medio citado:', error)
            await message.reply('No pude descargar el archivo, probablemente ya expiró.')
        }
    }
}
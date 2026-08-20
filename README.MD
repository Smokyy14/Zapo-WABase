# Zapo-Bot

A foundational WhatsApp bot built with JavaScript, designed for the Zapo multi-device library.

## Overview

This repository contains the base structure for a modular and scalable WhatsApp bot using the [Zapo](https://www.npmjs.com/package/zapo-js) library.

It provides a clean and organized codebase where you can easily create commands, handle group events, customize behavior, and expand functionality.

If you're starting to build your own WhatsApp bot, this base will save you a couple hours of setup time.

---

## Features

- Modular command system
- Easy command usage and aliasing
- Easy to build upon and maintain

---

### Project structure

```bash
Zapo-WABase/
├── src
│   ├── events/        # This is where the function to establish the bot's connection is located.
│   ├── handlers/      # Here is the command loader.
│   └── commands/      # All bot commands organized by category
│        ├── general/  # Add your own folders or place commands here
│        └── ...
├── utils/             # Helpers, database logic, sticker creation, etc.
├── .auth/             # Auth credentials stored here ( It is created automatically. )
├── main.js            # Main entry point of the bot
├── deno.lock
├── package.json       # Project metadata and dependencies
└── README.md          # This file
```

---

### Creating Commands

You can add commands simply by placing them in the commands/ folder.
Each command file should export an object like this:
```JavaScript
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
```
Commands are automatically loaded on startup, including their aliases.

---

### Session Handling
The bot uses Zapo session management.

The numeral code will only appear on first use or when session data is invalid.

The session data is stored in the .auth/ directory.

Make sure not to share this folder to avoid exposing authentication data.

---

### License
This project is licensed under the MIT License — feel free to use it for commercial or private projects.

---

Contact me here!
- [Gmail](contact.smokyy@gmail.com)
- [Twitter](https://x.com/StarsOnThaSky)

Want to talk or show your project? Open an issue or fork away!

---

### Tip
You can use this base to build powerful bots for:

Community management
WhatsApp games
Utility tools (downloading media, managing groups)
Stickers, memes, and more!
Made with ❤️ for developers who love building cool bots.

---
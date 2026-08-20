import readline from 'readline/promises';
import { spawn } from 'child_process';

async function ask(question) {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question(question);
    rl.close();
    return answer.trim();
};

export function forwardedFromChannel({ jid, name, serverMessageId = 1 }) {
    return {
        isForwarded: true,
        forwardingScore: 9999,
        raw: {
            forwardedNewsletterMessageInfo: {
                newsletterJid: jid,
                newsletterName: name,
                serverMessageId
            }
        }
    };
}
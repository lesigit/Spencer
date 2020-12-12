import { RunFunction } from '../../interfaces/Event';
import { Document } from 'mongoose';
import { Anything } from '../../interfaces/Anything';
import { User } from 'discord.js';

export const name: string = 'ready';
export const run: RunFunction = async (client) => {
	client.logger.success(`${client.user.tag} is now online!`);
	await client.user.setActivity(`${client.prefix}help | 👦 Spencer`, {
		type: 'WATCHING',
	});
	setInterval(async () => {
		const ReminderSchema = await client.db.load('reminder');
		(await ReminderSchema.find({})).map(async (value: Document) => {
			if (Date.now() >= (value as Anything).Time) {
				const User: User = client.users.cache.get((value as Anything).User);
				try {
					await value.delete();
					await User.send(
						`I was told to remind you: ${(value as Anything).Message}`
					);
				} catch {}
			}
		});
	}, 1000 * 60);
};

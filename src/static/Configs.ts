import { GuildChannel } from 'discord.js';
import { SubCommand } from '../interfaces/ConfigCommand';
import yn from 'yn';

export const subcommands: Array<SubCommand> = [
	{
		schema: 'usereconomy',
		key: 'VoteReminder',
		description:
			'Toggles if you want to be DMed when you can next vote on top.gg',
		search: (client, message) => new Object({ User: message.author.id }),
		validate: (message, args) => {
			const value: boolean = yn(args[0]);
			return {
				value,
				fix: `Please provide a yes/no style value, valid values: 'y', 'yes', 'true', true, '1', 1, 'n', 'no', 'false', false, '0', 0, 'on', 'off'`,
				success: value != undefined,
			};
		},
		parseToDB: (client, message, args) => yn(args[0]),
	},
	{
		schema: 'guildconfig',
		key: 'Prefix',
		description: 'Change the prefix of the bot',
		search: (client, message) => new Object({ Guild: message.guild.id }),
		validate: (client, message, args) => {
			const value =
				message.member.permissions.has('MANAGE_GUILD') && args[0].length < 5;
			return {
				value,
				fix:
					'Please make sure you have the permission MANAGE_GUILD & the prefix length is less then 5!',
				success: value,
			};
		},
		parseToDB: (client, message, args) => args[0],
	},
	{
		schema: 'guildconfig',
		key: 'SuggestionChannel',
		description:
			'Setup the suggestion channel, allowing people to suggest things',
		search: (client, message) => new Object({ Guild: message.guild.id }),
		validate: (client, message, args) => {
			let value: boolean;
			const channel: GuildChannel | undefined = client.utils.ResolveChannel(
				message,
				args[0]
			);
			if (!channel) value = undefined;
			else {
				value =
					message.member.permissions.has('MANAGE_GUILD') &&
					channel.isText() &&
					channel
						.permissionsFor(message.guild.me)
						.has(['SEND_MESSAGES', 'ADD_REACTIONS']);
			}
			return {
				value,
				fix:
					'Make sure you have MANAGE_GUILD, the channel exists, it is a text channel & I can SEND_MESSAGES & ADD_REACTIONS',
				success: !!value,
			};
		},
		parseToDB: (client, message, args) =>
			client.utils.ResolveChannel(message, args[0]).id,
	},
	{
		schema: 'guildconfig',
		key: 'AutoDeleteActions',
		description:
			'Toggles if you want to delete sp!accept,consider,deny commands',
		search: (client, message) => new Object({ Guild: message.guild.id }),
		validate: (client, message, args) => {
			const value: boolean =
				message.member.permissions.has('MANAGE_GUILD') && yn(args[0]);
			return {
				value,
				fix: `Please provide a yes/no style value, valid values: 'y', 'yes', 'true', true, '1', 1, 'n', 'no', 'false', false, '0', 0, 'on', 'off' & make sure you have MANAGE_GUILD`,
				success: value != undefined,
			};
		},
		parseToDB: (client, message, args) => yn(args[0]),
	},
	{
		schema: 'guildconfig',
		key: 'ReportChannel',
		description:
			'Set up the channel allowing people to report people in your guild',
		search: (client, message) => new Object({ Guild: message.guild.id }),
		validate: (client, message, args) => {
			let value: boolean;
			const channel: GuildChannel | undefined = client.utils.ResolveChannel(
				message,
				args[0]
			);
			if (!channel) value = undefined;
			else {
				value =
					message.member.permissions.has('MANAGE_GUILD') &&
					channel.isText() &&
					channel.permissionsFor(message.guild.me).has('SEND_MESSAGES');
			}
			return {
				value,
				fix:
					'Make sure you have MANAGE_GUILD, the channel exists, it is a text channel & I can SEND_MESSAGES',
				success: !!value,
			};
		},
		parseToDB: (client, message, args) =>
			client.utils.ResolveChannel(message, args[0]).id,
	},
	{
		schema: 'guildconfig',
		key: 'MessageLogsChannel',
		description:
			'Set up the channel allowing deleted / edited messages to be logged.',
		search: (client, message) => new Object({ Guild: message.guild.id }),
		validate: (client, message, args) => {
			let value: boolean;
			const channel: GuildChannel | undefined = client.utils.ResolveChannel(
				message,
				args[0]
			);
			if (!channel) value = undefined;
			else {
				value =
					message.member.permissions.has('MANAGE_GUILD') &&
					channel.isText() &&
					channel.permissionsFor(message.guild.me).has('SEND_MESSAGES');
			}
			return {
				value,
				fix:
					'Make sure you have MANAGE_GUILD, the channel exists, it is a text channel & I can SEND_MESSAGES',
				success: !!value,
			};
		},
		parseToDB: (client, message, args) =>
			client.utils.ResolveChannel(message, args[0]).id,
	},
];
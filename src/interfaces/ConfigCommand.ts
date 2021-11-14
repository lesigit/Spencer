import { CommandInteractionOption, CommandInteraction, Message } from 'discord.js';
import { Spencer } from '../client/Client';
export interface ValidationResponse {
	value: boolean;
	fix: string;
	success: boolean;
}

export interface SubCommand {
	schema: string;
	search: (client: Spencer, interaction: CommandInteraction) => object;
	key: string;
	description: string;
	validate: (
		client: Spencer,
		interaction: CommandInteraction,
		arg: CommandInteractionOption
	) => ValidationResponse;
	parseToDB: (client: Spencer, interaction: CommandInteraction,arg: CommandInteractionOption) => any;
}

let discord = require('discord.js');
/**
 * @param {discord.Client} client client
 * @param {discord.Message} message message
 * @param {String[]} args args
 */
module.exports.execute = async (client, message, args) => {
	let command = args[0];
	if (!command)
		return message.channel.send(`Dime el nombre del comando a buscar su info`);
	let comando = client.commands.find(x => x.config.name === command);
	if (!comando) return message.channel.send(`Comando no encontrado`);
	let config = comando.config;
	let utils = comando.utils;
	let embed = new discord.MessageEmbed()
		.setTitle('Info')
		.setColor('BLUE')
		.setTimestamp()
		.setDescription(
			`**Nombre:** \`${config.name}\`\n**Alias:** \`${
				config.alias.length !== 0 ? config.alias.join(', ') : 'Sin alias'
			}\`\n**Descripcion:** \`${config.descripcion}\`\n**Categoria:** \`${
				config.categoria
			}\`\n**Cooldown:** \`${utils.cooldown}\`\n**Permiso necesario:** \`${
				utils.permissions.length !== 0 ? utils.permissions : 'Sin permisos'
			}\`\n**NSFW:** \`${utils.nsfw}\``
		);
	message.channel.send(embed);
};
module.exports.config = {
	name: 'info',
	alias: [],
	descripcion: 'Te da la info de un comando',
	categoria: 'utilidad'
};
module.exports.utils = {
	cooldown: '3s',
	permissions: [],
	nsfw: 'no'
};

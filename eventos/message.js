module.exports = async (client, message) => {
	let discord = require('discord.js');
	let ms = require('ms');
	let prefix = '+';
	if (message.channel.type === 'dm' || message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	let args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g),
		command = args.shift().toLowerCase();
	if (!command) return;
	if (command.length > 30)
		return message.channel.send(`Comando demasiado largo`);
	let comando = client.commands.find(
		c =>
			c.config.name === command ||
			(c.config.alias && c.config.alias.includes(command))
	);
	if (!comando) return message.channel.send(`Comando no encontrado`);
	let cooldown = comando.utils.cooldown;
	let permissions = comando.utils.permissions;
	let nsfw = comando.utils.nsfw;
	if (nsfw === 'si') {
		if (!message.channel.nsfw)
			return message.channel.send(
				`No puedes usar este comando en un canal que no es nsfw!`
			);
	}
	if (permissions.length !== 0) {
		if (!message.member.hasPermission(`${permissions}`))
			return message.channel.send(`No puedes usar esto`);
	}
	if (cooldown.length === 0) cooldown = '0s';
	let now = Date.now();
	let cooldown2 = ms(cooldown);
	if (!client.cooldowns.has(comando.config.name)) {
		client.cooldowns.set(comando.config.name, new discord.Collection());
	}
	let timestamps = client.cooldowns.get(comando.config.name);
	if (timestamps.has(message.author.id + message.guild.id)) {
		let expiration =
			timestamps.get(message.author.id + message.guild.id) + cooldown2;
		if (now < expiration) {
			let time = (expiration - now) / 1000;
			return message.channel.send(
				`Espera **${time.toFixed(
					1
				)}** segundos antes de usar este comando de nuevo`
			);
		}
	}
	timestamps.set(message.author.id + message.guild.id, now);
	setTimeout(() => {
		timestamps.delete(message.author.id + message.guild.id);
	}, cooldown2);
	comando.execute(client, message, args);
};

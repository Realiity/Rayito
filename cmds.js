require('dotenv').config();
module.exports.execute = async client => {
	let { Collection } = require('discord.js');
	client.rayito = require('./rayito/rayito.json');
	client.cooldowns = new Collection();
	client.commands = new Collection();
	for (const folder of require('fs').readdirSync('./comandos')) {
		for (const file of require('fs').readdirSync('./comandos/' + folder)) {
			let config = require('./comandos/' + folder + '/' + file).config;
			client.commands.set(
				config.name,
				require('./comandos/' + folder + '/' + file)
			);
			console.log(`${folder}/${file} listo!`);
		}
	}
	for (const file of require('fs')
		.readdirSync('./eventos')
		.filter(x => x.endsWith('.js'))) {
		client.on(
			file.substring(0, file.length - 3),
			require('./eventos/' + file).bind(null, client)
		);
		console.log(`${file} listo!`);
	}
	client.login(process.env.token);
};

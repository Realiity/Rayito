let { Client } = require('discord.js'),
	client = new Client();
require('./cmds.js').execute(client);

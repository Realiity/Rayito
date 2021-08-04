module.exports = async client => {
	setInterval(async () => {
		let users = client.users.cache.size;
		let servers = client.guilds.cache.size;
		function presence() {
			client.user.setPresence({
				status: 'online',
				activity: {
					name: servers + ' servers con ' + users + ' usuarios',
					type: 'WATCHING'
				}
			});
		}
		presence();
	}, 6000);
	console.log(`Activo como ${client.user.tag} :D`);
};

const db = require('./config/db');
const socketConfig = require('./socket');
const global = require('./global');

module.exports = function (server) {
	Promise
		.all([loadCards()])
		.then(function (res) {
			global.cards = res[0];
			socketConfig(server);
		});
};

function loadCards () {
	return db().then(function (connection) {
		var res = connection.query(`
			SELECT	Cards.CardID, Cards.Name, Cards.Cost, Cards.Attack, Cards.Defense, Cards.MagicResist, Cards.Armor, Cards.Image, Cards.Type, Cards.DamageType
			FROM Cards
		`);
		connection.end();
		return res;
	}).then(function (data) {
		return data[0];
	});
}
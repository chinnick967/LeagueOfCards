const db = require('./config/db');
const socketConfig = require('./socket');
const global = require('./global');
const path = require('path');

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
		return data[0].map(savedCard => {
			var card = {};
			card.cardID = savedCard.CardID;
			card.attack = savedCard.Attack;
			card.defense = savedCard.Defense;
			card.magicresist = savedCard.MagicResist;
			card.armor = savedCard.Armor;
			card.cost = savedCard.Cost;
			card.type = savedCard.Type;
			card.name = savedCard.Name;
			card.asset = savedCard.Asset;
			card.damagetype = savedCard.DamageType;
			card.refName = path.parse(savedCard.Image).name;



			return card;
		});
	});
}
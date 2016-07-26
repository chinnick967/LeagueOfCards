function checkeffects(core, type) {

    // player 1's effects
    for (var i = 6; i <= 10; i++) {
        checkeffect(core, core.board['s' + i], type);
    }

    for (var i = 0; i < core.player1.graveyard.length; i++) {
        checkeffect(core, core.player1.graveyard[i], type);
    }

    // player 2's effects
    for (var i = 16; i <= 20; i++) {
        checkeffect(core, core.board['s' + i], type);
    }

    for (var i = 0; i < core.player2.graveyard.length; i++) {
        checkeffect(core, core.player2.graveyard[i], type);
    }

}

function checkeffect(core, card, type) {

    if (typeof(card) != 'undefined' && card != '') {

        var effect = card.effect;
        
        if (effect.trigger == 'summon' && effect.activated == 0 && type == 'summon') {
            effect.activate();
        } else if (effect.trigger == 'death' && effect.activated == 0 && card.defense == 0) {
            effect.activate();
        } else if (effect.trigger == 'turnstart' && type == 'turnstart' && effect.activated == 0) {
            effect.activate();
        }

    }
}

function geteffect(core, card, name, player) {

     var copy = Object.assign({}, card);
     var effect = cardeffects(core, name, player);
     effect.card = copy;
     effect.activated = 0;

     return effect;

}

function createeffects(core) {

    core.effects.goldincome = function(core, effect, player, amount) {
            addanimation(core, 'goldincome', 5, 38.2, var1 = player, var2 = '', var3 = '');
            core['player' + player].goldincome += amount;
    }

    core.effects.playcreature = function(core, effect, player, card) {

            var slot = 0;

            if (player == 1) {
                for (var i = 6; i <= 10; i++) {
                    if (core.board['s' + i] == '' || typeof(core.board['s' + i]) == 'undefined') {
                        slot = i;
                        i = 11;
                    }
                }
            } else if (player == 2) {
                for (var i = 16; i <= 20; i++) {
                    if (core.board['s' + i] == '' || typeof(core.board['s' + i]) == 'undefined') {
                        slot = i;
                        i = 21;
                    }
                }
            }

            if (slot != 0) {
                playcard(core, card, player, slot);
            }
    }

    core.effects.damagetower = function(core, effect, player, damage) {
        damagetower(core, damage, player);

        if (player == 1) {
            addanimation(core, 'attack', -6, -2, var1 = '', var2 = '', var3 = '');
        } else if (player == 2) {
            addanimation(core, 'attack', -6, 90, var1 = '', var2 = '', var3 = '');
        }
    }

    core.effects.addattack = function(core, effect, player, amount) {
        effect.card.attack += amount;
    }

    core.effects.destroycard = function(core, effect, position) {
        destroycard(core, position);
    }

    core.effects.healcard = function(core, effect, target, amount) {

        addanimation(core, 'heal', 300, 300, var1 = target, var2 = '', var3 = '');
        getboardposition(core, target);
	    addanimation(core, 'cardhealth', core.information.topposition - 5, core.information.leftposition, var1 = amount, var2 = 'left', var3 = '');

        var target = core.board['s' + target];
        var aura = auras(core, target);
        var maxhealth = target.maxhealth + aura.defense;

        if (target.defense + amount >= target.maxhealth) {
            target.defense = target.maxhealth;
        } else {
            target.defense += amount;
        }
    }

}
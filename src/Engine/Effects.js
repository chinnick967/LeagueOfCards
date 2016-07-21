function checkeffects(core) {

    // player 1's effects
    for (var i = 6; i <= 10; i++) {
        checkeffect(core, core.board['s' + i]);
    }

    for (var i = 0; i < core.player1.graveyard.length; i++) {
        checkeffect(core, core.player1.graveyard[i]);
    }

    // player 2's effects
    for (var i = 16; i <= 20; i++) {
        checkeffect(core, core.board['s' + i]);
    }

    for (var i = 0; i < core.player2.graveyard.length; i++) {
        checkeffect(core, core.player2.graveyard[i]);
    }

}

function checkeffect(core, card) {

    if (typeof(card) != 'undefined' && card != '') {

        var effect = card.effect;
        
        if (effect.trigger == 'summon' && effect.activated == 0) {
            effect.activate();
        } else if (effect.trigger == 'death' && effect.activated == 0 && card.defense == 0) {
            effect.activate();
        }

    }
}

function geteffect(core, name, player) {

     var effect = cardeffects(core, name, player);
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
                        i = 11;
                    }
                }
            }

            if (slot != 0) {
                playcard(core, card, player, slot);
            }
    }

}
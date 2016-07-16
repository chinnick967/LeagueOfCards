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
            core['player' + player].goldincome += amount;
    }

}
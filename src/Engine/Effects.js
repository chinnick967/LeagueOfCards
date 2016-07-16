function checkeffects(core) {

    // player 1's effects
    for (var i = 6; i <= 10; i++) {
        checkeffect(core, i);
    }

    // player 2's effects
    for (var i = 16; i <= 20; i++) {
        checkeffect(core, i);
    }

}

function checkeffect(core, position) {

    if (typeof(core.board['s' + position]) != 'undefined' && core.board['s' + position] != '') {

        var effect = core.board['s' + position].effect;
        
        if (effect.trigger == 'summon' && effect.activated == 0) {
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
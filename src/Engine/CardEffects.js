function cardeffects(core, name, player) {

    var effect = {};

    if (name == 'Blue Caster Minion') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 1);
            effect.activated = 1;
        }
    } else if (name == 'Vilemaw') {
        effect.trigger = 'death';
        effect.targeted = 0;

        if (player == 1) {
            effect.player = 2;
        } else if (player == 2) {
            effect.player = 1;
        }
        
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 2);
            effect.activated = 1;
        }
    } else if (name == 'Blue Melee Minion') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 1);
            effect.activated = 1;
        }
    } else {
        effect.trigger = 'none';
    }

    return effect;

}
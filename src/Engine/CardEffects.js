function cardeffects(core, name, player) {

    var effect = {};

    if (name == 'Blue Caster Minion') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 1);
        }
    } else {
        effect.trigger = 'none';
    }

    return effect;

}
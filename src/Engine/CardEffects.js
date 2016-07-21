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
    } else if (name == 'Azir') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (effect.player == core.information.player) {
                var card = jQuery.extend(true, {}, searchassets(core, 'Sand Soldier'));
                var card2 = jQuery.extend(true, {}, searchassets(core, 'Sand Soldier'));
                core.effects.playcreature(core, effect, effect.player, card);
                setTimeout(function(){ core.effects.playcreature(core, effect, effect.player, card2); }, 600);
            }
            effect.activated = 1;
        }
    } else if (name == 'Blue Seige Minion') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 1);
            effect.activated = 1;
        }
    } else if (name == 'Blue Melee Minion') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 2);
            effect.activated = 1;
        }
    } else if (name == 'Gangplank') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 1);
            effect.activated = 1;
        }
    } else if (name == 'Gangplank Barrel') {
        effect.trigger = 'summon';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 2);
            effect.activated = 1;
        }
    } else if (name == 'Loaded Dice') {
        effect.trigger = 'activate';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            core.effects.goldincome(core, effect, effect.player, 2);
            effect.activated = 1;
        }
    } else {
        effect.trigger = 'none';
    }

    return effect;

}
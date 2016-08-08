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
    } else if (name == 'Chomp') {
        effect.trigger = 'activate';
        effect.targeted = 0;

       if (player == 1) {
            effect.player = 2;
        } else if (player == 2) {
            effect.player = 1;
        }

        effect.activate = function() {
            core.effects.damagetower(core, effect, effect.player, 3);
            effect.activated = 1;
        }
        
    } else if (name == 'Nasus') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.addattack(core, effect, 1);
            }
        }
        
    } else if (name == 'Suicide Frog') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.destroycard(core, effect, effect.card.position);
                effect.activated = 1;
            }
        }
        
    } else if (name == 'Astral Infusion') {
        effect.trigger = 'activate';
        effect.targeted = 1;
        effect.player = player;
        effect.checktarget = function(core, card, target) {
            var target = core.board['s' + target];
            if (typeof(target) != 'undefined' && target != '' && target.type != 'Spell') {
                return true;
            } else {
                return false;
            }
        }
        effect.activate = function(target) {
            if (core.information.turn == effect.player) {
                core.effects.healcard(core, effect, target, 3);
            }
        }
        
    } else if (name == 'Masked Shaco') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.reduceincome(core, effect, 1, 1);
                core.effects.reduceincome(core, effect, 2, 1);
            }
        }
        
    } else if (name == 'Rammus') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.addarmor(core, effect, 1);
            }
        }
        
    } else if (name == 'Sion') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.addmaxhealth(core, effect, 1);
            }
        }    
    } else if (name == 'Dr Mundo') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            if (core.information.turn == effect.player) {
                core.effects.healcard(core, effect, effect.card.position, 2);
            }
        }    
    } else if (name == 'Eggnivia') {
        effect.trigger = 'turnstart';
        effect.targeted = 0;
        effect.player = player;
        effect.turns = 0;
        effect.activate = function() {
            if (effect.player == core.information.turn) {
                effect.turns += 1;
            }
            if (effect.player == core.information.player && effect.player == core.information.turn && effect.turns == 2) {
                core.effects.destroycard(core, effect, effect.card.position);
                var card = jQuery.extend(true, {}, searchassets(core, 'Anivia'));
                core.effects.playcreature(core, effect, effect.player, card, effect.card.position);
                effect.activated = 1;
            }
        }
    } else if (name == 'Anivia') {
        effect.trigger = 'death';
        effect.targeted = 0;
        effect.player = player;
        effect.activate = function() {
            var card = jQuery.extend(true, {}, searchassets(core, 'Eggnivia'));
            core.effects.playcreature(core, effect, effect.player, card, effect.card.position);
            effect.activated = 1;
        }
    } else {
        effect.trigger = 'none';
    }

    return effect;

}
function drawSound(core) {

	if (core.settings.sound >= 1) {
		
		ctx.fillStyle = 'rgba(215, 44, 44, 0.5)';
		ctx.fillRect(core.information.pwidth * 4.7, core.information.pheight * 96.7, core.information.pwidth * .5, core.information.pheight * 2);
		
	}

	if (core.settings.sound >= 2) {
		
		ctx.fillStyle = 'rgba(209, 184, 44, 0.5)';
		ctx.fillRect(core.information.pwidth * 6, core.information.pheight * 95.5, core.information.pwidth * .5, core.information.pheight * 3.4);
		
	}

	if (core.settings.sound >= 3) {
		
		ctx.fillStyle = 'rgba(82, 198, 44, 0.5)';
		ctx.fillRect(core.information.pwidth * 7.4, core.information.pheight * 94.5, core.information.pwidth * .5, core.information.pheight * 4.4);
		
	}

	if (core.settings.sound >= 4) {
		
		ctx.fillStyle = 'rgba(103, 173, 245, 0.5)';
		ctx.fillRect(core.information.pwidth * 8.8, core.information.pheight * 93.5, core.information.pwidth * .5, core.information.pheight * 5.4);
		
	}
	// Draw the sound bar image
	utils.drawImage(ctx, core.sprites.icons.soundimg, core.information.pwidth * 4.5, core.information.pheight * 93, core.information.pwidth * 5, core.information.pheight * 6);

}

function soundinit(core) {
	
	$('#GameCanvas').click(function(){
	
		if (core.information.xoffset >= 4.3 && core.information.xoffset <= 5.5 && core.information.yoffset >= 96 && core.information.yoffset <= 98) {
			
			core.settings.sound = 1;
			
		}
		
		else if (core.information.xoffset >= 5.6 && core.information.xoffset <= 6.9 && core.information.yoffset >= 94.5 && core.information.yoffset <= 98) {
			
			core.settings.sound = 2;
			
		}
		
		else if (core.information.xoffset >= 7.1 && core.information.xoffset <= 8.4 && core.information.yoffset >= 93.5 && core.information.yoffset <= 98) {
			
			core.settings.sound = 3;
			
		}
		
		else if (core.information.xoffset >= 8.5 && core.information.xoffset <= 9.7 && core.information.yoffset >= 92.5 && core.information.yoffset <= 98) {
			
			core.settings.sound = 4;
			
		}
	
	});
	
	$('#GameCanvas').hover(function(){
	
		if (core.information.xoffset >= 4.3 && core.information.xoffset <= 5.5 && core.information.yoffset >= 96 && core.information.yoffset <= 98) {
			
			document.getElementById("GameCanvas").style.cursor = "pointer";

		}
		
		else if (core.information.xoffset >= 5.6 && core.information.xoffset <= 6.9 && core.information.yoffset >= 94.5 && core.information.yoffset <= 98) {
			
			document.getElementById("GameCanvas").style.cursor = "pointer";
			
		}
		
		else if (core.information.xoffset >= 7.1 && core.information.xoffset <= 8.4 && core.information.yoffset >= 93.5 && core.information.yoffset <= 98) {
			
			document.getElementById("GameCanvas").style.cursor = "pointer";
			
		}
		
		else if (core.information.xoffset >= 8.5 && core.information.xoffset <= 9.7 && core.information.yoffset >= 92.5 && core.information.yoffset <= 98) {
			
			document.getElementById("GameCanvas").style.cursor = "pointer";
			
		}
	
	});
	
}

function sound(src) {
	
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
		this.sound.pause();
		this.sound.currentTime = 0;
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
	this.volume = function(vol) {
		this.sound.volume = vol;
	}
	this.loop = function() {
		this.sound.loop = true;
	}
}

function createsounds(core) {

	core.sounds = {};

	// background music
	core.sounds.background = new sound('Assets/Sounds/TheBoyWhoShatteredTime.mp3');
	core.sounds.background.volume(.1);
	core.sounds.background.loop();
	core.sounds.background.play();

	// play card
	core.sounds.playcard = new sound('Assets/Sounds/spell2.wav');

	// destroy tower
	core.sounds.destroytower = new sound('Assets/Sounds/towerdestroy.wav');

	// swipe attack
	core.sounds.swipe = new sound('Assets/Sounds/swipe.mp3');

	// earn gold
	core.sounds.gold = new sound('Assets/Sounds/gold.wav');

	// tower damage
	core.sounds.towerdamage = new sound('Assets/Sounds/towerdamage.mp3');

	// declare attack
	core.sounds.attack = new sound('Assets/Sounds/roar.mp3');

	// draw card
	core.sounds.drawcard = new sound('Assets/Sounds/drawcard.wav');

	// destroy card
	core.sounds.destroycard = new sound('Assets/Sounds/carddestroy.wav');
}
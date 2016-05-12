/************************************
Author: Eric A. Boateng
Title: Super Missile Command Bros.
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

$(document).ready(function (){

"use strict";
console.log("Game loaded and linked.");

var video = document.querySelector("video");
video.pause();

// Original Gameboy-based Preloader //
var nintendo = new Audio("audio/gameboy_start.mp3");
$("#antwisted").show();
setTimeout(function (){
	nintendo.play();
	setTimeout(function (){
		$("#blk_begin").fadeOut(2000);
		setTimeout(function (){
			game_start();
			setTimeout(function (){
				$("#blk_begin").remove();
			}, 2000);
		}, 1500);
	}, 2500);
}, 3800);

// Game Function Managing All Loops //
var game_start = function () {

// Splash Screen Functions //
	$("#front_container").fadeIn(2500);
	$("#fc_one").fadeIn(2500);
	$("#front_bg").fadeIn(2500);
	
	var bowser_boast = function () { 
		setTimeout(function (){
			if (video.currentTime > 60) {
			// $(".bowser").show(); // dual animations?
			$("#first").show();
			setTimeout(function (){
				$("#first").hide();
				$("#second").show();
				setTimeout(function (){
					$("#second").hide();
					$("#third").show();
					setTimeout(function (){
						$("#third").fadeOut(2000);
						// $(".bowser").fadeOut(2000);
						setTimeout(function(){
							// $(".bowser").show();
							$("#fourth").show();
							setTimeout(function(){
								$("#fourth").hide();
								$("#fifth").show();
								setTimeout(function (){
									$("#fifth").fadeOut(2000);
									// $(".bowser").fadeOut(2000);
								}, 2500);
					 		}, 2500);
						}, 3100);
					}, 3000);
				}, 2750);
			}, 2400);
			}
		}, 63800);
	};

	video.play();
	bowser_boast();


/************
AUDIO CONTROLS
************/

// Audio Variables //
	var mario_start = new Audio("./audio/sm64_mario_lets_go.wav"),
			yahoo = new Audio("./audio/sm64_mario_yahoo.wav"),
			here_we_go = new Audio("./audio/sm64_mario_here_we_go.wav"),
			bg_lvl1 = new Audio("./audio/ground-theme.mp3"),
			bg_lvl2 = new Audio("./audio/13-super-mario-rap.mp3"),
			bg_lvl3 = new Audio("./audio/30-koopa-s-theme.mp3"),
			boss_lvl = new Audio("./audio/32-ultimate-koopa.mp3"),
			lvl_clear = new Audio("./audio/04-area-clear.mp3"),
			game_clear = new Audio("./audio/04-level-clear.mp3"),
			power_up = new Audio("./audio/03-power-up.mp3"),
			life_up = new Audio("./audio/18-1-up.mp3"),
			star_time = new Audio("./audio/07-invincible-starman.mp3"),
			mario_down = new Audio("./audio/15-1-down.mp3"),
			mario_over = new Audio("./audio/sm64_mario_game_over.wav"),
			game_over = new Audio("./audio/16-game-over.mp3"),
			game_over2 = new Audio("./audio/36-game-over.mp3"),
			thank_you = new Audio("./audio/sm64_mario_thank_you.wav"),
			now_playing;


// HTML5 Video Options //	
	var video_mute = $("#sound").on('click', function (){
		var mute = $(video).prop("muted");
		if (mute) {
			$(video).prop("muted", false);
			$("#sound").text("Sound: ON");
		}
		else {
			$(video).prop("muted", true);
			$("#sound").text("Sound: OFF");
		}
	});
	// Used .prop() Instead of .attr() To Determine Node Property Values

// In Game Music Options //
	var game_mute = $("#mute_sound").on('click', function (){
		if (now_playing.muted) {
			now_playing.muted = false;
			$("#mute_sound").removeClass("mute_sound");
		} else {
			now_playing.muted = true;
			$("#mute_sound").addClass("mute_sound");
		}
	});


/************
BUTTONS
************/

// Front Page: Initiate Game //
	var start_button = $("#start").on('click', function (){
		video.pause();
		here_we_go.play();

		var game_start = function(){
			$("#front_bg").fadeOut(3000);
			$("#front_container").fadeOut(2000);
			setTimeout(function (){
				$("#game_bg").fadeIn(2000);
				$("#game_container").fadeIn(2000);
				setTimeout(function (){
					play_smcb();
				}, 2000);
			}, 2000);
		}
		setTimeout(game_start, 2000);
	});

// Front Page: How To Play //
	var howto_button = $("#how_to").on('click', function (){
		$("#fc_one").hide();
		$("#fc_two").show();
	});

// Front Page: Copyright Statement //
	var copyright = $("#copyright").on('click', function (){
		$("#fc_one").hide();
		$("#fc_three").show();
	});

// Front Page: Go Back To Main Container //
	var goback_button = $(".go_back").on('click', function (){
		$("#fc_two").hide();
		$("#fc_three").hide();
		$("#fc_one").show();
	});

// Back Page: Return To Splash //
	var gohome_button = $("#go_home").on('click', function (){
		$("#back_bg").fadeOut(1200);
		$("#back_container").fadeOut(1200);
		$("#front_bg").fadeIn(2000);
		$("#front_container").fadeIn(2000);
		$("#fc_one").fadeIn(2000);
		video.load();
		bowser_boast();
	});

// Back Page: Play Again //
	var playagain_button = $("#play_again").on('click', function (){
		$("#back_bg").hide();
		$("#back_container").hide();
		$("#game_bg").show();
		$("#game_container").show();
		play_smcb();
	});


/************
GAME BODY
************/

// Primary Game Function //
var play_smcb = function (){

// In Game: Default Variables //
	var score_box = $("#score_box");
	$(score_box).html("<p id='score_box' class='gametext_med'>MARIO&nbsp;*3<br />000000</p>");
	var time_box = $("#time_box");
	$(time_box).html("<p id='time_box' class='gametext_med'>TIME<br />00:00</p>");
	var score_e = $("#score_");
	var time_e = $("#time");
	var game_area = $("#game_bg");
	var time_lapse = 0,
			final_score = 0,
			deployed = 0,
			destroyed = 0,
			sec = 0,
			min = 0,
			hrs = 0,
			missiles_present = 0,
			score_amount = 0,
			hit_points = 0,
			filter_check = 0,
			clockbreaker = false,
			level = 1,
			life = 3,
			difficulty = 0,
			clock, time_output, score_output, missile_run, random, pick, fire_missile, val;

// Game Page: Pause Game Button //
	var pause_game = $("#pause_game").on('click', function(){
		alert("The game has been paused. Press okay to return to the game.");
	});	

// Game Page: Quit Function //
	var quit_game = function (){
		var exit = confirm("Are you sure you want to quit?");
		if (exit) {
			return filter(true, null);
		} else {
			console.log("User quit option: " + exit);
			return game_running = true;
		}
	}

	var exit_game = function(end, win){
		if (end) {
			now_playing.pause();
			now_playing.volume = 1;
			clearInterval(clock);
			clearInterval(launch_missiles);
			setTimeout(function (){
				mario_over.play();
				$(game_area).off();
				now_playing.load();
				setTimeout(function (){
					var endscreen = $("<div id='blk_end'></div>");
					var over_logo = $("<div id='game_over'></div>");
					game_area.append(endscreen).append(over_logo);
					game_over.play();
					setTimeout(function (){
						$("#game_bg").fadeOut(2000);
						$("#game_container").fadeOut(2000);
						now_playing = bg_lvl1;
						now_playing.load();
						$("#back_bg").fadeIn(2000);
						$("#back_container").fadeIn(2000);
						setTimeout(function (){
							endscreen.remove();
							over_logo.remove();
							if (data.thanks === false) {
								thank_you.play();
								data.thanks = true;
							}
						}, 3500);
						return (function(){
							game_running = false;
							data.level = level;
							data.time = time_lapse;
							data.score = final_score;
							console.log("Game running status: " + game_running);
							$("#level").html("Level " + data.level);
							$("#time").html(Math.floor(data.time/60) + ":" + (data.time%60 >= 10 ? data.time%60 : "0"+data.time%60));
							$("#score").html(data.score);
							if (data.score > data.hscore) {
								data.hscore = data.score;
								$(".hscore").show();
							} else {
								$(".hscore").hide();
							}
						})();
					}, 6000);
				}, 1500);
			}, 1500);
		}

		if (win) {
			// Some end sequence
			now_playing.pause();
			now_playing.volume = 1;
			clearInterval(clock);
			clearInterval(launch_missiles);
			yahoo.play();
			console.log("Somebody actually won this impossible game. Damn.");
			setTimeout(function (){
				$(game_area).off();
				game_clear.play();
				now_playing.load();
				setTimeout(function (){
					var over_logo = $("<div id='game_over'></div>");
					game_area.append(over_logo);
					setTimeout(function (){
						$("#game_bg").fadeOut(2000);
						$("#game_container").fadeOut(2000);
						now_playing = bg_lvl1;
						now_playing.load();
						$("#back_bg").fadeIn(2000);
						$("#back_container").fadeIn(2000);
						setTimeout(function (){
							game_over2.play();
							setTimeout(function (){
								endscreen.remove();
								over_logo.remove();
								if (data.thanks === false) {
									thank_you.play();
									data.thanks = true;
								}
							}, 2500);
						}, 1200);
						return (function(){
							game_running = false;
							data.level = level;
							data.time = time_lapse;
							data.score = final_score;
							console.log("Game running status: " + game_running);
							$("#level").html("Level " + data.level);
							$("#time").html(Math.floor(data.time/60) + ":" + (data.time%60 >= 10 ? data.time%60 : "0"+data.time%60));
							$("#score").html(data.score);
							if (data.score > data.hscore) {
								data.hscore = data.score;
								$(".hscore").show();
							} else {
								$(".hscore").hide();
							}
						})();
					}, 6000);
				}, 1500);
			}, 1500);
		}
	};

	var filter = function (end, win){
		filter_check++;
		if (filter_check === 1) {
			exit_game(end, win);
		} else {
			return false;
		}
	};

	// Game Page: Quit With Esc Key
 	$(document).on('keyup', function(e){
		if (e.keyCode === 27 && game_running) {
			quit_game();
		}
	return false;
	});
	
	// In Game: Time Function
	var time_val = function(){
		time_lapse++;
		sec++;	
		
		// Clock Processes
		if (sec <= 9) {
			time_output = hrs+""+min+":0"+sec;
		} else if (sec <= 59) {
			time_output = hrs+""+min+":"+sec;
		} else if (sec === 60) {
			min++;
			sec = 0;
			time_output = hrs+""+min+":00";
			
			if (min % 10 === 0) {
				hrs++;
				min = 0;

				// Clock Breaker - Spec. Infinity Mode
				// if (hrs === 10) {
				// 	time_box.html("<p id='time_box' class='gametext_med'>BROKEN!<br />99:99</p>");
				// 	clockbreaker = true;
				// 	return clearInterval(clock);
				// }
				time_output = hrs+"0:00";
			}
		}

// Display Output //
		if (game_running) {
			time_box.html("<p id='time_box' class='gametext_med'>TIME</br>" + time_output + "</p>");
		}
	return time_lapse;
	};

// In Game: Initiate Time //
	var runtime = function(tick){
		// Clock Breaker - Spec. Infinity Mode
		// if (clockbreaker) {
		// 	return console.log("The force is strong with this one...")
		// }
		clock = setInterval(tick, 1000);
	return clock;
	};

// In Game: Score Function //
	var score_val = function(score, skip){
		if (!skip) {
			val = score.toString();
			for (var j = 6; val.length < j;) {
				val = "0" + val;
			}
		}

		if (game_running) {
		score_box.html("<p id='score_box' class='gametext_med'>MARIO&nbsp;*" + (life > 0 ? life : 0) + "</br>" + val + "</p>");
		} 
	return final_score = parseInt(val)
	};

// Random Missle Trajectory //
	var randomizer = function(missile_id){
		pick = Math.round(Math.random() * 11);
		switch (missile_id) {
			case "b":
				random = ["blk_one", "blk_two", "blk_three", "blk_four", "blk_five", "blk_six", "blk_seven", "blk_eight", "blk_nine", "blk_ten", "blk_eleven", "blk_twelve"];
				break;
			case "r":
				random = ["red_one", "red_two", "red_three", "red_four", "red_five", "red_six", "red_seven", "red_eight", "red_nine", "red_ten", "red_eleven", "red_twelve"];
				break;
			case "f":
				random = ["fire_one", "fire_two", "fire_three", "fire_four", "fire_five", "fire_six", "fire_seven", "fire_eight", "fire_nine", "fire_ten", "fire_eleven", "fire_twelve"];
				break;
			default:
				console.log("An error has occurred within the game. Please exit if issues persist.")
				create_missile();
		}
	return random[pick];
	};

// Random Missile Fire //
	var randomfire = function (){
		return Math.round(Math.random(3000) * 10000);
	};

// Create Missle Functions //
	var create_missile = function(missile_id){
		if (game_running) {
			var x,
				missile = {
					blk : $("<div class='blk_missile'></div>"),
					red : $("<div class='red_missile'></div>"),
					fire : $("<div class='fire_missile'></div>")	
				},
				lvl = function (){
					if (level === 1) {
						x = missile.blk.css({
							"animation": randomizer("b") + " 9s linear"
						});
					}

					if (level === 2) {
						x = missile.red.css({
							"animation": randomizer("r") + " 9s linear"
						});
					}

					if (level === 3) {
						x = missile.fire.css({
							"animation": randomizer("f") + " 9s linear"
						});
					}
				};

			if (missile_id) {
				switch (missile_id) {
					case 1:
						x = missile.blk.css({
							"animation": randomizer("b") + " 9s linear"
						});
						break
					case 2:
						x = missile.red.css({
							"animation": randomizer("r") + " 9s linear"
						});
						break
					case 3:
						x = missile.fire.css({
							"animation": randomizer("f") + " 9s linear"
						});
						break
					default:
						console.log("There was trouble processing missile_id information.")
						lvl();		
				}
			} else {
				lvl();
			}

			// Check For Randomizer Error
			var check1 = x.attr("class").split(' ');
  		check1.forEach(function (i){
				if (i === "undefined") {
					x.remove();
	    		return create_missile();
	    	}
	    });

			// Add Missiles & Impact Detection
			missiles_present += 1;
	    deployed += 1;
			setTimeout(function(){
	    	game_area.append(x);
	    	x.addClass("noclick");
	    	setTimeout(function (){
	    		var check2 = x.attr("class").split(' ');
	    		check2.forEach(function (i){
						if (i === "noclick") {
							x.addClass("active").fadeOut(700);
				    	setTimeout(function (){
			    			x.remove();	
			    		}, 2000);
			    		hit_points += 1;
			    		life -= 1;
			    		score_val(0, true);
			    		if (hit_points >= 3) {
			    			return filter(true, null);
			    		}
			    	}
			    });
				}, 8300);
			}, randomfire);

			// Missile Destroyed
			x.on("click", function(){
				x.off().removeClass("noclick");
				setTimeout(function (){
					x.addClass("active").fadeOut(1200);
			    score_amount += 20;
			    check1.forEach(function (i){
						if (i === "red_missile") {
							score_amount += 30;
			    	}
			    	if (i === "fire_missile") {
							score_amount += 80;
			    	}
			    });
			    score_val(score_amount);
			    missiles_present -= 1;
			    destroyed += 1;
			    setTimeout(function (){
			    	x.remove();	
			    }, 3000);
				}, 350);
  		});

  		// Win The Game
			if (deployed >= 240) {
				filter(null, true);
			}
	  } else {
	  	return (function (){
	  		console.log("Clearing all missile intervals.")
	  		clearInterval(launch_missiles);
	  	})();
	  }
    return x;
	};
	// Set Oncoming Missiles
	var launch_missiles = setInterval(create_missile, 2500);

// Difficulty Increment: Missile Waves //
	var missile_push = function (lvl){
		var launch_array = [];

		// Level 1 Deployment Model
		if (lvl === 1) {
			launch_array = [1, 1, 1];
			return launch_array.forEach(function (e){
				setTimeout(function (){
					create_missile(e);
				}, randomfire);
			});
		}
		
		// Level 2 Deployment Model
		if (lvl === 2) {
			launch_array = [1, 1, 2, 2, 2];
			return launch_array.forEach(function (e){
				setTimeout(function (){
					create_missile(e);
				}, randomfire);
			});
		}

		// Level 3 Deployment Model
		if (lvl === 3) {
			launch();
			launch_array = [2, 2, 3, 3, 3, 1, 1];
			return launch_array.forEach(function (e){
				setTimeout(function (){
					create_missile(e);
				}, randomfire);
			});
		}
	};

// Difficulty Increment: Multiple Intervals //	
	var launch = function (){

		if (deployed < 7) {
			launch_missiles;
			difficulty++;
		}

		if ((difficulty === 1) && (level === 3)) {
			launch_missiles;
			difficulty++;
		}

		if ((deployed > 150) && (difficulty < 2)) {
			launch_missiles;
			difficulty++;
		}
		return false;
	};

// Create Fireball Functions //
	var create_fireball = function(x, y){
		var fireball = $("<div class='fireball'></div>");
		game_area.append(fireball);
		fireball.animate({
			left: x+"px",
			top: y+"px",
		}, 200);
		var f = function(){
			fireball.animate({
				opacity: 0
			}, 500);
			fireball.remove();
		}
		setTimeout(f, 300);

		var boom = $("<div class='explode'></div>");
		boom.css({
			"left": x+"px",
			"top": y+"px",
			// not working
			"transform": "translate(-"+(x/2)+"px, -"+(y/2)+"px)"
		})
		setTimeout(function (){
			game_area.append(boom)
			setTimeout(function (){
	    	boom.fadeOut(2200)
	  		setTimeout(function (){
	    		boom.remove();
	    	}, 3000);
	    }, 1000);
	  }, 300);
  };

  // Mini Bosses - Spec. Level Additions
  // var create_boss = function (lvl){
	//   var boo;
	//   var wario;
	//   var bowswer;
	//   launch();
  // };

  // var create_multiplier = function (lvl){
  // 	launch();
  // };

// Select Level Function //
	var select_level = function (start){
		if (!now_playing) {
			now_playing = bg_lvl1;
			now_playing.volume = 1;
		}

		if (!data.force3) {
			if (start || (deployed < 50)) {
				level = 1;
				console.log("Current Level: " + level);
				setTimeout(function (){
						now_playing.volume = 1;
						now_playing.play();
				}, 1000);
			}

			if (deployed === 50) {
				level = 2;
				console.log("Level increment achieved.");
				console.log("Current Level: " + level);
				if (now_playing !== bg_lvl2) {
					now_playing.volume = .5;
					setTimeout(function (){
						now_playing.pause();
						now_playing = bg_lvl2;
						now_playing.volume = 1;
						setTimeout(function (){
							now_playing.play();
						}, 1000);
					}, 2000);
				}
			}

			if ((deployed > 50) && (deployed < 120)) {
				level = 2;
				console.log("Current Level: " + level);
				if (now_playing !== bg_lvl2) {
					now_playing.volume = .5;
					setTimeout(function (){
						now_playing.pause();
						now_playing = bg_lvl2;
						now_playing.load();
						now_playing.volume = 1;
						setTimeout(function (){
							now_playing.play();
						}, 1000);
					}, 2000);
				}
			}
		}

		if ((deployed === 120) || data.force3) {
			level = 3;
			console.log("Level increment achieved.");
			console.log("Current Level: " + level)
			if (now_playing !== bg_lvl3) {
				now_playing.volume = .5;
				setTimeout(function (){
					now_playing.pause();
					now_playing = bg_lvl3;
					now_playing.volume = 1;
					setTimeout(function (){
						now_playing.play();
					}, 1000);
				}, 2000);
			}
		}

		if ((deployed > 120) && (deployed < 240)) {	
			level = 3;
			console.log("Current Level: " + level);
			if (now_playing !== bg_lvl3) {
				now_playing.volume = .5;
				setTimeout(function (){
					now_playing.pause();
					now_playing = bg_lvl3;
					now_playing.load();
					now_playing.volume = 1;
					setTimeout(function (){
						now_playing.play();
					}, 1000);
				}, 2000);
			}
		}

		now_playing.loop = true;
	return level;
	};

// Initialize SMCB Gameplay //
  var start = function (){
		game_running = true;
		console.log("Game running status: " + game_running);
		runtime(time_val);
		$("#quit_game").on('click', quit_game);
		$(game_area).on('click', function(e){
			return create_fireball(e['clientX'], e['clientY']);
		});
	};
	start();
	launch();
	select_level(start);

// Game Monitor //
	$(document).on('mousemove', function(){
		if (deployed === 50 || deployed === 120) {
			select_level();
		}
		if (deployed % 10 === 0 && level < 3) {
			missile_push(level);
		}
		if (deployed % 12 === 0 && level === 3) {
			missile_push(level);
		};
	});
	
// End play_scmb() //
	}
// End game_start() //
	}
// End (document).ready() //
});
// Game Status Monitor and Record Data Object
var game_running, data = { level: 1, time: 0, score: 0, hscore: 0, thanks: false, force3: false };
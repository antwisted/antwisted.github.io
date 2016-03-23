/************************************
Author: Eric A. Boateng
Title: Super Missile Command Bros.
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

$(document).ready(function (){
// The remove() method removes the selected elements,
// including all text and child nodes.
// This method also removes data and events of the selected elements.
// To remove the elements without removing data and events,
// use the detach() method instead. To remove only the content from
// the selected elements, use the empty() method.
// Usage:
// $("button").click(function(){
//     $("p").remove();
// });

	"use strict";
	console.log("Game loaded and linked.");


	var video = document.querySelector("video");
	var game_running = false;

	// var firepoint = $("<style>").text("");
	// $("head").append(firepoint);
	
	video.play();
	$("#front_bg").show();
	$("#front_container").show();
	$("#fc_one").show();
	// video.pause();
	// $("#game_bg").show();
	// $("#game_container").show();


/************
AUDIO CONTROLS
************/
	var mario_start = new Audio("./audio/sm64_mario_lets_go.wav");

	// Used .prop() Instead of .attr() To Determine Node Property Values
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

	var game_mute = function (){

	};


/************
BUTTONS
************/
	// Front Page: Initiate Game
	var start_button = $("#start").on('click', function (){
		video.pause();
		mario_start.play();

		var game_start = function(){
			$("#front_bg").hide();
			$("#front_container").hide();
			$("#game_bg").show();
			$("#game_container").show();
			play_smcb();
		}
		setTimeout(game_start, 1000);
	});

	// Front Page: How To Button
	var howto_button = $("#how_to").on('click', function (){
		$("#fc_one").hide();
		$("#fc_two").show();
	});

	// Front Page: Copyright Statement
	var copyright = $("#copyright").on('click', function (){
		$("#fc_one").hide();
		$("#fc_three").show();
	});

	// Front Page: Go Back Button
	var goback_button = $(".go_back").on('click', function (){
		$("#fc_two").hide();
		$("#fc_three").hide();
		$("#fc_one").show();
	});

	// Back Page: Return Start Page
	var gohome_button = $("#go_home").on('click', function (){
		video.load();
		$("#back_bg").hide();
		$("#back_container").hide();
		video.play();
		$("#front_bg").show();
		$("#front_container").show();
		$("#fc_one").show();
	});

	// Back Page: Play Again Button
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
var play_smcb = function (){

	// In Game: Audio Variables
	var yahoo = new Audio("./audio/sm64_mario_yahoo.wav"),
		here_we_go = new Audio("./audio/sm64_mario_here_we_go.wav"),
		bg_lvl1 = new Audio("./audio/ground-theme.mp3"),
		bg_lvl2 = new Audio("./audio/13-super-mario-rap.mp3"),
		lvl_clear = new Audio("./audio/04-area-clear.mp3"),
		game_clear = new Audio("./audio/04-level-clear.mp3"),
		power_up = new Audio("./audio/03-power-up.mp3"),
		life_up = new Audio("./audio/18-1-up.mp3"),
		star_time = new Audio("./audio/07-invincible-starman.mp3"),
		mario_down = new Audio("./audio/15-1-down.mp3"),
		game_over = new Audio("./audio/16-game-over.mp3");

	// In Game: Default Variables
	var score_box = $("#score_box");
	$(score_box).html("<p id='score_box' class='gametext_med'>MARIO</br>000000</p>");
	var time_box = $("#time_box");
	$(time_box).html("<p id='time_box' class='gametext_med'>TIME</br>00:00</p>");
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
		clockbreaker = false,
		level = 1,
		clock, time_output, score_output, missile_run, random, pick, fire_missile, val;

  // Game Page: Pause Game Button
	var pause_game = $("#pause_game").on('click', function(){
		alert("The game has been paused. Press okay to return to the game.");
	});	

	// Game Page: Quit Function
	var quit_game = function(){
		var exit = confirm("Are you sure you want to quit?");
		if (exit) {
			// bg.music switch
			clearInterval(clock);
			$("#game_bg").hide();
			$("#game_container").hide();
			$("#back_bg").show();
			$("#back_container").show();
			return game_running = false;
		}
		console.log("User quit option: " + exit);
		return game_running = true;
	};

	// Game Page: Quit With Esc Key
    $(document).on('keyup', function(e){
		console.log(e);
		if (e.keyCode === 27 && game_running) {
			quit_game();
		}
	return false;
	});
	
	// Game Page: Game End
  var endgame = function(){
  		// bg.music switch
    	clearInterval(clock);
		return game_running = false;
  };
	
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
				if (hrs === 10) {
					time_box.html("<p id='time_box' class='gametext_med'>BROKEN!<br />99:99</p>");
					clockbreaker = true;
					return clearInterval(clock);
				}
				time_output = hrs+"0:00";
			}
		}

		// Display Output
		if (game_running) {
			time_box.html("<p id='time_box' class='gametext_med'>TIME</br>" + time_output + "</p>");
		} else {
			console.log("Will display time value for end game.");
		}
	return time_lapse;
	};

	// In Game: Initiate Time
	var runtime = function(tick){
		if (clockbreaker) {
			return console.log("The force is strong with this one...")
		}
		clock = setInterval(tick, 1000);
	return clock;
	};

	// In Game: Score Function
	var score_val = function(score, game_check){
		final_score += score;
		val = score.toString();
		for (var j = 6; val.length < j;) {
			val = "0" + val;
		}
		
		if (game_check === 1) {
			console.log("Will display score value for end game.");
		}

		if (game_running) {
		score_box.html("<p id='score_box' class='gametext_med'>MARIO</br>" + val + "</p>");
		} 
	return final_score;
	};

	// Random Missle Placement
	var randomizer = function(missile_id){
		pick = Math.round(Math.random() * 12);
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

	// Create Missle
	var create_missile = function(missile_id){
		var x,
			missile = {
				blk : $("<div class='blk_missile active'></div>"),
				red : $("<div class='red_missile active'></div>"),
				fire : $("<div class='fire_missile active'></div>")
			},
			lvl = function (){
				if (level === 1) {
					x = missile.blk.css({
					"animation": randomizer("b"),
					"animation-duration": "7s"
					});
				}

				if (level === 2) {
					x = missile.red.css({
					"animation": randomizer("r"),
					"animation-duration": "7s"
					});
				}

				if (level === 3) {
					x = missile.fire.css({
					"animation": randomizer("f"),
					"animation-duration": "7s"
					});
				}
			};

		if (missile_id) {
			switch (missile_id) {
				case 1:
					x = missile.blk.css({
						"animation": randomizer("b"),
						"animation-duration": "9s"
					});
					break
				case 2:
					x = missile.red.css({
						"animation": randomizer("b"),
						"animation-duration": "9s"
					});
					break
				case 3:
					x = missile.fire.css({
						"animation": randomizer("b"),
						"animation-duration": "9s"
					});
					break
				default:
					console.log("There was trouble processing missile_id information.")
					lvl();		
			}
		} else {
			lvl();
		}

    missiles_present += 1;
    deployed += 1;
    game_area.append(x);
    var expire = function (){
    	x.remove();
    }
    return setTimeout(expire, 7000);
	};

	// Create functioning Missile destroyed action
	$('.active').on("click", function(e){
    score_amount += 20;
    score_val(score_amount);
    missiles_present -= 1;
    destroyed += 1;
    e.fadeTo(1000, 0);
    e.remove();
  });

	// Almost missile logic...
	var launch = function (){
		var fire_away = function (){
			create_missile();
		}

		if (missiles_present < 7){
			setInterval(fire_away, 700);
		}

		if (missile_present > 7){
			clearInterval(fire_away);
			return false;
		}

		var hold_it = function (){
			return launch();
		}
	setTimeout(hold_it, 10000);
	};

	// setInterval(launch)

	var create_fireball = function(x, y){
		var fireball = $("<div class='fireball'></div>");
		fireball.css({
			"animation-name": "fireball",
			"animation-duration": "5s"
		});
		console.log(x)
		console.log(y)

		// Clearly not working. Need to reconsider animation.
		firepoint[0].innerHTML = "@keyframes fireball { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg) translate(" + x +  "," + y + "); } }";
		
		// Works, but serves no purpose
		game_area.append(fireball);
		var f = function(){
			fireball.fadeTo(1000, 0);
			fireball.remove();
		}
		setTimeout(f, 800);
  };

  var create_boss = function (lvl){
  	var boo;
  	var wario;
  	var bowswer;
  	
  	launch();
  };

  var create_multiplier = function (lvl){
  	
  	launch();
  };

	var select_level = function (deployed){
		var current_lvl = level;

		if (deployed < 50) {
			level = 1;
		}
		if (deployed === 50) {
			level = 2;
		}
		if ((deployed > 50) && (deployed < 150)) {
			level = 2;
		}
		if (deployed === 150) {
			level = 3;
			// bg.music switch
			setTimeout(launch(), 5000);
		}
		if ((deployed > 150) && (deployed < 400)) {	
			level = 3;
		}
		if (current_lvl !== level) {
			launch();
		}

		// bg.music switch
		setTimeout(launch(), 5000);

	console.log("level: " + level)
	return level;
	};

	var missile_push = function (lvl){
		var launch_array = [];

		// Level 1 Deployment Model
		if (lvl === 1) {
			launch_array = [1, 1, 1];
			launch_array.forEach(function (e){
				create_missile(e);
			});
		}
		
		// Level 2 Deployment Model
		if (lvl === 2) {
			launch_array = [2, 2, 2, 1, 1, 1];
			launch_array.forEach(function (e){
				create_missile(e);
			});
		}

		// Level 3 Deployment Model
		if (lvl === 3) {
			launch_array = [3, 3, 3, 1, 2, 2, 2, 1, 3, 2, 1, 2, 2, 3, 3];
			launch_array.forEach(function (e){
				create_missile(e);
			});
		}

		// End game
		if (deployed > 400) {
			endgame();
		}
	};


  // Initialize SMCB
	game_running = true;	
	console.log("Game running status: " + game_running);
	runtime(time_val);
	$("#quit_game").on('click', quit_game);
	$(game_area).on('click', function(e){
		return create_fireball(e['clientX'], e['clientY']);
	});

	// bg_music.play();
	launch(0);
	$(document).on('mousemove', function(e){
		console.log(e);
		if (missiles_present < 7 && game_running) {
			setTimeout(create_missile(), 300);
		}
		if (deployed === 50 || deployed === 150) {
			select_level(deployed);
		}
		if (deployed % 10 === 0 && level < 3) {
			missile_push(level);
		}
		if (deployed % 15 === 0 && level === 3) {
			missile_push(level);
		};
	});
	
	// var game = function (){
		// missile_run = dispatch();
	// 	if (missile_run === 1) {
	// 		console.log("Additional logic for level 1");
	// 	} else if (missile_run === 2) {
	// 		console.log("Additional logic for level 2");
	// 	} else if (missile_run === 3) {
	// 		console.log("Additional logic for level 1");
	// 	}
	// setInterval(game, 3000);
	// };

	// var yDeg = calc_angle(start_point, end_point);
	// var have_missile_rotate = $(x).css({ // PAIR TO (LGest trans to SMest)
	// transition: rotate(yDeg @ angle of descent)
	// time.fight_back //laser && PAIR TO time.elapsed += frequency++
	// if (time > z.elapsed)
	// 	+ enemy_missile();

	// if (clockbreaker) {
		// console.log("Must capture time value or display for clockbreakers.");
	// if (i = 2) {
	// clearInterval(time_val, 1000);	
	// bg_music.pause();
 	// video.load();
	// $("#game_bg").hide();
	// $("#game_container").hide();
	// $("#back_bg").show();
	// $("#back_container").show();
	// return game_running = false;

	}
});
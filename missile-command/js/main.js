/************************************
Author: Eric A. Boateng
Title: Super Missile Command Bros.
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

$(document).ready(function(){

	"use strict";
	console.log("Game loaded and linked.");


	var video = document.querySelector("video");
	var game_running = false;
	var firepoint = $("<style>").text("@keyframes fireball { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg) translate(20, 20); } }");
	$("head").append(firepoint);
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
	// Used .prop() Instead of .attr() To Determine Node Property Values
	var video_mute = $("#sound").on('click', function(){
		var a = $(video).prop("muted");
		if (a) {
			$(video).prop("muted", false);
			$("#sound").text("Sound: ON");
		} else {
			$(video).prop("muted", true);
			$("#sound").text("Sound: OFF");
		}
	});

	var game_mute = function(){

	};

/************
BUTTONS
************/
	// Front Page: Initiate Game
	var start_button = $("#start").on('click', function(){
		$("#front_bg").hide();
		$("#front_container").hide();
		video.pause();
		$("#game_bg").show();
		$("#game_container").show();
		play_smcb();
	});

	// Front Page: How To Button
	var howto_button = $("#how_to").on('click', function(){
		$("#fc_one").hide();
		$("#fc_two").show();
	});

	// Front Page: Copyright Statement
	var copyright = $("#copyright").on('click', function(){
		$("#fc_one").hide();
		$("#fc_three").show();
	});

	// Front Page: Go Back Button
	var goback_button = $(".go_back").on('click', function(){
		$("#fc_two").hide();
		$("#fc_three").hide();
		$("#fc_one").show();
	});

	// Back Page: Return Start Page
	var gohome_button = $("#go_home").on('click', function(){
		video.load();
		$("#back_bg").hide();
		$("#back_container").hide();
		video.play();
		$("#front_bg").show();
		$("#front_container").show();
		$("#fc_one").show();
	});

	// Back Page: Play Again Button
	var playagain_button = $("#play_again").on('click', function(){
		$("#back_bg").hide();
		$("#back_container").hide();
		$("#game_bg").show();
		$("#game_container").show();
		play_smcb();
	});


/************
GAME BODY
************/
var play_smcb = function(){

	// In Game: Default Variables
	var score_box = $("#score_box");
	$(score_box).html("<p id='score_box' class='gametext_med'>MARIO</br>000000</p>");
	var time_box = $("#time_box");
	$(time_box).html("<p id='time_box' class='gametext_med'>TIME</br>00:00</p>");
	var score_e = $("#score_");
	var time_e = $("#time");
	var game_area = $("#game_bg");
	// var bg_music = new Audio("../audio/bro_music.mp3");
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
		clock, time_output, score_output, missile_run, random, pick, blk, red, fire, val;

    // Game Page: Pause Game Button
	var pause_game = $("#pause_game").on('click', function(){
		alert("The game has been paused. Press okay to return to the game.");
	});	

	// Game Page: Quit Function
	var quit_game = function(){
		var exit = confirm("Are you sure you want to quit?");
		if (exit) {
			clearInterval(clock);
			$("#game_bg").hide();
			$("#game_container").hide();
			$("#back_bg").show();
			$("#back_container").show();
		}
		console.log("User quit option: " + exit);
		return game_running = false;
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
					time_box.html("<p id='time_box' class='gametext_med'>CLOCKBREAKER!<br />99:99</p>");
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
	var score_val = function(score){
		final_score += score;
		val = score.toString();
		for (var j = 6; val.length < j;) {
			val = "0" + val;
		}
		
		if (game_running) {
		score_box.html("<p id='score_box' class='gametext_med'>MARIO</br>" + val + "</p>");
		} else {
			console.log("Will display score value for end game.");
		}
	return final_score;
	};

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
				create_blk();
		}
	return random[pick];
	};

	var create_blk = function(){
		blk = $("<div class='blk_missile'></div>");
		blk.css({
			"animation": randomizer("b"),
			"animation-duration": "17s"
			// "animation": "ease-in 7s 1 normal forward running"
		});
		// blk.css({"animation-name": "blk_one", "animation-duration": "3s"})
	    game_area.append(blk);
	    missiles_present += 1;
	    deployed += 1;
	    // blk.css("top", Math.random() * window.innerHeight);
	    // blk.css("left", Math.random() * window.innerWidth);

	    blk.on("click", function() {
	    	score_amount += 20;
	    	score_val(score_amount);
	    	missiles_present -= 1;
        	destroyed += 1;
        	blk.off("click");

        	var q = function(){
			blk.fadeTo(400, 0);
			}
			setTimeout(q, 100);
			blk.remove();
			});
    return false;
	};

	var create_red = function(){
		red = $("<div class='red_missile'></div>");
		red.css({
			"animation-name": randomizer("r"),
			"animation-duration": "7s"
		});
		game_area.append(red);
	    missiles_present += 1;
	    deployed += 1;

	    red.on("click", function() {
	    	score_amount += 50;
	    	score_val(score_amount);
      		setTimeout(function() {
        		red.fadeOut(2000);
        		red.remove();
        		missiles_present -= 1;
        		destroyed += 1;
      			}, 1000);
    		});
    return false;
	};

	var create_fire = function(){
		fire = $("<div class='fire_missile'></div>");
		fire.css({
			"animation-name": randomizer("f"),
			"animation-duration": "7s"
		});
		game_area.append(fire);
	    missiles_present += 1;
	    deployed += 1;

	    fire.on("click", function() {
	    	score_amount += 140;
	    	score_val(score_amount);
      		setTimeout(function() {
        		fire.fadeOut(2000);
        		fire.remove();
        		missiles_present -= 1;
        		destroyed += 1;
      			}, 1000);
    		});
    return false;
	};

	var dispatch = function(){
		var z = [create_blk, create_red, create_fire],
			array = [],
			level = 0;

		// Level 1 Deployment Model
		if (deployed < 50) {
			level = 1;
			for (var h = 0; h < 2; h++) {
				array.push([z[0], z[0], z[0]]);
				console.log("dispatch array value: " + array);
			}
		}
		
		// Level 2 Deployment Model
		if (deployed === 50) {
			level = 2;
			console.log("Add delay & div: Level 2");
			// create delay and div
			for (var h = 0; h < 3; h++) {
				array.push([z[1], z[1], z[1]]);
			}
		} else if ((deployed > 50) && (deployed < 150)) {
			level = 2;
			for (var h = 0; h < 3; h++) {
				array.push([z[0], z[0], z[0]]);
				array.push([z[1], z[1], z[1]]);
			}
		}

		// Level 3 Deployment Model
		if (deployed === 150) {
			level = 3;
			console.log("Add delay & div: Level 3");
			// create delay and div
			for (var h = 0; h < 3; h++) {
				array.push([z[2], z[2], z[2]]);
			}
		} else if ((deployed > 150) && (deployed < 400)) {	
			level = 3;
			for (var h = 0; h < 3; h++) {
				array.push([z[0], z[0], z[0]]);
				array.push([z[1], z[1], z[1]]);
			}
			for (var m = 0; m < 3; m++) {
				array.push([z[2], z[2], z[2]]);
			}
			for (var n = 0; n < 2; n++) {
				array.push([z[0], z[0], z[0]]);
			}
		} else if (deployed === 400) {
			endgame();
		}

		var j = 0;
		while (j < array.length) {
			var run = function(){
				for (var g = 0; g < array[j].length; g++) {
					console.log(array[j][g]());
				}
			};
			setTimeout(run(), 2000);
			j++
		}
	console.log("level: " + level)
	return level;
	};

	var create_fireball = function(x, y){
		var fireball = $("<div class='fireball'></div>");
		fireball.css({
			"animation-name": "fireball",
			"animation-duration": "5s"
		});
		console.log(x)
		console.log(y)
		firepoint[0].innerHTML = "@keyframes fireball { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg) translate(" + x +  "," + y + "); } }";
		game_area.append(fireball);
		var f = function(){
			fireball.fadeTo(1000, 0);
        	// fireball.remove();
		}
		setTimeout(f, 800);
    return false;
    };

    var create_multiplier = function(){

    };

    var create_boo = function(){

    };

    var create_wario = function(){

    };

    var create_bowser = function(){

    };

    // Initialize
	game_running = true;	
	console.log("Game running status: " + game_running);
	runtime(time_val);
	$("#quit_game").on('click', quit_game);
	$(game_area).on('click', function(e){
		create_fireball(e['clientX'], e['clientY']);
		return false;
	});
	// bg_music.play();
	while (deployed < 7) { create_blk(); }
	var game = function (){
		missile_run = dispatch();
		if (missile_run === 1) {
			console.log("Additional logic for level 1");
		} else if (missile_run === 2) {
			console.log("Additional logic for level 2");
		} else if (missile_run === 3) {
			console.log("Additional logic for level 1");
		}
	setInterval(game, 3000);
	};

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
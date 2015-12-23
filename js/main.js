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
$(document).on('keyup', function(e){
	console.log(e);
	if (e.keyCode === 27 && game_running) {
		quit_game();
	}
return false;
});

/************
AUDIO CONTROLS
************/




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
	var copyright_state = $("#copyright_state").on('click', function(){
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
	// Game Page: Pause Game Button
		var pause_game = $("#pause_game").on('click', function(){

		console.log("Game Paused.");
	});
	// Game Page: Quit Function
	var quit_game = function(){
		var exit = confirm("Are you sure you want to quit?");
		if (exit) {
			game_running = false;
			$("#game_bg").hide();
			$("#game_container").hide();
			$("#back_bg").show();
			$("#back_container").show();
		}
		console.log("User quit option: " + exit);
	};


/************
GAME BODY
************/
	var score_box = $("#score_box");
	$(score_box).html("<p id='score_box' class='gametext_med'>MARIO</br>000000</p>");
	var time_box = $("#time_box");
	$(time_box).html("<p id='time_box' class='gametext_med'>TIME</br>00:00</p>");
	var score_e = $("#score_");
	var time_e = $("#time");
	var game_area = $("#game_bg");
	var time_lapse = 0,
		min = 0,
		missiles_present = 0,
		score_amount = 0,
		clockbreaker = false,
		time_output, score_output;

	// In Game: Time Function
	var time_val = function(){
		time_lapse++;	
		if (time_lapse <= 9) {
			time_output = "0"+min+":0"+time_lapse;
		} else if (time_lapse <= 59) {
			time_output = "0"+min+":"+time_lapse;
		} else if (time_lapse === 60) {
			min++;
			time_lapse = 0;
			time_output = "0"+min+":00";
		} else if (min % 10 === 0) {
			hrs++;
			min = 0;
			time_output = hrs+"0:00";
		} else if (hrs === 10) {
			time_box.html("<p id='time_box' class='gametext_med'>TIME</br>99:99 - YOU BROKE THE CLOCK!</p>");
			clockbreaker = true;
			return clearInterval(tick);
		}
		
		if (game_running) {
		time_box.html("<p id='time_box' class='gametext_med'>TIME</br>" + time_output + "</p>");
		} else {
			console.log("Will display time value for end game.");
		}

	};

	// In Game: Initiate Time
	var runtime = function(tick){
		if (clockbreaker) {
			return console.log("The force is strong with this one...")
		}
	return setInterval(tick, 1000);	
	};

	// In Game: Score Function
	var score_val = function(score){
		var val = score.toString();
		for (var j = 6; val.length < j;) {
			val = "0" + val;
		}
		
		if (game_running) {
		score_box.html("<p id='score_box' class='gametext_med'>MARIO</br>" + val + "</p>");
		} else {
			console.log("Will display score value for end game.");
		}
	}

	// In Game: Processes
	var play_smcb = function(){
		game_running = true;
		runtime(time_val);
		console.log("Game running status: " + game_running);

		// var bg_music = new Audio('.../audio/bro_music.mp3');
		// bg_music.play();
		$("#quit_game").on('click', quit_game);

			var randomizer = function(){
				var pick = Math.round(Math.random() * 7);
				var random = ["blk_one", "blk_two", "blk_three", "blk_four", "blk_five", "blk_six", "blk_seven", "blk_eight", "blk_nine", "blk_ten", "blk_eleven", "blk_twelve"];
			return random[pick];
			};

			var create_blk = function(){
				var blk = $("<div class='blk_missile'></div>");
				blk.css({
					"animation-name": randomizer(), "animation-duration": "7s"
					// "animation": "ease-in 7s 1 normal forward running"
				});
				// blk.css({"animation-name": "blk_one", "animation-duration": "3s"})
			    game_area.append(blk);
			    missiles_present += 1;
			    console.log("Game area value: " + game_area);
			    console.log("Missle present value: " + missiles_present);
			    // blk.css("top", Math.random() * window.innerHeight);
			    // blk.css("left", Math.random() * window.innerWidth);

			    blk.on("click", function() {
			    	score_amount += 20;
			    	console.log(score_amount);
			    	score_val(score_amount);
		      		setTimeout(function() {
		        		blk.fadeTo(1000, 0)
		        		blk.remove();
		        		missiles_present -= 1;
		      			}, 1000);
		    		});
		    return blk;
			};

			var create_red = function(){
				var red = $("<div class='red_missile'></div>");
				red.css({"animation": "ease-in 7s 1 normal forward running " + randomizer()})
			    game_area.append(red);
			    missiles_present += 1;

			    red.on("click", function() {
			    	score_amount += 50;
			    	score_val(score_amount);
		      		setTimeout(function() {
		        		red.fadeTo(1000, 0)
		        		red.remove();
		        		missiles_present -= 1;
		      			}, 1000);
		    		});
		    return red;
			};

			var create_fire = function(){
				var fire = $("<div class='fire_missile'></div>");
				fire.css({"animation": "ease-in 7s 1 normal forward running " + randomizer()})
			    game_area.append(fire);

			    fire.on("click", function() {
			    	score_amount += 140;
			    	score_val(score_amount);
		      		setTimeout(function() {
		        		fire.fadeTo(1000, 0)
		        		fire.remove();
		        		missiles_present -= 1;
		      			}, 1000);
		    		});
		    return fire;
			};

			var create_fireball = function(e){
				var fireball = $("<div class='fireball'></div>");
				game_area.append(fireball);
				
				fireball.css({
					"transform": "rotate(360deg) translate(" + e.clientX + ", " + e.clientY + ")",
					"animation-duration": "2s"
				});
				
				fireball.on("mousemove", function() {
		      		setTimeout(function() {
		      			fireball.fadeTo(1000, 0)
		        		fireball.remove();
		      			}, 2200);
		    	});
		    return fireball;
		    };

		    var create_multiplier = function(){

		    }

		    var create_boo = function(){

		    }

		    var create_wario = function(){

		    }

		    var create_bowser = function(){

		    }

			if (missiles_present < 7) {
				create_blk();
			}

			for (var i = 0; i < 7; i++) {
		  		create_blk();
		  	}

			$(game_area).on('click', function(e){
				create_fireball(e);
			});

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
			// }

	};


/************
EASTER EGG MODE
************/
	video.pause();
	var construction_msg = document.getElementsByTagName("h1")[0],
		cons_button = $("<button>, {'id': 'cons_button'}")
			.on('click', function(){
				$(construction_msg).hide();
				// $("#game_bg").show();
				// $("#game_container").show();
				// play_smcb();
				video.play();
				$("#front_bg").show();
				$("#front_container").show();
				$("#fc_one").show();
				console.log("Construction Button Removed.")
			return false;		
			})
			.css({"color": "#fff", "background-color": "#fff"})
			.text("x");
	$(construction_msg).append(cons_button);

});
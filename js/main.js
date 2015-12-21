/************************************
Author: Eric A. Boateng
Title: Super Missile Command Bros.
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

$(document).ready(function () {

"use strict";
console.log("Game loaded and linked.");

// var video = document.querySelector("video");
// var game_running = false;
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
	var start_button = $("#start").on('click', function(){
		$("#front_bg").hide();
		$("#front_container").hide();
		// video.pause();
		$("#game_bg").show();
		$("#game_container").show();
		play_smcb();
		return false;
	});
	var howto_button = $("#how_to").on('click', function(){
		$("#fc_one").hide();
		$("#fc_two").show();
		console.log("'How To Play' button was pressed.");
		return false;	
	});
	var copyright_state = $("#copyright_state").on('click', function(){
		$("#fc_one").hide();
		$("#fc_three").show();
		console.log("'How To Play' button was pressed.");
		return false;	
	});
	var goback_button = $(".go_back").on('click', function(){
		$("#fc_two").hide();
		$("#fc_three").hide();
		$("#fc_one").show();
		console.log("'Go Back' button was pressed.");
		return false;
	});
	var pause_game = $("#pause_game").on('click', function(){

		console.log("Game Paused.");
		return false;
	});
	var gohome_button = $("#go_home").on('click', function(){
		// video.play();
		$("#back_bg").hide();
		$("#back_container").hide();
		$("#front_bg").show();
		$("#front_container").show();
		$("#fc_one").show();
		return false;
	});
	var playagain_button = $("#play_again").on('click', function(){
		$("#back_bg").hide();
		$("#back_container").hide();
		$("#game_bg").show();
		$("#game_container").show();
		play_smcb();
		console.log("'Play Again' button was pressed.");
		return false;	
	});
	var quit_game = function (){
		var exit = confirm("Are you sure you want to quit?");
		if (exit) {
			game_running = false;
			// video.load();
			$("#game_bg").hide();
			$("#game_container").hide();
			$("#back_bg").show();
			$("#back_container").show();
		}
		console.log("User quit option: " + exit);
		return false;
	};


/************
GAME BODY
************/
	var score_box = $("#score_box");
	$(score_box).html("<p id='score_box' class='gametext_med'>MARIO</br>000000</p>");
	var time_box = $("#time_box");
	$(time_box).html("<p id='time_box' class='gametext_med'>TIME</br>00:00</p>");
	var score_e = $("#score");
	var time_e = $("time");
	var game_area = $("#game_bg");
	var time_lapse = 0, min = 0, missiles_present = 0, time_output;

	
	var time_val = function (){	
		if (time_lapse <= 9) {
			time_output = "0"+min+":0"+time_lapse;
		} else if (time_lapse >= 59) {
			time_output = "0"+min+":"+time_lapse;
		} else if (time_lapse === 60) {
			min++
			time_output = "0"+min+":00";
		}
		time_lapse++;
		time_e.innerHTML = "TIME</br>"+time_output;
	};

	var time = function(){
		return setInterval(time_val, 1000);	
	};
	time();

	var score_val = function (){
		var score_amount = 0;
		var blk = $(".blk_missile");
		var red = $(".red_missile");
		var fire = $(".red_missile_fire");
		var blk_hit = $(blk).on('click', function(){
		});
		var red_hit = $(red).on('click', function(){
		});
		var fire_hit = $("#red_missile_fire").on('click', function(){
		});
	}


	var play_smcb = function(){
		game_running = true;
		console.log("Game running status: "+game_running);

		// var bg_music = new Audio('.../audio/bro_music.mp3');
		// bg_music.play();
		$("#quit_game").on('click', quit_game);


		// var max_missiles = 18;
		// for (var i = 0; i < max_missiles.length; i++) {
		// }		

		// game_running = false;
		// console.log(game_running);
		// return game_running;
		// }

			var create_blk = function(){
				var bullet_boy = Math.round(Math.random() * 5);
				var blk = $("<div class='blk_missle_"+bullet_boy+"'></div>");
			    game_area.append(blk);
			    missiles_present += 1;

			    // blk.css("top", Math.random() * window.innerHeight);
			    blk.css("left", Math.random() * window.innerWidth);

			    blk.on("click", function() {
		      		setTimeout(function() {
		        		blk.remove();
		        		missles_present -= 1;
		      			}, 1000);
		    		});

			    // blk.css("bottom", Math.random() * window.innerHeight);
		    	// blk.css("left", Math.random() * window.innerWidth);
		    return blk;
			};

			var create_fireball = function(e){
				var fireball = $("<div class='fireball'></div>");
				game_area.append(fireball);
				
				fireball.css({
					"transform": "translate(" + e.clientX + ", " + e.clientY + ")",
					"animation-duration": "2s"
				});
				
				fireball.on("mousemove", function() {
		      		setTimeout(function() {
		        		fireball.remove();
		      			}, 2200);
		    		});

				if (missiles_present < 7) {
					create_blk();
				}

			return fireball;
			};


			for (var i = 0; i < 7; i++) {
		  		create_blk();
		  	}

			$(game_area).on('click', function(e){
				create_fireball(e);
			});

	};


/************
CONSTRUCTION AREA
************/
	// video.pause();
	// var construction_msg = document.getElementsByTagName("h1")[0],
	// 	cons_button = $("<button>, {'id': 'cons_button'}")
	// 		.on('click', function(){
	// 			$(construction_msg).hide();
	// 			// $("#game_bg").show();
	// 			// $("#game_container").show();
	// 			// play_smcb();
	// 			video.play();
	// 			$("#front_bg").show();
	// 			$("#front_container").show();
	// 			$("#fc_one").show();
	// 			console.log("Construction Button Removed.")
	// 			return false;		
	// 		})
	// 		.css({"color": "#fff", "background-color": "#fff"})
	// 		.text("x");
	// $(construction_msg).append(cons_button);

/************
************/

		// if (i = 2) {
		// clearInterval(time_val, 1000);	
		// bg_music.pause();
	 // 	video.load();
		// $("#game_bg").hide();
		// $("#game_container").hide();
		// $("#back_bg").show();
		// $("#back_container").show();
		// return game_running = false;
		// }

});

/************
************/

		// setInterval(function(){
		// 		i++;
		// 		console.log(i);
		// 	}, 10000);

// 	/* BASE */
// 	var ground = $("#container"),
// 		missile = $("#missile"),
// 		enemy_missile = $("enemy_missile"), //laser
// 		score = 0,
// 		high_score = 0;



// 		if (score > high_score) {
// 			high_score = score;
// 		}
// 	return high_score;
// 	}; */
// };

// 	/* FUNC */
// 	(function () {
// 		window.innerWidth = "";
// 		window.innerHeight = "";
// 		$("div_area").click() = remove_missile.animate;
// 		// transition to explosion,
// 		// 	transition to .hide() 

// 		if (missile === hits_ground){
// 			return game_end();
// 		}

// 		var yDeg = calc_angle(start_point, end_point);
// 		var have_missile_rotate = $(x).css({ // PAIR TO (LGest trans to SMest)
// 			// transition: rotate(yDeg @ angle of descent)
// 		})

// 		time.fight_back //laser && PAIR TO time.elapsed += frequency++
// 		if (time > z.elapsed) {
// 			enemy_missile();
// 		}

// 	// 	enemy_missile.animate { //laser, consider setTimeout()
// 	// 		console.log("pending")
// 	// 	}
// 	// })

// 	/* FIN */
// 	// (function () {
// 	// 	missiles @ screen top
// 	// 	(LGest transition to SMest) && // 2D design, only top to bottom && PAIR TO ** have_missile_rotate = $(x).css
// 	// 	time.elapsed += frequency++ // PAIR TO time.fight_back

// 	// 	missile.animate {
// 	// 		$("LG to SM");
// 	// 		$("#random_angle") && !(off_screen)
// 	// 	}

// 	// 	alert("Your score is " + score + "!");
// 	// })

// //end
// // }	
// )
// 	+ set_cookie = function(){



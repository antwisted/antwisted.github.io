/************************************
Author: Eric A. Boateng
Title: Super Missile Command Bros.
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

// Read the rules? Play the game - splash screen

"use strict";
console.log("Game loaded and linked.")

$("#start").on('click', function(){
	console.log("'Start' button was pressed.")
});

$("#how_to").on('click', function(){
	console.log("'How To Play' button was pressed.");	
});

// // $(document).ready
// (function () {
// 	console.log("Game loaded and linked.")

// var initial = function(){
// 	/* BASE */
// 	var ground = $("#container"),
// 		missile = $("#missile"),
// 		enemy_missile = $("enemy_missile"), //laser
// 		score = 0,
// 		high_score = 0;

// 	/* IF FINISHED:
// 	+ sound.MID && sound.WAV
// 	+ set_cookie = function(){
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
/************************************
Author: Eric A. Boateng
Created: December 16, 2015
Author URI: http://findtheant.com
Slack: @antwisted
Thanks for visiting! Support GA!
************************************/

"use strict";

$(document).ready(function () {
	console.log("Game loaded and linked.")

var initial = function(){
	/* BASE */
	var ground = $("#container"),
		missle = $("#missle"),
		enemy_missle = $("enemy_missle"), //laser
		score = 0,
		high_score = 0;

	/* IF FINISHED:
	+ sound.MID && sound.WAV
	+ set_cookie = function(){
		if (score > high_score) {
			high_score = score;
		}
	return high_score;
	}; */

	/* FUNC */
	(function () {
		window.innerWidth = ""
		window.innerHeight = ""
		$("div_area").click() = remove_missle.animate
		transition to explosion,
			transition to .hide() 

		if (missle === hits_ground){
			return game_end();
		}

		var yDeg = calc_angle(start_point, end_point);
		var have_missle_rotate = $(x).css({ // PAIR TO (LGest trans to SMest)
			transition: rotate(yDeg @ angle of descent)
		})

		time.fight_back //laser && PAIR TO time.elapsed += frequency++
		if (time > z.elapsed) {
			enemy_missle();
		}

		enemy_missle.animate { //laser, consider setTimeout()
			console.log("pending")
		}
	})

	/* FIN */
	(function () {
		missles @ screen top
		(LGest transition to SMest) && // 2D design, only top to bottom && PAIR TO ** have_missle_rotate = $(x).css
		time.elapsed += frequency++ // PAIR TO time.fight_back

		missle.animate {
			$("LG to SM");
			$("#random_angle") && !(off_screen)
		}

		alert("Your score is " + score + "!");
	})

//end
}	
});
var nintendo = new Audio("gameboy_start.mp3");
setTimeout(function (){
	nintendo.play();
	setTimeout(function (){
		$("#blk_begin").fadeOut(2000);
		setTimeout(function (){
			$("#blk_begin").remove();
			gameStart();
		}, 3000);
	}, 2000);
}, 3800);
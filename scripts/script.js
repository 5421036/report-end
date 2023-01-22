enchant();

window.onload = function () {
	const game = new Game(400, 500);  				


	
	const clickSndUrl = "click.wav";						
	game.preload([clickSndUrl]); 				

	//ドラえもん画像
	const doraemonImgUrl = "images/doraemon.png";						
	game.preload([doraemonImgUrl]);					

	//リトライボタン
	const retryImgUrl = "images/retry.png";						
	game.preload([retryImgUrl]);					

	//ツイートボタン
	const tweetImgUrl = "images/tweet.png";						
	game.preload([tweetImgUrl]);					


	game.onload = function () {					

		let point = 0;									
		let state = 0;								

		const mainScene = new Scene();					
		game.pushScene(mainScene);  					
		mainScene.backgroundColor = "black"; 			

		//ポイント表示テキスト
		const scoreText = new Label(); 					
		scoreText.font = "20px Meiryo";				
		scoreText.color = 'rgba(255,255,255,1)';		
		scoreText.width = 400;							
		scoreText.moveTo(0, 30);						
		mainScene.addChild(scoreText);					

		scoreText.text = "現在：" + point;					

		//ドラえもんボタン
		const doraemonImg = new Sprite(200, 223);				
		doraemonImg.moveTo(118, 100);						
		doraemonImg.image = game.assets[doraemonImgUrl];			
		mainScene.addChild(doraemonImg);					

		doraemonImg.ontouchend = function () {				
			point++;									
			game.assets[clickSndUrl].clone().play();		

			
			this.x = -200;						

			
			if (point < 3) {
				state = 1;
			} else if (point < 6) {
				state = 2;
			} else if (point < 9) {
				state = 3;
			} else if (point < 12) {
				state = 4;
			} else {
				state = 5;
			}

		};

		game.onenterframe = function () {
			if (state == 0) { 							
				doraemonImg.x = -200;						
				doraemonImg.y = 100;						
				point = 0;  						
				state = 1;							
			}
			if (state == 1) {							
				doraemonImg.x += 5;
			}
			if (state == 2) {							
				doraemonImg.x += 15;
			}
			if (state == 3) {							
				doraemonImg.x += 10;
				doraemonImg.y = 200 + Math.sin(doraemonImg.x / 70) * 100; 
			}
			if (state == 4) {							
				doraemonImg.y = Math.random() * 400;			
				state = 4.1;
			}
			if (state == 4.1) {							
				doraemonImg.x += 10;						
			}
			if (state == 5) {							
				doraemonImg.x += 20;					
				doraemonImg.y = Math.random() * 400;		
			}

			//現在のテキスト表示
			scoreText.text = "現在：" + point; 				

			//ゲームオーバー判定
			if (doraemonImg.x >= 400) {						
				game.popScene();					
				game.pushScene(endScene);			
				//ゲームオーバー後のテキスト表示
				gameOverText.text = "GAMEOVER 記録：" + point + "枚";				
			}

		};



		//結果画面
		const endScene = new Scene();
		endScene.backgroundColor = "blue";

		//GAMEOVER
		const gameOverText = new Label(); 					
		gameOverText.font = "20px Meiryo";				
		gameOverText.color = 'rgba(255,0,0,1)';		
		gameOverText.width = 400;							
		gameOverText.moveTo(0, 30);						
		endScene.addChild(gameOverText);						



		//リトライボタン
		const retryBtn = new Sprite(120, 60);				
		retryBtn.moveTo(50, 300);						
		retryBtn.image = game.assets[retryImgUrl];			
		endScene.addChild(retryBtn);					

		retryBtn.ontouchend = function () {				
			state = 0;
			game.popScene();						
			game.pushScene(mainScene);					
		};

		//ツイートボタン
		const tweetBtn = new Sprite(120, 60);				
		tweetBtn.moveTo(230, 300);						
		tweetBtn.image = game.assets[tweetImgUrl];			
		endScene.addChild(tweetBtn);					

		tweetBtn.ontouchend = function () {			
			const url = encodeURI("https://hothukurou.com");
			window.open("http://twitter.com/intent/tweet?text=頑張って" + point + "枚入手した&url=" + url); //ハッシュタグにahogeタグ付くようにした。
		};

	};
	game.start();
};
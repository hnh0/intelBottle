(function(){
	window.video = {
		init: function(){

		},
		bind: function(){

		},
		start: function(target){
			target.removeClass('hidden')
			target[0].play()
		},
		/***
		* target: (obj) 视频对象
		* img: (boolen) 默认显示图片，true不显示
		* callback: (function) 回调函数
		**/
		end: function(target, callback){
			target[0].addEventListener('ended', function(){
				target
					// .after(img)
					.addClass('hidden')

				if(callback)callback()
			},false)
		},
		play: function(obj, callback){
			this.start(obj)
			this.end(obj, callback)
		},
		landscape: function (){
			$('#xingge2').css('opacity', 0)
			$('.video_img').eq(0).addClass('hidden')

			$('#xingge1').css('opacity', 1)
			$('.video_img').eq(1).removeClass('hidden')
			video.play($(swipe.scrollWrap).find('.page_landscape').find('video').eq(1))
		},
		portrait: function (){
			$('#xingge1').css('opacity', 0)
			$('.video_img').eq(1).addClass('hidden')

			$('#xingge2').css('opacity', 1)
			$('.video_img').eq(0).removeClass('hidden')
			video.play($(swipe.scrollWrap).find('.page_landscape').find('video').eq(0))
		}
	}
})();

//变换视频方法
var videoChange = {
	init: function(){

	},
	bind: function(){

	},
	start: function(page){
		var self = this,
			videoWrap = page.find('.line_video_wrap')

		videoWrap
			.find('img.video_img, img.img_line_bottle').animate({
				opacity: 0
			},500, function() {
				video.play(videoWrap.find('video.video_line_bottle'), function(){
					self.change(page)
				})
			});
	},
	change: function(page){
		var self = this,
			// videoWrap = page.find('.line_video_wrap'),
			changeVideos = page.find('.change_videos'),
			ball_show = changeVideos.find('.ball_show'),
			ball_hide = changeVideos.find('.ball_hide'),
			space = changeVideos.find('.space'),

			video_line_computer = page.find('.video_line_computer'),
			img_line_computer = page.find('.img_line_computer')

		changeVideos
			.css('opacity', 1)
		video.play(ball_show, function(){
			ball_show.css('opacity', 0)
			ball_hide.css('opacity', 1)
			video.play(ball_hide, function(){
				page.removeClass('black')				

				video_line_computer.removeClass('hidden')
				var pc_info = swipe.page(swipe.scrollCurrent).find('.pc_info')
				bottle.resetPcBottle(pc_info)
				video.play(video_line_computer, function(){
					img_line_computer.removeClass('hidden')
					page
						.find('.bottom_text').addClass('hidden').end()
						.find('.pc_info').animate({
							opacity: 1
						}, 600, function() {})
						page.find('.line_video_wrap').animate({
							opacity: 0
						}, 600, function() {})

				})
			})
		})

		page
			.addClass('black')
			.find('.slogan_top, .bottom_text_normal').addClass('hidden')
		page.find('.restructuring').removeClass('hidden')
	}
}

//向上滑动方法
var swipe = {
	able: true,
	scrollWrap: '.main',
	loading: $('#loading'),
	iHeight: $('body').height(),
	scrolling: false,
	scrollCurrent: 0,
	scrollTarget: 1,
	bind: function(){
		var self = this
		//页面向上滑动事件绑定
		$(self.scrollWrap).find('.swipe').swipeUp(function(){
			if(self.scrolling){
				return false;
			}

			self.fSwipe(self.scrollTarget)
		})
	},
	page: function(i){
		return $(this.scrollWrap).find('section.page'+(i+1));
	},
	fSwipe: function(i){
		if(!this.able){
			return false
		}

		if(!i){
			i = this.scrollTarget
		}
		this.beforeSwipe(i)

		var self = this,
			oThis = $(self.scrollWrap),
			oSons = oThis.find('section')
		self.scrollTarget = i

		self.scrolling = !self.scrolling

		// oSons.eq(0).after(oThis.find('section.page'+(self.scrollTarget+1)));
		oSons.eq(0).after(self.page(self.scrollTarget));
		oThis
			.animate({
				marginTop: -self.iHeight
				}, 300, function() {
				oSons.eq(0).appendTo(oThis)
				oThis
					.css({marginTop: 0})

				self.scrollCurrent = self.scrollTarget
				self.scrollTarget ++

				self.scrolling = !self.scrolling

				// self.callback(self.scrollCurrent)
				var thisPage = self.page(self.scrollCurrent),
					iVideo = thisPage.find('video').length

				thisPage.data('ended') === undefined ? thisPage.data('ended', 0) : void(0)

				if(iVideo > 0 && iVideo != thisPage.data('ended')){
					thisPage.find('video')
						.each(function(j, el) {
							var oVideo = $(this)

							oVideo[0].load()
							oVideo[0]
								.addEventListener('loadeddata', function(){
									thisPage.data('ended', thisPage.data('ended')+1)

									if(iVideo == thisPage.data('ended')){
										self.loading.addClass('hidden')
										self.callback(self.scrollCurrent)
									}
								})
						});
				}else{
					self.callback(self.scrollCurrent)
				}
			});
	},
	beAble: function(){
		this.able = true
		$('.down_tip.hidden').removeClass('hidden')
	},
	beforeSwipe: function(i){
		console.log('beforeSwipe: ', i)

		var self = this,
			thisPage = self.page(i),
			iVideo = thisPage.find('video').length

		thisPage.data('ended') === undefined ? thisPage.data('ended', 0) : void(0)

		if(iVideo > 0 && iVideo != thisPage.data('ended')){
			self.loading
				.removeClass('hidden')
				.appendTo(thisPage)
		}

		thisPage
			.find('.begin_show').removeClass('hidden').end()
			.find('.begin_hidden').addClass('hidden').end()
			.find('.begin_op1').css('opacity', 1).end()
			.find('.begin_op0').css('opacity', 0)
	},
	callback: function(i){
		console.log('callback: ', i)

		var self = this,
			thisPage = self.page(i)

		switch (i) {
			case 1:
				self.able = false
				break;
			case 2:
				//Statements executed when the result of expression matches value2
				break;
			case 4:
				self.able = false
				
				//统计代码
				ga('send','event','bottleH5','ganguan','new');

				//感观瓶拧瓶盖事件绑定
				$('.rotate').swipeRight(function(){
					//统计代码
					ga('send','event','bottleH5','ganguan','home');

					var ganguanVedio0 = $('#ganguan0'),
						ganguanVedio1 = $('#ganguan1'),
						ganguanImg1 = $('#ganguanImg1')

					ganguanVedio0
						.next('img.rotate').addClass('hidden')
						.next('img.rotate').addClass('hidden')
					video.play(ganguanVedio0, function(){
						//显示底部『智能3D扫描』
						thisPage.find('.slogan span')
							.addClass('hidden')
							.eq(1).removeClass('hidden')

						//显示底部『3D人形影像已建立』
						setTimeout(function(){
							thisPage
								.find('.slogan span')
								.addClass('hidden')
								.eq(2).removeClass('hidden')
							}, 2500)

						ganguanVedio0.addClass('hidden')
						ganguanVedio1.removeClass('hidden')
						ganguanImg1.removeClass('hidden')
						video.play(ganguanVedio1, function(){
							self.beAble()
						})
					})
				})
				break;
			case 6:
				self.able = false

				//无界瓶按住麦克风事件绑定
				$('#microphone').longTap(function(){
					var wujieVedio0 = $('#wujie0'),
						wujieImg0 = $('#wujieImg0'),
						wujieImg1 = $('#wujieImg1')

					wujieVedio0.next('img').addClass('hidden')
					video.play(wujieVedio0, function(){
						wujieVedio0.addClass('hidden')
						wujieImg1.removeClass('hidden')
						self.beAble()
					})

				})

				break;
			case 8:
				//幻彩瓶
				self.able = false
				break;
			case 10:
				//超薄瓶
				self.able = false
				var chaobaoVideo0 = thisPage.find('video:first')
				video.play(chaobaoVideo0, function(){
					chaobaoVideo0.next('img').removeClass('hidden')
					self.beAble()
				})
				break;
			default:
				//Statements executed when none of the values match the value of the expression
				break;
		}

		if(thisPage.hasClass('line_page')){
			setTimeout(function(){
				videoChange.start(thisPage)
				// videoChange.start(swipe.page(i))
			}, 1000)
		}
	}
}

//震动方法
function shake(){
	var thisPage = swipe.page(swipe.scrollCurrent)
	if(!thisPage.hasClass('shake_section')){
		return false
	}

	swipe.beAble()

	var oShake = $('#shake_section'),
		count = oShake.find('img.video_img').length,
		random = Math.ceil(Math.random()*count)-1,
		randImg = $('#huancaiImg'+random)

	if(!randImg.hasClass('hidden')){
		shake()
		return false
	}
	thisPage.find('img.video_img').addClass('hidden')
	randImg.removeClass('hidden')
}

//手机震动
window.onload = function() {

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 10 //default 15
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);

    //shake event callback
    function shakeEventDidOccur () {

        //put your own code here etc.
        console.log('Shake!');
        shake()
    }
};

//判断横竖屏
window.addEventListener('orientationchange', function(event){
	var thisPage = swipe.page(swipe.scrollCurrent),
		canOri = thisPage.hasClass('page_landscape')
    if ( window.orientation == 180 || window.orientation==0 ) {
    	//竖屏
        console.log("竖屏");

		swipe.beAble()

		if(canOri){
			video.portrait()
		}
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
    	//横屏
        console.log("横屏");

		swipe.able = false

		if(canOri){
			video.landscape()
		}
    }
});

var oBottles = $('#bottles'),
	aBottles = [8, 6, 4, 10, 2]

oBottles.find('li').click(function(event) {
	var oThis = $(this),
		iIdx = oThis.index(),
		time = 500

	swipe.scrollTarget = aBottles[iIdx]

	oBottles
		.css('background', 'none')
		.next('.slogan_wrap').find('.slogan').html(oThis.data('text'))

	var oWin = $(window),
		iWinWidth = oWin.width(),
		iParentWidth = oThis.parent().width(),
		iMarginLeft = (iWinWidth-iParentWidth)/2
	oThis
		.removeClass('unselected')
		.css('z-index', 3)
		.animate({
			// width: 300,
			// height: 20,
			// paddingTop: 300,
			width: iWinWidth,
			paddingTop: iWinWidth,
			backgroundSize: '93.75% 93.75%',
			// margin: '0 0 0 -150px',
			margin: '-10% 0 0 -'+iMarginLeft+'px',
			// left: '50%',
			fontSize: '16px',
			textShadow: '0px 0px 8px #2cbbd8, 0px 0px 8px #2cbbd8'
		}, time, function() {
			swipe.beAble()
		})

	oBottles.find('li.unselected').animate({
		opacity: 0
	}, time, function() {});

	$('#black_bg').animate({
		opacity: 1
	}, time, function() {});
});

$(function() {
    FastClick.attach(document.body);

    //禁止橡皮筋
	function stopScrolling( touchEvent ) { 
		touchEvent.preventDefault(); 
	} 
	document.addEventListener( 'touchstart' , stopScrolling , false ); 
	document.addEventListener( 'touchmove' , stopScrolling , false );

	swipe.bind()

	var oLoadBox = $('#for_loading'),
		oLoadImg = oLoadBox.find('img'),
		iImg = oLoadImg.length,
		iImgAlready = 0

	oLoadImg.each(function(i){
		var oThis = $(this),
			sSrc = oThis.attr('src')
		oThis
			.attr('src', '')
			.on('load', function(){
				iImgAlready ++
				// console.log(iImgAlready)
				if(iImgAlready == iImg){
					$('#loading').addClass('hidden')
				}
			})
			.attr('src', sSrc)
	})
})
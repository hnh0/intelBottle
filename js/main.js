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
			$('#xingge2')
				.addClass('hidden')
			$('.video_img').eq(0).addClass('hidden')

			$('#xingge1').removeClass('hidden')
			$('.video_img').eq(1).removeClass('hidden')
			video.play($(swipe.scrollWrap).find('.page4').find('video').eq(1))
		},
		portrait: function (){
			$('#xingge1')
				.addClass('hidden')
			$('.video_img').eq(1).addClass('hidden')

			$('#xingge2').removeClass('hidden')
			$('.video_img').eq(0).removeClass('hidden')
			video.play($(swipe.scrollWrap).find('.page4').find('video').eq(0))
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
			},300, function() {
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
				img_line_computer.removeClass('hidden')
				video.play(video_line_computer, function(){
					page.find('.bottom_text').addClass('hidden')
					page.find('.pc_info').animate({
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
	iHeight: $('body').height(),
	scrolling: false,
	scrollCurrent: 0,
	scrollTarget: 1,
	bind: function(){
		//页面向上滑动事件绑定
		$(swipe.scrollWrap).find('.swipe').swipeUp(function(){
			if(swipe.scrolling){
				return false;
			}

			swipe.fSwipe(swipe.scrollTarget)
		})
	},
	page: function(i){
		return $(this.scrollWrap).find('section.page'+(i+1));
	},
	fSwipe: function(i){
		if(!this.able){
			return false
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

				self.callback(self.scrollCurrent)
			});
	},
	beAble: function(){
		this.able = true
		$('.down_tip.hidden').removeClass('hidden')
	},
	beforeSwipe: function(i){
		console.log('beforeSwipe: ', i)

		var self = this,
			thisPage = self.page(i)

		thisPage.find('.begin_show').removeClass('hidden')
		thisPage.find('.begin_hidden').addClass('hidden')
		thisPage.find('.begin_op1').css('opacity', 1)
		thisPage.find('.begin_op0').css('opacity', 0)
	},
	callback: function(i){
		console.log('callback: ', i)

		var self = this,
			thisPage = self.page(i)

		switch (i) {
			case 1:
				// self.able = false
				break;
			case 2:
				//Statements executed when the result of expression matches value2
				break;
			case 3:
				//Statements executed when the result of expression matches valueN
				break;
			case 4:
				//Statements executed when the result of expression matches valueN
				break;
			case 5:
				//Statements executed when the result of expression matches valueN
				break;
			case 6:
				self.able = false

				//感观瓶拧瓶盖事件绑定
				$('#rotate').swipeRight(function(){
					var ganguanVedio0 = $('#ganguan0'),
						ganguanVedio1 = $('#ganguan1'),
						ganguanImg1 = $('#ganguanImg1')

					ganguanVedio0.next('img').addClass('hidden')
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
				//Statements executed when the result of expression matches valueN
				break;
			default:
				//Statements executed when none of the values match the value of the expression
				break;
		}

		if(thisPage.hasClass('line_page')){
			videoChange.start(thisPage)
			// videoChange.start(swipe.page(i))
		}
	}
}

//手机震动
window.onload = function() {

    //create a new instance of shake.js.
    var myShakeEvent = new Shake({
        threshold: 15
    });

    // start listening to device motion
    myShakeEvent.start();

    // register a shake event
    window.addEventListener('shake', shakeEventDidOccur, false);

    //shake event callback
    function shakeEventDidOccur () {

        //put your own code here etc.
        console.log('Shake!');
    }
};

//判断横竖屏
window.addEventListener('orientationchange', function(event){
    if ( window.orientation == 180 || window.orientation==0 ) {
    	//竖屏
        console.log("竖屏");

		swipe.beAble()

		if(swipe.scrollCurrent == 2){
			video.portrait()
		}
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
    	//横屏
        console.log("横屏");

		swipe.able = false

		if(swipe.scrollCurrent == 2){
			video.landscape()
		}
    }
});

$(function() {
    FastClick.attach(document.body);

    swipe.bind()
})
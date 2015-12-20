(function(){
	window.video = {
		init: function(){

		},
		bind: function(){

		},
		play: function(target){
			target[0].play()
		},
		/***
		* target: (obj) 视频对象
		* img: (boolen) 默认显示图片，true不显示
		* callback: (function) 回调函数
		**/
		end: function(target, img, callback){
			target[0].addEventListener('ended', function(){
				if(!img){
					var img = target.find('img')
					target
						.after(img)
						.addClass('hidden')
				}

				if(callback)callback()
			},false)
		},
		play_end: function(obj){
			this.play(obj)
			this.end(obj)
		},
		landscape: function (){
			$('#guige2')
				.addClass('hidden')
			$('.video_img').eq(0).addClass('hidden')

			$('#guige1').removeClass('hidden')
			$('.video_img').eq(1).removeClass('hidden')
			video.play_end($(swipe.scrollWrap).find('.page3').find('video').eq(1))
		},
		portrait: function (){
			$('#guige1')
				.addClass('hidden')
			$('.video_img').eq(1).addClass('hidden')

			$('#guige2').removeClass('hidden')
			$('.video_img').eq(0).removeClass('hidden')
			video.play_end($(swipe.scrollWrap).find('.page3').find('video').eq(0))
		}
	}
})();

//向上滑动方法
var swipe = {
	able: true,
	scrollWrap: '.main',
	iHeight: $('body').height(),
	scrolling: false,
	scrollCurrent: 0,
	scrollTarget: 1,
	page: function(i){
		return $(this.scrollWrap).find('section.page'+(i+1));
	},
	fSwipe: function(i){
		if(!this.able){
			return false
		}

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
				}, 600, function() {
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
	callback: function(i){
		console.log(i)
		var self = this

		switch (i) {
			case 1:
				self.able = false
				break;
			case 2:
				//Statements executed when the result of expression matches value2
				break;
			case 3:
				self.page(3).find('.slogan_top, .bottom_text').animate({
					opacity: 1
					}, 500, function() {});
				//Statements executed when the result of expression matches valueN
				break;
			default:
				//Statements executed when none of the values match the value of the expression
				break;
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

		if(swipe.scrollCurrent == 2){
			video.portrait()
		}
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
    	//横屏
        console.log("横屏");

		if(swipe.scrollCurrent == 2){
			video.landscape()
		}
    }
});

$(function() {

    FastClick.attach(document.body);

	$(swipe.scrollWrap).find('.swipe').swipeUp(function(){
		if(swipe.scrolling){
			return false;
		}

		swipe.fSwipe(swipe.scrollTarget)
	})
})
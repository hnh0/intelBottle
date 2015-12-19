(function(){
	var video = {
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
						.remove()
				}

				if(callback)callback()
			},false)
		}
	} 

	$(function(){
		// var video_0 = $('#test')
		// video.play(video_0)
		// video.end(video_0)
	})
})();


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
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
    	//横屏
        console.log("横屏");
    }
});

//向上滑动方法
var swipe = {
	scrollWrap: '.main',
	iHeight: $('body').height(),
	scrolling: false,
	scrollCurrent: 0,
	scrollTarget: 1,
	fSwipe: function(i){
		var self = this,
			oThis = $(self.scrollWrap),
			oSons = oThis.find('section')
		self.scrollTarget = i

		self.scrolling = !self.scrolling

		oSons.eq(0).after(oThis.find('section.page'+(self.scrollTarget+1)));
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
			});
	}
}

$(function() {
    FastClick.attach(document.body);
 //    $('.main').onePageScroll({
	//     sectionContainer: "section",
	//     easing: "ease",
	//     animationTime: 500,
	//     pagination: false,
	//     updateURL: false,
	//     beforeMove: function(index) {},
	//     afterMove: function(index) {},
	//     loop: false,
	//     keyboard: true,
	//     responsiveFallback: false 
	// });
	$(swipe.scrollWrap).swipeUp(function(){
		if(swipe.scrolling){
			return false;
		}

		swipe.fSwipe(swipe.scrollTarget)
	})
})
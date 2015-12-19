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
		var video_0 = $('#test')
		video.play(video_0)
		video.end(video_0)
	})
})();

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

$(function() {
    FastClick.attach(document.body);
    $('.main').onePageScroll({
	    sectionContainer: "section",
	    easing: "ease",
	    animationTime: 1000,
	    pagination: true,
	    updateURL: false,
	    beforeMove: function(index) {},
	    afterMove: function(index) {},
	    loop: false,
	    keyboard: true,
	    responsiveFallback: false 
	});
})
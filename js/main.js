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
		video_0.play(target)
		video_0.end(target)
	})
})();

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
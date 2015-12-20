(function(){
	var bottle = {
		bottle_img: ['huancai', 'wujie', 'ganguan', 'chaobo', 'xingge'],
		bottle_txt: ['幻彩瓶', '无界瓶', '感官瓶', '超薄瓶', '型格瓶'],
		bottle_target: [],
		showBottle: function (id) {
			var $img = $('.bottle_entry_img'),
				$txt = $('.bottle_entry_text')
			$img.attr('src', './img/' + bottle.bottle_img[id] + '.png');
			$txt.html(bottle.bottle_txt[id]);
			$('.bottle_entry').removeClass('hidden');
		},
		hideList: function () {
			$('.bottle_list_circle').hide();
		},
		showList: function () {
			$('.bottle_list_circle').show();
		}
	};

	$('.list_bottle').on('click', function () {
		var id = $(this).attr('id').split('_')[1];
		bottle.hideList();
		bottle.showBottle(id);
		// swipe.scrollTarget = bottle.bottle_target[id];
		swipe.beAble();
	});
	$('.index_link').on('click', function () {
		$('.main_statement').removeClass('hidden');
	});
	$('.main_statement').on('click', function () {
		$('.main_statement').addClass('hidden');
	})
})();
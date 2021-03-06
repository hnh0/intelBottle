(function(){
	window.bottle = {
		bottle_img: ['huancai', 'wujie', 'ganguan', 'chaobo', 'xingge'],
		bottle_other: ['ganguan', 'wujie', 'chaobo', 'xingge', 'huancai'],
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
		},
		hidePc: function (type) {
			$('.pc_info .slogan_wrap').addClass('hidden');
			$('.pc_info .pc_pc').addClass('hidden');
			$('.' + type + '_pc').addClass('hidden');
			
		},
		showPcIndex: function (type, index) {
			if(type && index){
				$('.' + type + '_pc_' + index).removeClass('hidden');
			}
		},
		showOtherBottle: function (pc_info) {
			pc_info.find('.other_handle').addClass('hidden');
			pc_info.find('.other_bottle').removeClass('hidden');
			pc_info.find('.pc_bottle').addClass('hidden');
			pc_info.find('.info_pc_item').addClass('hidden');
			pc_info.find('.pc_info_detail').addClass('hidden');
			pc_info.find('.slogan_wrap').addClass('hidden');
			pc_info.find('.pc_share').removeClass('hidden');
			pc_info.find('.pc_info_detail_share').removeClass('hidden');
		},
		hiddenOtherBottle: function (pc_info) {
			pc_info.find('.other_handle').removeClass('hidden');
			pc_info.find('.other_bottle').addClass('hidden');
			pc_info.find('.pc_bottle').removeClass('hidden');
			pc_info.find('.info_pc_item').removeClass('hidden');
			pc_info.find('.pc_info_detail').removeClass('hidden');
			pc_info.find('.slogan_wrap').removeClass('hidden');
			pc_info.find('.pc_share').addClass('hidden');
			pc_info.find('.pc_info_detail_share').addClass('hidden');
		},
		resetPcBottle: function (pc_info) {
			pc_info.find('.other_handle').removeClass('hidden');
			pc_info.find('.other_bottle').addClass('hidden');
			pc_info.find('.pc_bottle').removeClass('hidden');
			pc_info.find('.info_pc_item').addClass('hidden');
			pc_info.find('.pc_info_detail').removeClass('hidden');
			pc_info.find('.slogan_wrap').removeClass('hidden');
			pc_info.find('.pc_pc').removeClass('hidden')
			pc_info.find('.pc_share').addClass('hidden');
			pc_info.find('.pc_info_detail_share').addClass('hidden');
		},
		showShare: function (pc_info) {
			pc_info.find('.layer').removeClass('hidden');
		},
		hideShare: function () {
			$('.layer').addClass('hidden')
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
		ga('send','event','bottleH5','statement');
		$('.main_statement').removeClass('hidden');
	});
	$('.statement_back').on('click', function () {
		ga('send','event','bottleH5','back');
	});
	$('.pc_point').on('click', function () {
		var index = $(this).attr('index'),
			type = $(this).closest('.pc_info').attr('type');
		var pc_info = $(this).closest('.pc_info');
		bottle.hiddenOtherBottle(pc_info);
		bottle.hidePc(type);
		bottle.showPcIndex(type, index);
	});
	$('.other_handle').on('touchstart', function () {
		var pc_info = $(this).closest('.pc_info');
		bottle.showOtherBottle(pc_info);
		var type = pc_info.attr('type');
		ga('send','event','bottleH5',type,'other');
	});

	var aOther = [4, 6, 10, 2, 8]
	$('.other_item').on('click', function () {
		var index = $(this).attr('index');
		var curtype = bottle.bottle_other[Number(index)];
		var pc_info = $(this).closest('.pc_info'),
			type = pc_info.attr('type');
		ga('send','event','bottleH5',type,curtype);
		bottle.resetPcBottle(pc_info);
		console.log(index);
		swipe.fSwipe(aOther[index]);
		
	});
	$('.share_btn').on('click', function () {
		var pc_info = $(this).closest('.pc_info');
		bottle.showShare(pc_info);
	});
	$('.share_close').on('click',function () {
		$(this).closest('.layer').addClass('hidden')
	});
	$('.buy_btn').on('click',function () {
		var type = $(this).closest('.pc_info').attr('type');
		ga('send','event','bottleH5',type,'buying');
	});
	$('.share_btn').on('click', function () {
		var type = $(this).closest('.pc_info').attr('type');
		ga('send','event','bottleH5',type,'share');
	})
})();





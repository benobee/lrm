import $ from 'jquery';
import Scrollmap from 'scrollmap';

const post = {
	init() {
		Scrollmap.add('.sidebarWrapperPost', {
			onTriggerIn() {
				$('.sidebar-ad.long').removeClass("fixed");
			},
			onTriggerOut() {
				$('.sidebar-ad.long').addClass("fixed");
			},
			surfaceVisible: 0
		});

		Scrollmap.add('#footer', {
			onTriggerIn() {
				$('.sidebar-ad.long').addClass("bottom");
			},
			onTriggerOut() {
				$('.sidebar-ad.long').removeClass("bottom");
			},
			surfaceVisible: 0
		});				
	}
};

export default post;
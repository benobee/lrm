import $ from 'jquery';
import Scrollmap from './scrollmap';

const post = {
	init() {
		Scrollmap.add('.sidebar .sqs-layout', {
			onTriggerIn() {
				$('.sticky-ad').removeClass("fixed");
			},
			onTriggerOut() {
				$('.sticky-ad').addClass("fixed");
			},
			surfaceVisible: 0
		});

		Scrollmap.add('.sidebarWrapperPost', {
			onTriggerIn() {
				$('.sticky-ad').removeClass("fixed");
			},
			onTriggerOut() {
				$('.sticky-ad').addClass("fixed");
			},
			surfaceVisible: 0
		});

		Scrollmap.add('#footer', {
			onTriggerIn() {
				$('.sticky-ad').addClass("bottom");
			},
			onTriggerOut() {
				$('.sticky-ad').removeClass("bottom");
			},
			surfaceVisible: 0
		});				
	}
};

export default post;
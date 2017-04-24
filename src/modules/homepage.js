import $ from 'jquery';
import 'owl.carousel';
import Util from './util';
import Component from 'component-literal';

const homepage = {
	init(){
		this.isMobile = Util.isMobile();
		this.isPhone = this.checkWidth();
		this.executeContent();

		console.log(this);
	},
	checkWidth() {
		if (window.innerWidth <= 768) {
			return true;
		} else {
			return false;
		}
	},
	executeContent() {
		if (this.isMobile && this.isPhone){
			$("#canvasWrapper").addClass("is-mobile");
			this.renderInitialPosts();
		}
	},
	getData(url) {
		return $.ajax({
			url: url,
			dataType: "jsonp",
			data: {
				format: 'json'
			},
			success: (response) => {
				return response;
			}
		});
	},
	generatePostHTML(data) {
		const items = data.items.map((item, i) => {
			return (
           		`<a href="${item.fullUrl}" class="card">
		     		<div class="image-wrapper">
		     			<div class="image" style="background-image: url('${item.assetUrl}?format=600w');"></div>
					</div>
		 			<div class="content">
		 				<div class="header">${item.title}</div>
		 			</div>
		 		</a>`
           	)
    	}).join("");

    	return items;
	},
	generateLoadMoreButton() {
		$('.collection-list').after('<div class="button load-more">LOAD MORE</div>');

		$('.button.load-more').on("click", (e) => {
			this.activeScroll = false;
			this.appendPosts();
		});
	},
	renderInitialPosts() {
		$.when( this.getData('/news') ).done((data) => {
			const $collectionList = $('#collection-56c368da9f7266b6a2b43218 #content .sqs-col-12:nth-child(1) > div:nth-child(5)');

			const html = this.generatePostHTML(data);

			const posts = `<div class="collection-list">${html}</div>`;

    		$($collectionList).html(posts);

    		this.ads();
    		this.generateLoadMoreButton();

    		this.data = data;
			this.activeScroll = true;

			$(window).on("load scroll", (e) => {
				const elementBottom = $collectionList.position().top + $collectionList.outerHeight(true);

				const top = $(window).scrollTop() + 900;

				if (elementBottom <= top) {
					if (this.activeScroll) {
						this.activeScroll = false;
						this.appendPosts();
					}
				}
			});
		});	
	},
	appendPosts() {
		const url = this.data.pagination.nextPageUrl;

		$.when( this.getData(url) ).done((data) => {
			this.data = data;
			this.activeScroll = true;

			const $collectionList = $('#collection-56c368da9f7266b6a2b43218 #content .sqs-col-12:nth-child(1) > div:nth-child(5)');

			const html = this.generatePostHTML(data);

    		$('.collection-list').append(html);

    		this.ads();
		});
	},
	ads() {
		$('.mobile-ad').remove();

		const posts = $('.collection-list .card').toArray();

		posts.forEach((item, i) => {
			if ( i && (i % 6 === 0)) {
				const ad = '<div class="mobile-ad"></div>';

				$(item).after(ad);
			}
		});
	}
};

export default homepage;
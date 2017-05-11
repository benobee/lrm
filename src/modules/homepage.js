import $ from 'jquery';
import 'owl.carousel';
import Util from './util';

const homepage = {
	init(){
		this.isMobile = Util.isMobile();
		this.isPhone = this.checkWidth();

		const homepage = $('#collection-56c368da9f7266b6a2b43218');

		if (homepage.length > 0) {
			this.executeContent();
		}
		
		console.log(this);
	},
	checkWidth() {
		if (window.innerWidth <= 768) {
			return true;
		} else {
			return false;
		}
	},
	deployAd() {
		/*** HEAD ***/

		const headScript = document.createElement("script");

		$("#playwireBody").before(headScript);

		$('#headScript').append(headScript);

		headScript.textContent = `console.log("( running PLAYWIRE head script )");`;

		$(headScript).attr("src", "//aka-cdn-ns.adtechus.com/dt/common/DAC.js");

		/*** BODY ***/

		const bodyScript = document.createElement("script");

		$("#playwireBody").html(bodyScript);

		bodyScript.textContent = `console.log("( running PLAYWIRE body script )");ADTECH.config.page = { protocol: 'https', server: 'ads.intergi.com', network: '5205.1', pageid: 0, params: { loc: '100' }};`;

		/*** AD ***/

		const adContainer = `<div id="4537701"><noscript><a href="http://ads.intergi.com/adlink|3.0|5205.1|4537701|0|3055|ADTECH;loc=300;key=key1+key2+key3+key4;alias=" target="_blank"><img src="http://ads.intergi.com/adserv|3.0|5205.1|4537701|0|3055|ADTECH;loc=300;key=key1+key2+key3+key4;alias=" border="0" width="320" height="50"></a></noscript></div>`;

		$("#canvasWrapper").append(adContainer);

		const adScript = document.createElement("script");

		$('#4537701').after(adScript);

		adScript.textContent = `console.log("( running PLAYWIRE ad script )");
			ADTECH.config.placements[4537701] = { sizeid: 3055, params: { alias: '', target: '_blank' }};
			ADTECH.loadAd(4537701);`;
	},
	executeContent() {
		if (this.isMobile && this.isPhone){
			$("body").addClass("is-mobile");
			$.when( this.renderInitialPosts() ).then(() => {
				//this.deployAd();
			});
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
		$('#collection-56c368da9f7266b6a2b43218 #content').html("");

		$.when( this.getData('/news') ).done((data) => {
			const $collectionList = $('#collection-56c368da9f7266b6a2b43218 #content');

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
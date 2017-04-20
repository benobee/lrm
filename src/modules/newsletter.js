import cookie from './cookie.js';
import $ from 'jquery';

const newsletter = {
    init(){
        this.cacheDOM();
        this.cookieName = 'Newsletter';
        this.events();

        setTimeout(() => {
        	this.checkCookie();
        }, 3000);

    },
    events(){
        this.closePopupWhenClicked();
    },
    cacheDOM(){
    	this.container = $('.app-module.popup.newsletter');
    },
    showPopup(){
    	$(this.container).addClass("is-rendered");
    },
    checkCookie(){
    	const newsletter = {};

    	let hasBeenVisible = false;
 
    	hasBeenVisible = cookie.get(this.cookieName);

    	if (hasBeenVisible == undefined) {
    		this.showPopup();
    		return false;
    	}
    },
    closePopupWhenClicked(){
        $(".app-module.popup .close").on("click", () => {
            this.setCookies();
            $(this.container).removeClass("is-rendered");
        });
    },
    setCookies() {
    	cookie.set(this.cookieName, true, 365);
    }
};

export default newsletter;

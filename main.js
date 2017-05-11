import * as core from './src/modules/index.js';
import $ from 'jquery';

const css = require("./main.less");

class App_Build {
    constructor() {
    	$(document).ready(() => {
    		core.homepage.init();
    		core.carousel.init();
    		core.newsletter.init();
    		core.postWidget.init();
    		core.post.init();
    		core.nav.init();
            core.helpers.init();
    	});
    }
};

const App = new App_Build();




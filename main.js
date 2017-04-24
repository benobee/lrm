import * as core from './src/modules/index.js';
import $ from 'jquery';

const css = require("./main.less");

class App_Build {
    constructor() {
    	$(document).ready(() => {
    		core.carousel.init();
    		core.newsletter.init();
    		core.homepage.init();
    		core.postWidget.init();
    		core.post.init();
    	});
    }
};

const App = new App_Build();




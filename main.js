import * as core from './imports/modules/index.js';

const css = require("./main.less");

class App_Build {
    constructor() {
    	core.carousel.init();
    	core.newsletter.init();
    }
};

const App = new App_Build();




import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = jQuery;
import '../../template/scripts/transition.min.js';
import '../../template/scripts/dropdown.min.js';

const nav = {
	init() {
		this.events();
	},
	events() {
            
        $('.sidebar-button').on('click', () => {
            $('#main-navigation').transition('fade right');
        });
        $('.navDropdownMenu').dropdown({
            transition: 'fade right',
            on: 'hover',
            keepOnScreen: true
        });
    }
};

export default nav;
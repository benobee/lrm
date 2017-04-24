import $ from 'jquery';

const postWidget = {
    init(){
      this.events();   
      this.loadFirstSmallPostCategory();
    },
    events(){
        $('#sidebarPosts .button').on('click', (e) => {
            this.filterSmallPostCategory(e);
        }); 
    },
    loadFirstSmallPostCategory(){
      $('#recentPosts').show();
    },
    hideCurrentCategory(){
      $('.posts').hide(); 
    },
    showNextCategory(target){
      $('#'+ target + 'Posts').show(); 
    },
    filterSmallPostCategory(e){      
      const dataId = $(e.currentTarget).attr('data-id');

      this.hideCurrentCategory();

      setTimeout(() => {
        this.showNextCategory(dataId);
      }, 200);    
    }
};

export default postWidget;
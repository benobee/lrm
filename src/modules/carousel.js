import $ from 'jquery';
import 'owl.carousel';

const carousel = {
    init(){
        this.owl = $('.owl-carousel');

        this.owl.length !== 0 ? true : false;

        this.onLoad(); 
        this.onChange();

        this.renderInfoBox();
        this.bindInfoBoxEvents();

    },
    onLoad() {
        let owl = this.owl;

        $(owl).owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            mouseDrag: false,
            autoWidth: false,
            nav: true,
            navText: true,
            autoplayTimeout: 8000,
            autoplaySpeed: 500,
            onInitialized(){

                //hide action, show info box
                $('.controlsLeft .action').css('opacity',0);
                $('#LRM-carousel .info-box').css('opacity', 1);

                //click next
                $('#LRM-carousel .next').click((event) => {
                    event.stopPropagation();
                    owl.trigger('next.owl.carousel', [500]);         
                });
              
                //click prev
                $('#LRM-carousel .prev').click((event) => {
                    event.stopPropagation();
                    // With optional speed parameter
                     // Parameters has to be in square bracket '[]'
                    owl.trigger('prev.owl.carousel', [500]);
                });
            }
        });
    },
    onChange(owl){
        this.owl.on('changed.owl.carousel', (event) => {
      
            $('#LRM-carousel .info-box').css({'opacity': 0});
                setTimeout(() => {            
                    this.renderInfoBox();            
                    setTimeout(() => {
                        $('#LRM-carousel .info-box').css({'opacity': 1});
                    },300);           
            },200); 
        }); 
    },
    renderInfoBox(){
        var header = $('#LRM-carousel .active > .item .header');
        var title = $(header).attr('data-title');

        $('#LRM-carousel .info-box .title').html(title);

        var href = $(header).attr('data-href');

        $('#LRM-carousel .info-box .link').attr('href', href);
        $('#LRM-carousel .info-box .action').attr('href', href);

        var text = $(header).attr('data-text');

        $('#LRM-carousel .info-box .excerpt').html(text);            
    },
    bindInfoBoxEvents(){
      
        $('#LRM-carousel, .info-box').on('mouseover', () => {
            this.owl.trigger('stop.owl.autoplay');
        });
      
        $('#LRM-carousel').on('mouseenter', () => {
            $('.controlsLeft .action').css('opacity',1);
            $('.info-box .title').css('opacity',0);

            $('.info-box').css({
                width: '18em'
            });

            $('.info-box .excerpt').css({
                display: 'block'
            });

            setTimeout(() => {
                $('.info-box .excerpt').css({
                    opacity: '1'
                });      

                $('.info-box .title').css('opacity',1);

            },600);

        });
      
        $('#LRM-carousel').on('mouseleave', () => {
            $('.controlsLeft .action').css('opacity',0);
            $('.info-box .previewBody').html('');
          
            $('.info-box .title').css('opacity',0);
            $('.info-box').css({
                width: '12em'
            });

            $('.info-box .excerpt').css({
                display: 'none',
                opacity: 0
            });

            setTimeout(() => {
                $('.info-box .title').css('opacity',1);
            }, 600);

            this.owl.trigger('play.owl.autoplay');

        });
    }
};

export default carousel;
import $ from 'jquery';

const helpers = {
        init() {
            this.addCommentsSummaryItems();
            this.addCommentsCards();

            $(document).ready(() => {
                this.expungeImageHTML();
            });

        },
        expungeImageHTML() {
            /* if post has tag of tag-l-r img html tag will be removed*/
            const array = [];

            const images = $('.view-item .author-l-r .intrinsic, .view-item .author-l-r img');

            const hasAuthorClass = $('.author-l-r');

            if (hasAuthorClass.length > 0) {
                /* removing meta tags from header */
                const url = 'http://static1.squarespace.com/static/53323bb4e4b0cebc6a28ffa2/53573350e4b0758dd79db484/5863c630414fb56e15e4be15/1482978187922/HIDDEN%2BFIGURES.jpeg?format=1000w';

                const links = $('link[href="' + url + '"]');

                const meta = $('meta[content="' + url + '"]');

                const merge = $.merge(links, meta);

                $.each(merge, function() {
                    $(this).attr({
                        href: '',
                        content: ''
                    });
                });
            }

            $.each(images, function(i) {
                $(this).html('');
            });
        },
        addCommentsSummaryItems() {
            const articles = $(document).find('.summary-item').toArray();

            $.each(articles, (i) => {
                const article = $(articles[i]).find('.summary-title > a');

                const href = $(article).attr('href');

                $(articles[i]).append('<div class="commentCount"><a href="' + href + '#disqus_thread' + '">0</a></div>');
            });
        },
        addCommentsCards() {
            const articles = $(document).find('.card').toArray();

            $.each(articles, (i) => {
                const href = $(articles[i]).attr('href');

                $(articles[i]).append('<div class="commentCount"><a href="' + href + '#disqus_thread' + '">0</a></div>');
            });
        }
};

export default helpers;

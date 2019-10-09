const reviews = () => {
    const reviewsSlider = document.querySelector('.reviews-slider'),
        reviewsSliderWrap = document.querySelector('.reviews-slider-wrap'),
        reviewsArrowleft = document.getElementById('reviews-arrow_left'),
        reviewsArrowRight = document.getElementById('reviews-arrow_right');

    let slidePOffset,
        currentPPosition,
        slidePCount,
        customWrap;

    const addWrap = () => {
        let wrap = document.querySelector('.reviewSliderCustomWrap');
        if (!wrap) {

            customWrap = document.createElement('div');
            customWrap.classList.add('reviewSliderCustomWrap');

            let sliderItems = reviewsSlider.children;
            let count = sliderItems.length;

            for (let index = 0; index < count; index++) {
                customWrap.appendChild(sliderItems[0]);
            }

            reviewsSlider.appendChild(customWrap);
        }
    };
    const addStyles = () => {
        let style = document.getElementById('reviewSliderCustom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'reviewSliderCustom-style';
        }

        style.textContent = `
            .reviewSliderCustomWrap{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height:100%;
            transition:transform 0.5s !important;
        }
        .reviewSliderItem{
            min-width: ${slidePOffset}px !important;
        }`;

        document.head.appendChild(style);
    };
    const slideForwardP = () => {
        ++currentPPosition;
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * currentPPosition}px);`;

        if (currentPPosition === slidePCount - 1) {
            reviewsArrowRight.style.display = 'none';
        }
        if (currentPPosition === 1) {
            reviewsArrowleft.style.display = 'flex';
        }
    };
    const slideBackP = () => {
        --currentPPosition;
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * currentPPosition}px);`;

        if (currentPPosition === 0) {
            reviewsArrowleft.style.display = 'none';
        }
        if (currentPPosition === slidePCount - 2) {
            reviewsArrowRight.style.display = 'flex';
        }
    };

    const init = () => {
        reviewsArrowleft.addEventListener('click', slideBackP);
        reviewsArrowRight.addEventListener('click', slideForwardP);
        addWrap();
        slidePOffset = customWrap.clientWidth;
        addStyles();
        reviewsArrowleft.style.display = 'none';

        for (let index = 0; index < customWrap.children.length; index++) {
            customWrap.children[index].classList.add('reviewSliderItem');
        }
        currentPPosition = 0;
        slidePCount = customWrap.children.length;
    };
    init();

};

export default reviews;
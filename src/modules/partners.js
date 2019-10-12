const partners = () => {
    const reviewsSlider = document.querySelector('.partners-slider'),
        reviewsArrowleft = document.getElementById('partners-arrow_left'),
        reviewsArrowRight = document.getElementById('partners-arrow_right'),
        wrap = document.querySelector('#partners .wrapper');

    let slidePOffset,
        currentPPosition,
        slidePCount,
        customWrap;

    const addWrap = () => {
        let wrap = document.querySelector('.partnersSliderCustomWrap');
        if (!wrap) {

            customWrap = document.createElement('div');
            customWrap.classList.add('partnersSliderCustomWrap');

            let sliderItems = reviewsSlider.children;
            let count = sliderItems.length;

            for (let index = 0; index < count; index++) {
                customWrap.appendChild(sliderItems[0]);
            }

            reviewsSlider.appendChild(customWrap);
        }
    };
    const addStyles = () => {
        let style = document.getElementById('partnersSliderCustom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'partnersSliderCustom-style';
        }

        style.textContent = `
            .partnersSliderCustomWrap{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height:100%;
            transition:transform 0.5s !important;
        }
        .partnersSliderItem{
            min-width: ${slidePOffset}px !important;
        }
        .partnersSliderItem svg{
            width:57%;
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

    const init = (countInScreen) => {
        reviewsArrowleft.addEventListener('click', slideBackP);
        reviewsArrowRight.addEventListener('click', slideForwardP);
        addWrap();
        slidePOffset = customWrap.clientWidth / countInScreen;
        addStyles();
        reviewsArrowleft.style.display = 'none';

        for (let index = 0; index < customWrap.children.length; index++) {
            customWrap.children[index].classList.add('partnersSliderItem');
        }
        currentPPosition = 0;
        slidePCount = customWrap.children.length - (countInScreen - 1);
        wrap.style.cssText = 'overflow: hidden;';
    };
    if (document.documentElement.clientWidth < 525) {
        init(1);
    } else {
        init(3);
    }

};

export default partners;
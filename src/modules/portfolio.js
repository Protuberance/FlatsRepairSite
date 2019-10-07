const portfolio = () => {
    const portfolioSlider = document.querySelector('.portfolio-slider'),
        portfolioArrowRight = document.getElementById('portfolio-arrow_right'),
        portfolioArrowLeft = document.getElementById('portfolio-arrow_left'),

        portfolioSliderMobile = document.querySelector('.portfolio-slider-mobile'),
        portfolioArrowMobileLeft = document.getElementById('portfolio-arrow-mobile_left'),
        portfolioArrowMobileRight = document.getElementById('portfolio-arrow-mobile_right'),
        sliderCounterContentCurrent = document.querySelector('.portfolio-slider-wrap .slider-counter-content__current'),
        sliderCounterContentTotal = document.querySelector('.portfolio-slider-wrap .slider-counter-content__total');

    let customWrap,
        currentSlider,
        maxCount,
        currentPosition,
        slideOffset,
        leftArrow,
        rightArrow,
        isMobile;

    const addWrap = () => {
        customWrap = document.createElement('div');
        customWrap.classList.add('portfolioSliderCustomWrap');

        let sliderItems = currentSlider.children;
        let count = sliderItems.length;

        for (let index = 0; index < count; index++) {
            customWrap.appendChild(sliderItems[0]);
        }

        currentSlider.appendChild(customWrap);
    };
    const addStyles = () => {
        let style = document.getElementById('sliderPortfolio-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderPortfolio-style';
        }
        if (isMobile) {
            style.textContent = `
            .portfolioSliderCustomWrap{
            position: relative;
            width: 100%;
            height:100%;
        }`;
        } else {
            style.textContent = `
        .portfolioSliderCustomWrap{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height:100%;
    }`;
        }

        document.head.appendChild(style);
    };

    const slideForward = () => {
        ++currentPosition;
        if (isMobile) {
            customWrap.style.cssText = `transform: translateY(-${slideOffset * currentPosition}px);`;
            sliderCounterContentCurrent.textContent = currentPosition + 1;
        } else {
            customWrap.style.cssText = `transform: translateX(-${slideOffset * currentPosition}px);`;
        }


        if (currentPosition === maxCount - 1) {
            rightArrow.style.display = 'none';
        }
        if (currentPosition === 1) {
            leftArrow.style.display = 'flex';
        }
    };
    const slideBack = () => {
        --currentPosition;
        if (isMobile) {
            customWrap.style.cssText = `transform: translateY(-${slideOffset * currentPosition}px);`;
            sliderCounterContentCurrent.textContent = currentPosition + 1;
        } else {
            customWrap.style.cssText = `transform: translateX(-${slideOffset * currentPosition}px);`;
        }


        if (currentPosition === 0) {
            leftArrow.style.display = 'none';
        }
        if (currentPosition === maxCount - 2) {
            rightArrow.style.display = 'flex';
        }
    };
    const init = () => {
        if (document.documentElement.clientWidth < 575) {
            slideOffset = portfolioSliderMobile.children[0].clientHeight;
            maxCount = portfolioSliderMobile.children.length;
            leftArrow = portfolioArrowMobileLeft;
            rightArrow = portfolioArrowMobileRight;
            currentSlider = portfolioSliderMobile;
            sliderCounterContentTotal.textContent = maxCount;
            sliderCounterContentCurrent.textContent = 1;
            leftArrow.style.display = 'none';
            isMobile = true;
        } else {
            slideOffset = portfolioSlider.children[0].clientWidth;
            let deltaOffset = Math.floor(portfolioSlider.clientWidth / slideOffset);
            deltaOffset = deltaOffset === 1 ? 0 : deltaOffset;
            maxCount = portfolioSlider.children.length - deltaOffset;
            leftArrow = portfolioArrowLeft;
            rightArrow = portfolioArrowRight;
            currentSlider = portfolioSlider;
            isMobile = false;
        }
        currentPosition = 0;
        addStyles();
        addWrap();
        customWrap.style.cssText = `transform: translateX(0px);`;
        customWrap.style.cssText = `transform: translateY(0px);`;

        leftArrow.addEventListener('click', slideBack);
        rightArrow.addEventListener('click', slideForward);
    };
    init();
    window.addEventListener('resize', init);
};

export default portfolio;
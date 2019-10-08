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
            transition:transform 0.5s !important;
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
        transition:transform 0.5s !important;
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
            if (document.documentElement.clientWidth > 1140) { //3
                slideOffset = portfolioSlider.clientWidth / 3;
                for (let index = 0; index < portfolioSlider.children.length; index++) {
                    portfolioSlider.children[index].style.cssText = `min-width: ${slideOffset}px;`;
                }
                maxCount = portfolioSlider.children.length - 2;
            }
            else if (document.documentElement.clientWidth <= 1140 && document.documentElement.clientWidth > 900) { // 2
                slideOffset = portfolioSlider.clientWidth / 2;
                for (let index = 0; index < portfolioSlider.children.length; index++) {
                    portfolioSlider.children[index].style.cssText = `min-width: ${slideOffset}px;`;
                }
                maxCount = portfolioSlider.children.length - 1;
            }
            else {
                slideOffset = portfolioSlider.clientWidth;
                for (let index = 0; index < portfolioSlider.children.length; index++) {
                    portfolioSlider.children[index].style.cssText = `min-width: ${slideOffset}px;`;
                }
                maxCount = portfolioSlider.children.length;
            }
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

        if (document.documentElement.clientWidth >= 1024) {
            if (!isMobile) {
                let slides = customWrap.querySelectorAll('.portfolio-slider__slide-frame');
                slides.forEach((element, index) => {
                    element.addEventListener('click', () => { picturesSlder(index); });
                });
            }
        }

    };
    init();

    window.addEventListener('resize', init);

    const popupPortfolio = document.querySelector('.popup-portfolio'),
        popupPortfolioSlider = document.querySelector('.popup-portfolio-slider'),
        popupPortfolioSliderWrap = document.querySelector('.popup-portfolio-slider-wrap'),//position:absolut  !!!
        popupPortfolioLeft = document.getElementById('popup_portfolio_left'),
        popupPortfolioRight = document.getElementById('popup_portfolio_right'),
        popupPortfolioTextArray = document.querySelectorAll('.popup-portfolio-text'),//margin-right: 80px;
        popupPortfolioCounterCurrent = document.querySelector('#popup-portfolio-counter .slider-counter-content__current'),
        popupPortfolioCounterTotal = document.querySelector('#popup-portfolio-counter .slider-counter-content__total');

    let countPSlides,
        slidHeight,
        slidesArray,
        textsArray,
        currentPPosition;

    const addPStyles = () => {
        let style = document.getElementById('sliderPicturePortfolio-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderPicturePortfolio-style';
        }

        style.textContent = `
        .popup-portfolio-text{
            margin-right: 80px !important;
    }
    .popup-portfolio-slider{
        transition:transform 0.5s !important;
    }`;

        document.head.appendChild(style);
    };

    const initPicturesSlder = () => {
        countPSlides = popupPortfolioSlider.children.length;
        slidHeight = document.querySelector('.popup-dialog-portfolio').clientHeight;

        for (let index = 0; index < popupPortfolioSlider.children.length; index++) {
            popupPortfolioSlider.children[index].style.cssText = `min-height: ${slidHeight}px;`;
        }

        popupPortfolioRight.addEventListener('click', slidePForward);
        popupPortfolioLeft.addEventListener('click', slidePBack);
        slidesArray = popupPortfolioSlider.children;
        popupPortfolioSliderWrap.style.cssText = 'position: absolute;';
        popupPortfolioCounterTotal.textContent = countPSlides;
        popupPortfolio.addEventListener('click', popupPortfolioClickHandler);

        addPStyles();
    };

    const slidePForward = () => {
        ++currentPPosition;
        popupPortfolioSlider.style.cssText = `transform: translateY(-${slidHeight * currentPPosition}px);`;
        popupPortfolioCounterCurrent.textContent = currentPPosition + 1;
        showCurrentText(currentPPosition);


        if (currentPPosition === countPSlides - 1) {
            popupPortfolioRight.style.display = 'none';
        }
        if (currentPPosition === 1) {
            popupPortfolioLeft.style.display = 'flex';
        }
    };
    const slidePBack = () => {
        --currentPPosition;
        popupPortfolioSlider.style.cssText = `transform: translateY(-${slidHeight * currentPPosition}px);`;
        popupPortfolioCounterCurrent.textContent = currentPPosition + 1;
        showCurrentText(currentPPosition);


        if (currentPPosition === 0) {
            popupPortfolioLeft.style.display = 'none';
        }
        if (currentPPosition === countPSlides - 2) {
            popupPortfolioRight.style.display = 'flex';
        }
    };
    const showCurrentText = (index) => {
        popupPortfolioTextArray.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };
    const picturesSlder = (index) => {
        currentPPosition = index;

        popupPortfolio.style.cssText = 'visibility: visible;';
        popupPortfolioSlider.style.cssText = `transform: translateY(-${slidHeight * currentPPosition}px);`;
        showCurrentText(currentPPosition);
        popupPortfolioCounterCurrent.textContent = currentPPosition + 1;

        if (currentPPosition === 0) {
            popupPortfolioLeft.style.display = 'none';
        }
        if (currentPPosition === countPSlides - 1) {
            popupPortfolioRight.style.display = 'none';
        }
    };
    const popupPortfolioClickHandler = (event) => {
        if (event.target.closest('.close') || event.target.classList.contains('popup-portfolio')) {
            popupPortfolio.style.cssText = 'visibility: hidden;';
        }
    };
    initPicturesSlder();
};

export default portfolio;
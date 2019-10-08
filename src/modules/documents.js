import { doesNotReject } from "assert";

const documents = () => {

    const transparencyArrowLeft = document.getElementById('transparency-arrow_left'),
        transparencyArrowRight = document.getElementById('transparency-arrow_right'),
        transparencySlider = document.querySelector('.transparency-slider'),
        transparencySliderWrap = document.querySelector('.transparency-slider-wrap');

    let slideOffset,
        currentPosition,
        slideCount;

    const init = () => {
        if (document.documentElement.clientWidth >= 1091) {
            setDefaultStyles();
            return;
        }
        slideOffset = transparencySliderWrap.clientWidth;
        currentPosition = 0;
        slideCount = transparencySlider.children.length;
        transparencyArrowLeft.addEventListener('click', slideBack);
        transparencyArrowRight.addEventListener('click', slideForward);
        transparencyArrowLeft.style.display = 'none';
        addStyles();
    };

    const addStyles = () => {
        let style = document.getElementById('sliderTransparency-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderTransparency-style';
        }
        style.textContent = `
            .transparency-slider{
                display: -webkit-box !important;
                display: -ms-flexbox !important;
                display: flex !important;
                flex-wrap: nowrap !important;
            transition:transform 0.5s !important;
        }
        .transparency-slider .transparency-item{
            min-width:${slideOffset}px !important;
        }
        .transparency-slider-wrap{
            overflow: hidden !important;
        }`;

        document.head.appendChild(style);
    };

    const setDefaultStyles = () => {
        let style = document.getElementById('sliderTransparency-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderTransparency-style';
        }

        style.textContent = ``;

        document.head.appendChild(style);
    };

    const slideForward = () => {
        ++currentPosition;
        transparencySlider.style.cssText = `transform: translateX(-${slideOffset * currentPosition}px);`;

        if (currentPosition === slideCount - 1) {
            transparencyArrowRight.style.display = 'none';
        }
        if (currentPosition === 1) {
            transparencyArrowLeft.style.display = 'flex';
        }
    };
    const slideBack = () => {
        --currentPosition;
        transparencySlider.style.cssText = `transform: translateX(-${slideOffset * currentPosition}px);`;

        if (currentPosition === 0) {
            transparencyArrowLeft.style.display = 'none';
        }
        if (currentPosition === slideCount - 2) {
            transparencyArrowRight.style.display = 'flex';
        }
    };

    init();
    window.addEventListener('resize', init);

    const popupTransparency = document.querySelector('.popup-transparency'),
        transparencyRight = document.getElementById('transparency_right'),
        transparencyLeft = document.getElementById('transparency_left'),
        sliderContentCurrent = document.querySelector('.popup-transparency .slider-counter-content__current'),
        sliderCounterTotal = document.querySelector('.popup-transparency .slider-counter-content__total'),
        popupTransparencySlider = document.querySelector('.popup-transparency-slider');

    let slidePOffset,
        currentPPosition,
        slidePCount,
        customWrap;

    const initP = () => {
        transparencyLeft.addEventListener('click', slideBackP);
        transparencyRight.addEventListener('click', slideForwardP);
        addPWrap();
        slidePOffset = customWrap.clientWidth;
        addPStyles();
        let slides = transparencySlider.querySelectorAll('.transparency-item');
        slides.forEach((element, index) => {
            element.addEventListener('click', () => { showPopUpSlider(index); });
        });
    };

    const showPopUpSlider = (index) => {
        popupTransparency.style.cssText = 'visibility: visible;';
        currentPPosition = index;
        slidePCount = customWrap.children.length;

        if (index === 0) {
            transparencyLeft.style.display = 'none';
            transparencyRight.style.display = 'flex';
        } else if (index === slidePCount - 1) {
            transparencyRight.style.display = 'none';
            transparencyLeft.style.display = 'flex';
        } else {
            transparencyRight.style.display = 'flex';
            transparencyLeft.style.display = 'flex';
        }

        customWrap.style.cssText = `transform: translateX(-${slidePOffset * currentPPosition}px);`;
        sliderCounterTotal.textContent = slidePCount;
        sliderContentCurrent.textContent = currentPPosition + 1;
    };

    const closePopUp = () => {
        popupTransparency.style.cssText = 'visibility: none;';
    };

    const addPWrap = () => {
        let wrap = document.querySelector('.documentSliderCustomWrap');
        if (!wrap) {

            customWrap = document.createElement('div');
            customWrap.classList.add('documentSliderCustomWrap');

            let sliderItems = popupTransparencySlider.children;
            let count = sliderItems.length;

            for (let index = 0; index < count; index++) {
                customWrap.appendChild(sliderItems[0]);
            }

            popupTransparencySlider.appendChild(customWrap);
        }
    };
    const addPStyles = () => {
        let style = document.getElementById('documentSliderCustom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'documentSliderCustom-style';
        }

        style.textContent = `
        .documentSliderCustomWrap{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height:100%;
        transition:transform 0.5s !important;
    }
    .documentSliderCustomWrap .popup-transparency-slider__slide{
        min-width:${slidePOffset}px;
    }`;

        document.head.appendChild(style);
    };

    const slideForwardP = () => {
        ++currentPPosition;
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * currentPPosition}px);`;
        sliderContentCurrent.textContent = currentPPosition + 1;

        if (currentPPosition === slidePCount - 1) {
            transparencyRight.style.display = 'none';
        }
        if (currentPPosition === 1) {
            transparencyLeft.style.display = 'flex';
        }
    };
    const slideBackP = () => {
        --currentPPosition;
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * currentPPosition}px);`;
        sliderContentCurrent.textContent = currentPPosition + 1;

        if (currentPPosition === 0) {
            transparencyLeft.style.display = 'none';
        }
        if (currentPPosition === slidePCount - 2) {
            transparencyRight.style.display = 'flex';
        }
    };
    initP();

    const popUpClickhandler = (event) => {
        if (!event.target.closest('.popup-transparency-slider-wrap')) {
            closePopUp();
        }
    };
    popupTransparency.addEventListener('click', popUpClickhandler);
};

export default documents;
const designDecides = () => {
    //#region buttuns
    const navArrowDesignsRight = document.getElementById('nav-arrow-designs_right'),
        navArrowDesignsLeft = document.getElementById('nav-arrow-designs_left'),
        buttonsContainer = document.querySelector('.nav-list-designs'),
        buttons = buttonsContainer.querySelectorAll('button'),
        navDesigns = document.querySelector('.nav-designs');

    let buttonsOffset,
        currentButtonPosition,
        customWrap;

    const buttsShifRight = () => {
        if (currentButtonPosition === buttons.length) {
            return;
        } else {
            ++currentButtonPosition;
            buttonsContainer.style.cssText = `transform: translateX(-${buttonsOffset * currentButtonPosition}px);`;
        }
    };
    const buttonsShiftLeft = () => {
        if (currentButtonPosition === 0) {
            return;
        } else {
            --currentButtonPosition;
            buttonsContainer.style.cssText = `transform: translateX(-${buttonsOffset * currentButtonPosition}px);`;
        }
    };
    const buttonsInit = () => {
        buttonsOffset = (buttonsContainer.clientWidth - navDesigns.clientWidth) / (buttons.length);
        currentButtonPosition = 0;
        navArrowDesignsLeft.addEventListener('click', buttonsShiftLeft);
        navArrowDesignsRight.addEventListener('click', buttsShifRight);
    };
    buttonsInit();
    //#endregion

    const designsSlider = document.querySelector('.designs-slider'),
        slidesList = designsSlider.children,
        previewList = document.querySelectorAll('#designs .preview-block'),
        designRight = document.getElementById('design_right'),
        designLeft = document.getElementById('design_left'),
        sliderCounterCurrent = document.querySelector('.designs-slider-wrap .slider-counter-content__current'),
        sliderCounterTotal = document.querySelector('.designs-slider-wrap .slider-counter-content__total');

    let widthCustomWrap,
        heightCustomWrap,
        customSlideList,
        currentSlideIndex,
        currentSlideItemIndex,
        countElements;

    const showCurrentElements = (index) => {
        customWrap.style.cssText = `transform: translateX(-${widthCustomWrap * index}px);`;
        currentSlideIndex = index;
        currentSlideItemIndex = 0;
        sliderCounterCurrent.textContent = currentSlideItemIndex + 1;

        previewList.forEach((element, i) => {
            if (i === index) {
                element.classList.add('visible');
                element.addEventListener('click', previewContainerClickHandler);
            }
            else {
                element.classList.remove('visible');
            }
        });

        countElements = 0;
        for (let ind = 0; ind < customSlideList[currentSlideIndex].children.length; ind++) {
            customSlideList[currentSlideIndex].children[ind].classList.add('designCustomSlideInnerItems');
            countElements++;
        }

        if (document.documentElement.clientWidth < 1025) {
            designLeft.style.display = 'none';
            designRight.style.display = 'flex';
        }
        sliderCounterTotal.textContent = countElements;
    };

    const showCurrentSlide = (i) => {
        sliderCounterCurrent.textContent = currentSlideItemIndex + 1;
        customSlideList[currentSlideIndex].style.cssText = `transform: translateY(-${heightCustomWrap * i}px);`;
    };

    const designLeftHandler = () => {
        --currentSlideItemIndex;
        showCurrentSlide(currentSlideItemIndex);

        if (currentSlideItemIndex === 0) {
            designLeft.style.display = 'none';
        }
        if (currentSlideItemIndex === countElements - 2) {
            designRight.style.display = 'flex';
        }
    };
    const designRightHandler = () => {
        ++currentSlideItemIndex;
        showCurrentSlide(currentSlideItemIndex);

        if (currentSlideItemIndex === countElements - 1) {
            designRight.style.display = 'none';
        }
        if (currentSlideItemIndex === 1) {
            designLeft.style.display = 'flex';
        }
    };
    const previewContainerClickHandler = (event) => {
        let parent = event.target.closest('.preview-block');
        let item = event.target.closest('.preview-block__item');
        let i;

        for (let index = 0; index < parent.children.length; index++) {
            if (parent.children[index] === item) {
                i = index;
                parent.children[index].classList.add('preview_active');
            }
            else {
                parent.children[index].classList.remove('preview_active');
            }
        }

        showCurrentSlide(i);
    };
    const addWrap = () => {
        let wrap = document.querySelector('.designSliderCustomWrap');
        if (!wrap) {
            customWrap = document.createElement('div');
            customWrap.classList.add('designSliderCustomWrap');

            let count = slidesList.length;

            for (let index = 0; index < count; index++) {
                customWrap.appendChild(slidesList[0]);
            }
            designsSlider.appendChild(customWrap);

            widthCustomWrap = designsSlider.clientWidth;
            heightCustomWrap = designsSlider.clientHeight;
            customSlideList = customWrap.children;

            for (let index = 0; index < customWrap.children.length; index++) {
                customWrap.children[index].classList.add('designCustomSlideItems');
            }
        }
    };
    const addStyles = () => {
        let style = document.getElementById('sliderDesign-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderDesign-style';
        }

        style.textContent = `
        .designSliderCustomWrap{
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height:100%;
        transition:transform 0.5s !important;
    }
        .designCustomSlideItems{
        min-width: ${widthCustomWrap}px !important;
        min-height: ${heightCustomWrap}px !important;
        transition:transform 0.5s !important;
    }
    .designCustomSlideInnerItems{
        min-width: ${widthCustomWrap}px !important;
        max-height: ${heightCustomWrap}px !important;
    }`;

        document.head.appendChild(style);
    };
    const slidesInit = () => {
        addWrap();
        addStyles();
    };
    slidesInit();
    showCurrentElements(0);

    const buttonsContainerClickHandler = (event) => {
        buttons.forEach((element, index) => {
            if (element === event.target) {
                showCurrentElements(index);
                element.classList.add('active');
            }
            else {
                element.classList.remove('active');
            }
        });
    };
    buttonsContainer.addEventListener('click', buttonsContainerClickHandler);
    designLeft.addEventListener('click', designLeftHandler);
    designRight.addEventListener('click', designRightHandler);

    //#region  popUp

    //#region buttunsPopUp
    const navArrowDesignsPopUpRight = document.getElementById('nav-arrow-popup-designs_right'),
        navArrowDesignsPopUpLeft = document.getElementById('nav-arrow-popup-designs_left'),
        buttonsPopUpContainer = document.getElementById('nav-list-popup-designs'),
        buttonsPopUp = buttonsPopUpContainer.querySelectorAll('button'),
        navDesignsPopUp = document.querySelector('.popup-design .nav-designs');

    let buttonsPopUpOffset,
        currentPopUpButtonPosition;

    const buttsPopUpShifRight = () => {
        if (currentPopUpButtonPosition === buttonsPopUp.length) {
            return;
        } else {
            ++currentPopUpButtonPosition;
            buttonsPopUpContainer.style.cssText = `transform: translateX(-${buttonsPopUpOffset * currentPopUpButtonPosition}px);`;
        }
    };
    const buttonsPopUpShiftLeft = () => {
        if (currentPopUpButtonPosition === 0) {
            return;
        } else {
            --currentPopUpButtonPosition;
            buttonsPopUpContainer.style.cssText = `transform: translateX(-${buttonsPopUpOffset * currentPopUpButtonPosition}px);`;
        }
    };
    const buttonsPopUpInit = () => {
        buttonsPopUpOffset = (buttonsPopUpContainer.clientWidth - navDesignsPopUp.clientWidth) / (buttonsPopUp.length);
        currentPopUpButtonPosition = 0;
        navArrowDesignsPopUpLeft.addEventListener('click', buttonsPopUpShiftLeft);
        navArrowDesignsPopUpRight.addEventListener('click', buttsPopUpShifRight);
    };
    buttonsPopUpInit();
    //#endregion

    const linkListDesigns = document.querySelector('.link-list-designs'),
        popupDesign = document.querySelector('.popup-design'),
        popupDesignLeft = document.getElementById('popup_design_left'),
        popupDesignRight = document.getElementById('popup_design_right'),
        popupDesignSliderWrap = document.querySelector('.popup-design-slider-wrap'),
        popupDesignSlider = document.querySelector('.popup-design-slider'),
        sliderPopUpContentCurrent = document.querySelector('#popup-designs-counter .slider-counter-content__current'),
        sliderPopUpContentTotal = document.querySelector('#popup-designs-counter .slider-counter-content__total'),
        textPopUpArray = document.querySelectorAll('.popup-design-text');

    let countPSlides,
        slidPopUpHeight,
        slidPopUpWidth,
        slidesArray,
        currentPPosition, // номер итема
        currentPIndexSlide, // номер контейнера итемов
        popUpSliderItems,
        customPopUpWrap;


    const addPStyles = () => {
        let style = document.getElementById('sliderPopUpDesign-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderPopUpDesign-style';
        }

        style.textContent = `
        .popupDesignItem{
            height: ${slidPopUpHeight}px !important;
        }
        .popupDesignSlider{
            display: flex;
            flex-direction: row;
            transition:transform 0.5s !important;
        }
        .popupDesignInnerSliders{
            transition:transform 0.5s !important;
            width:${slidPopUpWidth}px;
        }`;

        document.head.appendChild(style);
    };

    const slidePForward = () => {
        ++currentPPosition;
        customPopUpWrap.children[currentPIndexSlide].style.cssText = `transform: translateY(-${slidPopUpHeight * currentPPosition}px);`;
        sliderPopUpContentCurrent.textContent = currentPPosition + 1;

        if (currentPPosition === countPSlides - 1) {
            popupDesignRight.style.display = 'none';
        }
        if (currentPPosition === 1) {
            popupDesignLeft.style.display = 'flex';
        }
    };
    const slidePBack = () => {
        --currentPPosition;
        customPopUpWrap.children[currentPIndexSlide].style.cssText = `transform: translateY(-${slidPopUpHeight * currentPPosition}px);`;
        sliderPopUpContentCurrent.textContent = currentPPosition + 1;

        if (currentPPosition === 0) {
            popupDesignLeft.style.display = 'none';
        }
        if (currentPPosition === countPSlides - 2) {
            popupDesignRight.style.display = 'flex';
        }
    };

    const popupDesignClickHandler = (event) => {
        if (event.target.closest('.close') || event.target.classList.contains('popup-design')) {
            popupDesign.style.cssText = 'visibility: hidden;';
        }
    };

    const showPopUpCurrentText = (index) => {
        textPopUpArray.forEach((element, i) => {
            if (i === index) {
                element.classList.add('visible-content-block');
            } else {
                element.classList.remove('visible-content-block');
            }
        });
    };

    const showPopUp = () => {
        popupDesign.style.cssText = 'visibility: visible;';
        popupDesignLeft.style.display = 'none';
        customPopUpWrap.style.cssText = `transform: translateY(0px);`;
    };

    const showCurrentPopUpElements = (index) => {
        customPopUpWrap.children[currentPIndexSlide].style.cssText = `transform: translateY(-0px);`;
        currentPPosition = 0;
        currentPIndexSlide = index;
        countPSlides = customPopUpWrap.children[currentPIndexSlide].children.length;
        sliderPopUpContentTotal.textContent = countPSlides;
        sliderPopUpContentCurrent.textContent = currentPPosition + 1;
        customPopUpWrap.style.cssText = `transform: translateX(-${index * slidPopUpWidth}px);`;
        popupDesignLeft.style.display = 'none';
        popupDesignRight.style.display = 'flex';
        showPopUpCurrentText(index);
    };

    const addPopUpWrap = () => {
        let wrap = document.querySelector('.popupDesignSlider');
        if (!wrap) {

            customPopUpWrap = document.createElement('div');
            customPopUpWrap.classList.add('popupDesignSlider');

            let sliderItems = popupDesignSlider.children;
            let count = sliderItems.length;

            for (let index = 0; index < count; index++) {
                customPopUpWrap.appendChild(sliderItems[0]);
            }

            popupDesignSlider.appendChild(customPopUpWrap);
        }
    };

    const initPopUpPicturesSlder = () => {
        slidPopUpHeight = popupDesignSliderWrap.clientHeight;
        slidPopUpWidth = popupDesignSliderWrap.clientWidth;
        popupDesignLeft.addEventListener('click', slidePBack);
        popupDesignRight.addEventListener('click', slidePForward);
        addPStyles();
        addPopUpWrap();

        popupDesignSliderWrap.style.cssText = 'overflow: hidden;';
        popUpSliderItems = popupDesign.querySelectorAll('.popup-design-slider__style-slide');
        popUpSliderItems.forEach((element) => {
            element.classList.add('popupDesignItem');
        });
        for (let index = 0; index < customPopUpWrap.children.length; index++) {
            customPopUpWrap.children[index].classList.add('popupDesignInnerSliders');
        }
        currentPPosition = 0;
        currentPIndexSlide = 0;
        countPSlides = customPopUpWrap.children[currentPIndexSlide].children.length;
        sliderPopUpContentTotal.textContent = countPSlides;
    };
    initPopUpPicturesSlder();


    const buttonsPopUpContainerClickHandler = (event) => {
        buttonsPopUp.forEach((element, index) => {
            if (element === event.target) {
                showCurrentPopUpElements(index);
                element.classList.add('active');
            }
            else {
                element.classList.remove('active');
            }
        });
    };
    popupDesign.addEventListener('click', popupDesignClickHandler);
    linkListDesigns.addEventListener('click', showPopUp);
    buttonsPopUpContainer.addEventListener('click', buttonsPopUpContainerClickHandler);
    //#endregion

};

export default designDecides;
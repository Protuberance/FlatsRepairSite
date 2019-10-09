const scheme = () => {
    const buttonsContainer = document.getElementById('scheme-list'),
        buttons = buttonsContainer.querySelectorAll('button'),

        navArrowRepairLeftBase = document.getElementById('nav-arrow-scheme_left'),
        navArrowRrepairRightBase = document.getElementById('nav-arrow-scheme_right'),
        repairTypesNav = document.querySelector('.nav'),
        schemeSlider = document.querySelector('.scheme-slider'),
        texts = document.querySelectorAll('.scheme-description-block');

    let slidePOffset,
        customWrap,
        buttonsOffset,
        currentButtonPosition;


    const buttonClickHandler = (event) => {
        let button = event.target;
        buttons.forEach((element, i) => {
            if (element === button) {
                element.classList.add('active');
                showItem(i);
            }
            else {
                element.classList.remove('active');
            }
        });

    };

    const showItem = (index) => {
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * index}px);`;

        texts.forEach((element, i) => {
            if (i === index) {
                element.classList.add('visible-content-block');
            } else {
                element.classList.remove('visible-content-block');
            }
        });
    };

    const addWrap = () => {
        let wrap = document.querySelector('.schemeSliderCustomWrap');
        if (!wrap) {

            customWrap = document.createElement('div');
            customWrap.classList.add('schemeSliderCustomWrap');

            let sliderItems = schemeSlider.children;
            let count = sliderItems.length;

            for (let index = 0; index < count; index++) {
                customWrap.appendChild(sliderItems[0]);
            }

            schemeSlider.appendChild(customWrap);
        }
    };
    const addStyles = () => {
        let style = document.getElementById('schemeSliderCustom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'schemeSliderCustom-style';
        }

        style.textContent = `
            .schemeSliderCustomWrap{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height:100%;
            transition:transform 0.5s !important;
        }
        .schemeSliderItem{
            min-width: ${slidePOffset}px !important;
        }`;

        document.head.appendChild(style);
    };

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

    const init = () => {
        addWrap();
        slidePOffset = customWrap.clientWidth;
        addStyles();
        buttonsOffset = (buttonsContainer.clientWidth - repairTypesNav.clientWidth) / (buttons.length);

        for (let index = 0; index < customWrap.children.length; index++) {
            customWrap.children[index].classList.add('schemeSliderItem');
        }
        currentButtonPosition = 0;
    };
    init();

    buttonsContainer.addEventListener('click', buttonClickHandler);
    navArrowRepairLeftBase.addEventListener('click', buttonsShiftLeft);
    navArrowRrepairRightBase.addEventListener('click', buttsShifRight);
};

export default scheme;
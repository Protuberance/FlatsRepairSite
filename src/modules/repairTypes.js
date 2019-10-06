const repairTypes = () => {
    const repairTypesSliderContainer = document.querySelector('.repair-types-slider'),
        repairTypesSliders = repairTypesSliderContainer.children,
        repairTypesArrowLeft = document.getElementById('repair-types-arrow_left'),
        repairTypesArrowRight = document.getElementById('repair-types-arrow_right'),
        buttonsContainer = document.querySelector('.nav-list-repair'),
        buttons = buttonsContainer.querySelectorAll('button'),
        sliderCounterContentCurrent = document.querySelector('.slider-counter-content__current'),
        sliderCounterContentTotal = document.querySelector('.slider-counter-content__total'),

        navArrowRepairLeftBase = document.getElementById('nav-arrow-repair-left_base'),
        navArrowRrepairRightBase = document.getElementById('nav-arrow-repair-right_base'),
        repairTypesNav = document.querySelector('.repair-types-nav');

    let currentSlider,
        heightSlderElement,
        elementCount,
        currentPosition,
        buttonsOffset,
        currentButtonPosition;

    const buttonClickHandler = (event) => {
        let button = event.target;

        buttons.forEach((element, i) => {
            if (element === button) {
                element.classList.add('active');
                repairTypesSliders[i].style.display = 'block';
                currentSlider = repairTypesSliders[i];
                heightSlderElement = currentSlider.children[0].clientHeight;
                elementCount = currentSlider.children.length;
                sliderCounterContentTotal.textContent = elementCount;
                currentPosition = 0;
                sliderCounterContentCurrent.textContent = currentPosition + 1;
            }
            else {
                element.classList.remove('active');
                repairTypesSliders[i].style.cssText = 'transform: translateY(0px);display:none;';
            }
        });
    };

    const slideUp = () => {
        if (currentPosition === elementCount - 1) {
            return;
        }
        else {
            ++currentPosition;
            sliderCounterContentCurrent.textContent = currentPosition + 1;
            currentSlider.style.cssText = `transform: translateY(-${heightSlderElement * currentPosition}px);`;
        }
    };
    const slideDown = () => {
        if (currentPosition === 0) {
            return;
        }
        else {
            --currentPosition;
            sliderCounterContentCurrent.textContent = currentPosition + 1;
            currentSlider.style.cssText = `transform: translateY(-${heightSlderElement * currentPosition}px);`;
        }
    };

    const init = () => {
        currentSlider = repairTypesSliders[0];
        heightSlderElement = repairTypesSliders[0].children[0].clientHeight;
        elementCount = repairTypesSliders[0].children.length;
        sliderCounterContentTotal.textContent = elementCount;
        currentPosition = 0;

        buttonsOffset = (buttonsContainer.clientWidth - repairTypesNav.clientWidth) / (buttons.length);
        currentButtonPosition = 0;
    };
    init();

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

    buttonsContainer.addEventListener('click', buttonClickHandler);
    repairTypesArrowLeft.addEventListener('click', slideDown);
    repairTypesArrowRight.addEventListener('click', slideUp);
    navArrowRepairLeftBase.addEventListener('click', buttonsShiftLeft);
    navArrowRrepairRightBase.addEventListener('click', buttsShifRight);
};

export default repairTypes;
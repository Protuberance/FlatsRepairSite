const formula = () => {
    const _formula = document.querySelector('.formula'),
        formulaItems = _formula.querySelectorAll('.formula-item__icon'),

        formulaSliderWrap = document.querySelector('.formula-slider-wrap'),
        formulaSlider = document.querySelector('.formula-slider'),

        prev = document.getElementById('formula-arrow_left'),
        next = document.getElementById('formula-arrow_right');

    let formulaSliderItems = formulaSlider.querySelectorAll('.formula-item'),
        slideWidth;

    const formulaHandler = (event) => {
        const item = event.target;
        const popUp = item.querySelector('.formula-item-popup');

        if (!item.parentNode.classList.contains('active-item')) {
            item.parentNode.classList.add('active-item');

            if (popUp.getBoundingClientRect().top < 0) {
                popUp.classList.add('formula-item-popup-Rotated');
                item.closest('.row').style.cssText = 'z-index:1';
            }
        }
        else {
            item.parentNode.classList.remove('active-item');
            popUp.classList.remove('formula-item-popup-Rotated');
            item.closest('.row').style.cssText = '';
        }

    };

    formulaItems.forEach((elem) => {
        elem.addEventListener('mouseenter', formulaHandler);
        elem.addEventListener('mouseleave', formulaHandler);
    });

    const addClasses = () => {
        formulaSliderWrap.classList.add('formula-customSliderWrap');
        formulaSlider.classList.add('formula-customSlider');
        formulaSliderItems.forEach((elem) => {
            elem.classList.add('formula-customSlider__item');
        });

    };
    const addStyles = (slideWidth) => {
        let style = document.getElementById('formulaCustomSlider-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'formulaCustomSlider-style';
        }

        if (document.documentElement.clientWidth < 575) {
            let itemWidth = document.querySelector('.formula-slider').clientWidth;


            style.textContent = `
    .formula-customSliderWrap{
        overflow:hidden  !important;
    }        
    .formula-customSlider{
        transform: translateX(-${itemWidth}px);
        align-items: flex-start !important;
        display:flex !important;
        transition:transform 0.5s !important;
        will-cahnge: transform !important;
    }
    .formula-customSlider__item{
        display: flex !important;
        align-items:center;
        justify-content: center;
        min-width:${itemWidth}px !important;
    }`;
        } else {
            style.textContent = `
    .formula-customSliderWrap{
        overflow:hidden  !important;
    }        
    .formula-customSlider{
        align-items: flex-start !important;
        display:flex !important;
        transition:transform 0.5s !important;
        will-cahnge: transform !important;
    }
    .formula-customSlider__item{
        display: flex !important;
        align-items:center;
        justify-content: center;
        flex: 0 0 ${slideWidth}% !important;
    }
    `;
        }
        document.head.appendChild(style);
    };

    const controlSllider = () => {
        next.addEventListener('click', forwardReplaceItems);
        prev.addEventListener('click', backReplaceItems);
    };

    const backReplaceItems = () => {
        formulaSliderItems[1].classList.remove('active-item');
        formulaSlider.insertBefore(formulaSliderItems[formulaSliderItems.length - 1], formulaSliderItems[0]);
        formulaSliderItems = formulaSlider.querySelectorAll('.formula-item');
        formulaSliderItems[1].classList.add('active-item');
    };

    const forwardReplaceItems = () => {
        formulaSliderItems[1].classList.remove('active-item');
        formulaSlider.appendChild(formulaSliderItems[0]);
        formulaSliderItems = formulaSlider.querySelectorAll('.formula-item');
        formulaSliderItems[1].classList.add('active-item');
    };

    const createSlider = () => {
        if (document.documentElement.clientWidth < 1024) {
            slideWidth = 33;
            addClasses();
            addStyles(slideWidth);
            controlSllider();
            backReplaceItems();
        }
    };

    createSlider();
};

export default formula;
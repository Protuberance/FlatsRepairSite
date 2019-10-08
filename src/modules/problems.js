const problems = () => {
    const _problems = document.querySelector('.problems'),
        problemsItems = _problems.querySelectorAll('.problems-item__icon'),

        problemsSliderWrap = document.querySelector('.problems-slider-wrap'),
        problemsSlider = document.querySelector('.problems-slider'),

        prev = document.getElementById('problems-arrow_left'),
        next = document.getElementById('problems-arrow_right');

    let problemsSliderItems = problemsSlider.querySelectorAll('.problems-item'),
        slideWidth;

    const problemsHandler = (event) => {
        const item = event.target;
        const popUp = item.querySelector('.problems-item-popup');

        if (!item.parentNode.classList.contains('active-item')) {
            item.parentNode.classList.add('active-item');


            if (popUp.getBoundingClientRect().top < 0) {

                popUp.classList.add('problems-item-popup-Rotated');
            }
        }
        else {
            item.parentNode.classList.remove('active-item');
            popUp.classList.remove('problems-item-popup-Rotated');
        }

    };

    problemsItems.forEach((elem) => {
        elem.addEventListener('mouseenter', problemsHandler);
        elem.addEventListener('mouseleave', problemsHandler);
    });

    const addClasses = () => {
        problemsSliderWrap.classList.add('problems-customSliderWrap');
        problemsSlider.classList.add('problems-customSlider');
        problemsSliderItems.forEach((elem) => {
            elem.classList.add('problems-customSlider__item');
        });

    };
    const addStyles = (slideWidth) => {
        let style = document.getElementById('problemsCustomSlider-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'problemsCustomSlider-style';
        }

        let itemWidth = document.querySelector('.problems-slider').clientWidth;

        style.textContent = `
 .problems-customSliderWrap{
    overflow:hidden  !important;
}        
.problems-customSlider{
    transform: translateX(-${itemWidth}px);
    align-items: flex-start !important;
    display:flex !important;
    transition:transform 0.5s !important;
    will-cahnge: transform !important;
}
.problems-customSlider__item{
    display: flex !important;
    align-items:center;
    justify-content: center;
    min-width:${itemWidth}px !important;
}
`;
        document.head.appendChild(style);
    };

    const controlSllider = () => {
        next.addEventListener('click', forwardReplaceItems);
        prev.addEventListener('click', backReplaceItems);
    };


    const backReplaceItems = () => {
        problemsSliderItems[1].classList.remove('active-item');
        problemsSlider.insertBefore(problemsSliderItems[problemsSliderItems.length - 1], problemsSliderItems[0]);
        problemsSliderItems = problemsSlider.querySelectorAll('.problems-item');
        problemsSliderItems[1].classList.add('active-item');
    };

    const forwardReplaceItems = () => {
        problemsSliderItems[1].classList.remove('active-item');
        problemsSlider.appendChild(problemsSliderItems[0]);
        problemsSliderItems = problemsSlider.querySelectorAll('.problems-item');
        problemsSliderItems[1].classList.add('active-item');
    };

    const createSlider = () => {
        if (document.documentElement.clientWidth < 1024) {
            addClasses();
            addStyles();
            controlSllider();
            backReplaceItems();
        }
    };

    createSlider();
};

export default problems;
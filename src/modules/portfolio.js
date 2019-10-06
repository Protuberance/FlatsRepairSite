const portfolio = () => {
    const portfolioSlider = document.querySelector('.portfolio-slider');

    const addWrap = () => {
        let wrap = document.createElement('div');
        wrap.classList.add('portfolioSliderCustomWrap');
        wrap.style.cssText = `position: relative;
                                display: -webkit-box;
                                display: -ms-flexbox;
                                display: flex;
                                width: 100%;
                                heigh:100%`;
        console.log('foo');
        let sliderItems = portfolioSlider.children;
        let count = sliderItems.length;
        for (let index = 0; index < count; index++) {

            wrap.appendChild(sliderItems[0]);
        }

        portfolioSlider.appendChild(wrap);
    };
    addWrap();
};

export default portfolio;
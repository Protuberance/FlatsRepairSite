const consultation = () => {
    const buttonsWide = document.querySelectorAll('.button_wide'),
        popupConsultation = document.querySelector('.popup-consultation');

    const init = () => {
        buttonsWide.forEach((element) => {
            element.addEventListener('click', openPopUp);
        });
    };

    const openPopUp = () => {
        popupConsultation.style.cssText = 'visibility: visible;';
    };
    const popupConsultationClickHandler = (event) => {
        if (event.target.closest('.close') || event.target.classList.contains('popup-consultation')) {
            popupConsultation.style.cssText = 'visibility: hidden;';
        }
    };

    init();
    popupConsultation.addEventListener('click', popupConsultationClickHandler);
};

export default consultation;
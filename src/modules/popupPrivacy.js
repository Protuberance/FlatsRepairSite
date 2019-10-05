const popupPrivacy = () => {
    const _popupPrivacy = document.querySelector('.popup-privacy'),
        buttonPopupPrivacy = document.querySelector('.link-privacy');

    const openPopUp = () => {
        _popupPrivacy.style.cssText = `visibility: visible;`;
    };
    const closePopUp = (event) => {
        if (!event.target.closest('.popup-dialog')) {
            _popupPrivacy.style.cssText = `visibility: hidden;`;
        }
    };

    buttonPopupPrivacy.addEventListener('click', openPopUp);
    _popupPrivacy.addEventListener('click', closePopUp);
};

export default popupPrivacy;
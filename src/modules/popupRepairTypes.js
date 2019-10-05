const popupRepairTypes = () => {
    const _popupRepairTypes = document.querySelector('.popup-repair-types'),
        buttonRepairTypes = document.querySelectorAll('.repair-types .link-list a');

    const openPopUp = () => {
        _popupRepairTypes.style.cssText = `visibility: visible;`;
    };

    const closePopUp = () => {
        _popupRepairTypes.style.cssText = `visibility: hidden;`;
    };

    const buttonRepairTypesHandler = (event) => {
        if (!event.target.closest('.popup-dialog')) {
            closePopUp();
        }
    };

    buttonRepairTypes.forEach((item) => { item.addEventListener('click', openPopUp); });
    _popupRepairTypes.addEventListener('click', buttonRepairTypesHandler);
};

export default popupRepairTypes;
const phoneList = () => {
    const contactsArrow = document.querySelector('.header-contacts__arrow'),
        contactsArrowImg = document.querySelector('.header-contacts__arrow img'),
        additionalPhoneConttainer = document.querySelector('.header-contacts__phone-number-accord'),
        additionalPhoneNumber = document.querySelector('.header-contacts__phone-number-accord .header-contacts__phone-number');
    let isActive = false;

    const changeList = () => {
        if (!isActive) {
            additionalPhoneConttainer.style.position = 'static';
            additionalPhoneNumber.style.cssText = 'opacity:1';
            contactsArrowImg.style.cssText = 'transform: rotateZ(180deg);';
            isActive = true;
        } else {
            additionalPhoneConttainer.style.position = 'absolute';
            additionalPhoneNumber.style.cssText = 'opacity:0';
            contactsArrowImg.style.cssText = 'transform: rotateZ(0deg);';
            isActive = false;
        }
    }

    contactsArrow.addEventListener('click', changeList);
};

export default phoneList;
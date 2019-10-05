const popUpMenu = () => {

    const popUpDialogMenu = document.querySelector('.popup-dialog-menu'),
        menuIcon = document.querySelector('.menu__icon'),
        buttonFooter = document.querySelector('.button-footer a');

    let isMobile = false;

    const checkDevice = () => {
        if (document.documentElement.clientWidth < 576) {
            isMobile = true;
        }
        else {
            isMobile = false;
        }
    };
    checkDevice();

    const openMenu = () => {
        popUpDialogMenu.style.cssText = `transform: translate3d(0,0,0);`;
    };

    const closeMenu = () => {
        if (isMobile) {
            popUpDialogMenu.style.cssText = `transform: translate3d(0, -100vh, 0);`;
        } else {
            popUpDialogMenu.style.cssText = `transform: translate3d(645px, 0, 0);`;
        }
    };

    const popUpDialogMenuHandler = (event) => {
        if (event.target.closest('.close-menu')) {
            closeMenu();
        }
        else if (event.target.closest('.popup-menu-nav__item')) {
            scrollTo(event);
            closeMenu();
        }
    };

    const scrollTo = (event) => {
        event.preventDefault();
        let scrollToElementName,
            eventTargetTag = event.target.tagName;

        if (eventTargetTag.toLowerCase() === 'a') {
            scrollToElementName = event.target.getAttribute('href');
        }
        scrollToElementName = scrollToElementName.substring(1);

        let scrollToElement = document.getElementById(scrollToElementName),
            scrollToTopValue = scrollToElement.offsetTop,
            indexScrollAnimation,
            currentScrollTop = document.documentElement.scrollTop,
            downDirection = currentScrollTop < scrollToTopValue ? true : false;

        function scrollAnimation() {
            indexScrollAnimation = requestAnimationFrame(scrollAnimation);
            document.documentElement.scrollTop = currentScrollTop;
            if ((currentScrollTop >= scrollToTopValue && downDirection) || (currentScrollTop <= scrollToTopValue && !downDirection)) {
                cancelAnimationFrame(indexScrollAnimation);
                document.documentElement.scrollTop = scrollToTopValue;
            }
            currentScrollTop = downDirection ? currentScrollTop + 100 : currentScrollTop - 100;
        }
        indexScrollAnimation = requestAnimationFrame(scrollAnimation);
    };
    menuIcon.addEventListener('click', openMenu);
    popUpDialogMenu.addEventListener('click', popUpDialogMenuHandler);
    buttonFooter.addEventListener('click', scrollTo);
};

export default popUpMenu;
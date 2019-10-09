const accordion = () => {
    const buttons = document.querySelectorAll('.accordion .title_block'),
        container = document.querySelector('.accordion ul');

    const containerClickHandler = (event) => {
        buttons.forEach((element) => {
            if (element === event.target) {
                element.classList.add('msg-active');
            } else {
                element.classList.remove('msg-active');
            }
        });
    };

    container.addEventListener('click', containerClickHandler);
};

export default accordion
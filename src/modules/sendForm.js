const sendForm = () => {
    const form1 = document.getElementById('feedback1'),
        form2 = document.getElementById('feedback2'),
        form3 = document.getElementById('feedback3'),
        form4 = document.getElementById('feedback4'),
        form5 = document.getElementById('feedback5'),
        form6 = document.getElementById('feedback6'),
        popupThank = document.querySelector('.popup-thank');

    const formHandler = (event) => {
        event.preventDefault();

        let checkBox = event.target.querySelector('input[type=checkbox]');
        if (checkBox.checked !== true)
            return;

        const formData = new FormData(event.target);
        let body = {};

        formData.forEach((value, key) => {
            body[key] = value;
        });

        postData(body)
            .then(function (response) {
                if (response.status !== 200) {
                    throw new Error('Status network is not 200');
                }
                showPopUp();
            }).catch(function (error) {
                console.error(error);
            });

        const inputs = event.target.querySelectorAll('input');
        inputs.forEach(item => {
            item.value = '';
        });
    };

    const postData = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    const showPopUp = () => {
        popupThank.style.cssText = 'visibility: visible;';
    };

    const popupThankClickHandler = (event) => {
        if (event.target.closest('.close') || event.target.classList.contains('popup-thank')) {
            popupThank.style.cssText = 'visibility: hidden;';
        }
    };

    form1.addEventListener('submit', formHandler);
    form2.addEventListener('submit', formHandler);
    form3.addEventListener('submit', formHandler);
    form4.addEventListener('submit', formHandler);
    form5.addEventListener('submit', formHandler);
    form6.addEventListener('submit', formHandler);
    popupThank.addEventListener('click', popupThankClickHandler);
};

export default sendForm;
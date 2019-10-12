import documents from "./documents";

const popupRepairTypes = () => {
    const _popupRepairTypes = document.querySelector('.popup-repair-types'),
        buttonRepairTypes = document.querySelectorAll('.repair-types .link-list a'),
        buttonsContainer = document.querySelector('.nav-list-popup-repair'),
        tbody = document.querySelector('.popup-repair-types-content-table__list tbody'), // popup-repair-types-content-table__list
        priseListsContainer = document.querySelector('.popup-repair-types-content-table'),
        mainTitle = document.getElementById('switch-inner');

    let loadedData,
        trTemplate,
        customWrap,
        slidePOffset,
        buttons;

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

    const loadData = () => {
        getData()
            .then(function (response) {
                if (response.status !== 200) {
                    throw new Error('Status network is not 200');
                }
                return (response.json());
            }).then((data) => {
                loadedData = data;
                data.forEach((element, index) => {
                    addButtons(element.title, index);
                });
                buttons = document.querySelectorAll('.popup-repair-types-nav__item');
                createPriseLists(data);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const getTrTemplate = () => {
        trTemplate = tbody.querySelector('.mobile-row').cloneNode(true);
        priseListsContainer.textContent = '';
    };

    const addWrap = () => {
        let wrap = document.querySelector('.priceListSliderCustomWrap');
        if (!wrap) {

            customWrap = document.createElement('div');
            customWrap.classList.add('priceListSliderCustomWrap');

            priseListsContainer.appendChild(customWrap);
        }
    };
    const addStyles = () => {
        let style = document.getElementById('priceListSliderCustom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'priceListSliderCustom-style';
        }

        style.textContent = `
            .priceListSliderCustomWrap{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;
            height:100%;
            transition:transform 0.5s !important;
        }
        .priceListSliderItem{
            min-width: ${slidePOffset}px !important;
        }`;

        document.head.appendChild(style);
    };

    const addButtons = (title, index) => {
        let button = document.createElement('button');
        button.classList.add('button_o');
        button.classList.add('popup-repair-types-nav__item');
        if (index === 0) {
            button.classList.add('active');
        }
        button.textContent = title;
        buttonsContainer.appendChild(button);
        button.addEventListener('click', buttonClickHandler);
    };

    const getData = () => {
        return fetch('./db/db.json', {
            method: 'GET',
        });
    };

    const createPriseLists = (_data) => {
        _data.forEach(element => {
            let _table = document.createElement('table');
            _table.classList.add('popup-repair-types-content-table__list');
            _table.classList.add('priceListSliderItem');

            element.priceList.forEach(item => {
                let _tr = trTemplate.cloneNode(true);
                _tr.querySelector('.repair-types-name').textContent = item.typeService;
                _tr.querySelector('.customUnit').textContent = item.units;
                _tr.querySelector('.customValue').textContent = item.cost;

                _table.appendChild(_tr);
            });

            customWrap.appendChild(_table);
        });
    };

    const buttonClickHandler = (event) => {
        let button = event.target;
        buttons.forEach((element, i) => {
            if (element === button) {
                element.classList.add('active');
                showItem(i);
            }
            else {
                element.classList.remove('active');
            }
        });

    };

    const showItem = (index) => {
        customWrap.style.cssText = `transform: translateX(-${slidePOffset * index}px);`;
        mainTitle.textContent = loadedData[index].title;
    };

    const init = () => {
        getTrTemplate();
        loadData();
        addWrap();
        slidePOffset = priseListsContainer.clientWidth;
        addStyles();
    };
    init();

    buttonRepairTypes.forEach((item) => { item.addEventListener('click', openPopUp); });
    _popupRepairTypes.addEventListener('click', buttonRepairTypesHandler);
};

export default popupRepairTypes;
/* ДЗ 5.2 - Div D&D */

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом фона и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div'),
        clientHeight = document.documentElement.clientHeight - 30,
        clientWidth = document.documentElement.clientWidth,
        red = Math.round(Math.random() * 255).toString(16),
        green = Math.round(Math.random() * 255).toString(16),
        blue = Math.round(Math.random() * 255).toString(16);

    red = red.length < 2 ? '0' + red : red;
    green = green.length < 2 ? '0' + green : green;
    blue = blue.length < 2 ? '0' + blue : blue;

    div.className = 'draggable-div';
    div.style.width = ((Math.round(Math.random() * clientWidth)) || 50) + 'px';
    div.style.height = ((Math.round(Math.random() * clientHeight)) || 50) + 'px';
    div.style.left = Math.round(Math.random() * (clientWidth - parseInt(div.style.width))) + 'px';
    div.style.top = 30 + Math.round(Math.random() * (clientHeight - parseInt(div.style.height))) + 'px';
    div.style.backgroundColor = '#' + red + green + blue;
    div.style.position = 'absolute';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    target.onmousedown = function(e) {

        let coords = e.target.getBoundingClientRect();
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        moveAt(e);

        function moveAt(e) {
            e.target.style.left = e.pageX - shiftX + 'px';
            e.target.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function(e) {
            moveAt(e);
        };

        e.target.onmouseup = function() {
            document.onmousemove = null;
            e.target.onmouseup = null;
        };

    };

    target.ondragstart = function() {
        return false;
    };
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

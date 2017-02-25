/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000)
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.addEventListener('load', () => {
            if (req.status == 200) {
                let towns = req.response.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });

                resolve(towns);
            } else {
                let error = new Error('Не удалось загрузить города');

                error.code = this.status;
                reject(error);
            }
        });

        req.addEventListener('error', () => {
            let error = new Error('Не удалось загрузить города');

            error.code = this.status;
            reject(error);
        });

        req.open('GET', url);
        req.responseType = 'json';
        req.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};

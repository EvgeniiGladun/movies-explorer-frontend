class MainApi {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // getMoviesList() {
    //     fetch(, {
    //     })
    //         .then((res) => this._getResponseData(res))

    // }

}

// Делаем запрос по api для получения информации
const apiMain = new MainApi({
    baseUrl: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiMain;
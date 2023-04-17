class MoviesApi {
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

    getMoviesList() {
        return fetch(this.baseUrl, {
            headers: this.headers
        })
            .then((res) => { return this._getResponseData(res) })
            .then((data) => { return data })
            .catch((err) => { return console.log(err) });
    }

}

// Делаем запрос по api для получения информации
const apiOther = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiOther;
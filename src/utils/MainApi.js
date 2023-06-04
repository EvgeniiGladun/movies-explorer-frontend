class MainApi {
    constructor({ baseUrl, headers, credentials }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.credentials = credentials;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // Запрос массив фильмов
    getInitialMovies() {
        return fetch(this.baseUrl + "/movies", {
            headers: this.headers,
            credentials: this.credentials,
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // Другие методы работы с API
    getInitialUsers() {
        return fetch(this.baseUrl + "/users/me", {
            headers: this.headers,
            credentials: this.credentials,
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    // Отправляем данные пользователя на авторизацию 
    setAuthorizeUser(email, password) {
        return fetch(this.baseUrl + "/signin", {
            method: "POST",
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return this._getResponseData(res);
            })
            .then((data) => {
                if (data.JWT) {
                    localStorage.setItem("jwt", data.JWT);
                    return data;
                } else {
                    return;
                }
            });
    }

    // Регестрируем нового пользователя
    setRegisterUser(name, email, password) {
        return fetch(this.baseUrl + "/signup", {
            method: "POST",
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return this._getResponseData(res);
            })
            .then((data) => {
                return data;
            });
    }

    // Проверяем JWT пользователя 
    getAuthenticationUser(jwt) {
        return fetch(this.baseUrl + "/users/me", {
            method: "GET",
            credentials: this.credentials,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    getLogout() {
        return fetch(this.baseUrl + "/signout", {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }

    setInitialUsers(name, email) {
        return fetch(this.baseUrl + "/users/me", {
            method: "PATCH",
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    setAddNewMovies(...dataMovies) {
        return fetch(this.baseUrl + "/movies", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                country: dataMovies.country,
                director: dataMovies.director,
                duration: dataMovies.duration,
                year: dataMovies.year,
                description: dataMovies.description,
                image: dataMovies.image,
                trailer: dataMovies.trailer,
                nameRU: dataMovies.nameRU,
                nameEN: dataMovies.nameEN,
                thumbnail: dataMovies.thumbnail,
                movieId: dataMovies.movieId,
            }),
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    deleteMovies(movieId) {
        return fetch(this.baseUrl + "/movies/" + movieId, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    changeLikeCardStatus(movieId, isLiked) {
        return isLiked ? this.pushLike(movieId) : this.deleteLike(movieId);
    }

}


// Делаем запрос по api для получения информации
const apiMain = new MainApi({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiMain;

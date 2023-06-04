class MainApi {
    constructor({ baseUrl, baseUrlMovies, headers, credentials }) {
        this.baseUrl = baseUrl;
        this.baseUrlMovies = baseUrlMovies;
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

    setAddNewMovies(dataMovies) {

        return fetch(this.baseUrl + "/movies", {
            method: "POST",
            headers: this.headers,
            credentials: this.credentials,
            body: JSON.stringify({
                country: dataMovies.country,
                director: dataMovies.director,
                duration: dataMovies.duration,
                year: dataMovies.year,
                description: dataMovies.description,
                image: this.baseUrlMovies + dataMovies.image.url,
                trailerLink: dataMovies.trailerLink,
                nameRU: dataMovies.nameRU,
                nameEN: dataMovies.nameEN,
                thumbnail: this.baseUrlMovies + dataMovies.image.url,
                movieId: dataMovies.id
            }),
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    deleteMovies(movieId) {
        return fetch(this.baseUrl + "/movies/" + movieId, {
            method: "DELETE",
            headers: this.headers,
            credentials: this.credentials,
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

}


// Делаем запрос по api для получения информации
const apiMain = new MainApi({
    baseUrl: "http://localhost:3000",
    baseUrlMovies: 'https://api.nomoreparties.co',
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiMain;

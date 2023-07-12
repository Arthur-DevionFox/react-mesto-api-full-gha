class Api {
    constructor(path, token) {
        this._path = path;
        this._token = token
    }

    _getHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: this._token,
        };
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {
        return fetch(`${this._path}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._getJson)
    }

    getProfileInfo() {
        return fetch(`${this._path}/users/me`, {
            headers: this._getHeaders()
    })
            .then(res => this._getJson(res))
    }

    editProfileInfo(data) {
        return fetch(`${this._path}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getJson)
    }

    addNewCard(data) {
        return fetch(`${this._path}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getJson)
    }

    editProfileAvatar(data) {
        return fetch(`${this._path}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._getJson)
    }

    getData() {
        return Promise.all([this.getInitialCards(), this.editProfileInfo()])
    }

    deleteCard(data) {
        return fetch(`${this._path}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
            })
            .then(this._getJson)
    }

    clickLike(id) {
        return fetch(`${this._path}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        })
            .then(this._getJson)
    }

    removeLike(id) {
        return fetch(`${this._path}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._getJson)
    }
}

const api = new Api(
    'https://mesto.nomoreparties.co/v1/cohort-61',
    '9eaec6e2-1762-46e5-a009-778183ac0cdb',
);

export default api

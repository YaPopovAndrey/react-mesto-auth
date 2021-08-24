class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
    this.authorization = headers.authorization;
  }

  getProfileValues() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(opt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: opt.name,
        about: opt.about,
      }),
    }).then(this._checkResponse);
  }

  setNewCard(opt) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: opt.name,
        link: opt.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this.authorization,
      },
    }).then(this._checkResponse);
  }

  submitNewAvatar(opt) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: opt.avatar,
      }),
    }).then(this._checkResponse);
  }

  getArrCard() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-23/cards", {
      headers: {
        authorization: this.authorization,
      },
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register = (emailUser, passwordUser) => {
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordUser,
        email: emailUser,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        return res;
      });
  };

  authorize = (emailUser, passwordUser) => {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordUser,
        email: emailUser,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        return res;
      });
  };

  getContent = (token) => {
    return fetch(`https://auth.nomoreparties.co/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-23",
  headers: {
    authorization: "6bb43f5c-9c55-4b96-82c0-2583ec7e1ebb",
    "Content-Type": "application/json",
  },
});

export default api;

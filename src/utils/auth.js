class Auth {
    constructor({ authUrl, headers }) {
      this.headers = headers;
      this.authUrl = authUrl;
      this.authorization = headers.authorization;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  
    register = (emailUser, passwordUser) => {
      return fetch(`${this.authUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordUser,
          email: emailUser,
        }),
      })
      .then(this._checkResponse)
        .then((res) => {
          return res;
        });
    };
  
    authorize = (emailUser, passwordUser) => {
      return fetch(`${this.authUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordUser,
          email: emailUser,
        }),
      })
      .then(this._checkResponse)
        .then((res) => {
          return res;
        });
    };
  
    getContent = (token) => {
      return fetch(`${this.authUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
        .then((data) => {
          return data;
        });
    };
  }
  
  const auth = new Auth({
    authUrl: "https://auth.nomoreparties.co",
    headers: {
      authorization: "6bb43f5c-9c55-4b96-82c0-2583ec7e1ebb",
      "Content-Type": "application/json",
    },
  });
  
  export default auth;
  
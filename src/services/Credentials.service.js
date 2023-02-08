class CredentialsService {
  setCurrentUser (user) {
    localStorage.setItem('user', user)
  }
  getCurrentUser () {
    let user = localStorage.getItem('user')
    return user
  }
  setCurrentUserAvatar (avatar) {
    localStorage.setItem('avatar', avatar)
  }
  getCurrentUserAvatar () {
    let user = localStorage.getItem('avatar')
    return user
  }

  setCurrentUserTipo (tipo) {
    localStorage.setItem('tipo', tipo)
  }
  getCurrentUserTipo () {
    let tipo = localStorage.getItem('tipo')
    return tipo
  }
  setToken (token) {
    localStorage.setItem('token', token)
  }
  getToken () {
    let token = localStorage.getItem('token')
    return token
  }
  clearCredentials () {
    localStorage.clear('user')
    localStorage.clear('token')
    localStorage.clear('avatar')
    localStorage.clear('tipo')
  }

  isLogin () {
    if (this.getToken() != null) return true
    else return false
  }
}

export default CredentialsService

import ApiService from '../Api.service'

class GetCuentaUserService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getCuentaUserService = new GetCuentaUserService('getCuentaUser{/id}')

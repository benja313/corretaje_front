import ApiService from '../Api.service'

class BancoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const bancoService = new BancoService('bancos{/id}')

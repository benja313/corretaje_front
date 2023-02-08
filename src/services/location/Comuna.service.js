import ApiService from '../Api.service'

class ComunaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const comunaService = new ComunaService('comunas{/id}')

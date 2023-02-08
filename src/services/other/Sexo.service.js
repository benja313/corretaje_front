import ApiService from '../Api.service'

class SexoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const sexoService = new SexoService('sexos{/id}')

import ApiService from '../Api.service'

class ZonaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const zonaService = new ZonaService('zonas{/id}')

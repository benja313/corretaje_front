import ApiService from '../Api.service'

class ZonaInComunaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const zonaInComunaService = new ZonaInComunaService('getZonaInComuna{/id}')

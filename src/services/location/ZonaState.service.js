import ApiService from '../Api.service'

class ZonaStateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const zonaStateService = new ZonaStateService('getAllZonasState')

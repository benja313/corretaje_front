import ApiService from '../Api.service'

class ComunaStateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const comunaStateService = new ComunaStateService('getAllComunasState')

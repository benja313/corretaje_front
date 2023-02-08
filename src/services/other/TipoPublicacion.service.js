import ApiService from '../Api.service'

class TipoPublicacionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const tipoPublicacionService = new TipoPublicacionService('tipoPublicacion')

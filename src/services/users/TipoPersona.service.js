import ApiService from '../Api.service'

class TipoPersonaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const tipoPersonaService = new TipoPersonaService('tipoPersona{/id}')

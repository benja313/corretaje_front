import ApiService from '../Api.service'

class ChangeTipoPersona extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const changeTipoPersonaService = new ChangeTipoPersona('changeTipoPersona{/id}')

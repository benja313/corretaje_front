import ApiService from '../Api.service'

class DestacarPublicacionservice extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const destacarPublicacionservice = new DestacarPublicacionservice('activeDestacatePublication{/id}')

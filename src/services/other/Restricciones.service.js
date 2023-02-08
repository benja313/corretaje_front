import ApiService from '../Api.service'

class RestriccionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const restriccionService = new RestriccionService('restricciones{/id}')

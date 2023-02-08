import ApiService from '../Api.service'

class GetComunaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getComunaService = new GetComunaService('comunas{/id}')

import ApiService from '../Api.service'

class GetMetrosConstruidosService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getMetrosConstruidosService = new GetMetrosConstruidosService('maxMetrosConstruidos')

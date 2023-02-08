import ApiService from '../Api.service'

class CaracteristicaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const caracteristicaService = new CaracteristicaService('caracteristicas{/id}')

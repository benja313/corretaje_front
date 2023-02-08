import ApiService from '../Api.service'

class CaracteristicaStateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const caracteristicaStateService = new CaracteristicaStateService('getAllCaracteristicasState')

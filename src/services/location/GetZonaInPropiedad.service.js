import ApiService from '../Api.service'

class GetZonaInPropiedadService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getZonaInPropiedadService = new GetZonaInPropiedadService('zonas{/id}')

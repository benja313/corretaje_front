import ApiService from '../Api.service'

class TipoPropiedadService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const tipoPropiedadService = new TipoPropiedadService('tipoPropiedad')

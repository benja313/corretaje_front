import ApiService from '../Api.service'

class ZonaCompleteservice extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const zonaCompleteService = new ZonaCompleteservice('getAllZonasComunaRegion')

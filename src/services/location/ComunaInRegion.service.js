import ApiService from '../Api.service'

class ComunaInRegionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const comunaInRegionService = new ComunaInRegionService('getComunasInRegion{/id}')

import ApiService from '../Api.service'

class RegionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const regionService = new RegionService('regiones{/id}')

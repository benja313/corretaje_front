import ApiService from '../Api.service'

class RegionStateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const regionStateService = new RegionStateService('getAllRegionesState')

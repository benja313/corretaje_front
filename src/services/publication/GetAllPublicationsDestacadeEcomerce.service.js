import ApiService from '../Api.service'

class GetPublicationDestacadeEcomerceService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationDestacadeEcomerceService = new GetPublicationDestacadeEcomerceService('getPublicationsDestacadas')

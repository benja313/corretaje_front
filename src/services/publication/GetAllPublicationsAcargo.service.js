import ApiService from '../Api.service'

class GetPublicationAcargoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationAcargoService = new GetPublicationAcargoService('getPublicationsAcargo{/id}')

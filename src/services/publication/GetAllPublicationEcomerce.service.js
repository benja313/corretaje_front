import ApiService from '../Api.service'

class GetPublicationEcomerceService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationEcomerceService = new GetPublicationEcomerceService('getAllsPublications')

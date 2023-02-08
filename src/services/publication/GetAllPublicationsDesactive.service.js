import ApiService from '../Api.service'

class GetPublicationDesactiveService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationDesactiveService = new GetPublicationDesactiveService('getPublicationsDesactive')

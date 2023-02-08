import ApiService from '../Api.service'

class GetPublicationFilterService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationFilterService = new GetPublicationFilterService('getAllsPublicationsFilter')

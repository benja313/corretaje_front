import ApiService from '../Api.service'

class GetPublicationUpdateService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationUpdateService = new GetPublicationUpdateService('getAllPublicationUpdate{/id}')

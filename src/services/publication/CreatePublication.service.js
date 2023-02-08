import ApiService from '../Api.service'

class CreatePublicationService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const createPublicationService = new CreatePublicationService('createNewPublication')

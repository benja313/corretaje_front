import ApiService from '../Api.service'

class UpdatePublicationService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const updatePublicationService = new UpdatePublicationService('updatePublication{/id}')

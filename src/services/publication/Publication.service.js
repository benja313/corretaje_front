import ApiService from '../Api.service'

class PublicationService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const publicationService = new PublicationService('getAllPublication{/id}')

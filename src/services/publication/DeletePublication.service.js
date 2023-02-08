import ApiService from '../Api.service'

class DeletePublicationService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const deletePublicationService = new DeletePublicationService('deletePublication{/id}')

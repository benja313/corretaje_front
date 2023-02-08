import ApiService from '../Api.service'

class GetPublicationAutorService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationAutorService = new GetPublicationAutorService('getPublicationsAutor{/id}')

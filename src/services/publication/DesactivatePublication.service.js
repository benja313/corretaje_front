import ApiService from '../Api.service'

class DesactivatePublicationservice extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const desactivatePublicationservice = new DesactivatePublicationservice('publicationDesactivate{/id}')

import ApiService from '../Api.service'

class ChangeStatePublicationservice extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const changeStatePublicationservice = new ChangeStatePublicationservice('changeStatePublication{/id}')

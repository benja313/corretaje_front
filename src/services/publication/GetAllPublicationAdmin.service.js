import ApiService from '../Api.service'

class GetPublicationAdminService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const getPublicationAdminService = new GetPublicationAdminService('getAllsPublicationsAdmin')

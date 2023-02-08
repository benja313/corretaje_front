import ApiService from '../Api.service.js'

class GetContactUser extends ApiService {
    constructor (endpoint) {
        super(endpoint)
        this.name = endpoint
        }
}

export const getContactUserService = new GetContactUser('getContact{/id}')

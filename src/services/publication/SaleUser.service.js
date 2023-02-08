import ApiService from '../Api.service'

class SaleUserService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const saleUserService = new SaleUserService('showAllSales{/id}')

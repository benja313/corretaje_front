import ApiService from '../Api.service'

class SaleCargoService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const saleCargoService = new SaleCargoService('showAllSalesCargo{/id}')

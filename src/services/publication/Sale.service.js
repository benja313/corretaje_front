import ApiService from '../Api.service'

class SaleService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const saleService = new SaleService('venta{/id}')

import ApiService from '../Api.service'

class TipoCuentaBancariaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const tipoCuentaBancariaService = new TipoCuentaBancariaService('tipoCuentasBancarias{/id}')

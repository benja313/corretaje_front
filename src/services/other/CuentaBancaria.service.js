import ApiService from '../Api.service'

class CuentaBancariaService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const cuentaBancariaService = new CuentaBancariaService('cuentasBancarias{/id}')

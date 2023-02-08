import ApiService from '../Api.service'

class HabitacionService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const habitacionService = new HabitacionService('habitaciones{/id}')

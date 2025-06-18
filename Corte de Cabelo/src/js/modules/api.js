// Simulação de uma API para gerenciar agendamentos
class ApiAgendamentos {
  constructor() {
    this.agendamentos = this.carregarAgendamentos()
    this.horariosIndisponiveisFixos = {
      "2025-01-20": ["11:00", "13:00", "14:00", "16:00", "17:00", "21:00"],
      "2025-01-21": ["09:00", "15:00", "19:00"],
      "2025-01-22": ["10:00", "12:00", "18:00", "20:00"],
    }
  }

  carregarAgendamentos() {
    const armazenado = localStorage.getItem("agendamentos")
    return armazenado ? JSON.parse(armazenado) : {}
  }

  salvarAgendamentos() {
    localStorage.setItem("agendamentos", JSON.stringify(this.agendamentos))
  }

  async obterHorariosIndisponiveis(data) {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 100))

    const dataStr = data.toISOString().split("T")[0]
    const indisponiveis = this.horariosIndisponiveisFixos[dataStr] || []
    const agendados = this.agendamentos[dataStr] ? this.agendamentos[dataStr].map((apt) => apt.time) : []

    return [...indisponiveis, ...agendados]
  }

  async criarAgendamento(data, hora, cliente) {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 200))

    const dataStr = data.toISOString().split("T")[0]

    if (!this.agendamentos[dataStr]) {
      this.agendamentos[dataStr] = []
    }

    const agendamento = {
      id: Date.now().toString(),
      time: hora,
      client: cliente,
      date: dataStr,
    }

    this.agendamentos[dataStr].push(agendamento)
    this.salvarAgendamentos()

    return agendamento
  }

  async obterAgendamentos(data) {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 100))

    const dataStr = data.toISOString().split("T")[0]
    return this.agendamentos[dataStr] || []
  }

  async cancelarAgendamento(idAgendamento, data) {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 150))

    const dataStr = data.toISOString().split("T")[0]

    if (this.agendamentos[dataStr]) {
      this.agendamentos[dataStr] = this.agendamentos[dataStr].filter((apt) => apt.id !== idAgendamento)
      this.salvarAgendamentos()
      return true
    }

    return false
  }
}

export default ApiAgendamentos
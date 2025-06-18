// Módulo para validação de dados
export class GerenciadorValidacao {

  static validarData(data) {
    if (!data) return { valido: false, mensagem: "Selecione uma data." }
    const dataSelecionada = new Date(data)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    if (dataSelecionada < hoje) {
      return { valido: false, mensagem: "Não pode agendar para datas passadas." }
    }
    return { valido: true }
  }

  static validarHora(hora) {
    if (!hora) return { valido: false, mensagem: "Selecione um horário." }
    return { valido: true }
  }

  static validarCliente(cliente) {
    const nome = cliente ? cliente.trim() : ""
    if (nome.length < 2) return { valido: false, mensagem: "Nome do cliente muito curto." }
    if (nome.length > 50) return { valido: false, mensagem: "Nome do cliente muito longo." }
    return { valido: true }
  }

  static validarAgendamento(data, hora, cliente) {
    const validacaoData = this.validarData(data)
    if (!validacaoData.valido) return validacaoData

    const validacaoHora = this.validarHora(hora)
    if (!validacaoHora.valido) return validacaoHora

    const validacaoCliente = this.validarCliente(cliente)
    if (!validacaoCliente.valido) return validacaoCliente

    return { valido: true }
  }
}
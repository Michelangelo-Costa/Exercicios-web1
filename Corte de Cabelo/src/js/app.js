// Arquivo principal da aplicação
import ApiAgendamentos from "./modules/api.js"
import { GerenciadorHorarios } from "./modules/timeSlots.js"
import { GerenciadorDom } from "./modules/dom.js"
import { GerenciadorValidacao } from "./modules/validation.js"
import { UtilitariosData, debounce } from "./modules/utils.js"

class AppHairDay {
  constructor() {
    this.api = new ApiAgendamentos()
    this.gerenciadorHorarios = new GerenciadorHorarios()
    this.gerenciadorDom = new GerenciadorDom()
    this.dataAtual = null

    this.init()
  }

  async init() {
    this.configurarOuvintesEventos()
    this.definirDataPadrao()
    await this.carregarDadosIniciais()
  }

  configurarOuvintesEventos() {
    // Ouvinte de evento para mudança de data
    this.gerenciadorDom.elementos.entradaData.addEventListener(
      "change",
      debounce(this.lidarMudancaData.bind(this), 300),
    )

    // Ouvinte de evento para submissão do formulário
    this.gerenciadorDom.elementos.formulario.addEventListener("submit", this.lidarEnvioFormulario.bind(this))

    // Ouvinte de evento para cancelamento de agendamentos
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-icon")) {
        this.lidarCancelamentoAgendamento(e)
      }
    })
  }

  definirDataPadrao() {
    const hoje = new Date()
    const amanha = UtilitariosData.adicionarDias(hoje, 1)
    this.gerenciadorDom.elementos.entradaData.value = UtilitariosData.formatarData(amanha)
    this.dataAtual = amanha
  }

  async carregarDadosIniciais() {
    if (this.dataAtual) {
      await this.atualizarHorariosDisponiveis()
      await this.atualizarAgenda()
    }
  }

  async lidarMudancaData(evento) {
    const dataSelecionada = UtilitariosData.parsearData(evento.target.value)

    if (dataSelecionada < new Date()) {
      this.gerenciadorDom.mostrarNotificacao("Não é possível selecionar datas passadas", "erro")
      this.definirDataPadrao()
      return
    }

    this.dataAtual = dataSelecionada
    await this.atualizarHorariosDisponiveis()
    await this.atualizarAgenda()
  }

  async atualizarHorariosDisponiveis() {
    try {
      const slots = this.gerenciadorHorarios.gerarHorarios()
      const horariosIndisponiveis = await this.api.obterHorariosIndisponiveis(this.dataAtual)
      const slotsAtualizados = this.gerenciadorHorarios.atualizarDisponibilidadeHorarios(
        slots,
        horariosIndisponiveis,
      )

      this.gerenciadorDom.renderizarHorarios(slotsAtualizados)
    } catch (erro) {
      console.error("Erro ao carregar horários:", erro)
      this.gerenciadorDom.mostrarNotificacao("Erro ao carregar horários disponíveis", "erro")
    }
  }

  async atualizarAgenda() {
    try {
      const agendamentos = await this.api.obterAgendamentos(this.dataAtual)
      this.gerenciadorDom.renderizarAgendamentos(agendamentos)
    } catch (erro) {
      console.error("Erro ao carregar agendamentos:", erro)
      this.gerenciadorDom.mostrarNotificacao("Erro ao carregar agendamentos", "erro")
    }
  }

  async lidarEnvioFormulario(evento) {
    evento.preventDefault()

    const dadosFormulario = this.obterDadosFormulario()
    const validacao = GerenciadorValidacao.validarAgendamento(
      dadosFormulario.data,
      dadosFormulario.hora,
      dadosFormulario.cliente,
    )

    if (!validacao.valido) {
      this.gerenciadorDom.mostrarNotificacao(validacao.mensagem, "erro")
      return
    }

    try {
      await this.criarNovoAgendamento(dadosFormulario)
    } catch (erro) {
      console.error("Erro ao criar agendamento:", erro)
      this.gerenciadorDom.mostrarNotificacao("Erro ao criar agendamento", "erro")
    }
  }

  obterDadosFormulario() {
    return {
      data: this.gerenciadorDom.elementos.entradaData.value,
      hora: this.gerenciadorDom.obterHorarioSelecionado(),
      cliente: this.gerenciadorDom.elementos.entradaCliente.value.trim(),
    }
  }

  async criarNovoAgendamento(dadosFormulario) {
    const agendamento = await this.api.criarAgendamento(
      UtilitariosData.parsearData(dadosFormulario.data),
      dadosFormulario.hora,
      dadosFormulario.cliente,
    )

    this.gerenciadorDom.mostrarNotificacao(
      `Agendamento criado para ${dadosFormulario.cliente} às ${dadosFormulario.hora}`,
      "sucesso",
    )

    this.gerenciadorDom.limparFormulario()
    await this.atualizarHorariosDisponiveis()
    await this.atualizarAgenda()
  }

  async lidarCancelamentoAgendamento(evento) {
    const idAgendamento = evento.target.dataset.appointmentId

    try {
      const sucesso = await this.api.cancelarAgendamento(idAgendamento, this.dataAtual)

      if (sucesso) {
        this.gerenciadorDom.mostrarNotificacao("Agendamento cancelado com sucesso", "sucesso")
        await this.atualizarHorariosDisponiveis()
        await this.atualizarAgenda()
      } else {
        this.gerenciadorDom.mostrarNotificacao("Erro ao cancelar agendamento", "erro")
      }
    } catch (erro) {
      console.error("Erro ao cancelar agendamento:", erro)
      this.gerenciadorDom.mostrarNotificacao("Erro ao cancelar agendamento", "erro")
    }
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new AppHairDay()
})
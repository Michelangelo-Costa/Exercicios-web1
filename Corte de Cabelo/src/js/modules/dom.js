// Módulo para manipulação do DOM
export class GerenciadorDom {
  constructor() {
    this.elementos = {
      entradaData: document.getElementById("date"),
      containerHorarios: document.getElementById("hours"),
      entradaCliente: document.getElementById("client"),
      formulario: document.querySelector(".form"),
      periodoManha: document.getElementById("period-morning"),
      periodoTarde: document.getElementById("period-afternoon"),
      periodoNoite: document.getElementById("period-night"),
    }
  }

  renderizarHorarios(slots) {
    this.elementos.containerHorarios.innerHTML = ""

    slots.forEach((slot) => {
      const li = document.createElement("li")

      if (slot.type === "periodo") {
        li.className = "hour-period"
        li.textContent = slot.label
        li.dataset.periodo = slot.periodo
      } else {
        li.className = `hour ${slot.disponivel ? "hour-available" : "hour-unavailable"}`
        li.textContent = slot.time
        li.dataset.periodo = slot.periodo
        li.dataset.valor = slot.time

        if (slot.disponivel) {
          li.addEventListener("click", () => this.selecionarHorario(li))
        }
      }

      this.elementos.containerHorarios.appendChild(li)
    })
  }

  selecionarHorario(elemento) {
    // Remove seleção anterior
    document.querySelectorAll(".hour-selected").forEach((el) => {
      el.classList.remove("hour-selected")
    })

    // Adiciona seleção atual
    elemento.classList.add("hour-selected")
  }

  obterHorarioSelecionado() {
    const selecionado = document.querySelector(".hour-selected")
    return selecionado ? selecionado.dataset.valor : null
  }

  renderizarAgendamentos(agendamentos) {
    // Limpa listas existentes
    this.elementos.periodoManha.innerHTML = ""
    this.elementos.periodoTarde.innerHTML = ""
    this.elementos.periodoNoite.innerHTML = ""

    agendamentos.forEach((agendamento) => {
      const li = document.createElement("li")
      li.innerHTML = `
        <strong>${agendamento.time}</strong>
        <span>${agendamento.client}</span>
        <img
          src="./src/assets/cancel.svg"
          alt="Cancelar"
          class="cancel-icon"
          data-appointment-id="${agendamento.id}"
        />
      `

      const periodo = this.obterPeriodoDaHora(agendamento.time)
      const container = this.elementos[`periodo${this.capitalizar(periodo)}`]

      if (container) {
        container.appendChild(li)
      }
    })
  }

  obterPeriodoDaHora(hora) {
    const h = Number.parseInt(hora.split(":")[0])

    if (h >= 9 && h <= 12) return "manha"
    if (h >= 13 && h <= 18) return "tarde"
    if (h >= 19 && h <= 21) return "noite"

    return "manha" // Padrão
  }

  capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  mostrarNotificacao(mensagem, tipo = "sucesso") {
    // Cria elemento de notificação
    const notificacao = document.createElement("div")
    notificacao.className = `notification notification-${tipo}`
    notificacao.textContent = mensagem
    notificacao.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 700;
      z-index: 1000;
      background-color: ${tipo === "sucesso" ? "#22c55e" : "#ef4444"};
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `

    document.body.appendChild(notificacao)

    // Anima entrada
    setTimeout(() => {
      notificacao.style.transform = "translateX(0)"
    }, 100)

    // Remove após 3 segundos
    setTimeout(() => {
      notificacao.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(notificacao)
      }, 300)
    }, 3000)
  }

  limparFormulario() {
    this.elementos.entradaCliente.value = ""
    document.querySelectorAll(".hour-selected").forEach((el) => {
      el.classList.remove("hour-selected")
    })
  }
}

export const gerenciadorDom = new GerenciadorDom()
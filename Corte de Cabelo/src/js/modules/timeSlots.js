// Módulo para gerenciar horários disponíveis
export class GerenciadorHorarios {
  constructor() {
    this.periodos = {
      manha: { inicio: 9, fim: 12, label: "Manhã" },
      tarde: { inicio: 13, fim: 18, label: "Tarde" },
      noite: { inicio: 19, fim: 21, label: "Noite" },
    }
  }

  gerarHorarios() {
    const slots = []

    Object.entries(this.periodos).forEach(([periodo, config]) => {
      slots.push({
        type: "periodo",
        periodo: periodo,
        label: config.label,
      })

      for (let hora = config.inicio; hora <= config.fim; hora++) {
        slots.push({
          type: "slot",
          periodo: periodo,
          time: `${hora.toString().padStart(2, "0")}:00`,
          disponivel: true,
        })
      }
    })

    return slots
  }

  atualizarDisponibilidadeHorarios(slots, horariosIndisponiveis) {
    return slots.map((slot) => {
      if (slot.type === "slot") {
        return {
          ...slot,
          disponivel: !horariosIndisponiveis.includes(slot.time),
        }
      }
      return slot
    })
  }

  obterPeriodoDaHora(hora) {
    const h = Number.parseInt(hora.split(":")[0])

    if (h >= 9 && h <= 12) return "manha"
    if (h >= 13 && h <= 18) return "tarde"
    if (h >= 19 && h <= 21) return "noite"

    return null
  }
}

export const gerenciadorHorarios = new GerenciadorHorarios()
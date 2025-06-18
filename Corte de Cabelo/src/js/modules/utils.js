// Módulo com funções utilitárias
export class UtilitariosData {
  static formatarData(data) {
    return data.toISOString().split("T")[0]
  }

  static parsearData(dataString) {
    return new Date(dataString + "T00:00:00")
  }

  static ehHoje(data) {
    const hoje = new Date()
    return data.toDateString() === hoje.toDateString()
  }

  static adicionarDias(data, dias) {
    const resultado = new Date(data)
    resultado.setDate(resultado.getDate() + dias)
    return resultado
  }
}

export class UtilitariosString {
  static capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  static sanitizar(str) {
    return str.trim().replace(/\s+/g, " ")
  }
}

export const debounce = (func, espera) => {
  let timeout
  return function executarFuncao(...args) {
    const depois = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(depois, espera)
  }
}
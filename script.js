// Projects data with real image paths - TODOS OS PROJETOS
const projects = [
  {
    name: "Vertigo",
    url: "https://michelangelo-costa.github.io/Pagina-de-Login/",
    image: "Assets/logo_Vertigo.svg",
    className: "project-vertigo",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Receitas",
    url: "https://michelangelo-costa.github.io/unidade1/",
    image: "Assets/logo_receitas.png",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Travelgram",
    url: "https://michelangelo-costa.github.io/perfil-viagens/",
    image: "Assets/logo_Perfil-viagens.svg",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Estrelas do Amanhã",
    url: "https://michelangelo-costa.github.io/formulario/",
    image: "Assets/logo_Form.svg",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Portal de Notícias",
    url: "https://michelangelo-costa.github.io/exercicio-news/",
    image: "Assets/logo_Tech-News.svg",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Portfolio",
    url: "https://michelangelo-costa.github.io/Portfolio-web/",
    image: "Assets/logo_portfolio.svg",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Conversor de Moedas",
    url: "https://michelangelo-costa.github.io/conversor-moedas/",
    image: "Assets/logo_moedas.png",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Projeto Rembolso",
    url: "https://michelangelo-costa.github.io/Projeto-Rembolso/",
    image: "Assets/logo.Projeto_Rembolso.svg",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Lista de Compras",
    url: "https://michelangelo-costa.github.io/Lista-Compras/",
    image: "Assets/logo_compras.png",
    description: "Clique para visualizar o projeto",
  },
  {
    name: "Agendamento de Cabelo",
    url: "https://michelangelo-costa.github.io/Corte-Cabelo/",
    image: "Assets/logo_hair day.svg",
    description: "Clique para visualizar o projeto",
  },
]

// Global variables
let isMaximized = false
let isWindowVisible = true

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeProjects()
  initializeClock()
  initializeWindowControls()
  initializeTaskbarControls()
  initializeProfileClick()
  initializeEdgeButton()
})

// Populate projects with real images
function initializeProjects() {
  const projectsGrid = document.getElementById("projectsGrid")

  projects.forEach((project) => {
    const projectElement = document.createElement("a")
    projectElement.href = project.url
    projectElement.target = "_blank"
    projectElement.rel = "noopener noreferrer"
    projectElement.className = "project-item"

    projectElement.innerHTML = `
            <div class="project-content">
                <div class="project-icon">
                    <img src="${project.image}" alt="${project.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='❌';">
                </div>
                <div class="project-info">
                    <h3 class="project-name">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
                <div class="project-arrow">🌐</div>
            </div>
        `

    projectsGrid.appendChild(projectElement)
  })
}

// Initialize clock
function initializeClock() {
  const clockElement = document.getElementById("clock")

  function updateClock() {
    const now = new Date()
    const timeString = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    clockElement.textContent = timeString
  }

  updateClock()
  setInterval(updateClock, 1000)
}

// Initialize window controls
function initializeWindowControls() {
  const maximizeBtn = document.getElementById("maximizeBtn")
  const mainWindow = document.getElementById("mainWindow")
  const profile = document.querySelector(".profile")

  maximizeBtn.addEventListener("click", () => {
    isMaximized = !isMaximized

    if (isMaximized) {
      // Maximizar - CORRIGIDO
      mainWindow.classList.add("maximized")
      maximizeBtn.innerHTML = "<span>🗗</span>"
      maximizeBtn.title = "Restaurar"

      // Esconder foto de perfil temporariamente
      profile.classList.add("hidden")
      setTimeout(() => {
        profile.classList.remove("hidden")
      }, 800)
    } else {
      // Restaurar - CORRIGIDO PARA VOLTAR AO CENTRO
      mainWindow.classList.remove("maximized")
      maximizeBtn.innerHTML = "<span>▢</span>"
      maximizeBtn.title = "Maximizar"

      // Forçar reset das propriedades de posicionamento
      setTimeout(() => {
        mainWindow.style.top = "50%"
        mainWindow.style.left = "50%"
        mainWindow.style.transform = "translate(-50%, -50%)"
        mainWindow.style.width = ""
        mainWindow.style.height = ""
      }, 100)
    }
  })

  // Minimizar com animação melhorada
  document.querySelector(".minimize-btn").addEventListener("click", () => {
    mainWindow.style.transition = "all 0.3s ease"

    if (isMaximized) {
      mainWindow.style.transform = "translateY(150%)"
    } else {
      mainWindow.style.transform = "translate(-50%, 150%)"
    }
    mainWindow.style.opacity = "0.3"

    setTimeout(() => {
      mainWindow.style.transition = "all 0.5s ease"
      mainWindow.style.opacity = "1"
      if (isMaximized) {
        mainWindow.style.transform = "none"
      } else {
        mainWindow.style.transform = "translate(-50%, -50%)"
      }
    }, 1000)
  })

  // Fechar - MODIFICADO PARA APENAS ESCONDER
  document.querySelector(".close-btn").addEventListener("click", () => {
    hideWindow()
  })
}

// Initialize taskbar controls
function initializeTaskbarControls() {
  const folderBtn = document.querySelector('.taskbar-btn[title="Explorador de Arquivos"]')

  folderBtn.addEventListener("click", () => {
    toggleWindow()
  })

  // Add some taskbar interactivity for other buttons
  document.querySelectorAll(".taskbar-btn").forEach((btn) => {
    if (btn.title !== "Explorador de Arquivos" && btn.id !== "edgeBtn") {
      btn.addEventListener("click", function () {
        // Add click animation
        this.style.transform = "translateY(-2px) scale(0.95)"
        setTimeout(() => {
          this.style.transform = "translateY(-2px)"
        }, 150)
      })
    }
  })
}

// Initialize Edge button - CORRIGIDO PARA SEU PORTFÓLIO
function initializeEdgeButton() {
  const edgeBtn = document.getElementById("edgeBtn")

  edgeBtn.addEventListener("click", () => {
    // Abre seu portfólio em nova aba
    window.open("https://michelangelo-costa.github.io/portfolio/", "_blank")

    // Animação de clique
    edgeBtn.style.transform = "translateY(-2px) scale(0.95)"
    setTimeout(() => {
      edgeBtn.style.transform = "translateY(-2px)"
    }, 150)
  })
}

// Initialize profile click to GitHub
function initializeProfileClick() {
  const profile = document.querySelector(".profile")

  profile.addEventListener("click", () => {
    window.open("https://github.com/Michelangelo-Costa", "_blank")
  })

  // Add hover effect
  profile.addEventListener("mouseenter", () => {
    profile.style.transform = "scale(1.05)"
  })

  profile.addEventListener("mouseleave", () => {
    profile.style.transform = "scale(1)"
  })
}

// Show/Hide window functions
function showWindow() {
  const mainWindow = document.getElementById("mainWindow")
  const folderBtn = document.querySelector('.taskbar-btn[title="Explorador de Arquivos"]')

  mainWindow.classList.remove("hidden")
  folderBtn.classList.add("active")
  isWindowVisible = true

  // Animação de entrada
  mainWindow.style.opacity = "0"

  if (isMaximized) {
    mainWindow.style.transform = "scale(0.8)"
  } else {
    mainWindow.style.transform = "translate(-50%, -50%) scale(0.8)"
  }

  setTimeout(() => {
    mainWindow.style.transition = "all 0.3s ease"
    mainWindow.style.opacity = "1"
    if (isMaximized) {
      mainWindow.style.transform = "none"
    } else {
      mainWindow.style.transform = "translate(-50%, -50%)"
    }
  }, 50)
}

function hideWindow() {
  const mainWindow = document.getElementById("mainWindow")
  const folderBtn = document.querySelector('.taskbar-btn[title="Explorador de Arquivos"]')

  mainWindow.style.transition = "all 0.3s ease"
  mainWindow.style.opacity = "0"

  if (isMaximized) {
    mainWindow.style.transform = "scale(0.8)"
  } else {
    mainWindow.style.transform = "translate(-50%, -50%) scale(0.8)"
  }

  setTimeout(() => {
    mainWindow.classList.add("hidden")
    folderBtn.classList.remove("active")
    isWindowVisible = false

    // Reset maximize state when hidden
    if (isMaximized) {
      isMaximized = false
      mainWindow.classList.remove("maximized")
      document.getElementById("maximizeBtn").innerHTML = "<span>▢</span>"
      document.getElementById("maximizeBtn").title = "Maximizar"

      // Reset positioning
      mainWindow.style.top = "50%"
      mainWindow.style.left = "50%"
      mainWindow.style.transform = "translate(-50%, -50%)"
      mainWindow.style.width = ""
      mainWindow.style.height = ""
    }
  }, 300)
}

function toggleWindow() {
  if (isWindowVisible) {
    hideWindow()
  } else {
    showWindow()
  }
}

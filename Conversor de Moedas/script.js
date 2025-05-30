document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById("amount").value.replace(",", "."));
  const moeda = document.getElementById("currency").value;

  const taxas = {
    USD: 5.66,
    EUR: 6.41,
    GBP: 7.20
  };

  if (!moeda || isNaN(valor)) {
    alert("Digite apenas Números!");
    return;
  }

  const convertido = valor * taxas[moeda];

  document.getElementById("description").textContent = `1 ${moeda} = R$ ${taxas[moeda].toFixed(2)}`;
  document.getElementById("result").textContent = `R$ ${convertido.toFixed(2).replace(".", ",")}`;
  document.querySelector("footer").classList.add("show-result");
});

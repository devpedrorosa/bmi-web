// assets/js/imc.js

// Função para calcular o IMC
function calcularIMC(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Obter os valores de peso e altura do formulário
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);

  // Calcular o IMC
  const imc = peso / (altura * altura);

  // Exibir o resultado na tela
  document.getElementById('result').innerHTML = `Seu IMC é: ${imc.toFixed(2)}`;
}

// Adicionar evento de clique ao botão de calcular
document.getElementById('btn').addEventListener('click', calcularIMC);

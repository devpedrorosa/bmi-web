document.addEventListener('DOMContentLoaded', function () {
  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');
  const resultadoDiv = document.getElementById('result');

  const formatarPesoAltura = function (valor) {
    // Remove caracteres não numéricos
    const numeroFormatado = valor.replace(/[^0-9.]/g, '');

    // Verifica se o valor é vazio ou não numérico
    if (numeroFormatado === '' || isNaN(numeroFormatado)) {
      return '';
    }

    // Adiciona a vírgula para representar o ponto flutuante
    const numeroComoFloat = parseFloat(numeroFormatado.replace(',', '.'));

    return numeroComoFloat;
  };

  const adicionarZeros = function (valor, casasDecimais) {
    const partes = valor.toString().split('.');
    if (partes.length === 1) {
      return valor.toFixed(casasDecimais);
    } else {
      const parteDecimal = partes[1];
      if (parteDecimal.length < casasDecimais) {
        return valor.toFixed(casasDecimais);
      }
      return valor;
    }
  };

  pesoInput.addEventListener('input', function (event) {
    const cursorPosition = event.target.selectionStart;
    let peso = formatarPesoAltura(event.target.value);
    peso = isNaN(peso) ? '' : peso.toString();
    event.target.value = peso === '' ? '' : adicionarZeros(peso, 1);
    event.target.setSelectionRange(cursorPosition, cursorPosition);
  });

  alturaInput.addEventListener('input', function (event) {
    const cursorPosition = event.target.selectionStart;
    let altura = formatarPesoAltura(event.target.value);
    altura = isNaN(altura) ? '' : altura.toString();

    // Adiciona automaticamente o ponto e zeros após o primeiro número
    if (altura.length === 1) {
      altura += '.';
    }

    event.target.value = altura === '' ? '' : adicionarZeros(altura, 2);
    event.target.setSelectionRange(cursorPosition, cursorPosition);
  });

  const calcularIMC = function (peso, altura) {
    if (isNaN(peso) || isNaN(altura) || altura === 0) {
      return 'Altura inválida';
    }

    const imc = peso / (altura * altura);
    return imc.toFixed(2);
  };

  const categorizarIMC = function (imc) {
    if (imc === 'Altura inválida') {
      return 'Altura inválida';
    } else if (imc <= 18.5) {
      return 'Abaixo do normal';
    } else if (imc <= 24.9) {
      return 'Normal';
    } else if (imc <= 29.9) {
      return 'Sobrepeso';
    } else if (imc <= 35) {
      return 'Obesidade grau 1';
    } else if (imc <= 40) {
      return 'Obesidade grau 2';
    } else {
      return 'Obesidade grau 3';
    }
  };

  const exibirResultado = function (imc, categoria) {
    resultadoDiv.innerHTML = `Seu IMC é ${imc}. Categoria: ${categoria}`;
  };

  const form = document.getElementById('box-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const peso = parseFloat(pesoInput.value.replace(',', '.'));
    const altura = parseFloat(alturaInput.value.replace(',', '.'));

    const imc = calcularIMC(peso, altura);
    const categoria = categorizarIMC(imc);
    exibirResultado(imc, categoria);
  });
});

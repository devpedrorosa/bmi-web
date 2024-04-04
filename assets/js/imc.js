document.addEventListener('DOMContentLoaded', function() {
  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');
  const resultadoDiv = document.getElementById('result');

  const formatarPesoAltura = function(valor) {
    // Remove caracteres não numéricos
    const numeroFormatado = valor.replace(/[^0-9.]/g, '');

    // Verifica se o valor é vazio ou não numérico
    if (numeroFormatado === '' || isNaN(numeroFormatado)) {
      return '';
    }

    const numeroComoFloat = parseFloat(numeroFormatado);

    return numeroComoFloat;
  };

  // FIXME: AJEITAR O ADICIONAR ZEROS
  // const adicionarZeros = function(valor, casasDecimais) {
  //   const partes = valor.toString().split('.');
  //   if (partes.length === 1) {
  //     return valor.toFixed(casasDecimais);
  //   } else {
  //     const parteDecimal = partes[1];
  //     let resultado = '';
  //     // Adiciona zeros à parte decimal se necessário
  //     for (let i = 0; i < casasDecimais - parteDecimal.length; i++) {
  //       resultado += '0';
  //     }
  //     return valor + resultado;
  //   }
  // };

  pesoInput.addEventListener('input', function(event) {
    const cursorPosition = event.target.selectionStart;
    let peso = formatarPesoAltura(event.target.value);
    peso = isNaN(peso) ? '' : peso.toString();

    // HACK: SO FUNCIONA SE COLOCAR UM PONTO
    //formata o peso para mostrar em quilogramas
    if (peso.length === 3) {
      peso = peso.slice(0, 1) + peso.slice(1);
    } else if (peso.length === 4) {
      peso = peso.slice(0, 2) + peso.slice(2);
    }

    event.target.value = peso === '' ? '' : adicionarZeros(peso, 2); // Alterado para 2 casas decimais
    event.target.setSelectionRange(cursorPosition, cursorPosition);

  });


  alturaInput.addEventListener('input', function(event) {
    const cursorPosition = event.target.selectionStart;
    let altura = formatarPesoAltura(event.target.value);
    altura = isNaN(altura) ? '' : altura.toString();

    // Formata altura para mostrar em metros
    if (altura.length === 3) {
      altura = altura.slice(0, 1) + '.' + altura.slice(1);
    } else if (altura.length === 4) {
      altura = altura.slice(0, 2) + '.' + altura.slice(2);
    }

    event.target.value = altura;
    event.target.setSelectionRange(cursorPosition, cursorPosition);
  });

  const calcularIMC = function(peso, altura) {
    if (isNaN(peso) || isNaN(altura) || altura === 0) {
      return 'Altura inválida';
    }

    const imc = peso / (altura * altura);
    return imc.toFixed(2);
  };
  const categorizarIMC = function(imc) {
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

  const exibirResultado = function(imc, categoria) {
    resultadoDiv.innerHTML = `Seu IMC é ${imc}. Categoria: ${categoria}`;
  };

  const form = document.getElementById('box-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const peso = parseFloat(pesoInput.value.replace(',', '.'));
    const altura = parseFloat(alturaInput.value.replace(',', '.'));

    const imc = calcularIMC(peso, altura);
    const categoria = categorizarIMC(imc);
    exibirResultado(imc, categoria);
  });
});

const escopoImc = () => {
  const formulario = document.querySelector('#box-form');

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const peso = Number(formulario.querySelector('#peso').value);
    const altura = Number(formulario.querySelector('#altura').value);

    if (!validarCampo(peso, altura)) {
      return;
    }

    const resultadoImc = calcularImc(peso, altura);
    const categoriaImc = categorizarImc(resultadoImc);

    const mensagemFinal = `Seu IMC: ${resultadoImc.toFixed(2)} | Categoria: ${categoriaImc}`;
    exibirResultado(mensagemFinal, true);
  });

  const calcularImc = (a, b) => {
    return a / b ** 2;
  };

  const categorizarImc = (imc) => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Acima do peso';
    if (imc < 34.9) return 'Obesidade grau 1';
    if (imc < 39.9) return 'Obesidadade grau 2';
    return 'Obesidade grau 3';
  };

  const criarParagrafo = () => {
    const paragrafo = document.createElement('p');
    return paragrafo;
  };

  const exibirResultado = (mensagem, validar) => {
    const resultado = document.querySelector('#result');
    resultado.innerHTML = '';
    const paragrafo = criarParagrafo();

    if (validar) {
      paragrafo.classList.add('resultado-verde');
    } else {
      paragrafo.classList.add('resultado-vermelho');
    }

    paragrafo.innerHTML = mensagem;
    resultado.appendChild(paragrafo);
  };

  const validarCampo = (iPeso, iAltura) => {
    if (!iPeso || !iAltura) {
      exibirResultado('Preencha os dois campos');
      return false;
    }
    return true;
  };
};

escopoImc();

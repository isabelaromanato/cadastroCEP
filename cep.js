'use scrict';

const pesquisarCep = async (cep) => {
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  const resposta = await fetch(url);
  const endereco = await resposta.json();
  return endereco;
};

const limparFormulario = () => {
  document.querySelector('#endereco').value = '';
  document.querySelector('#bairro').value = '';
  document.querySelector('#cidade').value = '';
  document.querySelector('#estado').value = '';
};

const cepValido = (cep) => /^[0-9]{8}$/.test(cep);

const preencherFormulario = async () => {
  const cep = document.querySelector('#cep').value.replace('-', '');
  if (cepValido(cep)) {
    const endereco = await pesquisarCep(cep);
    document.querySelector('#endereco').value = endereco.logradouro;
    document.querySelector('#bairro').value = endereco.bairro;
    document.querySelector('#cidade').value = endereco.localidade;
    document.querySelector('#estado').value = endereco.uf;
  } else {
    limparFormulario();
    document.querySelector('#endereco').value = 'CEP INCORRETO!';
  }
};

document
  .querySelector('#cep')
  .addEventListener('focusout', preencherFormulario);

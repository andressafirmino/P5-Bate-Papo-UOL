axios.defaults.headers.common['Authorization'] = 'BSut5m20q7VmhDtxGHFWTdQI'
let nickname;
let verificar = '';
let nickObj = {name: ''};
let enviadasDoServidor = [];
let att = '';
let enviar;
let caixaTextoDigitado = {from: '',
to: 'Todos',
text: '',
type: "message" 
}

function perguntarNome () {
nickname = prompt('Qual o seu nome?');
nickObj.name = nickname;
let requisicaoName = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickObj);
requisicaoName.then(nickAceito);
requisicaoName.catch(nickNaoAceito);

}
perguntarNome();

function nickAceito () {
    exibirMensagens();
    setInterval(atualizarStatus, 5000);
    setInterval(renderizarMensagens, 3000);
}

function atualizarStatus() {
    att = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nickObj);
}

function nickNaoAceito () {
    //apresentar novo prompt até que o nome seja válido
    perguntarNome();
}

function exibirMensagens () {
    enviadasDoServidor = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    enviadasDoServidor.then(renderizarMensagens);
    enviadasDoServidor.catch(deuRuim);
}

function renderizarMensagens (foi){
  
    let mensagem = document.querySelector('.mensagens');
    mensagem.innerHTML = '';
    console.log(foi.data); 

    for (let i = 0; i < foi.data.length; i++) {
        if (foi.data[i].type === 'status') {
          mensagem.innerHTML +=
            `<div class="status" data-test="message"><span class="hora">${foi.data[i].time}
            </span> <span class="nome">${foi.data[i].from}
            </span> <span class="mensagem">${foi.data[i].text}
            </span></div>`
        }
        else if (foi.data[i].type === 'message') {
            mensagem.innerHTML +=
              `<div class="status" data-test="message"><span class="hora">${foi.data[i].time}
              </span> <span class="nome">${foi.data[i].from} 
              </span> para <span class ="todos">${foi.data[i].to}:
              </span> <span class="mensagem">${foi.data[i].text}
              </span></div>`
          }
          else if (foi.data[i].type === 'private_message') {
            mensagem.innerHTML +=
              `<div class="status" data-test="message"><span class="hora">${foi.data[i].time}
              </span> <span class="nome">${foi.data[i].from}
              </span> reservadamente para <span class ="todos">${foi.data[i].to}:
              </span> <span class="mensagem">${foi.data[i].text}
              </span></div>`
          }
    }

}
function deuRuim(){
    console.log('não foi');
}

function enviarMensagem () {
    let textDigitado = document.getElementById('textoDigitado').value;
    caixaTextoDigitado.text = textDigitado
    enviar = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', caixaTextoDigitado);
    enviar.then(renderizarMensagens);
    enviar.catch(recarregarSala);
}

function recarregarSala () {
    window.location.reload();
}
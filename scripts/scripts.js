axios.defaults.headers.common['Authorization'] = 'BSut5m20q7VmhDtxGHFWTdQI'
let nickname;
let requisicaoName;
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
let qtdeMensagem;

perguntarNome();
function perguntarNome () {
nickname = prompt('Qual o seu nome?');
nickObj.name = nickname;
caixaTextoDigitado.from = nickname;
requisicaoName = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickObj);
requisicaoName.then(nickAceito);
requisicaoName.catch(nickNaoAceito);

}


function nickAceito () {
    exibirMensagens();
    setInterval(atualizarStatus, 5000);
    setInterval(exibirMensagens, 3000);
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
    debugger
    let mensagem = document.querySelector('.mensagens');
    mensagem.innerHTML = '';
    qtdeMensagem = foi.data;
    for (let i = 0; i < qtdeMensagem.length; i++) {
        if (foi.data[i].type === 'status') {
          mensagem.innerHTML +=
            `<div class="status" data-test="message"><span class="hora">(${foi.data[i].time}) 
            </span> <span class="nome">${foi.data[i].from}
            </span> <span class="mensagem">${foi.data[i].text}
            </span></div>`
        }
        else if (foi.data[i].type === 'message') {
            mensagem.innerHTML +=
              `<div class="todos" data-test="message"><span class="hora">(${foi.data[i].time}) 
              </span> <span class="nome">${foi.data[i].from} 
              </span> <span class="mensagem">para 
              </span> <span class ="nome">${foi.data[i].to}:
              </span> <span class="mensagem">${foi.data[i].text}
              </span></div>`
          }
          else if (foi.data[i].type === 'private_message' &&
           ((foi.data[i].from === nickObj.name) ||
            (foi.data[i].to === nickObj.name))) {
            mensagem.innerHTML +=
              `<div class="privado" data-test="message"><span class="hora">(${foi.data[i].time}) 
              </span> <span class="nome">${foi.data[i].from}
              </span> <span class="mensagem"> reservadamente para 
              </span> <span class ="todos">${foi.data[i].to}:
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
    enviar.then((qualquer) => {
        console.log(qualquer);
        exibirMensagens ()});
    enviar.catch(recarregarSala);
    document.getElementById('textoDigitado').value = ""; 
}

function recarregarSala () {
    window.location.reload();
}
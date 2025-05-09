let equipes = [];
        let matchess = [];
        let cronometro;
        let tempoRestante = 10 * 60; 
        let cronometroPausado = false;

        function mostrarPrompt() {
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('customPrompt').style.display = 'block';
        }

        function mostrarPrompt2() {
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('customPrompt2').style.display = 'block';
        }

        function fecharPrompt() {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById('customPrompt').style.display = 'none';
            document.getElementById('customPrompt2').style.display = 'none';
        }

        function salvarEquipe() {
            const nomeEquipe = document.getElementById('nomeEquipe').value;
            const goleiro = document.getElementById('goleiro').value;
            const jogador1 = document.getElementById('jogador1').value;
            const jogador2 = document.getElementById('jogador2').value;
            const jogador3 = document.getElementById('jogador3').value;
            const jogador4 = document.getElementById('jogador4').value;
            const jogador5 = document.getElementById('jogador5').value;

            fetch("salvar_equipe.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(data)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                fecharPrompt(); // se quiser fechar após salvar
            })
            .catch(error => {
                console.error("Erro ao salvar:", error);
            });
        }


      function salvarTimesMatch() {
        const equipe1 = document.getElementById('eqp1').value; 
        const equipe2 = document.getElementById('eqp2').value; 
        const idSerie = document.querySelector('#id');

        if (equipe1 && equipe2) {
            matchess.push({ nomea: equipe1, nomeb: equipe2 }); 
            atualizarEquipes2(); 
            fecharPrompt(); 
            idSerie.innerHTML = ` ${gerarSerie()}`
        } else {
            alert("Por favor, preencha os nomes das duas equipes.");
        }
        iniciarPartida()
    }




        

    

        function atualizarEquipes() {
            const container = document.getElementById('equipes');
            container.innerHTML = '';
            equipes.forEach((equipe, index) => {
                const div = document.createElement('div');
                div.innerHTML = `<strong>Equipe ${index + 1}: ${equipe.nome}</strong> <br> Jogadores: ${equipe.jogadores.join(', ')}`;
                container.appendChild(div);
            });
            if (equipes.length > 0) {
                document.getElementById('iniciarPartidaBtn').style.display = 'block';
            }
        }

        function atualizarEquipes2() {
      
      const container = document.getElementById('matches');
      container.innerHTML = ''; 

      matchess.forEach((abc, index) => {
        const div = document.createElement('h2');
        div.innerHTML = `Partida: <strong>${abc.nomea}</strong>  VS <strong> ${abc.nomeb}</strong> `;
        container.appendChild(div);
       
      });

        
      if (matchess.length === 2) {
        document.getElementById('iniciarPartidaBtn').style.display = 'block';
      }
    }

    


    
        function salvarEquipeJogos() {
            const nomeEquipe = document.getElementById('nomeEquipe').value;
            const goleiro = document.getElementById('goleiro').value;
            const jogador1 = document.getElementById('jogador1').value;
            const jogador2 = document.getElementById('jogador2').value;
            const jogador3 = document.getElementById('jogador3').value;
            const jogador4 = document.getElementById('jogador4').value;
            const jogador5 = document.getElementById('jogador5').value;

            if (nomeEquipe && goleiro && jogador1 && jogador2 && jogador3 && jogador4 && jogador5) {
                const jogadores = [goleiro, jogador1, jogador2, jogador3, jogador4, jogador5];
                equipes.push({ nome: nomeEquipe, jogadores });
                atualizarEquipes();
                fecharPrompt();
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        }


        function iniciarPartida() {
            mostrarPrompt2()

            const confirmar = confirm("Deseja iniciar a partida?");
            if (confirmar) {
                alert("Partida Iniciada! O cronômetro começará a contar 10 minutos.");
                document.getElementById('cronometroDisplay').style.display = 'block';
                document.getElementById('pausarContinuarBtn').style.display = 'block';
                document.getElementById('encerrarPartidaBtn').style.display = 'block';
                iniciarCronometro();
            }
        }

        function iniciarCronometro() {
            cronometro = setInterval(function() {
                if (!cronometroPausado) {
                    if (tempoRestante <= 0) {
                        clearInterval(cronometro);
                        alert("Tempo esgotado! A partida terminou.");
                        document.getElementById('cronometroDisplay').innerHTML = 'Tempo: 00:00';
                    } else {
                        tempoRestante--;
                        const minutos = Math.floor(tempoRestante / 60);
                        const segundos = tempoRestante % 60;
                        document.getElementById('cronometroDisplay').innerHTML = `Tempo: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                    }
                }
            }, 1000);
            mostrarControlesPartida();
        }

        function pausarContinuarCronometro() {
            cronometroPausado = !cronometroPausado;
            document.getElementById('pausarContinuarBtn').textContent = cronometroPausado ? "Continuar" : "Pausar";
        }

        function mostrarControlesPartida() {
            adicionarBotoesAcao();
        }

        function adicionarBotoesAcao() {
            const assistenciaLog = document.getElementById('logAssistencia');
            assistenciaLog.innerHTML += '<br><select id="selectAssistencia"></select><button onclick="registrarAcao(\'assistência\', \'selectAssistencia\', \'logAssistencia\')">Registrar Assistência</button>';

            const golLog = document.getElementById('logGol');
            golLog.innerHTML += '<br><select id="selectGol"></select><button onclick="registrarAcao(\'gol\', \'selectGol\', \'logGol\')">Registrar Gol</button>';

            const cartaoLog = document.getElementById('logCartao');
            cartaoLog.innerHTML += `
                <br><select id="selectCartao"></select>
                <button onclick="registrarAcao('cartão amarelo', 'selectCartao', 'logCartao')">Registrar Cartão Amarelo</button>
                <button onclick="registrarAcao('cartão vermelho', 'selectCartao', 'logCartao')">Registrar Cartão Vermelho</button>
            `;

            const faltaLog = document.getElementById('logFalta');
            faltaLog.innerHTML += '<br><select id="selectFalta"></select><button onclick="registrarAcao(\'falta\', \'selectFalta\', \'logFalta\')">Registrar Falta</button>';
            atualizarSelects();
        }

        function atualizarSelects() {
            const jogadores = equipes.flatMap(equipe => equipe.jogadores.map(jogador => ({ equipe: equipe.nome, jogador })));

            const selectAssistencia = document.getElementById('selectAssistencia');
            const selectGol = document.getElementById('selectGol');
            const selectCartao = document.getElementById('selectCartao');
            const selectFalta = document.getElementById('selectFalta');

            jogadores.forEach(jogador => {
                const optionAssistencia = document.createElement('option');
                optionAssistencia.value = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                optionAssistencia.textContent = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                selectAssistencia.appendChild(optionAssistencia);

                const optionGol = document.createElement('option');
                optionGol.value = `Equipe: ${jogador.equipe} /  Jogador: ${jogador.jogador}`;
                optionGol.textContent = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                selectGol.appendChild(optionGol);

                const optionCartao = document.createElement('option'); 
                optionCartao.value = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                optionCartao.textContent = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                selectCartao.appendChild(optionCartao);

                const optionFalta = document.createElement('option');
                optionFalta.value = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                optionFalta.textContent = `Equipe: ${jogador.equipe}  /  Jogador: ${jogador.jogador}`;
                selectFalta.appendChild(optionFalta);
            });
        }


        function registrarAcao(acao, selectId, logId) {
    const select = document.getElementById(selectId);
    const jogadorSelecionado = select.value;
    const log = document.getElementById(logId);
    const tempoAtual = document.getElementById('cronometroDisplay').textContent;  
    const dataHoraD = new Date().getDate().toString().padStart(2, '0');
    const dataHoraM = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const dataHoraY = new Date().getFullYear(); 
    const equipe1 = document.getElementById('eqp1').value; 
    const equipe2 = document.getElementById('eqp2').value; 
    const idSerie = document.querySelector('#id');
    const placar1 = document.querySelector('.placar1');
    const placar2 = document.querySelector('.placar2');
    
    // if (jogadorSelecionado == equipe1) {
    //     placar1.textContent = parseInt(placar1.textContent) + 1
    // } else {
    //     placar2.textContent = parseInt(placar2.textContent) + 1
    // }

    const equipeSelecionada = jogadorSelecionado.split('/')[0].replace('Equipe: ', '').trim();

if (equipeSelecionada === equipe1) {
    placar1.textContent = parseInt(placar1.textContent) + 1;
} else if (equipeSelecionada === equipe2) {
    placar2.textContent = parseInt(placar2.textContent) + 1;
}


    log.innerHTML += `
    <br>
    <div class="textDiv">
    ${jogadorSelecionado} - ${acao} - ${dataHoraD}/${dataHoraM}/${dataHoraY}   -   ${tempoAtual} <br> <div>`;


    const logGeral = document.getElementById('logGeral');
    logGeral.innerHTML += `
    
  <br>
     <div class="textDiv">
    ${jogadorSelecionado} - ${acao} - ${dataHoraD}/${dataHoraM}/${dataHoraY}   -   ${tempoAtual} <br> <div>`;
}


     

        function encerrarPartida() {
            const logGeral = document.getElementById('logGeral').innerHTML;
            const matches = document.querySelector('#matches').innerHTML;
            const idSerie = document.querySelector('#id').innerHTML;

      
            const data = {
                content: `Partida encerrada! \n
                **Série:** ${idSerie}
                **Adversários:** ${matches}

                \n${logGeral} `
            };

     
            fetch('https://discord.com/api/webhooks/1362172203067768952/t1_06_CjloVhqmf1PMfx6DigfmE7K74rSiawB24CUq5aBcg-2RPHhyNTqQR8wT_zMQaO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert("Logs enviadas");
                } else {
                    alert("Erro");
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            })
            .finally(() => {
                
                resetarPartida();
            });
        }

        function resetarPartida() {
            document.getElementById('equipes').innerHTML = '';
            document.getElementById('id').innerHTML = '';
            document.getElementById('matches').innerHTML = '';
            document.getElementById('logAssistencia').innerHTML = 'Logs de Assistências';
            document.getElementById('logGol').innerHTML = 'Logs de Gols';
            document.getElementById('logCartao').innerHTML = 'Logs de Cartões';
            document.getElementById('logFalta').innerHTML = 'Logs de Faltas';
            document.getElementById('logGeral').innerHTML = 'Log Geral de Ações';

            
            equipes = [];
            matchess = [];
            tempoRestante = 10 * 60; 
            cronometroPausado = false;

           
            document.getElementById('cronometroDisplay').style.display = 'none';
            document.getElementById('pausarContinuarBtn').style.display = 'none';
            document.getElementById('encerrarPartidaBtn').style.display = 'none';
            document.getElementById('iniciarPartidaBtn').style.display = 'none';

            alert("A partida foi reiniciada");
        }

        function gerarSerie() {
            const numeros = '0123456789'
            const letrasMin = 'abcdefghijklmnopqrstuvwxyz'
            const letrasMai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

            let id = '#'

            for (let i = 0; i < 3; i++) {
                id += numeros[Math.floor(Math.random() * numeros.length)];
            }
            id += letrasMin[Math.floor(Math.random() * letrasMin.length)];

            id += letrasMai[Math.floor(Math.random() * letrasMai.length)];
          
            id += numeros[Math.floor(Math.random() * numeros.length)];
          
            id += letrasMin[Math.floor(Math.random() * letrasMin.length)];
          
            for (let i = 0; i < 3; i++) {
              id += numeros[Math.floor(Math.random() * numeros.length)];
            }
          
            return id;
          }
        

          function toggleMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
        }
        
        function togglePages(indexId) {
            document.querySelectorAll(".page").forEach(indexId => indexId.classList.remove("active"))
            document.getElementById(indexId).classList.add("active")
        }


        const partidasEncerradas = [
            {
              id: 'ABC123',
              timeA: 'Time Azul',
              timeB: 'Time Vermelho',
              placar: '3 x 2',
              logs: [
                { tipo: 'gol', descricao: 'Gol de João aos 5min' },
                { tipo: 'falta', descricao: 'Falta de Carlos aos 12min' },
                { tipo: 'gol', descricao: 'Gol de Pedro aos 18min' },
                { tipo: 'cartao', descricao: 'Cartão amarelo para Lucas aos 25min' },
                { tipo: 'falta', descricao: 'Falta de Marcos aos 33min' },
              ]
            },
            {
              id: 'XYZ789',
              timeA: 'Time Verde',
              timeB: 'Time Amarelo',
              placar: '1 x 1',
              logs: [
                { tipo: 'gol', descricao: 'Gol de Ana aos 8min' },
                { tipo: 'cartao', descricao: 'Cartão vermelho para Diego aos 45min' },
              ]
            }
          ];
          
          function carregarPartidas() {
            const container = document.getElementById('history-modal');
            container.innerHTML = '';
          
            partidasEncerradas.forEach(partida => {
              const card = document.createElement('div');
              card.className = 'partida-card';
              card.innerHTML = `
                <h3>${partida.timeA} vs ${partida.timeB}</h3>
                <p>Placar: ${partida.placar}</p>
                <p>Série: ${partida.id}</p>
                <button onclick="abrirHistorico('${partida.id}')">Ver Histórico</button>
              `;
              container.appendChild(card);
            });
          }
          
          let logsAtuais = [];
          
          function abrirHistorico(id) {
            const partida = partidasEncerradas.find(p => p.id === id);
            logsAtuais = partida.logs;
          
            document.getElementById('historicoModal').classList.remove('hidden');
            mostrarLogs('todos');
          }
          
          function mostrarLogs(tipo) {
            const container = document.getElementById('logContainer');
            container.innerHTML = '';
          
            const filtrados = tipo === 'todos' ? logsAtuais : logsAtuais.filter(log => log.tipo === tipo);
          
            if (filtrados.length === 0) {
              container.innerHTML = '<p>Nenhum log encontrado.</p>';
              return;
            }
          
            filtrados.forEach(log => {
              const p = document.createElement('p');
              p.textContent = log.descricao;
              container.appendChild(p);
            });
          }
          
          function filtrarLogs(tipo) {
            mostrarLogs(tipo);
          }
          
          function fecharHistorico() {
            document.getElementById('historicoModal').classList.add('hidden');
          }
          
          carregarPartidas();
          
          


<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gerenciador de Campeonato</title>
  <link rel="stylesheet" href="style.css?v=1">

  <link rel="stylesheet" href="style2.css" />
</head>
<body>
  <header class="header">
    <h1 class="logo">Gerenciador</h1>
    <nav class="nav">
      <div class="navLinks">
        <a href="#" onclick="togglePages('first')">Início</a>
        <a href="#" onclick="togglePages('second')">Histórico</a>
        <a href="#">Contato</a>
      </div>
      <div class="menu-icon" onclick="toggleMenu()">☰</div>
    </nav>
  </header>


  <div class="all page active" id="first">
    <h1 class="titleA">Gerenciador de Informações</h1>
    <h1 class="placar"><div class="placar1">0</div>x <div class="placar2">0</div></h1>
    <h2 id="id"></h2>
    <button onclick="mostrarPrompt()">Criar Equipe</button>
    <h2 id="matches"></h2>
    <div id="equipes"></div>
    
    <button id="iniciarPartidaBtn" style="display:none;" onclick="mostrarPrompt2()">Iniciar Partida</button>
    
    <div class="cronometro" id="cronometroDisplay" style="display:none;">Tempo: 10:00</div>
    <button id="pausarContinuarBtn" style="display:none;" onclick="pausarContinuarCronometro()">Pausar</button>
    <button id="encerrarPartidaBtn" style="display:none;" onclick="encerrarPartida()">Encerrar Partida</button>

    <div class="boxes">
        <div class="log log-assistencia" id="logAssistencia"><h3>Logs de Assistências</h3></div>
        <div class="log log-gol" id="logGol"><h3>Logs de Gols</h3></div>
        <div class="log log-cartao" id="logCartao"><h3>Logs de Cartões</h3></div>
        <div class="log log-falta" id="logFalta"><h3>Logs de Faltas</h3></div>
    </div>

   
    <div class="log-geral" id="logGeral"><h3>Log Geral de Ações</h3></div>

  
    <div id="overlay"></div>
    <div class="custom-prompt" id="customPrompt">
        <h3>Insira os dados da equipe</h3>
        <input type="text" id="nomeEquipe" placeholder="Nome da equipe" required>
        <input type="text" id="goleiro" placeholder="Nome do goleiro" required>
        <input type="text" id="jogador1" placeholder="Nome do jogador 1" required>
        <input type="text" id="jogador2" placeholder="Nome do jogador 2" required>
        <input type="text" id="jogador3" placeholder="Nome do jogador 3" required>
        <input type="text" id="jogador4" placeholder="Nome do jogador 4" required>
        <input type="text" id="jogador5" placeholder="Nome do jogador 5" required>
        <button onclick="salvarEquipe()">Salvar</button>
        <button  onclick="fecharPrompt();">Fechar</button>
    </div>

    <div class="custom-prompt2" id="customPrompt2">
        <h3>Insira os dados da equipe</h3>
        <input type="text" id="eqp1" placeholder="EQUIPE 1" required>
        <h1 id="versus">X</h1>
        <input type="text" id="eqp2" placeholder="EQUIPE 2" required>

        <button onclick="salvarTimesMatch()">Salvar</button>
        <button onclick="fecharPrompt()">Fechar</button>
    </div>
</div>




  <div class="container">
    <h1 class="titulo">🏆 Gerenciador de Campeonato</h1>

    <div class="page active" id="create">
      <!-- Equipe -->
      <div class="card">
        <div class="card-header">Cadastrar Equipe</div>
        <div class="card-body">
          <form id="formEquipe">
            <label for="nomeEquipe">Nome da Equipe</label>
            <input type="text" id="nomeEquipe" required />

            <label>Jogadores</label>
            <input type="text" id="goleiro" placeholder="Goleiro" required />
            <input type="text" id="jogador1" placeholder="Jogador 1" required />
            <input type="text" id="jogador2" placeholder="Jogador 2" required />
            <input type="text" id="jogador3" placeholder="Jogador 3" required />
            <input type="text" id="jogador4" placeholder="Jogador 4" required />
            <input type="text" id="jogador5" placeholder="Jogador 5" required />

            <button type="submit" class="btn primary">Salvar Equipe</button>
          </form>
        </div>
      </div>

      <!-- Partida -->
      <div class="card">
        <div class="card-header">Cadastrar Partida</div>
        <div class="card-body">
          <form id="formPartida">
            <div class="row">
              <div class="col">
                <label for="equipe1">Equipe 1</label>
                <select id="equipe1" required></select>
              </div>
              <div class="col">
                <label for="equipe2">Equipe 2</label>
                <select id="equipe2" required></select>
              </div>
            </div>
            <button type="submit" class="btn success">Cadastrar Partida</button>
          </form>
        </div>
      </div>

      <!-- Listagem -->
      <div class="card">
        <div class="card-header">Equipes Cadastradas</div>
        <div class="card-body" id="">
          <!-- Aqui você insere os dados com PHP -->
        </div>
      </div>

      <div class="card">
        <div class="card-header">Partidas Cadastradas</div>
        <div class="card-body" id="partidas"></div>
      </div>
    </div>
  </div>

  <div class="container page" id="second">
    <div class="gridDisplay">
    <div class="matchesBox">
      <div class="infos">
      <p class="data" style="color: #ccc;">23/04/2025</p>
      <h4 class="serieDisplay">Série: <span style="color: rgb(89, 89, 255)">#123456789</span></h4>
      <h3 class="matchTeams">TIME A X TIME B</h3>
    </div>
      <h1 class="matchTeams" style="color: beige; text-align: center; margin-left: 100px;">0X0</h1>
      <div class="seeLogBtn"><button>VER LOGS</button></div>
    </div>
</div>
    
  </div>

  <script src="script.js"></script>
  <script src="script2.js"></script>
  <script>
    function togglePages(itemId) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
      document.getElementById(itemId).classList.add('active')
    }
  </script>
</body>
</html>

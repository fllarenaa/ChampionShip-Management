document.addEventListener('DOMContentLoaded', () => {
    listarEquipes();
    listarPartidas();
  
    document.getElementById('formEquipe').addEventListener('submit', e => {
      e.preventDefault();
      salvarEquipe();
    });
  
    document.getElementById('formPartida').addEventListener('submit', e => {
      e.preventDefault();
      salvarPartida();
    });
  });
  
  function salvarEquipe() {
    const equipe = {
      nome: document.getElementById('nomeEquipe').value,
      jogadores: [
        document.getElementById('goleiro').value,
        document.getElementById('jogador1').value,
        document.getElementById('jogador2').value,
        document.getElementById('jogador3').value,
        document.getElementById('jogador4').value,
        document.getElementById('jogador5').value
      ]
    };
  
    fetch('salvar_equipe.php', {
      method: 'POST',
      body: JSON.stringify(equipe)
    }).then(res => res.json())
      .then(() => {
        alert("Equipe cadastrada com sucesso!");
        document.getElementById('formEquipe').reset();
        listarEquipes();
      });
  }
  
  function listarEquipes() {
    fetch('listar_equipes.php')
      .then(res => res.json())
      .then(data => {
        const equipesDiv = document.getElementById('equipes');
        const equipe1Select = document.getElementById('equipe1');
        const equipe2Select = document.getElementById('equipe2');
  
        equipesDiv.innerHTML = '';
        equipe1Select.innerHTML = '<option value="">Selecione</option>';
        equipe2Select.innerHTML = '<option value="">Selecione</option>';
  
        data.forEach(equipe => {
          equipesDiv.innerHTML += `
            <div class="equipesBox">
              <strong>${equipe.nome}</strong><br/>
              Jogadores: ${equipe.jogadores}
            </div>
          `;
  
          const opt1 = document.createElement('option');
          opt1.value = equipe.id;
          opt1.textContent = equipe.nome;
          equipe1Select.appendChild(opt1);
  
          const opt2 = opt1.cloneNode(true);
          equipe2Select.appendChild(opt2);
        });
      });
  }
  
  function salvarPartida() {
    const equipe1 = document.getElementById('equipe1').value;
    const equipe2 = document.getElementById('equipe2').value;
  
    if (equipe1 === equipe2) {
      alert("As equipes devem ser diferentes!");
      return;
    }
  
    fetch('salvar_partida.php', {
      method: 'POST',
      body: JSON.stringify({ equipe1, equipe2 })
    }).then(res => res.json())
      .then(() => {
        alert("Partida cadastrada com sucesso!");
        document.getElementById('formPartida').reset();
        listarPartidas();
      });
  }
  
  function listarPartidas() {
    fetch('listar_partidas.php')
      .then(res => res.json())
      .then(data => {
        const partidasDiv = document.getElementById('partidas');
        partidasDiv.innerHTML = '';
  
        data.forEach(partida => {
          partidasDiv.innerHTML += `
            <div class="mb-2 equipesBox">
              <strong>${partida.equipe1} vs ${partida.equipe2}</strong><br/>
              Data: ${new Date(partida.data).toLocaleString()}
            </div>
          `;
        });
      });
  }
  

  
  function toggleMenu() {
    const navLinks = document.querySelector('.navLinks');
    navLinks.classList.toggle('show');
}

function tooglePages(itemId) {
    document.querySelectorAll('.page').forEach(itemId => itemId.classList.add('active'))
    document.getElementById(itemId).classList.add('active')
}
window.onload = function () {
  document.getElementById("game").style.visibility = "hidden";
};

function Jogador(nome, forma) {
  this.nome = nome;
  this.forma = forma;
}

let jogador1, jogador2;
let jogadorAtual;
let formas = ["x", "o"];
let tabuleiro = Array(9).fill(undefined);

function initGame() {
  
  const nomeJogador1 = document.getElementById("jogador1").value;
  const nomeJogador2 = document.getElementById("jogador2").value;

  if (!nomeJogador1 || !nomeJogador2) {
    alert("Por favor, insira o nome dos dois jogadores.");
    return;
  }

  jogador1 = new Jogador(nomeJogador1, 0); // X
  jogador2 = new Jogador(nomeJogador2, 1); // O
  jogadorAtual = jogador1;
  setLabelJogadorAtual();

  document.getElementById("game").style.visibility = "visible";

  document.querySelectorAll("#game table td").forEach((cell, index) => {
    cell.innerHTML = "&nbsp;";
    cell.onclick = () => setOnCeil(cell, index);
  });
  reset();
}

function reset() {
  tabuleiro.fill(undefined);
  jogadorAtual = jogador1;
  setLabelJogadorAtual();
  document.querySelectorAll("#game table td").forEach((cell) => {
    cell.innerHTML = "&nbsp;";
  });
}

function setLabelJogadorAtual() {
  document.getElementById("jogadorAtual").innerText =
    "Jogador atual: " + jogadorAtual.nome;
}

function verificarVencedor() {
  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (
      tabuleiro[a] &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[a] === tabuleiro[c]
    ) {
      // Pop-up de vitória com jogador correto
      setTimeout(() => {
        alert(`${jogadorAtual.nome} venceu!`);
        reset();
      }, 100);
      return true; // Vitória encontrada
    }
  }

  if (tabuleiro.every((val) => val !== undefined)) {
    // Pop-up de empate
    setTimeout(() => {
      alert("Empate! Tentem novamente.");
      reset();
    }, 100);
    return true; // Empate
  }

  return false; // Nenhum vencedor ainda
}

function setOnCeil(cel, pos) {
  if (!tabuleiro[pos]) {
    tabuleiro[pos] = formas[jogadorAtual.forma];
    cel.innerHTML = formas[jogadorAtual.forma];

    if (!verificarVencedor()) {
      // Alterne o jogador se não houve vitória ou empate
      jogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1;
      setLabelJogadorAtual();
    }
  } else {
    alert("Essa célula já está marcada!");
  }
}

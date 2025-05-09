<?php 
// Capturar os dados do POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include_once('conexao.php');
    $nomeEquipe = $_POST['nomeEquipe'] ?? '';
    $goleiro = $_POST['goleiro'] ?? '';
    $jogador1 = $_POST['jogador1'] ?? '';
    $jogador2 = $_POST['jogador2'] ?? '';
    $jogador3 = $_POST['jogador3'] ?? '';
    $jogador4 = $_POST['jogador4'] ?? '';
    $jogador5 = $_POST['jogador5'] ?? '';

    // Inserir no banco de dados
    $sql = "INSERT INTO equipes (equipenome, goleiro, jogador1, jogador2, jogador3, jogador4, jogador5)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $nomeEquipe, $goleiro, $jogador1, $jogador2, $jogador3, $jogador4, $jogador5);

    if ($stmt->execute()) {
        echo "Equipe salva com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
r
?>
?>

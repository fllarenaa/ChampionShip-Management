<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "nome_do_banco"; // Substitua pelo seu

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Erro: " . $conn->connect_error);
}

$tempo = $_POST['tempo'];
$data = $_POST['data'];
$acao = $_POST['acao'];
$jogador = $_POST['jogador'];
$equipe = $_POST['equipe'];
$partida_id = $_POST['partida_id'];

$stmt = $conn->prepare("INSERT INTO logs_partida (tempo_cronometro, data_evento, tipo_acao, jogador, equipe, partida_id) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssi", $tempo, $data, $acao, $jogador, $equipe, $partida_id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Erro ao salvar log.";
}
$stmt->close();
$conn->close();
?>

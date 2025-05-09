<?php
require 'conexao.php';

$data = json_decode(file_get_contents("php://input"), true);
$equipe1 = $data['equipe1'];
$equipe2 = $data['equipe2'];

$stmt = $pdo->prepare("INSERT INTO partidas (equipe1_id, equipe2_id) VALUES (?, ?)");
$stmt->execute([$equipe1, $equipe2]);

echo json_encode(["status" => "ok"]);

<?php
require 'conexao.php';

$equipes = [];
$sql = "SELECT e.id, e.nome, GROUP_CONCAT(j.nome ORDER BY j.id SEPARATOR ', ') AS jogadores
        FROM equipes e
        LEFT JOIN jogadores j ON e.id = j.equipe_id
        GROUP BY e.id";
$result = $pdo->query($sql);

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $equipes[] = $row;
}

echo json_encode($equipes);

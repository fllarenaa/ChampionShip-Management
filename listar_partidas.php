<?php
require 'conexao.php';

$sql = "SELECT p.id, e1.nome AS equipe1, e2.nome AS equipe2, p.data 
        FROM partidas p
        JOIN equipes e1 ON p.equipe1_id = e1.id
        JOIN equipes e2 ON p.equipe2_id = e2.id";
$result = $pdo->query($sql);

$partidas = $result->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($partidas);

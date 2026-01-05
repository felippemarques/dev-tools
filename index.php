<?php
// info.php
header('Content-Type: application/json');

$dados = [
    "status" => "Sucesso",
    "mensagem" => "O PHP está rodando corretamente na tua VPS!",
    "versao_php" => phpversion(),
    "data_servidor" => date('Y-m-d H:i:s')
];

echo json_encode($dados, JSON_PRETTY_PRINT);
?>
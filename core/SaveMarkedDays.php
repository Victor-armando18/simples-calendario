<?php

header('Content-Type: text/plain');

require_once __DIR__.'/MarkedDaysManager.php';

$requestDay = file_get_contents('php://input');
$markedDaysManager = new MarkedDaysManager();
$markedDayNotSaved = !$markedDaysManager->saveDays($requestDay);

if ($markedDayNotSaved) {
    http_response_code(400);
    echo "Erro ao salvar os dados. Verifique o formato enviado.";
    exit;
}

echo "Dados salvos com sucesso!";


?>
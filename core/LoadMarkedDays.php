<?php

header('Content-Type: application/json');

require_once __DIR__.'/MarkedDaysManager.php';

$databaseFileManager = new MarkedDaysManager();
$markedDates = $databaseFileManager->loadDays();

echo json_encode($markedDates);

?>
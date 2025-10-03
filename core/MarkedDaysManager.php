<?php

require_once __DIR__."/Database.php";

/**
 *  Esta classe é responsável por gerenciar a leitura e gravação de dias marcados em um arquivo em memória {JSON}. 
 * 
 **/

class MarkedDaysManager {


    /**
     * Este método/função é responsável por carregar as datas marcadas no arquivo {JSON}.
     * Verifica se o arquivo existe e é válido antes de tentar ler.
     * @return array Um array de strings com as datas marcadas (YYYY-MM-DD),
     * ou um array vazio se o arquivo não existir, estiver vazio ou for inválido.
     */
    public function loadDays(): array {

        if ($this->isMarkedDaysFileMissingOrEmpty()) return [];

        $storedDays = file_get_contents(DB_PATH);
        return $this->decodeJson($storedDays);
    }


    /**
     * Este método/função salva as datas marcadas no arquivo {JSON}.
     * Recebe a string JSON bruta do frontend, valida e persiste.
     * @param string $requestedDays A string JSON contendo o array de datas a serem salvas.
     * @return bool True se os dados foram salvos com sucesso, false caso contrário.
     */
    public function saveDays(string $requestedDays): bool {

        if($this->isMarkedDaysFileMissingOrEmpty()) return false;

        $daysToBeSaved = $this->decodeJson($requestedDays);
        $requestedDaysIsInvalid = empty($daysToBeSaved) && $requestedDays !== '[]';

        if ($requestedDaysIsInvalid)  return false;

        $days = json_encode($daysToBeSaved, JSON_PRETTY_PRINT);
        $savedDays = file_put_contents(DB_PATH, $days, LOCK_EX);

        return $savedDays !== false;
    }


    private function isMarkedDaysFileMissingOrEmpty() {
        return !(file_exists(DB_PATH) && filesize(DB_PATH) > 0);
    }

    private function decodeJson($jsonString): array {
        $data = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) return [];
        
        return $data;
    }
}

?>
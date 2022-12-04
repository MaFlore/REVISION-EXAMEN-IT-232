<?php
require('connexion.php');

header("Content-Type: text/plain; charset=utf-8");
header("Cache-Control: no-cache . private");
header("Pragma: no-cache");
sleep(2);

$code = $_REQUEST['code'];
$libelle = $_REQUEST['libelle'];

$reponse_serveur = $code.':'.$libelle;

echo $reponse_serveur;

$faculte = $bdd->prepare('INSERT INTO faculte(code, libelle) VALUES(:code, :libelle)');
$faculte->execute([
        'code' => $code,
        'libelle' => $libelle,
]);
?>
function creationObjetXMLHttpRequest() {
    var resultat = null;
    try {
        resultat = new XMLHttpRequest();
    } catch (error) {
        try {
            resultat = new ActiveXObject("Msxlm2.XMLHTTP");
        } catch (error) {
            try {
                resultat = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (error) {
                resultat = null;
            }
        }
    }
    return resultat;
}

function enregistrer() {
    var code = document.getElementById('code').value;
    var libelle = document.getElementById('libelle').value;

    if (code == "" || libelle == "") {
        alert('Veuillez remplir les deux champs !');
    } else {

        var parametres = "code=" + code + "&libelle=" + libelle;

        objetXMLHttpRequest = creationObjetXMLHttpRequest();

        objetXMLHttpRequest.open('post', 'enregistrement.php', true);

        objetXMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        objetXMLHttpRequest.onreadystatechange = fonctionDeRappel;

        document.getElementById('button').disabled = true;
        document.getElementById('formulaire').style.visibility = "hidden";
        document.getElementById('reponse').style.visibility = "hidden";
        document.getElementById('requete').style.visibility = "visible";
        document.getElementById('message').style.visibility = "hidden";

        objetXMLHttpRequest.send(parametres);
    }
}

function fonctionDeRappel() {

    if (objetXMLHttpRequest.readyState == 4) {

        if (objetXMLHttpRequest.status == 200) {
            reponseServeur = objetXMLHttpRequest.responseText;
            nouvelleReponse = reponseServeur.split(':');
            var code = decodeURI(nouvelleReponse[0]);
            var libelle = decodeURI(nouvelleReponse[1]);

            document.getElementById('reponse').style.visibility = "visible";
            document.getElementById('requete').style.visibility = "hidden";
            document.getElementById('formulaire').style.visibility = "visible";
            document.getElementById('button').disabled = false;
            document.getElementById('reponseCode').innerHTML = code;
            document.getElementById('reponseLibelle').innerHTML = libelle;
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').innerText = "Enregistrement effectué avec succès";
        }
    }
}
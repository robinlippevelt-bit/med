export const CHARGES = [
    { id: 'c1', label: 'Conduite dangereuse', fine: 1500 },
    { id: 'c2', label: 'Conduite sans permis', fine: 2500 },
    { id: 'c3', label: 'Dissimulation du visage', fine: 1000 },
    { id: 'c4', label: 'Excès de vitesse de 10 à 30 km/h', fine: 500 },
    { id: 'c5', label: 'Excès de vitesse grave de 30 à 50km/h', fine: 1500 },
    { id: 'c6', label: 'Excès de vitesse lourd +70km/h', fine: 3500 },
    { id: 'c7', label: 'Non respect du feu rouge', fine: 750 },
    { id: 'c8', label: 'Stationnement gênant ou interdit', fine: 250 },
    { id: 'c9', label: "Refus d'obtempérer", fine: 7500 },
    { id: 'c10', label: "Course poursuite avec les forces de l'ordre", fine: 15000 },
    { id: 'c11', label: 'Délit de fuite', fine: 5000 },
    { id: 'c12', label: "Mise en danger d'autrui", fine: 5000 },
    { id: 'c13', label: "Outrage à un agent de l'état", fine: 2500 },
    { id: 'c14', label: "Outrage à haut fonctionne d'état ou magistrat", fine: 7500 },
    { id: 'c15', label: 'Intimidation/Chantage envers Magistrat', fine: 25000 },
    { id: 'c16', label: 'Menace de mort envers agent', fine: 15000 },
    { id: 'c17', label: "Rébellion lors d'une interpellation", fine: 5000 },
    { id: 'c18', label: "Possession illégale d'arme - cat A (arme de poing)", fine: 25000 },
    { id: 'c19', label: "Possession illégale d'arme - cat B (fusil)", fine: 45000 },
    { id: 'c20', label: "Possession illégale d'arme - cat C (fusil d'assaut)", fine: 75000 },
    { id: 'c21', label: "Possession de chargeurs d'armes sans PPA", fine: 5000 },
    { id: 'c22', label: "Port d'arme blanche", fine: 1500 },
    { id: 'c23', label: 'Implication dans une fusillade', fine: 50000 },
    { id: 'c24', label: 'Tentative de meurtre', fine: 75000 },
    { id: 'c25', label: 'Tentative de meurtre sur agent', fine: 150000 },
    { id: 'c26', label: 'Possession de stupéfiants', fine: 3500 },
    { id: 'c27', label: 'Vente de stupéfiants', fine: 15000 },
    { id: 'c28', label: 'Trafic de stupéfiants en bande organisée', fine: 50000 },
    { id: 'c29', label: 'Production de stupéfiants', fine: 25000 },
    { id: 'c30', label: "Vol à l'arraché", fine: 5000 },
    { id: 'c31', label: 'Vol à main armée', fine: 25000 },
    { id: 'c32', label: 'Vandalisme/Braquage ATM', fine: 15000 },
    { id: 'c33', label: 'Braquage de supérette', fine: 35000 },
    { id: 'c34', label: 'Braquage de Banque Fleeca', fine: 100000 },
    { id: 'c35', label: 'Braquage Pacific Bank', fine: 250000 },
    { id: 'c36', label: 'Vol de véhicule', fine: 7500 },
    { id: 'c37', label: 'Possession de billets non tracés (-10000$)', fine: 5000 },
    { id: 'c38', label: 'Possession de billets non tracés (+10000$)', fine: 15000 },
    { id: 'c39', label: "Blanchiment d'argent", fine: 25000 },
    { id: 'c40', label: 'Agression sur civil', fine: 5000 },
    { id: 'c41', label: 'Coups et blessures volontaires', fine: 7500 },
    { id: 'c42', label: "Prise d'otage", fine: 35000 },
    { id: 'c43', label: "Prise d'otage sur agent de l'état", fine: 75000 },
    { id: 'c44', label: 'Séquestration', fine: 15000 },
    { id: 'c45', label: 'Dégradation de véhicule', fine: 1500 },
    { id: 'c46', label: 'Dégradation de bien public', fine: 2500 },
    { id: 'c47', label: 'Recel de véhicule volé', fine: 10000 },
    { id: 'c48', label: 'Évasion', fine: 25000 },
    { id: 'c49', label: 'Complicité', fine: 5000 },
    { id: 'c50', label: 'Braquage de conteneur', fine: 45000 },
];
// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────
function unit(d) {
    return `L'${d.adam || 'Adam XX'}, composée des agents ${d.unites || 'XX et XX'}`;
}
function suspect(d) {
    return d.suspect || '[NOM]';
}
function lieu(d) {
    return d.lieu || '[LIEU]';
}
function protocoleBraquage(d, label) {
    if (d.antecedents_braquage === 'Inférieur ou égal à 2') {
        return `Après vérification du casier, l'individu présente un nombre d'antécédents inférieur ou égal à 2 pour ${label}. Le dossier ne relève donc pas d'un rapport MED : il doit être traité en protocole et l'agent doit être redirigé vers la procédure classique.`;
    }
    return `Après vérification du casier, l'individu est en récidive pour ${label}. Le dossier relève donc d'un rapport MED.`;
}
// ─── COMMON PROCEDURE (Steps 5-14) ───────────────────────────────────
export function generateProcedure(d) {
    const parts = [];
    const poste = d.poste || 'Mission Row';
    // 5. Transport
    parts.push(`L'individu a été menotté et placé à l'arrière du véhicule de service, puis conduit au poste de ${poste} pour la suite de la procédure.`);
    // 6. Miranda
    const mirandaOpt = d.miranda || 'compris_acceptes';
    if (mirandaOpt === 'compris_acceptes') {
        parts.push(`À son arrivée au poste, les droits Miranda lui ont été lus et expliqués dans leur intégralité. L'individu a confirmé les avoir compris et acceptés.`);
    }
    else if (mirandaOpt === 'compris_pas_utiliser') {
        parts.push(`À son arrivée au poste, les droits Miranda lui ont été lus et expliqués dans leur intégralité. L'individu a confirmé les avoir compris, et il a décidé de ne pas utiliser ses droits.`);
    }
    else if (mirandaOpt === 'compris_silence') {
        parts.push(`À son arrivée au poste, les droits Miranda lui ont été lus et expliqués dans leur intégralité. L'individu a confirmé les avoir compris mais a choisi de garder le silence.`);
    }
    else {
        parts.push(`L'urgence de la situation n'a pas permis la lecture immédiate des droits Miranda. Ceux-ci lui seront notifiés dès que son état le permettra.`);
    }
    // 7. Demandes
    const demands = [];
    if (d.demande_boire_manger === 'Oui')
        demands.push('boire et manger');
    if (d.demande_avocat === 'Oui')
        demands.push('un avocat');
    if (d.demande_soins === 'Oui')
        demands.push('des soins médicaux');
    if (demands.length > 0) {
        parts.push(`L'individu a fait valoir son droit à ${demands.join(', ')}. ${demands.length === 1 ? 'Sa demande a' : 'Ses demandes ont'} été ${demands.length === 1 ? 'prise' : 'prises'} en compte et ${demands.length === 1 ? 'satisfaite' : 'satisfaites'} dans les meilleurs délais.`);
    }
    else {
        parts.push(`L'individu n'a formulé aucune demande particulière.`);
    }
    // 8. Fouille
    const items = (d.fouille || '').split('\n').map(s => s.trim()).filter(Boolean);
    if (items.length > 0) {
        parts.push(`Une fouille complète a ensuite été réalisée, ce qui a permis la saisie des objets suivants :\n\n${items.join('\n\n')}`);
    }
    else {
        parts.push(`Une fouille complète a ensuite été réalisée ; aucun objet illicite n'a été retrouvé sur lui.`);
    }
    // 9. Mugshot
    parts.push(`L'individu a ensuite été emmené en salle de mugshot pour déposer ses effets personnels et pour une prise de photo d'identité judiciaire.`);
    // 10. Cellule
    const cellWait = [];
    if (d.demande_avocat === 'Oui')
        cellWait.push("d'un avocat");
    if (d.procureur_present === 'Oui')
        cellWait.push('du procureur');
    else
        cellWait.push("d'un membre de l'état-major");
    parts.push(`L'individu a ensuite été placé en cellule ${cellWait.length > 0 ? `dans l'attente ${cellWait.join(' et ')}` : 'pour rédaction de procédure'}.`);
    // 11. Avocat + Procureur
    if (d.demande_avocat === 'Oui' && d.nom_avocat) {
        parts.push(`Maître ${d.nom_avocat} s'est présenté au poste pour assurer la défense de son client.`);
    }
    if (d.procureur_present === 'Oui' && d.nom_procureur) {
        parts.push(`Le procureur ${d.nom_procureur} a été contacté et s'est présenté au poste pour statuer sur l'affaire.`);
    }
    else if (d.procureur_present === 'Non') {
        parts.push(`Aucun procureur n'étant disponible, la situation a été remontée à ${d.nom_etat_major ? `un membre de l'état-major, ${d.nom_etat_major}` : "un membre de l'état-major"}, afin d'obtenir la conduite à tenir.`);
    }
    // 12. Décision
    const montant = d.montant_final || '0';
    const dt = d.decision_type || 'amende_directe';
    if (dt === 'accord' && d.nom_procureur && d.nom_avocat) {
        parts.push(`Après concertation entre le procureur ${d.nom_procureur} et Maître ${d.nom_avocat}, un accord a été trouvé. L'individu écope d'une amende de $${montant}.`);
    }
    else if (dt === 'procureur_seul' && d.nom_procureur) {
        parts.push(`Le procureur ${d.nom_procureur} a statué sur l'affaire et a fixé l'amende à $${montant}.`);
    }
    else if (dt === 'etat_major') {
        parts.push(`${d.nom_etat_major ? d.nom_etat_major : "Le membre de l'état-major référent"} a validé la conduite à tenir et a fixé l'amende à $${montant}.`);
    }
    else if (dt === 'caution') {
        parts.push(`Une caution de $${montant} a été fixée pour la libération de l'individu.`);
    }
    else if (dt === 'bracelet') {
        parts.push(`L'individu a été placé sous bracelet électronique pour régler cette affaire ultérieurement.`);
    }
    else if (dt === 'prison') {
        parts.push(`L'individu a été condamné à une peine d'emprisonnement et reste en détention.`);
    }
    else {
        parts.push(`L'amende a été fixée à $${montant}.`);
    }
    // 13-14. Sortie
    const libere = d.libere || 'Oui';
    if (libere === 'Oui') {
        parts.push(`L'individu a réglé la somme due. Il a récupéré ses effets personnels puis a quitté le poste de ${poste} à ${d.heure_sortie || '[HEURE]'}.`);
    }
    else if (libere === 'Bracelet') {
        parts.push(`L'individu a été libéré sous bracelet électronique. Il a récupéré ses effets personnels puis a quitté le poste de ${poste} à ${d.heure_sortie || '[HEURE]'}.`);
    }
    else {
        parts.push(`L'individu reste en détention au poste de ${poste} dans l'attente de son jugement.`);
    }
    return parts.join('\n\n');
}
// ─── ALL 18 INCIDENTS ─────────────────────────────────────────────────
export const INCIDENTS = {
    // ═══════════════════════════════════════════════════════════════
    // 1. FUSILLADE
    // ═══════════════════════════════════════════════════════════════
    fusillade: {
        id: 'fusillade',
        label: 'Fusillade',
        defaultCharges: ['c23', 'c18'],
        contextFields: [
            { key: 'arme_type', label: "Type d'arme saisie", type: 'text', placeholder: 'Ex: arme de poing type S20', half: true },
            { key: 'munitions', label: 'Munitions saisies', type: 'text', placeholder: 'Ex: 44 balles de 9mm', half: true },
            { key: 'nb_blesses', label: 'Nombre de personnes au sol', type: 'text', placeholder: 'Ex: plusieurs', half: true },
            { key: 'casier_info', label: 'Antécédents casier', type: 'select', options: ['Première fois', 'Deux fois', 'Multiples fois'], defaultValue: 'Deux fois', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, sommes intervenue à la suite d'une fusillade sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée sur les lieux, ${d.nb_blesses || 'plusieurs'} individus se trouvaient au sol, dont monsieur ${suspect(d)}. Les EMS ont été immédiatement requis pour prodiguer les soins nécessaires aux blessés.`);
            parts.push(`Après que les EMS ont effectué les soins nécessaires, un contrôle a été initié. En consultant le casier de monsieur ${suspect(d).split(' ').pop()}, nous avons remarqué la présence de la charge d'implication dans une fusillade ${d.casier_info === 'Multiples fois' ? 'à de multiples reprises' : d.casier_info === 'Deux fois' ? 'à deux reprises' : 'pour la première fois'}. L'individu a donc reçu une palpation de sécurité, qui a permis de saisir ${d.arme_type ? `une ${d.arme_type}` : 'une arme'}.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 2. ATM
    // ═══════════════════════════════════════════════════════════════
    atm: {
        id: 'atm',
        label: 'Braquage ATM',
        defaultCharges: ['c32'],
        medOnlyOnRecidive: true,
        contextFields: [
            { key: 'methode', label: 'Méthode utilisée', type: 'text', placeholder: 'Ex: pied de biche, camion bélier', half: true },
            { key: 'fuite_type', label: 'Tentative de fuite', type: 'select', options: ['Aucune fuite', 'À pied', 'En véhicule'], defaultValue: 'En véhicule', half: true },
            { key: 'vehicule_fuite', label: 'Véhicule (si fuite)', type: 'text', placeholder: 'Ex: Sultan RS noir', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 5', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à un signalement de tentative de braquage d'un distributeur automatique de billets (ATM) sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée sur les lieux, nous avons constaté la présence d'un individu en train de tenter de forcer le distributeur à l'aide ${d.methode ? `d'un ${d.methode}` : 'de matériel adapté'}.`);
            if (d.fuite_type && d.fuite_type !== 'Aucune fuite') {
                parts.push(`À la vue des forces de l'ordre, l'individu a pris la fuite ${d.fuite_type === 'À pied' ? 'à pied' : `à bord d'un ${d.vehicule_fuite || 'véhicule'}`}, déclenchant une course poursuite.`);
                parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, l'individu a finalement été interpellé.`);
            }
            else {
                parts.push(`Le suspect n'a opposé aucune résistance et a accepté le contrôle des agents.`);
            }
            parts.push(`Un relevé d'identité a été effectué sur l'individu, identifié comme M. ${suspect(d)}. Une palpation de sécurité a été effectuée sur le suspect, permettant la saisie du matériel utilisé pour le braquage.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 3. BRAQUAGE FLEECA
    // ═══════════════════════════════════════════════════════════════
    fleeca: {
        id: 'fleeca',
        label: 'Braquage Fleeca',
        defaultCharges: ['c34'],
        medOnlyOnRecidive: true,
        contextFields: [
            { key: 'nb_braqueurs', label: 'Nombre de braqueurs', type: 'text', placeholder: 'Ex: 4', half: true },
            { key: 'nb_otages', label: "Nombre d'otages", type: 'text', placeholder: 'Ex: 4', half: true },
            { key: 'negociations', label: 'Conditions négociées', type: 'textarea', placeholder: 'Ex: 1 otage contre périmètre de sécurité, 1 otage contre bidon d\'essence, 2 otages contre course poursuite' },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 7', half: true },
            { key: 'fin_cp', label: 'Fin de la poursuite', type: 'select', options: ['Tazer', 'PIT maneuver', 'Course à pied puis tazer', 'Sommations acceptées', 'Accident'], defaultValue: 'Course à pied puis tazer', half: true },
            { key: 'ems_braquage', label: 'EMS requis pour le suspect', type: 'select', options: ['Oui', 'Non'], defaultValue: 'Oui', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`L'${d.adam || 'Adam XX'} composé de ${d.unites || 'XX et XX'} sont intervenu dans un braquage de Fleeca${d.lieu ? ` situé à ${d.lieu}` : ''}. Il y avait ${d.nb_otages || 'plusieurs'} otages pour ${d.nb_braqueurs || 'plusieurs'} braqueurs.`);
            parts.push(`Nous avons donc vérifier les otages, ils se portaient tous bien et on eu le droit à boire et à manger donner par les braqueurs. Ensuite nous sommes passer aux negociations, il en été convenu ${d.negociations || '1 otage contre périmètre de sécurité et les otages restants contre course poursuite'}.`);
            parts.push(`Une fois tout les otages libérer et le périmètre de sécurité enlever, nous sommes partie en course poursuite.`);
            const finText = d.fin_cp === 'Course à pied puis tazer'
                ? `l'individu a tenté de nous bloquer la route afin de protéger ses complices. Nous l'avons donc repris en course poursuite à pied, après 3 sommations il n'a toujours pas voulu s'arrêter donc j'ai utilisé mon tazer pour le neutraliser`
                : d.fin_cp === 'PIT maneuver'
                    ? `un PIT maneuver a permis d'immobiliser le véhicule du suspect`
                    : d.fin_cp === 'Accident'
                        ? `le suspect a perdu le contrôle de son véhicule et s'est crashé`
                        : d.fin_cp === 'Sommations acceptées'
                            ? `après sommations, le suspect s'est finalement arrêté et a accepté le contrôle`
                            : `le suspect a été neutralisé par tazer`;
            parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, ${finText}.`);
            if (d.ems_braquage === 'Oui') {
                parts.push(`Un appel EMS a été fait pour le soigner.`);
            }
            parts.push(`Une fois ceci fait, nous l'avons arrêté, effectué une palpation de sécurité sur l'individu, identifié comme M. ${suspect(d)}.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 4. BRAQUAGE SUPÉRETTE
    // ═══════════════════════════════════════════════════════════════
    superette: {
        id: 'superette',
        label: 'Braquage de supérette',
        defaultCharges: ['c33', 'c18'],
        medOnlyOnRecidive: true,
        contextFields: [
            { key: 'commerce', label: 'Nom/type du commerce', type: 'text', placeholder: 'Ex: 24/7 de Sandy Shores', half: true },
            { key: 'arme_braq', label: 'Arme utilisée par le braqueur', type: 'text', placeholder: 'Ex: pistolet de combat', half: true },
            { key: 'butin', label: 'Butin estimé', type: 'text', placeholder: 'Ex: $5000', half: true },
            { key: 'fuite_type', label: 'Tentative de fuite', type: 'select', options: ['Aucune fuite', 'À pied', 'En véhicule'], defaultValue: 'En véhicule', half: true },
            { key: 'vehicule_fuite', label: 'Véhicule (si fuite)', type: 'text', placeholder: 'Ex: Kuruma bleue', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 5', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à un appel radio signalant un braquage en cours au ${d.commerce || 'commerce de proximité'} sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée sur les lieux, nous avons constaté la présence d'un individu armé d'un ${d.arme_braq || 'arme à feu'} en train de menacer le gérant de l'établissement. Le butin est estimé à ${d.butin || 'une somme indéterminée'}.`);
            if (d.fuite_type && d.fuite_type !== 'Aucune fuite') {
                parts.push(`À la vue des forces de l'ordre, l'individu a pris la fuite ${d.fuite_type === 'À pied' ? 'à pied' : `à bord d'un ${d.vehicule_fuite || 'véhicule'}`}, déclenchant une course poursuite.`);
                parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, l'individu s'est finalement arrêté et a accepté le contrôle des agents.`);
            }
            else {
                parts.push(`Après mise en joue et sommations, le suspect s'est rendu sans opposer de résistance.`);
            }
            parts.push(`Un relevé d'identité a été effectué sur l'individu, identifié comme M. ${suspect(d)}. Une palpation de sécurité a été effectuée, permettant la saisie de l'arme du braquage.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 5. VENTE DE STUPÉFIANTS
    // ═══════════════════════════════════════════════════════════════
    vente_stup: {
        id: 'vente_stup',
        label: 'Vente de stupéfiants',
        defaultCharges: ['c27', 'c26'],
        contextFields: [
            { key: 'fuite_type', label: 'Tentative de fuite', type: 'select', options: ['Aucune fuite', 'À pied', 'En véhicule'], defaultValue: 'En véhicule', half: true },
            { key: 'vehicule_fuite', label: 'Véhicule (si fuite)', type: 'text', placeholder: 'Ex: véhicule blanc', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 5', half: true },
            { key: 'recidive', label: 'Récidive', type: 'select', options: ['Première fois', 'Récidive'], defaultValue: 'Première fois', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue sur un appel pour une vente de stupéfiant${d.lieu ? ` sur le secteur de ${d.lieu}` : ''}.`);
            parts.push(`À notre arrivée sur les lieux, nous avons vu un individu pris en flagrant délit en train de vendre du stupéfiant a un individu.`);
            if (d.fuite_type && d.fuite_type !== 'Aucune fuite') {
                parts.push(`À la vue des forces de l'ordre, l'individu à pris la fuite ${d.fuite_type === 'À pied' ? 'à pied' : `à bord d'un ${d.vehicule_fuite || 'véhicule'}`}, déclenchant une course poursuite.`);
                parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, l'individu c'est arrêté et accepté le contrôle des agents.`);
            }
            else {
                parts.push(`L'individu n'a opposé aucune résistance et a accepté le contrôle des agents.`);
            }
            parts.push(`Un relevé d'identité a été effectué sur l'individu, identifié comme M. ${suspect(d)}, en ayant regardé sur la tablette nous avons constaté que l'individu était à sa ${d.recidive === 'Récidive' ? 'énième infraction' : 'première fois'} pour la vente de stupéfiant.`);
            parts.push(`Après une palpation de sécurité, tout objet dangereux et moyen de communication lui ont été saisis oralement.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 6. POSSESSION D'ARMES
    // ═══════════════════════════════════════════════════════════════
    possession_armes: {
        id: 'possession_armes',
        label: "Possession d'armes",
        defaultCharges: ['c18', 'c21'],
        contextFields: [
            { key: 'contexte_decouverte', label: 'Contexte de la découverte', type: 'select', options: ["Contrôle routier", "Appel radio", "Patrouille", "Signalement citoyen", "Suite à une autre infraction"], defaultValue: 'Contrôle routier', half: true },
            { key: 'arme_type', label: "Type d'arme découverte", type: 'text', placeholder: 'Ex: arme à feu de type MK2', half: true },
            { key: 'munitions', label: 'Munitions saisies', type: 'text', placeholder: 'Ex: 71 munitions de calibre 9mm', half: true },
            { key: 'vehicule_controle', label: 'Véhicule contrôlé', type: 'text', placeholder: 'Ex: Sultan RS', half: true },
            { key: 'connu_services', label: 'Connu des services', type: 'select', options: ['Oui', 'Non'], defaultValue: 'Oui', half: true },
            { key: 'vehicule_pas_sien', label: 'Véhicule lui appartient', type: 'select', options: ['Oui', 'Non'], defaultValue: 'Non', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            if (d.contexte_decouverte === 'Contrôle routier' || d.contexte_decouverte === 'Patrouille') {
                parts.push(`${unit(d)}, circulait en véhicule de service lorsqu'un automobiliste${d.vehicule_controle ? ` à bord d'un ${d.vehicule_controle}` : ''} a été aperçu roulant à vive allure sur le secteur de ${lieu(d)}.`);
                parts.push(`Les agents ont procédé à un contrôle de routine du véhicule. Lors de la vérification, il a été constaté que l'individu ${d.connu_services === 'Oui' ? 'était déjà connu des services' : 'n\'était pas connu de nos services'}${d.vehicule_pas_sien === 'Non' ? ' et que le véhicule contrôlé ne lui appartenait pas' : ''}.`);
            }
            else {
                parts.push(`${unit(d)}, est intervenue suite à ${d.contexte_decouverte === 'Appel radio' ? 'un appel radio' : d.contexte_decouverte === 'Signalement citoyen' ? 'un signalement citoyen' : 'une précédente infraction'} sur le secteur de ${lieu(d)}.`);
            }
            parts.push(`En conséquence, l'agent ${(d.unites || 'XX').split(',')[0].trim()} a effectué une palpation de sécurité. Celle-ci a permis de constater que l'individu était en possession d'une ${d.arme_type || 'arme à feu'}${d.munitions ? `, de ${d.munitions}` : ''} ainsi que d'une somme d'argent non déclarée.`);
            parts.push(`Au vu de la gravité des faits, l'individu, identifié comme M. ${suspect(d)}, a été immédiatement interpellé.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 7. POSSESSION D'ARGENT SALE
    // ═══════════════════════════════════════════════════════════════
    possession_argent: {
        id: 'possession_argent',
        label: "Possession d'argent sale",
        defaultCharges: ['c37'],
        contextFields: [
            { key: 'montant_argent', label: 'Montant saisi', type: 'text', placeholder: 'Ex: 5 000$', half: true },
            { key: 'contexte_decouverte', label: 'Contexte', type: 'select', options: ["Contrôle routier", "Palpation de sécurité", "Suite à une autre infraction", "Patrouille"], defaultValue: 'Contrôle routier', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue ${d.contexte_decouverte === 'Contrôle routier' ? 'lors d\'un contrôle routier' : d.contexte_decouverte === 'Patrouille' ? 'lors d\'une patrouille' : 'suite à une intervention'} sur le secteur de ${lieu(d)}.`);
            parts.push(`Une palpation de sécurité a été effectuée sur l'individu, identifié comme M. ${suspect(d)}. Celle-ci a permis de constater que l'individu était en possession d'une somme de ${d.montant_argent || '[MONTANT]'} en espèces, non déclarée et suspectée d'être d'origine illicite.`);
            parts.push(`Au vu des faits, l'individu a été immédiatement interpellé.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 8. VOL À L'ARRACHÉ
    // ═══════════════════════════════════════════════════════════════
    vol_arrache: {
        id: 'vol_arrache',
        label: "Vol à l'arraché",
        defaultCharges: ['c30'],
        contextFields: [
            { key: 'victime', label: 'Identité de la victime', type: 'text', placeholder: 'Ex: un civil / M. Smith', half: true },
            { key: 'objet_vole', label: 'Objet volé', type: 'text', placeholder: 'Ex: sac à main, téléphone', half: true },
            { key: 'fuite_type', label: 'Fuite du suspect', type: 'select', options: ['À pied', 'En véhicule'], defaultValue: 'À pied', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 3', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite au signalement d'un vol à l'arraché sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée, la victime, ${d.victime || 'un civil'}, nous a déclaré s'être fait arracher ${d.objet_vole || 'ses affaires'} par un individu qui avait pris la fuite ${d.fuite_type === 'À pied' ? 'à pied' : 'en véhicule'}.`);
            parts.push(`Une course poursuite a été engagée. Après ${d.duree_cp || 'plusieurs'} minutes, le suspect a été rattrapé et interpellé après sommations.`);
            parts.push(`L'individu, identifié comme M. ${suspect(d)}, a reçu une palpation de sécurité. ${d.objet_vole ? `L'objet volé (${d.objet_vole}) a été restitué à la victime.` : ''}`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 9. REFUS D'OBTEMPÉRER
    // ═══════════════════════════════════════════════════════════════
    refus_obtemperer: {
        id: 'refus_obtemperer',
        label: "Refus d'obtempérer",
        defaultCharges: ['c9', 'c1'],
        contextFields: [
            { key: 'vehicule_suspect', label: 'Véhicule du suspect', type: 'text', placeholder: 'Ex: Buffalo STX noire', half: true },
            { key: 'motif_initial', label: 'Motif initial du contrôle', type: 'text', placeholder: 'Ex: roulant à vive allure', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 7', half: true },
            { key: 'fin_cp', label: 'Fin de la poursuite', type: 'select', options: ['Arrêt volontaire', 'Tazer', 'PIT maneuver', 'Course à pied après abandon véhicule', 'Accident'], defaultValue: 'Tazer', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, circulait en véhicule de service lorsqu'un automobiliste à bord d'un ${d.vehicule_suspect || 'véhicule'} a été aperçu ${d.motif_initial || 'commettant une infraction'} sur le secteur de ${lieu(d)}.`);
            parts.push(`Sirènes et gyrophares enclenchés, sommations effectuées, l'individu a refusé d'obtempérer et a pris la fuite, déclenchant une course poursuite.`);
            const finText = d.fin_cp === 'Arrêt volontaire' ? `l'individu s'est finalement arrêté et a accepté le contrôle des agents`
                : d.fin_cp === 'PIT maneuver' ? `un PIT maneuver a permis d'immobiliser le véhicule du suspect`
                    : d.fin_cp === 'Course à pied après abandon véhicule' ? `l'individu a abandonné son véhicule et a pris la fuite à pied avant d'être rattrapé et interpellé`
                        : d.fin_cp === 'Accident' ? `le suspect a perdu le contrôle de son véhicule et a été interpellé sur les lieux de l'accident`
                            : `l'individu a été neutralisé par tazer`;
            parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, ${finText}.`);
            parts.push(`Un relevé d'identité a été effectué. L'individu, identifié comme M. ${suspect(d)}, a reçu une palpation de sécurité.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 10. COURSE POURSUITE
    // ═══════════════════════════════════════════════════════════════
    course_poursuite: {
        id: 'course_poursuite',
        label: 'Course poursuite',
        defaultCharges: ['c10', 'c9', 'c1'],
        contextFields: [
            { key: 'vehicule_suspect', label: 'Véhicule du suspect', type: 'text', placeholder: 'Ex: Sultan RS', half: true },
            { key: 'motif_initial', label: 'Motif initial', type: 'text', placeholder: 'Ex: excès de vitesse', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 10', half: true },
            { key: 'fin_cp', label: 'Fin de la poursuite', type: 'select', options: ['Tazer', 'PIT maneuver', 'Course à pied', 'Accident', 'Reddition'], defaultValue: 'PIT maneuver', half: true },
            { key: 'degats', label: 'Dégâts causés', type: 'text', placeholder: 'Ex: 3 véhicules civils endommagés', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, circulait en véhicule de service lorsqu'un automobiliste à bord d'un ${d.vehicule_suspect || 'véhicule'} a été aperçu ${d.motif_initial || 'commettant plusieurs infractions au code de la route'} sur le secteur de ${lieu(d)}.`);
            parts.push(`Sirènes et gyrophares enclenchés, sommations effectuées. L'individu a refusé de s'arrêter et une course poursuite s'est engagée à travers plusieurs secteurs de la ville.`);
            if (d.degats) {
                parts.push(`Durant la poursuite, ${d.degats} ont été constatés.`);
            }
            const finText = d.fin_cp === 'Reddition' ? `l'individu a fini par s'arrêter de lui-même et a accepté le contrôle`
                : d.fin_cp === 'PIT maneuver' ? `un PIT maneuver a permis d'immobiliser le véhicule du suspect`
                    : d.fin_cp === 'Course à pied' ? `l'individu a abandonné son véhicule et a été rattrapé à pied après sommations`
                        : d.fin_cp === 'Accident' ? `le suspect a perdu le contrôle de son véhicule et a été interpellé`
                            : `l'individu a été neutralisé par tazer`;
            parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de course poursuite, ${finText}.`);
            parts.push(`L'individu, identifié comme M. ${suspect(d)}, a reçu une palpation de sécurité.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 11. CONTRÔLE ROUTIER
    // ═══════════════════════════════════════════════════════════════
    controle_routier: {
        id: 'controle_routier',
        label: 'Contrôle routier',
        defaultCharges: ['c1'],
        contextFields: [
            { key: 'vehicule_controle', label: 'Véhicule contrôlé', type: 'text', placeholder: 'Ex: Adder rouge', half: true },
            { key: 'motif_controle', label: 'Motif du contrôle', type: 'text', placeholder: 'Ex: roulant à vive allure / grillé un feu rouge', half: true },
            { key: 'connu_services', label: 'Connu des services ?', type: 'select', options: ['Oui', 'Non'], defaultValue: 'Non', half: true },
            { key: 'vehicule_pas_sien', label: 'Le véhicule lui appartient ?', type: 'select', options: ['Oui', 'Non'], defaultValue: 'Oui', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, circulait en véhicule de service lorsqu'un automobiliste${d.vehicule_controle ? ` à bord d'un ${d.vehicule_controle}` : ''} a été aperçu ${d.motif_controle || 'commettant une infraction au code de la route'} sur le secteur de ${lieu(d)}.`);
            parts.push(`Les agents ont procédé à un contrôle de routine du véhicule. Lors de la vérification, il a été constaté que l'individu, identifié comme M. ${suspect(d)}, ${d.connu_services === 'Oui' ? 'était déjà connu des services' : 'n\'était pas connu de nos services'}${d.vehicule_pas_sien === 'Non' ? ' et que le véhicule contrôlé ne lui appartenait pas' : ''}.`);
            parts.push(`En conséquence, l'agent ${(d.unites || 'XX').split(',')[0].trim()} a effectué une palpation de sécurité sur l'individu.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 12. AGRESSION SUR CIVIL
    // ═══════════════════════════════════════════════════════════════
    agression_civil: {
        id: 'agression_civil',
        label: 'Agression sur civil',
        defaultCharges: ['c40'],
        contextFields: [
            { key: 'victime', label: 'Identité victime', type: 'text', placeholder: 'Ex: un civil', half: true },
            { key: 'nb_coups', label: 'Nombre de coups', type: 'text', placeholder: 'Ex: deux', half: true },
            { key: 'fuite_type', label: 'Tentative de fuite', type: 'select', options: ['Aucune fuite', 'À pied', 'En véhicule'], defaultValue: 'En véhicule', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à une agression visant ${d.victime || 'un civil'}${d.lieu ? ` sur le secteur de ${d.lieu}` : ''}.`);
            parts.push(`À notre arrivée, nous avons vu M. ${suspect(d).split(' ').pop()} frapper à ${d.nb_coups || 'plusieurs'} reprises ${d.victime || 'un civil'}.`);
            if (d.fuite_type && d.fuite_type !== 'Aucune fuite') {
                parts.push(`À la suite de nos sirènes, celui-ci prend la fuite ${d.fuite_type === 'À pied' ? 'à pied' : 'à bord de son véhicule'}. L'individu a été rattrapé et interpellé.`);
            }
            else {
                parts.push(`L'individu a été immédiatement maîtrisé sur place.`);
            }
            parts.push(`L'individu, identifié comme M. ${suspect(d)}, a alors été palpé avant d'être placé en état d'arrestation.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 13. OUTRAGE À AGENT
    // ═══════════════════════════════════════════════════════════════
    outrage: {
        id: 'outrage',
        label: 'Outrage à agent',
        defaultCharges: ['c13'],
        contextFields: [
            { key: 'contexte_outrage', label: 'Contexte', type: 'select', options: ["Lors d'un contrôle", "Au poste", "Lors d'une interpellation", "En cellule", "En salle d'interrogatoire"], defaultValue: "Lors d'un contrôle", half: true },
            { key: 'propos_tenus', label: 'Description des propos / actes', type: 'textarea', placeholder: 'Ex: L\'individu a insulté les agents, menaçant de les frapper, dénigrant leur fonction...' },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue ${d.contexte_outrage ? `${d.contexte_outrage.toLowerCase()}` : 'lors d\'une intervention'} sur le secteur de ${lieu(d)}.`);
            parts.push(`Durant l'intervention, l'individu identifié comme M. ${suspect(d)} a tenu des propos outrageants et injurieux à l'encontre des agents de l'état.`);
            if (d.propos_tenus) {
                parts.push(`${d.propos_tenus}`);
            }
            parts.push(`Face à son comportement, l'individu a été immédiatement interpellé et une palpation de sécurité a été effectuée.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 14. PRISE D'OTAGE
    // ═══════════════════════════════════════════════════════════════
    prise_otage: {
        id: 'prise_otage',
        label: "Prise d'otage",
        defaultCharges: ['c42', 'c18'],
        contextFields: [
            { key: 'nb_otages', label: "Nombre d'otages", type: 'text', placeholder: 'Ex: 1', half: true },
            { key: 'arme_po', label: 'Arme utilisée', type: 'text', placeholder: 'Ex: pistolet', half: true },
            { key: 'duree_nego', label: 'Durée négociations (min)', type: 'text', placeholder: 'Ex: 15', half: true },
            { key: 'issue_po', label: 'Issue', type: 'select', options: ['Reddition pacifique', 'Neutralisation tazer', 'Neutralisation par tir', 'Assaut'], defaultValue: 'Reddition pacifique', half: true },
            { key: 'otages_etat', label: 'État des otages', type: 'select', options: ['Sains et saufs', 'Blessés légèrement', 'Blessés gravement'], defaultValue: 'Sains et saufs', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue sur une situation de prise d'otage sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée, nous avons constaté que le suspect, identifié comme M. ${suspect(d)}, retenait ${d.nb_otages || '1'} otage(s) sous la menace d'un ${d.arme_po || 'arme'}.`);
            parts.push(`Un périmètre de sécurité a immédiatement été mis en place. Les négociations ont débuté et ont duré ${d.duree_nego || 'plusieurs'} minutes.`);
            const issueText = d.issue_po === 'Neutralisation tazer' ? 'le suspect a été neutralisé par tazer'
                : d.issue_po === 'Neutralisation par tir' ? 'le suspect a été neutralisé par tir létal'
                    : d.issue_po === 'Assaut' ? 'un assaut a été donné par les unités'
                        : 'le suspect s\'est rendu pacifiquement';
            parts.push(`À l'issue des négociations, ${issueText}. Les otages ont été libérés ${(d.otages_etat || 'sains et saufs').toLowerCase()} et pris en charge par les EMS.`);
            parts.push(`L'individu a reçu une palpation de sécurité.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 15. PRISE D'OTAGE SUR AGENT
    // ═══════════════════════════════════════════════════════════════
    prise_otage_agent: {
        id: 'prise_otage_agent',
        label: "Prise d'otage sur agent",
        defaultCharges: ['c43', 'c18', 'c25'],
        contextFields: [
            { key: 'agent_otage', label: 'Agent pris en otage', type: 'text', placeholder: 'Ex: Agent 286', half: true },
            { key: 'arme_po', label: 'Arme utilisée', type: 'text', placeholder: 'Ex: couteau', half: true },
            { key: 'duree_nego', label: 'Durée négociations (min)', type: 'text', placeholder: 'Ex: 20', half: true },
            { key: 'issue_po', label: 'Issue', type: 'select', options: ['Reddition pacifique', 'Neutralisation tazer', 'Neutralisation par tir', 'Libération suite à intervention'], defaultValue: 'Neutralisation tazer', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à une prise d'otage visant un agent de l'état sur le secteur de ${lieu(d)}.`);
            parts.push(`L'agent ${d.agent_otage || '[AGENT]'} a été pris en otage par le suspect, identifié comme M. ${suspect(d)}, sous la menace d'un ${d.arme_po || 'arme'}.`);
            parts.push(`Un périmètre de sécurité a été établi en urgence. Les négociations ont duré ${d.duree_nego || 'plusieurs'} minutes dans un climat de haute tension.`);
            const issueText = d.issue_po === 'Neutralisation tazer' ? 'le suspect a été neutralisé par tazer'
                : d.issue_po === 'Neutralisation par tir' ? 'le suspect a été neutralisé par tir'
                    : d.issue_po === 'Libération suite à intervention' ? 'une intervention rapide a permis de libérer l\'agent'
                        : 'le suspect s\'est rendu pacifiquement';
            parts.push(`À l'issue des négociations, ${issueText}. L'agent a été libéré et immédiatement pris en charge par les EMS pour vérification.`);
            parts.push(`L'individu a reçu une palpation de sécurité.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 16. REFUGE AUTO REPÉRÉ
    // ═══════════════════════════════════════════════════════════════
    refuge_auto: {
        id: 'refuge_auto',
        label: 'Refuge auto repéré',
        defaultCharges: ['c47'],
        contextFields: [
            { key: 'vehicules_reperes', label: 'Véhicules repérés', type: 'textarea', placeholder: 'Lister les véhicules observés (un par ligne)' },
            { key: 'nb_suspects', label: 'Nombre de suspects sur place', type: 'text', placeholder: 'Ex: 3', half: true },
            { key: 'objets_visibles', label: 'Objets/produits visibles', type: 'textarea', placeholder: 'Ex: matériel de démontage, plaques d\'immatriculation...' },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, effectuait une patrouille de routine sur le secteur de ${lieu(d)} lorsqu'un emplacement suspect a été repéré, laissant penser à un refuge auto.`);
            if (d.vehicules_reperes) {
                parts.push(`Les véhicules suivants ont été identifiés sur place :\n\n${d.vehicules_reperes}`);
            }
            if (d.nb_suspects) {
                parts.push(`${d.nb_suspects} individu(s) étaient présents sur les lieux.`);
            }
            if (d.objets_visibles) {
                parts.push(`Une observation a permis de constater la présence des éléments suivants : ${d.objets_visibles}`);
            }
            parts.push(`L'intervention a été menée et les individus présents ont été interpellés. Une palpation de sécurité a été effectuée sur chaque suspect.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 17. TENTATIVE DE MEURTRE
    // ═══════════════════════════════════════════════════════════════
    tentative_meurtre: {
        id: 'tentative_meurtre',
        label: 'Tentative de meurtre',
        defaultCharges: ['c24', 'c18'],
        contextFields: [
            { key: 'victime_tm', label: 'Identité de la victime', type: 'text', placeholder: 'Ex: M. Johnson', half: true },
            { key: 'arme_tm', label: 'Arme utilisée', type: 'text', placeholder: 'Ex: couteau / arme à feu', half: true },
            { key: 'circonstances', label: 'Circonstances', type: 'textarea', placeholder: 'Décrire les circonstances de la tentative' },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à un signalement de tentative de meurtre sur le secteur de ${lieu(d)}.`);
            parts.push(`À notre arrivée, la victime, ${d.victime_tm || '[VICTIME]'}, se trouvait au sol, blessée par ${d.arme_tm || 'une arme'}. Les EMS ont été immédiatement requis pour prendre en charge la victime.`);
            if (d.circonstances) {
                parts.push(`Selon les premiers éléments recueillis : ${d.circonstances}`);
            }
            parts.push(`Le suspect, identifié comme M. ${suspect(d)}, a été interpellé sur place. Une palpation de sécurité a été effectuée, permettant la saisie de l'arme du crime.`);
            return parts.join('\n\n');
        },
    },
    // ═══════════════════════════════════════════════════════════════
    // 18. BRAQUAGE DE CONTENEUR
    // ═══════════════════════════════════════════════════════════════
    braquage_conteneur: {
        id: 'braquage_conteneur',
        label: 'Braquage de conteneur',
        defaultCharges: ['c50', 'c18'],
        medOnlyOnRecidive: true,
        contextFields: [
            { key: 'lieu_conteneur', label: 'Localisation du conteneur', type: 'text', placeholder: 'Ex: port de Los Santos', half: true },
            { key: 'nb_suspects_cont', label: 'Nombre de suspects', type: 'text', placeholder: 'Ex: 3', half: true },
            { key: 'contenu_conteneur', label: 'Contenu du conteneur', type: 'text', placeholder: 'Ex: marchandises, armes, drogues', half: true },
            { key: 'fuite_type', label: 'Tentative de fuite', type: 'select', options: ['Aucune fuite', 'À pied', 'En véhicule'], defaultValue: 'En véhicule', half: true },
            { key: 'duree_cp', label: 'Durée poursuite (min)', type: 'text', placeholder: 'Ex: 5', half: true },
        ],
        generateContext: (d) => {
            const parts = [];
            parts.push(`${unit(d)}, est intervenue suite à un signalement de braquage de conteneur ${d.lieu_conteneur ? `au niveau de ${d.lieu_conteneur}` : `sur le secteur de ${lieu(d)}`}.`);
            parts.push(`À notre arrivée sur les lieux, nous avons constaté la présence de ${d.nb_suspects_cont || 'plusieurs'} individu(s) en train de forcer l'accès à un conteneur maritime contenant ${d.contenu_conteneur || 'des marchandises'}.`);
            if (d.fuite_type && d.fuite_type !== 'Aucune fuite') {
                parts.push(`À la vue des forces de l'ordre, les individus ont pris la fuite ${d.fuite_type === 'À pied' ? 'à pied' : 'en véhicule'}, déclenchant une course poursuite.`);
                parts.push(`Après ${d.duree_cp || 'plusieurs'} minutes de poursuite, le suspect principal a été interpellé.`);
            }
            else {
                parts.push(`Après sommations, les suspects se sont rendus sans résistance.`);
            }
            parts.push(`L'individu principal, identifié comme M. ${suspect(d)}, a reçu une palpation de sécurité.`);
            return parts.join('\n\n');
        },
    },
};
export const INCIDENT_LIST = Object.values(INCIDENTS).map(i => ({ id: i.id, label: i.label }));

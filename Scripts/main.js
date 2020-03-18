
function hideElement(element) {
    element.style.display = "none";
}
function removeElement(element) {
    element.remove();
}
function showElement(element) {
    element.style.display = "inline";
}
/*function showText(element) {
    element.style.display = "block";
}
function showBttns(element, number) {
    for (let i = 0; i < number; i -= -1) {
        element[i].style.display = "inline";
    }
}*/
function hideBttns(element) {
    for (let i = 0; i < element.length; i -= -1) {
        element[i].remove();
    }
}
function inventoryAddItem(item = []) {
    let i = 0;
    let inventory = [];
    while (i <= item.length - 1) {
        if (i != "") {
            i -= -1;
        }
        else {
            inventory[i] == item[i];
            i -= -1;
        }
    }
    invBttns = createInventoryButtons(item);
    return inventory;
}
function createInventoryButtons(item) {
    let invBttns = [];
    let invBttn = document.createElement("input");
    invBttn.type = "button";
    invBttn.id = "invBttn";
    invBttn.value = item;
    document.querySelector("#inventorySpace").appendChild(invBttn);
    invBttns.push(invBttn);
    return invBttns;
}
function createInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Potvrď Enterem";
    document.querySelector("#options").appendChild(input);
    hideElement(input);
    return input;
}
function printMessage(message) {
    qsTxt.innerHTML = message;
}

let input = createInput();
let qsTxt = document.querySelector("#questText");


let gameState = {
    floor: 0,
    items: [],
    currentButtons: [],
    atk: 0,
    def: 0,
    int: 0,
    hp: 50,
    maxhp: 50,
};

showElement(input);
qsTxt.innerHTML = "Vlož jméno své postavy: ";
let name;
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        name = input.value;
        removeElement(input);
        updateStats(randomNumber(1, 2), randomNumber(0, 1), randomNumber(1, 2));
        loop();
    }

});


function getAvailableActions() {
    let actions = [];


    if (gameState.floor === 13) {
        qsTxt.innerHTML = ("Probouzíš se na zemi před zvláštní branou. Nic si nepamatuješ. Zvedáš se a rozhodneš se: ")
        actions.push("Projít branou");
    }
    if (gameState.floor === 0) {
        qsTxt.innerHTML = ("Procházíš branou. Před tebou se tyčí vysoká věž. Co chceš udělat?");
        actions.push("Jít do věže");
        actions.push("Prohledat zahrady");
    }
    if (gameState.floor === 0.5) {
        qsTxt.innerHTML = ("Jsi v zahradě. Před tebou se nachází dřevěná ztrouchnivělá truhla s vyraženým zámkem.");
        actions.push("Vrátit se zpět");
        actions.push("Prohledat truhlu");
    }
    if (gameState.floor === 0.75) {
        loot();
        actions.push("Jít do věže")
    }
    if (gameState.floor === 1) {
        qsTxt.innerHTML = ("Vešel jsi do věže a všímáš si dvou dveří. Jedny vedou do dalšího patra a druhé do mistní knihovny. Vybíráš si:");
        actions.push("Další patro");
        actions.push("Knihovnu");
    }
    if (gameState.floor === 2) {
        qsTxt.innerHTML = ("Vcházíš do alchymistické laboratoře. Před tebou se nachází lahvička se zeleným obsahem. Rozhodneš se: ");
        actions.push("Lahvičku vzít");
        actions.push("Lahvičku nebrat");
    }
    if (gameState.floor === 2.5) {
        qsTxt.innerHTML = ("Vcházíš do tmavé knihovny. Kromě knih si všímáš malého tvora, který tě z dáli pozoruje. Tvora se rozhodneš: ");
        actions.push("Konfrontovat");
        actions.push("Obejít");
    }
    if (gameState.floor === 2.75) {
        actions.push("Pokračovat dál");
    }

    if (gameState.floor === 2.80) {
        qsTxt.innerHTML = ("Tvor si tě všíml a chystá se zaútočit");
        actions.push("Bránit se");
    }

    if (gameState.floor === 3) {
        qsTxt.innerHTML = ("Vešel jsi do místnosti, která vypadá jako hodovní síň. Zničehonic se zvedne hromada příborů a letí na tebe. Chceš: ")
        actions.push("Bojovat");
        actions.push("Utéct");
    }
    if (gameState.floor === 3.5) {
        actions.push("Pokračovat dále");
    }
    if (gameState.floor === 4) {
        qsTxt.innerHTML = ("Vcházíš do místnosti plné zrcadel. Najednou se jeden z tvých odrázů začne hýbat sám a chystá se zaútočit. Nezbývá ti nic jiného než: ");
        actions.push("Utíkat")
        if (gameState.items.indexOf("lahvicka") !== -1) {
            qsTxt.innerHTML = ("Vcházíš do místnosti plné zrcadel. Najednou se jeden z tvých odrázů začne hýbat sám a chystá se zaútočit. Můžeš: ");
            actions.push("Použít lahvičku");
        }
    }
    if (gameState.floor === 4.5) {
        qsTxt.innerHTML = ("Vylil jsi obsah lahvičky na zrcadlo a přízrak v něm se roztekl. Získáváš 3 body k <span style='color:red'>ATK</span>");
        updateStats(3, 0, 0);
        actions.push("Pokračovat");
    }
    if (gameState.floor === 5) {
        qsTxt.innerHTML = ("Vcházíš do prostorné ložnice, ve které se nachází pulpit s obří knihou. Za pulpitem se nachází dvěře do malého skladiště. Rozhodneš se: ");
        actions.push("Přečíst knihu");
        actions.push("Jít do skladiště");
    }
    if (gameState.floor === 5.5) {
        qsTxt.innerHTML = ("Začal jsi číst knihu. Je rozdělena do tří kapitol. Kapitola I se zabývá uměním boje, kapitola II se zabýva obranou a kapitola III je věnováná umění meterologie. Přečteš si: ")
        actions.push("Kapitolu I");
        actions.push("Kapitolu II");
        actions.push("Kapitolu III");
    }
    if (gameState.floor === 5.6) {
        qsTxt.innerHTML = ("Přečetl jsi Kapitolu I a získáváš 5 bodů k <span style='color:red'>ATK</span>");
        actions.push("Jít do skladiště");
        updateStats(5, 0, 0);
    }
    if (gameState.floor === 5.7) {
        qsTxt.innerHTML = ("Přečetl jsi Kapitolu II a získáváš 5 bodů k <span style='color:green'>DEF</span>");
        actions.push("Jít do skladiště");
        updateStats(0, 5, 0);
    }
    if (gameState.floor === 5.8) {
        qsTxt.innerHTML = ("Přečetl jsi Kapitolu III a získáváš 5 bodů k <span style='color:blue'>INT</span>");
        actions.push("Jít do skladiště");
        updateStats(0, 0, 5);
    }
    if (gameState.floor === 6) {
        if (gameState.int >= 8) {
            qsTxt.innerHTML = ("Vešel jsi do malého skladiště. Nachází se zde police plné zásob a kotlík plný neznámeho lektvaru, ze kterého je cítit silný jed a pravděpodobně tě uspí. Co chceš udělat? ")
        }
        else {
            qsTxt.innerHTML = ("Vešel jsi do malého skladiště. Nachází se zde police plné zásob a kotlík plný neznámeho lektvaru. Co chceš udělat? ")
        }
        actions.push("Sníst zásoby");
        actions.push("Vypít lektvar");
        actions.push("Postoupit dál");
    }
    if (gameState.floor === 6.5) {
        qsTxt.innerHTML = ("Dosyta jsi se najedl a získáváš bonus k HP!");
        gameState.hp += 10;
        healthUpdate();
        actions.push("Postoupit dál");
    }
    if (gameState.floor === 7) {
        qsTxt.innerHTML = ("Vcházíš před velké kovové dveře, vedle kterých stojí socha rytíře.");
        actions.push("Otevřít dveře");
    }
    if (gameState.floor === 7.5) {
        qsTxt.innerHTML = ("Vypil jsi lektvar a citíš, jak se ti začínají klížit víčka. Potom tvé bezvládné tělo upadne na zem.");
        actions.push("Probudit se");
    }
    if (gameState.floor === 7.75) {
        qsTxt.innerHTML = ("Začínáš otevírat dveře. V tu chvíli ale najednou uslyšíš rachot plátové zbroje a ucitíš velkou ránu do hlavy. Upadáš do bezvědomí.");
        healthUpdate();
        actions.push("Probudit se");
    }
    if (gameState.floor === 8) {
        qsTxt.innerHTML = ("Probouzíš se na studené zemi v nejvyšším patře věže. Před tebou stojí tajemné postava v kápi.");
        actions.push("Zvednout se");
        actions.push("Zběsile zaútočit");
    }
    if (gameState.floor === 9) {
        qsTxt.innerHTML = ("'Tak se zase setkáváme," + name + ".' Rozhodneš se odpovědět: ");
        actions.push("'Opět?'");
        actions.push("'Kdo jsi?'");
    }
    if (gameState.floor === 9.5) {
        qsTxt.innerHTML = ("'Vědel jsem, že se zeptáš. Zeptal si se mě už mnohokrát.' Rozhodneš se odpovědět: ");
        actions.push("'Kdo jsi?'");

    }
    if (gameState.floor === 9.75) {
        qsTxt.innerHTML = ("'Jsem Meter Olog, pán počasí. Už několik staletí hledám učedníka, který byl hoden šířit mé účení.' Ptáš se na:");
        actions.push("'Jaké je tvé učení?'");
        actions.push("'Jsem já hoden?'");
    }
    if (gameState.floor === 9.80) {
        qsTxt.innerHTML = ("'O meterologii. Celý kraj zužuje už několik let brutální bouřka. Snažím se jí ovladnout a využít jí ve svůj prospěch.'");
        actions.push("'Jsem já hoden?'");
    }
    if (gameState.floor === 10) {
        qsTxt.innerHTML = ("'To se teď prokáže. Který z těchto pojmů neoznačuje mrak?'");
        actions.push("'Cirrostratus'");
        actions.push("'Stradivarius'");
        actions.push("'Altocumulus'");
    }
    if (gameState.floor === 11) {
        qsTxt.innerHTML = ("Meter Olog se na tebe chvíli dívá, poté sklopí zrak do země a řekne 'tak snad příště'. Následně natáhne ruku a přivolá brutální blesk, kterým tě z věže schodí.");
        actions.push("Otevřít oči");
    }
    if (gameState.floor === 12) {
        qsTxt.innerHTML = ("Meter Olog se usměje a řekne 'velmi správně'. Podá ti černé rouchu a dá ti instrukce k tvému prvnímu úkolu. Poté se k tobě otočí zády a jde k velkému oknu. Rozhodneš se: ")
        actions.push("Jít splnit úkol");
        actions.push("Strčit Meter Ologa");
    }
    if (gameState.floor === 14) {
        qsTxt.innerHTML = ("Vydáváš se na úkol který ti zdal tvůj nový pán Meter Olog. Máš dojít do hlavního města, které nese název Tariwal. Před tebou je dlouhá cesta, příliš dlouhá na toto vyprávění.")
        actions.push("Dále");
    }
    if (gameState.floor === 15) {
        qsTxt.innerHTML = ("Rozebehneš se a narážíš do Meter Ologa, který v důsledku nárazu letí oknem ven z věže. Po několika chvílich slyšíš ránu dopadu a zvuk lamajících se kostí. Otáčíš se a koukáš na Meter Ologův trůn.");
        actions.push("Usednout na trůn");
    }
    if (gameState.floor === 16) {
        qsTxt.innerHTML = ("Usedáš na trůn a stáváš se novým pánem této podivné věže. Navždy nechť vládneš.")
        actions.push("Dále");
    }
    if (gameState.floor === 17) {
        qsTxt.innerHTML = ("Dosáhl jsi konce této malé hry. Děkuji za tvůj čas a doufám, že se ti hra líbila.");
        actions.push("Hrát znovu");
    }
    if (gameState.floor === 18) {
        actions.push("Další");
    }
    if (gameState.floor === 19) {
        qsTxt.innerHTML = ("Po vyhráném souboji se rozhlížíš po místnosti a všímáš si velkého trůnu, rozhodneš se: ")
        actions.push("Usednout na trůn");
        actions.push("Odejít z věže");
    }
    if (gameState.floor === 20) {
        qsTxt.innerHTML = ("Svižným krokem odcházíš z věže. Doufáš, že na vše rychle zapomeneš a vrátíš se ke svému normálnímu životu.")
        actions.push("Dále");
    }



    return actions;
}

function performActionOnState(action) {
    if (action === "Hrát znovu") {
        gameState.floor = 0;
    }
    if (action === "Projít branou") {
        gameState.floor = 0;
    }
    if (action === "Jít do věže") {
        gameState.floor = 1;
    }
    if (action === "Prohledat zahrady") {
        gameState.floor = 0.5;
    }
    if (action === "Vrátit se zpět") {
        gameState.floor = 0;
    }
    if (action === "Prohledat truhlu") {
        gameState.floor = 0.75;
    }
    if (action === "Další patro") {
        gameState.floor = 2;
    }
    if (action === "Lahvičku vzít") {
        gameState.floor = 3;
        inventoryAddItem("Lahvička");
        gameState.items.push("lahvicka");
    }
    if (action === "Lahvičku nebrat") {
        gameState.floor = 3;
    }
    if (action === "Knihovnu") {
        gameState.floor = 2.5;
    }
    if (action === "Konfrontovat") {
        enemyCombat(["Trpaslík", "Skřet"], 10, 1, 10);
        gameState.floor = 2.75;
    }
    if (action === "Bránit se") {
        enemyCombat(["Trpaslík", "Skřet"], 10, 1, 10);
        gameState.floor = 2.75;
    }
    if (action === "Obejít") {
        let chance = randomNumber(0, 1);
        if (chance === 0) {
            gameState.floor = 2.80;
        }
        if (chance === 1) {
            updateCurrentLevel(randomNumber(1, 2));
            gameState.floor = 3;
        }
    }
    if (action === "Pokračovat dál") {
        gameState.floor = 3;
    }
    if (action === "Utéct") {
        gameState.floor = 4;
    }
    if (action === "Bojovat") {
        enemyCombat(["Roj vidliček", "Roj nožů", "Roj lžiček"], 15, 2, 10);
        gameState.floor = 3.5;
    }
    if (action === "Pokračovat dále") {
        gameState.floor = 4;
    }
    if (action === "Použít lahvičku") {
        gameState.floor = 4.5;
        let index = gameState.items.indexOf("lahvicka");
        if (index > -1) {
            gameState.items.splice(index, 1);
            hideBttns(invBttns);
        }
    }
    if (action === "Utíkat") {
        gameState.floor = 5;
        let index = gameState.items.indexOf("lahvicka");
        if (index > -1) {
            gameState.items.splice(index, 1);
            hideBttns(invBttns);
        }
    }
    if (action === "Pokračovat") {
        gameState.floor = 5;
    }
    if (action === "Přečíst knihu") {
        gameState.floor = 5.5;
    }
    if (action === "Jít do skladiště") {
        gameState.floor = 6;
    }
    if (action === "Kapitolu I") {
        gameState.floor = 5.6;
    }
    if (action === "Kapitolu II") {
        gameState.floor = 5.7;
    }
    if (action === "Kapitolu III") {
        gameState.floor = 5.8;
    }
    if (action === "Sníst zásoby") {
        gameState.floor = 6.5;
    }
    if (action === "Postoupit dál") {
        gameState.floor = 7;
    }
    if (action === "Vypít lektvar") {
        gameState.floor = 7.5;
    }
    if (action === "Otevřít dveře") {
        gameState.floor = 7.75;
    }
    if (action === "Probudit se") {
        gameState.floor = 8;
    }
    if (action === "Zvednout se") {
        gameState.floor = 9;
    }
    if (action === "'Opět?'") {
        gameState.floor = 9.5;
    }
    if (action === "'Kdo jsi?'") {
        gameState.floor = 9.75;
    }
    if (action === "'Jaké je tvé učení?'") {
        gameState.floor = 9.80;
    }
    if (action === "'Jsem já hoden?'") {
        gameState.floor = 10;
    }
    if (action === "'Cirrostratus'") {
        gameState.floor = 11;
    }
    if (action === "'Altocumulus'") {
        gameState.floor = 11;
    }
    if (action === "'Stradivarius'") {
        gameState.floor = 12;
    }
    if (action === "Otevřít oči") {
        gameState.floor = 13;
    }
    if (action === "Jít splnit úkol") {
        gameState.floor = 14;
    }
    if (action === "Strčit Meter Ologa") {
        gameState.floor = 15;
    }
    if (action === "Usednout na trůn") {
        gameState.floor = 16;
    }
    if (action === "Dále") {
        gameState.floor = 17;
    }
    if (action === "Zběsile zaútočit") {
        enemyCombat(["Postava v kápi"], 35, 7, 14);
        gameState.floor = 18;
    }
    if (action === "Další") {
        gameState.floor = 19;
    }
    if (action === "Odejít z věže") {
        gameState.floor = 20;
    }



}


function loop() {
    function handleAction(e) {
        let actionName = e.target.dataset.action;
        performActionOnState(actionName);
        hideBttns(gameState.currentButtons);
        loop()
    }


    let actions = getAvailableActions();

    for (let action of actions) {
        let bttn = document.createElement("input");
        bttn.type = "button";
        bttn.value = action;
        bttn.id = "bttn";
        bttn.setAttribute("data-action", action);
        bttn.addEventListener("click", handleAction);
        document.querySelector("#options").appendChild(bttn);
        gameState.currentButtons.push(bttn);
    }
}








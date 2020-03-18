
function loot() {
    let items = ["Starý Meč", "Dřevěný Štít", "Netopýr", "Lektvar života"];
    let chance = randomNumber(0, items.length - 1);
    if (chance == 0) {
        qsTxt.innerHTML = ("Otevřel jsi truhlu a nacházíš" + "<p style='color:yellow'>" + items[chance] + "</p >" + "Získáváš bonus k ATK");
        updateStats(3, 0, 0);
    }
    if (chance == 1) {
        qsTxt.innerHTML = ("Otevřel jsi truhlu a nacházíš" + "<p style='color:yellow'>" + items[chance] + "</p >" + "Získáváš bonus k DEF");
        updateStats(0, 3, 0);
    }
    if (chance == 2) {
        let damage = randomNumber(1, 3);
        qsTxt.innerHTML = ("Otevřel jsi truhlu a nacházíš" + "<p style='color:red'>" + items[chance] + "</p >" + "Dostáváš poškození za " + damage);
        gameState.hp -= damage;
        healthUpdate();
    }
    if (chance == 3) {
        qsTxt.innerHTML = ("Otevřel jsi truhlu a nacházíš" + "<p style='color:yellow'>" + items[chance] + "</p >" + "Získáváš bonus k HP");
        gameState.hp += 10;
        healthUpdate();
    }
}

function updateStats(attack, defense, intelligence) {
    gameState.atk += attack;
    gameState.def += defense;
    gameState.int += intelligence;
    statTxt.innerHTML = "<span style='color:red'>ATK:" + gameState.atk + "</span>|<span style='color:green'>DEF:" + gameState.def + "</span>|<span style='color:rgb(0,70,255)'>INT:" + gameState.int + "</span>";
}

let statTxt = document.querySelector("#stats");
statTxt.innerHTML = "<span style='color:red'> ATK:" + gameState.atk + "</span>|<span style='color:green'>DEF:" + gameState.def + "</span>|<span style='color:rgb(0,70,255)'>INT:" + gameState.int + "</span>";




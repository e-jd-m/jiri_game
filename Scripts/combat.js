
function enemyHealthSubtraction(combatDamage, maxHealth) {
    maxHealth = maxHealth - combatDamage;

    if (maxHealth <= 0) {
        maxHealth = 0;
        return maxHealth;
    }
    return maxHealth;
}
function skirmish(enemy, enemyMaxHealth, maxHealth, minDamage, maxDamage) {
    let combatDamage = randomNumber(1 + gameState.atk, 10 + gameState.atk);
    let enemyCombatDamage = randomNumber(minDamage, maxDamage);
    damageCheck(calculateDamage(enemyCombatDamage));
    //if (maxHealth > 0) {
    maxHealth = enemyHealthSubtraction(combatDamage, maxHealth);
    qsTxt.innerHTML += "Dal jsi nepříteli " + enemy + " za " + combatDamage + " poškození. <br> <br>";
    if (maxHealth <= 0) {
        updateStats(atk = randomNumber(0, 2), def = randomNumber(0, 2), int = randomNumber(0, 1));
        qsTxt.innerHTML += "Porazil jsi " + enemy + "<br> <br> Obdržel jsi bonus " + "<span style='color:red'> ATK:" + atk + " </span>" + "<span style='color:green'> DEF:" + def + "</span>" + "<span style='color:rgb(0,70,255)'> INT:" + int + "</span>";
        return;
    }
    qsTxt.innerHTML += enemy + " (" + maxHealth + "/" + enemyMaxHealth + " HP) ti dal za " + enemyCombatDamage + " poškození. <br> <br>";
    gameState.hp -= enemyCombatDamage;
    healthUpdate();
    skirmish(enemy, enemyMaxHealth, maxHealth, minDamage, maxDamage);
    //}
}
function enemyCombat(type = [], enemyMaxHealth, minDamage, maxDamage) {
    let maxHealth = enemyMaxHealth;
    let enemy = type[randomNumber(0, type.length - 1)];
    document.querySelector("#questText");
    qsTxt.innerHTML = "Narazil jsi na " + enemy + " který má " + enemyMaxHealth + " HP. <br> <br>";
    skirmish(enemy, enemyMaxHealth, maxHealth, minDamage, maxDamage);
}





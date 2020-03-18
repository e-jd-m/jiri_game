
let healthTxt = document.querySelector("#healthBar");
healthTxt.innerHTML = gameState.hp + " HP";

function damageCheck(damage) {
    if (damage < 0) {
        damage = 0;
        return damage;
    }
    else
        return damage;
}

function calculateDamage(damage) {
    let dmg = damage - gameState.def;
    damageCheck(dmg);
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function healthUpdate() {
    healthTxt.innerHTML = gameState.hp + " HP";
    if (gameState.hp <= 0) {
        healthTxt.innerHTML = "Deceased";
        qsTxt.innerHTML = "Zemřel jsi."
    }
}

/*function healthSubtraction(damage) {
    gameState.hp -= damage;
}*/



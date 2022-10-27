$(document).ready(function () {
    var characters = {
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            imageUrl: "images/obi-wan.jpg",
            enemyAttackBack: 15
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 100,
            attack: 14,
            imageUrl: "images/luke-skywalker.jpg",
            enemyAttackBack: 5
        },
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 150,
            attack: 8,
            imageUrl: "images/darth-sidious.png",
            enemyAttackBack: 20
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 180,
            attack: 7,
            imageUrl: "images/darth-maul.jpg",
            enemyAttackBack: 25
        }
    }


    var attacker;
    var combatants = [];
    var defender;
    var turnCounter = 1;
    var killCount = 0;




    function showCharacters(character, area) {
        var chardiv = $("<div class='char' data-name='" + character.name + "' >");
        var charname = $("<div class='charname'>").text(character.name);
        var charimg = $("<img class='charimg' alt='img'>").attr("src", character.imageUrl);
        var charhealth = $("<div class='charhealth'>").text(character.health);
        chardiv.append(charname).append(charimg).append(charhealth);
        $(area).append(chardiv);
    }

    function createCharacters() {
        for (var key in characters) {
            showCharacters(characters[key], ".heroes")
        }
    }

    createCharacters();

    function showChar(character, area) {
        $(area).empty();
        showCharacters(character, area)

    }
    function showEnemies(enemies) {
        for (var i = 0; i < enemies.length; i++) {
            showCharacters(enemies[i], ".enemies")
        }
    }

    function renderMessage  (message) {
        var gameMessageSet = $(".msg");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    function clearMessage() {
        var gameMessage = $(".msg");

        gameMessage.text("");
    };

    function restartGame (resultMessage) {

        var restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });


        var gameState = $("<div>").text(resultMessage);

        $("body").append(gameState);
        $("body").append(restart);
    };


    $(".heroes").on("click", ".char", function () {
        var name = $(this).attr("data-name");

        if (!attacker) {
            attacker = characters[name]


            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key])
                }
            }
        }

        $(".heroes").hide()
        $(".firsth2").hide()

        showChar(attacker, ".choosencharacter");
        showEnemies(combatants)

    })

    $(".enemies").on("click", ".char", function () {


        var name = $(this).attr("data-name");


        if ($(".defender").children().length === 0) {
            defender = characters[name];
            showCharacters(defender, ".defender")
            $(this).remove()
        }
    })




    $(".attack").on("click", function () {
        if ($(".defender").children().length !== 0) {
            var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
            var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";

            clearMessage();

            defender.health -= attacker.attack * turnCounter;

            if (defender.health > 0) {
                showChar(defender, ".defender")

                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                attacker.health -= defender.enemyAttackBack;


                showChar(attacker, ".choosencharacter");
                if (attacker.health <= 0) {
                    clearMessage();
                    restartGame("You have been defeated...GAME OVER!!!");
                    $(".attack").off("click");
                }



            } else {
                $(".defender").empty();

                var newmsg = "You have defeated " + defender.name + ", you can choose to fight another enemy.";
                renderMessage(newmsg)

                killCount++

                if (killCount >= combatants.length) {
                    clearMessage();
                    $(".attack").off("click");
                    restartGame("You Won!!!! GAME OVER!!!");
                }
            }
            turnCounter++;

        } else {

            renderMessage("No enemy here.");
        }
    })
})

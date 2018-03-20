$(document).ready(function() {
// character options/attributes
    var options = {
        bart: {
            health: 120,
            attack: 7,
            counter: 8
        },
        homer: {
            health: 115,
            attack: 10,
            counter: 5
        },
        ned: {
            health: 150,
            attack: 5,
            counter: 15
        },
        nelson: {
            health: 170,
            attack: 8,
            counter: 10
        }
    }
    
    //initialize global variables
    var userChoice = "";
    var enemyChoice = "";
    var player = "";
    var opponent = "";
    var enemyCount = "";
    var playerHp = "";
    var opponentHp = "";
    var playerAttack = "";
    var playerName = "";
    var opponentName = "";
    var elem = "";
    var arr = "";
    
    
    
    function initializeGame () {
        //init variables for new game
        userChoice = false;
        enemyChoice = false;
        player = "";
        opponent = "";
        enemyCount = 3;
        $("#stat").empty();
        elem = document.getElementsByClassName("choice");
        arr = jQuery.makeArray(elem);
        $(".imgbox").css({"background" : "pink"});
        //display available character with hp
        $("#ned").text(options.ned.health);
        $("#nelson").text(options.nelson.health);
        $("#homer").text(options.homer.health);
        $("#bart").text(options.bart.health);
        $("#battleTwo").empty();
        //hide areas not available when game starts
        $(".enemyInstructions").hide();
        $(".playerInstructions").show();
        $(".containerArena").hide();
        $(".attack").hide();
        $(".reset").hide();
    
    }
    
    initializeGame(); //call initialize game function to start clean
    
    //click to pick player and opponent
    $(".choice").on("click", function () {
        //pick user player
        if (userChoice === false && enemyChoice === false) {
            $(".enemyInstructions").show();
            $(".playerInstructions").hide();
            $(".containerArena").show();
            $(".attack").show();
            $(".reset").show();
            player = options[$(this).data("gg-type")];
            playerName = $(this).data("gg-type");
            $(this).appendTo("#battle");
            $(this).css({"background" : "green"})
            $("#chars >.imgbox").appendTo("#enemies");
            userChoice = true; //player has been picks
            playerHp = player.health;  
            playerAttack = player.attack;
            
            
    
        //pick opponent
        } else if (userChoice === true && enemyChoice === false) {
            $(".enemyInstructions").hide();
            opponent = options[$(this).data("gg-type")];
            opponentName = $(this).data("gg-type");
            $(this).appendTo("#battleTwo");
            $(this).css({"background" : "red"});
            enemyChoice = true;
            opponentHp = opponent.health;
            $("#vs").css({"visibility": "visible"})
            $("#stat").empty();
            $(".attack").show();
        }
    
    })
    
    //click to attack
    $(".attack").on("click", function () {
    
        if (enemyChoice === true && userChoice === true) {
    
        //change player hp based on opp counter
        playerHp -= opponent.counter;
        $("#" + playerName+ "").html(playerHp);
    
        //change opp hp based on player attack
        opponentHp -= playerAttack;
        $("#" + opponentName + "").html(opponentHp);
    
        //increase player attack power
        playerAttack += player.attack;
    
        $("#stat").html("<p>You attacked " + opponentName.toUpperCase() + " for " + playerAttack + " damage.</p>" +
        "<p>" + opponentName.toUpperCase() + " attacked you back for " + opponent.counter + " damage.</p>")
    
        checkWin();
        } 
        else 
        {
            $("#stat").html("<p>Choose a player AND enemy before attacking!</p>");
        }
    
        })
    
    
    //click to restart 
    $(".reset").on("click", function () {
        // $(".reset").css({"visibility": "hidden"});
        $(".imgbox").appendTo("#chars");
        $("#vs").css({"visibility": "hidden"});
        for (var i = 0; i < arr.length; i++) {
            $("#chars").append(arr[i]);
        }
        initializeGame();
    })
    
    function checkWin () {
        
        //player won with no enemies left
        if (playerHp > 0 && opponentHp <= 0 && enemyCount <= 1 && enemyChoice === true && userChoice === true) {
            // $("#stat").html("<h2> YOU WIN! </h2>");
            $("#battleTwo > .imgbox").detach();
            $(".reset").css({"visibility": "visible"});
            $("#vs").css({"visibility": "hidden"});
            $("#stat").html("<img src='assets/images/donut.png'>" + "<br>" + "<h3>You won a DONUT!!!!</h3>");
            $(".attack").hide();
            new Audio("assets/audio/mmm.wav").play();
    
    
    
        //player won with enemies remaining
        } else if (playerHp > 0 && opponentHp <= 0 && enemyChoice === true && userChoice === true) {
            $("#stat").html("<p>You beat " + opponentName.toUpperCase() + ". Pick a new opponent!</p>");
            $("#battleTwo > .imgbox").detach();
            enemyCount--;
            enemyChoice = false;
            $("#vs").css({"visibility": "hidden"});
            $(".attack").hide();
            
    
        //opponent won	
        } else if (playerHp <= 0 && opponentHp > 0 || playerHp <= 0 && opponentHp <= 0 && userChoice === true) {
            $("#stat").html("<h2> You Lose! <br>" + opponentName.toUpperCase() + " destroyed your yellow ass!</h2>");
            $("#vs").css({"visibility": "hidden"});
            $(".reset").css({"visibility": "visible"});
            $("#battle > .choice").detach();
            userChoice = false;
            $(".attack").hide();
            new Audio("assets/audio/doh.wav").play();
        }
    
    }
    
    })
    
    
    
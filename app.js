new Vue({
    el: "#app",

    data:{
        startGame: false,
        numberYou: 100,
        numberMonster: 100,
        widthYou: 100,
        widthMonster: 100,
        actions: [],
        clickButton: false
    },


    methods: {
        randomNum: function(max, min) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        checkDead: function(check, subtractNum) {
            return check - subtractNum < 0 ? 0: check - subtractNum;
        },

        playAgain: function(){
            if (confirm("Start a new game?")){
                this.startGame = true;
            }
            this.startOver();

        },
        pushAction: function (player, action, opponent, number, monster){
            return {
                monster: monster,
                print: player + " " + action + " " + opponent  + " FOR " + number
            }
                
        },

        giveUp: function(){
            this.startGame = false;
            this.startOver();
        },

        heal: function() {
            const you = this.randomNum(10, 1)
            this.numberYou = this.numberYou < 100 ? this.numberYou + you : this.numberYou;
            this.widthYou = this.numberYou < 100 ? this.widthYou + you : this.widthYou;
            this.actions.unshift(this.pushAction("YOU", "HEAL", "YOURSELF", you, false));
        },

        endGame: function(){
            if (this.numberYou === 0 && this.numberMonster === 0){
                this.startGame = false;
                alert("You both tied!");

            }
            else if (this.numberYou == 0){
                this.startGame = false;
                alert("Monster won!");

            }

            else if (this.numberMonster == 0){
                this.startGame = false;
                alert("You won!");

            }

            if (this.startGame === false){
                this.playAgain();
            }
        },


        attackYou: function(){
            const you = this.randomNum(10, 1)
            this.numberYou = this.checkDead(this.numberYou, you)
            this.widthYou= this.checkDead(this.widthYou, you)
            this.actions.unshift(this.pushAction("MONSTER", "ATTACKS", "YOU", you, true));

        },

        attackMonster: function(max, min){
            const monster = this.randomNum(max, min);
            this.numberMonster= this.checkDead(this.numberMonster, monster)
            this.widthMonster= this.checkDead(this.widthMonster, monster)
            this.actions.unshift(this.pushAction("YOU", "ATTACK", "MONSTER", monster, false));

        },

        attack: function() {
            console.log("attack")
            this.attackYou();
            this.attackMonster(10, 1);
            this.endGame();

        },

        specialAttack: function(){
            this.attackYou();
            this.attackMonster(20, 1);
            this.endGame();    
        },

        startOver: function(){
            this.numberYou= 100
            this.numberMonster = 100
            this.widthYou = 100
            this.widthMonster = 100
            this.actions = []
            this.clickButton = false
        }
    
    },





})
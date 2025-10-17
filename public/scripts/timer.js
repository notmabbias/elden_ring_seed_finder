
$(function() {
    let countMain=270;
    let countMin=0;
    let countRing=0;
    let ring1 = true;
    let ring2 = true;
    let countingRing = false;
    let displayStringMain = " until ring 1 starts"
    let displayStringRing = " until ring 1 closes"
    let timerInt = null;

    timerInt = setInterval(() => {
        //display timer
        countMain--;

        //ring counter, only runs after ring1 closed
        if (!ring1 && countRing != 0) {
            countRing--;
        }

        //if either ring is true, update 
        if (ring1 || ring2) {
            $("#timerTest").html(String(Math.floor(countMain/60)).padStart(2,"0") + ":" + String(countMain%60).padStart(2,"0")+displayStringMain)
        }


        //fix this somehow
        if(countingRing && countRing !== 0) {
            $("#ringTimer").html(String(Math.floor(countRing/60)).padStart(2,"0") + ":" + String(countRing%60).padStart(2,"0")+displayStringRing)
        }

        if(countRing === 0) {
            $("#ringTimer").html("")
        }
        

        //once ring1 is done, set time to 6:30 and ring counter to 2:00
        if (countMain === 0 && ring1) {
            countMain=390
            countRing=120;
            ring1=false; //false ring flag
            displayStringMain = " until ring 2 starts"
            countingRing = true;
        }
        //if ring2 is done, set ring timer to 3:00
        if (countMain === 0 && !ring1) {
            ring2=false; //false ring2 flag
            countRing=180; //3:00
            displayStringRing = " until ring 2 closes"
            $("#timerTest").html("")

        }

        if (countRing === 0 && !ring2) {
            clearInterval(timerInt);
            $("#ringTimer").html("Good luck!")
        }

        

    },10);


    $('#button2').on('click', function() {
        clearInterval(timerInt);
        console.log("timer stopped")
    })

});



//4:30 first ring start
//7:30 first ring close (2min)
//11:00 second ring start
//14:00 second ring close (3min)




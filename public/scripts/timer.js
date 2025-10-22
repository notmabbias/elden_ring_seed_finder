
$(function() {

    let timerInt = null;

    const speed = 1000

    startTimer(265,"Goodluck!",true);

    function startTimer(startTime,endMessage,resetBool) {
            let countMain=startTime;
            let countRing=0;
            let ring1 = true;
            let ring2 = true;
            let countingRing = false;
            let displayStringMain = "Ring 1 Starts In: "
            let displayStringRing = "Ring 1 Closes in: "

            $("#ringStart").html("")
            $("#ringClose").html("")
            $("#timerReset").html("")
        timerInt = setInterval(() => {
        //display timer
        countMain--;

        //ring counter, only runs after ring1 closed
        if (!ring1 && countRing != 0) {
            countRing--;
        }

        //if either ring is true, update 
        if (ring1 || ring2) {
            $("#ringStart").html(displayStringMain+String(Math.floor(countMain/60)).padStart(2,"0") + ":" + String(countMain%60).padStart(2,"0"))
        }
        
        if(countingRing && countRing !== 0) {
            $("#ringClose").html(displayStringRing+String(Math.floor(countRing/60)).padStart(2,"0") + ":" + String(countRing%60).padStart(2,"0"))
        }

        if(countRing === 0) {
            $("#ringClose").html("")
        }
        

        //once ring1 is done, set time to 6:30 and ring counter to 2:00
        if (countMain === 0 && ring1) {
            countMain=390
            countRing=180;
            ring1=false; //false ring flag
            displayStringMain = "Ring 2 Starts In: "
            countingRing = true;
        }
        //if ring2 is done, set ring timer to 3:00
        if (countMain === 0 && !ring1) {
            ring2=false; //false ring2 flag
            countRing=180; //3:00
            displayStringRing = "Ring 2 Closes in: "
            $("#ringStart").html("")

        }

        if (countRing === 0 && !ring2) {
            clearInterval(timerInt);
            $("#ringStart").html(endMessage)
            $("#ringClose").html("")
            if (resetBool) {
                $("#timerReset").html("(Reset)")
            }
            timerInt = null;
        }

        

        },speed);
    }

    $('#timerReset')
    .on('mouseup mouseleave touchend touchcancel', function() { $(this).removeClass('press'); })
    .on('click', function() {
        startTimer(300,"good luck!",false); 
    });


    $('#button2').on('click', function() {
        clearInterval(timerInt);
        console.log("timer stopped")
    })

    

});



//4:30 first ring start
//7:30 first ring close (2min)
//11:00 second ring start
//14:00 second ring close (3min)




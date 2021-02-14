let reelChoices = ['eddy', 'hwoarang', 'kunimitsu', 'king', 'devil-jin', 'mokujin'];
let budget = 1000;
let bet = 5;


document.querySelector('#budget').innerText = `$${budget}.00`;
document.querySelector('#bet5').addEventListener('click', checkBudget);
document.querySelector('#bet50').addEventListener('click', checkBudget);
document.querySelector('#spin').addEventListener('click', spinOutcome);
document.querySelector('#banner').addEventListener('click', toggleSpin);

function checkBudget(e) {
    console.log(e.target.id);
    let bet;
        (e.target.id ==='bet5') ? bet = 5 : bet = 50;
    if (bet < budget) {
        if (bet === 50)
            document.querySelector('#currentlyBetting').innerText = 0;
        else
            document.querySelector('#currentlyBetting').innerText = '';
    }
    else
        alert('You do not have enough funds');
}

function spinOutcome() {
    let r1 = returnRandomNumber(), 
        r2 = returnRandomNumber(), 
        r3 = returnRandomNumber();
    let reeled = [r1, r2, r3];
    let multiplier;

    toggleSpin();
    displayChosen(reeled)

    console.log(`${r1}, ${r2}, ${r3}`);

    if (matched(reeled) === 3) {
        switch(r1) {
            case 0: multiplier = 10;
                break;
            case 1: multiplier = 7.5;
                break;
            case 2: multiplier = 5;
                break;
            case 3: multiplier = 2.5;
                break;
            case 4: multiplier = 20;
                break;
            case 5: multiplier = 1.2;
                break;
        }
        budget += (bet * multiplier); 
        console.log(multiplier);
    }
    else if (matched(reeled) === 2)
        budget += (bet * 1);
    else
        budget -= bet;
    if (budget <= 4.99) {
        gameOver();
    }
    document.querySelector('#budget').innerText = `$${budget}${budget % 1 === 0 ? '.0': ''}0`;
}


function returnRandomNumber() {
    const probabilityManager = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
    return probabilityManager[Math.floor(Math.random() * probabilityManager.length)];
}

function matched(entriesReeled) {
    if (entriesReeled[0] == entriesReeled[1] && entriesReeled[0] == entriesReeled[2])
        return 3;
    else if (entriesReeled[0] == entriesReeled[1] ||
             entriesReeled[0] == entriesReeled[2] ||
             entriesReeled[1] == entriesReeled[2]
        )
        return 2;
    else 
        return 0;
}

function gameOver() {
    alert('Play again?');
}

function displayChosen(results) {
    stopReel('.r1', results[0]);
    // console.log('Finished reel 1');
    stopReel('.r2', results[1]);
    // console.log('Finished reel 2');
    stopReel('.r3', results[2]);
    // console.log('Finished reel 3');
    // document.querySelector(`.r2 > [data-reel-value=\'${reelChoices[results[1]]}\']`).style.removeProperty('transform');
    // document.querySelector(`.r3 > [data-reel-value=\'${reelChoices[results[2]]}\']`).style.removeProperty('transform');
    // window.setTimeout(toggleSpin, 5*1000);
}

function stopReel(reel, selected) {
    window.setTimeout( () => {
            document.querySelector(`${reel} > [data-reel-value=\'${reelChoices[selected]}\']`).classList.toggle('noDeg'); 
            for(i = 0; i < reelChoices.length; i++){
                if (i !== selected )
                    document.querySelector(`${reel} > [data-reel-value=\'${reelChoices[i]}\']`).style.display = 'none';
            }
            document.querySelector(reel).classList.toggle('spin');
            document.querySelector(`${reel} > [data-reel-value=\'${reelChoices[selected]}\']`).classList.toggle('spinning');
        }, 2*1000);
}


function toggleSpin() {
    // reels is the list of the 3 reels
    // imageResize is the list of all of the images in each reel
    let reels = document.querySelectorAll('.reel');

    reels[0].classList.toggle('spin');
    toggleImageClasses(reels[0].children);
    resetClasses(reels[0]);

    window.setTimeout(() => {
        reels[1].classList.toggle('spin');
        toggleImageClasses(reels[1].children);
        resetClasses(reels[1]);
    }, 0.5*1000);
    
    window.setTimeout(() => {
        reels[2].classList.toggle('spin');
        toggleImageClasses(reels[2].children);
        resetClasses(reels[2]);
    }, 0.75*1000);
}

function toggleImageClasses(imagesInReel) {
    for(i=0; i < imagesInReel.length; i++){
        imagesInReel[i].classList.toggle('spinning');
    }
}

function resetClasses(reel) {
    let picturesArray = reel.children;
    for(i = 0; i < picturesArray.length; i++) {
        picturesArray[i].style.display = 'block';
        console.log(picturesArray[i]);
        picturesArray[i].classList.remove('spinning');
    //     if (picturesArray[i].classList.contains('spinning')){
    //         // picturesArray[i].classList.toggle('spinning');
    //         console.log(`Turned off spinning for ${picturesArray[i].alt}`);
    //     }
    };
}

// Highest -> Lowest
// Devil Jin, Eddy, Hwoarang, Asuka, King, Mokujin


/*
User can bet a minimum of $5, max of $50, and is starting out with account=$1000
if User clicks on bet $5/$50
    Is account >=$5/$50?
        If so
            When user pulls lever {
                if result is X-X-X -> account += (bet * 10)
                else if match(result) is X-X-Y || X-X-Z -> account += (bet * 5)
                else (result is X-Y-Z) -> account -= bet;
            }
*/

/*If match(result) == 3, *10
If match(result) == 2, * 5
if match(result) == 0 -bet*/


/* MATCH FUNCTION (RESULTS)
CONSOLE.LOG(RESULTS) -> 7, 7, 7
LET MATCHING = 0;
FOR(I=0; I < RESULTS.LENGTH; I++) {
    RESULTS[I] = RESULTS[I+1]
    IF TRUE
        MATCHING+=1;
}
RETURN MATCHING -> 3;



*/
//2 BIG DEMANDS FOR THE FUNCTION TO WORK SMOOTHLY AND WELL
//at the end of the chord line must be at least 1 SPACE after the last chord
//between the chords must be at least 1 SPACE

function transpose(text){    
    // let text = "           A#               Gm      A                             Dm ";

    // let lyrics = "Things are easy when you're big in Japan, oh when you're big in Japan"

    let circle = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

    let keyTokens = [];

    let splits = text.match(/ *[A-G]#?m? */g);

    let transposedKeyTokens = [];

    let spaceTokens = [];

    let newSimpleTokens = [];

    let simpleTokens = [];

    let newText = "";

    let dest = 1;

    //make simpleTokens with a simple split

    splits.forEach(el => {
        let tmp = el.split(" ");
        tmp.forEach(x => simpleTokens.push(x))
    });

    console.log(simpleTokens);

    //erase empty tokens from simpleTokens array

    simpleTokens = simpleTokens.filter(el => el != '');

    //make keyTokens (extract the KEYS from simpleTokens)

    simpleTokens.forEach(el=>{
        if(el.includes('#')){
            let tmp = el[0]+el[1];
            keyTokens.push(tmp);
        }
        else
            keyTokens.push(el[0]);
    })

    // transpose all the keys in the keyTokens array

    transposedKeyTokens = keyTokens.map(el=>{
        for(let i=0;i<circle.length;i++)
        if(circle[i] == el) return circle[(i+dest)%12];
    })

    // makes spaceTokens to hold values 0-2
    // 0: no hash to no hash OR hash to hash keyTokens
    // 1: no hash to hash key
    // 2: hash to no hash key


    spaceTokens = keyTokens.map(function(el,ind){
        if(el.includes('#') && (!transposedKeyTokens[ind].includes('#')))
            return 2;
        else if((!el.includes('#')) && transposedKeyTokens[ind].includes('#'))
            return 1;
        else
            return 0;
    });

    //build newSimpleTokens array which holds the new transposed CHORDS (not just keys)

    simpleTokens.forEach((el,ind)=>{
        newSimpleTokens.push(el.replace(keyTokens[ind],transposedKeyTokens[ind]));
    });

    // splits ->  |    Am   | |B | |C#m    | |Dm7  | |A#m7           |
    // we replace at all splits, the simpleTokens with newSimpleTokens
    // after every replacement we build newText

    spaceTokens.forEach((el,ind)=>{
        if(el == 1)
            newText += splits[ind].replace(simpleTokens[ind]+' ',newSimpleTokens[ind]);
        else if(el == 2)
            newText += splits[ind].replace(simpleTokens[ind],newSimpleTokens[ind]+' ');
        else
            newText += splits[ind].replace(simpleTokens[ind],newSimpleTokens[ind]);
    })

    return newText;
}

//gets the chords class name (as we named our chords in html) and transposes all the chords

function main(className){
    let chords = document.getElementsByClassName(className);

    for(let i=0;i<chords.length;i++){
        chords[i].innerHTML = transpose(chords[i].innerHTML);
    }
    console.log('++++++++++++++++++++++++++++++++++++++++++');
}

function hideChords(){
    let chords = document.getElementsByClassName("chords");
    for(let i=0;i<chords.length;i++){
        let vsbl = window.getComputedStyle(chords[i], null).getPropertyValue("visibility");
        if(vsbl === 'hidden')
            chords[i].style.visibility = 'visible';
        else
            chords[i].style.visibility = 'hidden';
    }


}


// for debugging purposes!!!
 
function mes(){
    console.log("simpleTokens " + simpleTokens);
    console.log("keyTokens " + keyTokens);
    console.log("tranposedKeyTokens " + transposedKeyTokens);
    console.log("spaceTokens " + spaceTokens);
    console.log("newSimpleTokens " + newSimpleTokens);
    console.log('===================================================================================');
    console.log(text);
    console.log(lyrics);
    console.log('___________________________________________________________________________________');
    console.log(newText);
    console.log(lyrics);
}
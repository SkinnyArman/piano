




let pianoNotes=['C','D','E','F','G','A','B']
let keyMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W','E','R','T','Y','U','I','O','P','A','S','D','F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N'];
let hbd=`G4,G4,A4,,G4,,C5,,B4,,,,G4,G4,A4,,G4,,D5,,C5,,,,G4,G4,G5,,E5,,C5,,B4,,A4,,F5,F5,E5,,C5,,D5,,C5,,,,`
let jingleBells = `B3,,B3,,B3,,,,B3,,B3,,B3,,,, B3,,D4,,G3,,A3,B3,,,,C4,,C4,,C4,,,,C4,C4,,B3,,B3,,,,B3,B3,B3,,A3,,A3,,B3,,A3,,,,D4`;
let playbuttton=document.querySelector(".piano-play-btn")
let tempoGrabber=document.querySelector(".temper");
let songGrabber=document.querySelector(".piano-song-list")
let controls=document.querySelectorAll(".piano-control-option"); 

// Keyboard Changer

controls.forEach( (item)=> {
    item.addEventListener('click',()=>{
        getValue=item.value;
        console.log(getValue);
        let keyGrab=document.querySelectorAll("button.piano-key");
        keyGrab.forEach( (buttonItem)=>{
            buttonItem.textContent=buttonItem.dataset[getValue];
        })
    })
})

let init = () => {
    for (i=1;i<=5;i++){
        for (j=0;j<7;j++){
            let key = createKey('white',pianoNotes[j],i);
            key.dataset.keyboard= keyMap[j + (i-1)*7]
            if (j!=2 && j!=6){
            let key= createKey('black',pianoNotes[j],i);
            key.dataset.keyboard="⇧+"+keyMap[j + (i-1)*7];
            } 
        } 
    }
}

let myPiano=document.querySelector(".piano-keyboard");

let playSong=(notestring,temp)=>{

let notes=notestring.split(",");

let currentNote=0;
let btn;
console.log(notes)

let interval = setInterval ( ()=>{
if(currentNote<notes.length){
    if(notes[currentNote]!==""){
        btn=document.querySelector(`[data-letternote=${notes[currentNote]}]`);
        if (currentNote>0){
            if(notes[currentNote-1]!==""){
                lastbtn=document.querySelector(`[data-letternote=${notes[currentNote-1]}]`);
                lastbtn.classList.remove("piano-key-playing");
            }
        }
        if (currentNote>1){
            if(notes[currentNote-2]!==""){
                lastbtn=document.querySelector(`[data-letternote=${notes[currentNote-2]}]`);
                lastbtn.classList.remove("piano-key-playing");
            }
        }
        if (currentNote>2){
            if(notes[currentNote-3]!==""){
                lastbtn=document.querySelector(`[data-letternote=${notes[currentNote-3]}]`);
                lastbtn.classList.remove("piano-key-playing");
            }
        }
        if (currentNote>3){
            if(notes[currentNote-4]!==""){
                lastbtn=document.querySelector(`[data-letternote=${notes[currentNote-4]}]`);
                lastbtn.classList.remove("piano-key-playing");
            }
        }
        
        playsound(btn);    

    }


    currentNote++;

    
} else {
    btn.classList.remove("piano-key-playing");
    clearInterval(interval);
    playbuttton.disabled=false;
}

},300/tempoGrabber.value )

}
playbuttton.addEventListener('click',()=>{
    let playwhich=songGrabber.value;
    playbuttton.disabled=true;
    if (playwhich==1){
        playSong(jingleBells)
    } else {
        playSong(hbd)
    }

})


document.addEventListener('keydown', (e)=> {
    if (e.repeat){
        return
    }
    let letter=e.key.toUpperCase();
    let isShiftPressed=e.shiftKey;
    let selector;

    if (isShiftPressed){
        selector=`[data-keyboard="⇧+${letter}"]`
    } else {
        selector=`[data-keyboard=${letter}]`
    }
    theKey=document.querySelector(selector);

    if (theKey !==null){
        theKey.classList.add("piano-key-playing");

        playsound(theKey)
    } 
});

document.addEventListener('keyup',(e)=> {
    let letter=e.key.toUpperCase();
    let isShiftPressed=e.shiftKey;
    let selector;

    if (isShiftPressed){
        selector=`[data-keyboard="⇧+${letter}"]`
    } else {
        selector=`[data-keyboard=${letter}]`
    }
    theKey=document.querySelector(selector);
    theKey.classList.remove("piano-key-playing");

})



let createKey= (type,note,octave)=> {
    let key=document.createElement('button');
    key.className=`piano-key piano-key-${type}`;
    if (key.className.includes("white")){
        key.dataset.letternote= note + octave;
        key.dataset.letternotefilename=note + octave;
        myPiano.appendChild(key);

    } else {
        key.dataset.letternote= note + "#" + octave;
        key.dataset.letternotefilename=note + "s" + octave;
        let black=document.createElement("div");
        black.className="empty-space";
        black.appendChild(key);
        myPiano.appendChild(black);
    }
    key.textContent = key.dataset.letternote;
    key.addEventListener('mousedown',()=>{
        playsound(key);
        key.classList.add("piano-key-playing");
    });
    key.addEventListener('mouseup',()=>{
        key.classList.remove("piano-key-playing");
    })
    key.addEventListener('mouseleave',()=>{
        key.classList.remove("piano-key-playing");
    })

    
    return key
}

let playsound= (theKey) => {
    console.log(theKey)
    let audio=document.createElement('audio');
    audio.src="sounds/"+theKey.dataset.letternotefilename+".mp3";

    theKey.classList.add("piano-key-playing");
    audio.play().then( ()=>{audio.remove});
}

init();

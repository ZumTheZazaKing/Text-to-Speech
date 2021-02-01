//Grabbing HTML Elements
const voiceSelect = document.querySelector('select');

const inputTxt = document.querySelector('textarea');

let userRate = document.querySelector('#rate');

let userPitch = document.querySelector('#pitch');

//function to list down all available voices provided
function populateVoiceList(){

    const voices = speechSynthesis.getVoices();

    for(var i = 0; i < voices.length; i++){

        let option = document.createElement('option');

        option.textContent = voices[i].name + ' (' + voices[i].lang + ') ';


        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);

        voiceSelect.appendChild(option);

    }

}

//to initiate the populateVoiceList function
populateVoiceList();

if(speechSynthesis.onvoiceschanged !== undefined){

    speechSynthesis.onvoiceschanged = populateVoiceList;

}


//function for the speak button and to make the bot speak according to the attributes it's been given
//(attributes such as voice, rate and pitch)
function botSpeak(){

    const voices = speechSynthesis.getVoices();

    let msg = new SpeechSynthesisUtterance(inputTxt.value);

    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

    for(var i = 0; i < voices.length; i++){

        if(voices[i].name === selectedOption){

            msg.voice = voices[i];

        }

    }

    msg.rate = userRate.value;

    msg.pitch = userPitch.value;

    speechSynthesis.speak(msg);

}

//a very simple function to cancel the bot from speaking
function botStop(){

    speechSynthesis.cancel();

}
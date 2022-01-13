import Universe from './classes/Universe';
import SoundPlayer from './classes/SoundPlayer';
import Utils from './classes/Utils';
import {projects} from './data/projects.js';


window.onload = init;

function init(){
    Utils.createProjectsPage(projects);

    const universe = new Universe();

    const muteBtn = document.getElementById('muteBtn');
    const soundBtn = document.getElementById('soundBtn');
    const backBtn = document.getElementById('backBtn');
    
    const contactForm = document.getElementById("contactForm");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    const closePopupBtn = document.getElementById('closePopupBtn');
    const imagePopupContainer = document.getElementById('imagePopupContainer');
    const imagePopup = document.getElementById('imagePopup');
    const videoPopup = document.getElementById('videoPopup');
    
    const hoverSoundComponents = document.getElementsByClassName("hoversound");



    for(let element of hoverSoundComponents){
        element.addEventListener('mouseenter', () => SoundPlayer.playHoverSound());
        element.addEventListener('mouseleave', () => SoundPlayer.stopHoverSound());
        element.addEventListener('click', () => SoundPlayer.playClickSound());
    }

    backBtn.addEventListener('click', () => {
        universe.backToMap();
    });
    

    soundBtn.addEventListener('click', () => {
        SoundPlayer.soundMute();
        Utils.toggleDOMElementDisplay(muteBtn);
        Utils.toggleDOMElementDisplay(soundBtn);
    });

    muteBtn.addEventListener('click', () => {
        SoundPlayer.soundResume();
        Utils.toggleDOMElementDisplay(soundBtn);
        Utils.toggleDOMElementDisplay(muteBtn);
    });

    
    closePopupBtn.addEventListener("click", () => {
        Utils.toggleDOMElementDisplay(imagePopupContainer);
        videoPopup.src = '';
        imagePopup.src ='';
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if(nameField.value != "" && emailField.value != "" && messageField.value != ""){
            Utils.sendMail(nameField.value, emailField.value, messageField.value);
        }
    });


    
    window.addEventListener("resize", () => universe.onWindowResize());
}

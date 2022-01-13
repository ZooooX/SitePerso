import * as THREE from "three";

export default class SoundPlayer {

    static hoverSound = null;
    static clicSound = null;
    static ambiantSound = null;
    static listener = null;

    static loadSounds(listener) {
        const audioLoader = new THREE.AudioLoader();
        this.listener = listener;

        this.hoverSound = new THREE.Audio(listener);

        audioLoader.load( '../assets/sounds/UIDefaultThemeSelect.ogg', (buffer) => {
            this.hoverSound.setBuffer( buffer );
            this.hoverSound.setVolume(0.5);
        });
        
        this.clicSound = new THREE.Audio(listener);
        audioLoader.load("../assets/sounds/UIDefaultThemeSelectConfirm.ogg", (buffer) => {
            this.clicSound.setBuffer( buffer );
            this.clicSound.setVolume(0.5);
        });
        this.clicSound.duration = 0.3;

        this.ambiantSound = new THREE.Audio(listener);
        audioLoader.load( '../assets/sounds/UIStarchartLoopRedux.ogg', (buffer) => {
            this.ambiantSound.setBuffer( buffer );
            this.ambiantSound.setVolume(0.2);
            this.ambiantSound.setLoop(true);
            this.ambiantSound.play();
        });
    }

    static soundMute(){
        this.listener.context.suspend();
    }

    static soundResume(){
        this.listener.context.resume();
    }

    static playHoverSound() {
        if(!this.hoverSound.isPlaying){
            this.hoverSound.play();
        }
    }

    static stopHoverSound() {
        if(this.hoverSound.isPlaying){
            this.hoverSound.stop();
        }
    }

    static playClickSound(){
        if(!this.clicSound.isPlaying){
            this.clicSound.play();
        }
    }
}
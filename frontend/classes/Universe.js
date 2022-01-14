import Planet from './Planet';
import Stars from './Stars';

import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';

import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Utils from './Utils';
import DOMCategory from './DOMCategory';
import SoundPlayer from './SoundPlayer';
import SpaceSuit from './SpaceSuit';
import BlackHole from './BlackHole';
import SpaceName from './SpaceName';

export default class Universe {
    constructor(){
        this.initUniverse();
    }

    initUniverse(){

        this.canvas = document.querySelector("canvas");

        this.renderer = new THREE.WebGLRenderer({
            canvas : this.canvas,
            antialias : true
        });
        
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(window.innerWidth,window.innerHeight);

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight , 1 , 10000);
        this.scene.add(this.camera);

        // create an AudioListener and add it to the camera
        this.listener = new THREE.AudioListener();
        this.listener.context.suspend();

        this.camera.add( this.listener );
        this.camera.position.set(0,2000,0);
        this.camera.lookAt(0,0,0);

        const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
        this.scene.add( light ); 

        //this.controls = new OrbitControls(this.camera, this.canvas);
        this.objects = [];
        this.createObjects();

        // const size = 10000;
        // const divisions = 100;
        
        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper ); 

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.initEvents();
        SoundPlayer.loadSounds(this.listener);

        this.hoveredPlanet = null;
        this.focusedPlanet = null;

        

        THREE.DefaultLoadingManager.onLoad = () => {
            Utils.toggleDOMElementDisplay(document.getElementById("loading"));
            this.addObjectsToScene();
            this.animate();
            this.startCinematic();
        };

    }

    initEvents(){
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("click", this.onClick.bind(this));
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));

        if(!this.focusedPlanet) this.checkHoveredPlanets();
        this.animateObjects();
        TWEEN.update();

        //this.controls.update();
        this.renderer.render(this.scene,this.camera);
    }

    createObjects(){
        this.earth = new Planet("Profil",new THREE.Vector3(0,0,-120),[0,0.65,1], "../assets/img/earth.jpg",this.scene,this.camera);
        this.ceres = new Planet("Projets",new THREE.Vector3(120,0,-40),[1,1,1], "../assets/img/ceres.jpg",this.scene,this.camera);
        this.sedna = new Planet("Skills",new THREE.Vector3(-120,0,-40),[1,0,0], "../assets/img/Sedna.png",this.scene,this.camera);
        this.jupiter = new Planet("Indisponible",new THREE.Vector3(-70,0,100),[1,1,0], "../assets/img/jupitermap.jpg",this.scene,this.camera);
        this.purpleplanet = new Planet("Contact",new THREE.Vector3(70,0,100),[1,0.4,1], "../assets/img/purpleplanet.png",this.scene,this.camera);
        this.stars = new Stars();
        this.spacesuit = new SpaceSuit();
        this.blackhole = new BlackHole();
        this.spacename = new SpaceName();

        this.objects = [
            this.earth,
            this.ceres,
            this.sedna,
            this.jupiter,
            this.purpleplanet,
            this.stars,
            this.spacesuit,
            this.blackhole,
            this.spacename
        ];
    }

    animateObjects(){
        this.earth.animation(this.camera);
        this.ceres.animation(this.camera);
        this.sedna.animation(this.camera);
        this.jupiter.animation(this.camera);
        this.purpleplanet.animation(this.camera);
        this.spacesuit.animation(this.camera);
        this.blackhole.animation(this.camera);
    }

    addObjectsToScene(){
        this.objects.forEach((object) => {
            object.addObjectsToScene(this.scene);
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    onMouseMove( event ) {
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    onClick(event){
        if(this.hoveredPlanet){
            this.cinematic.stop();
            Utils.moveObject(this.camera,this.camera.position,new THREE.Vector3(this.hoveredPlanet.planet.position.x - (window.innerWidth * 0.08),this.hoveredPlanet.planet.position.y + 225,this.hoveredPlanet.planet.position.z), 1500);
            SoundPlayer.playClickSound();
            this.focusedPlanet = this.hoveredPlanet;
            this.focusedPlanet.mouseLeaveEffects();
            this.hideObjects();
            this.hoveredPlanet = false;
            DOMCategory.show(this.focusedPlanet.name);
        }
    }

    checkHoveredPlanets(){
        // update the picking ray with the camera and mouse position
	    this.raycaster.setFromCamera( this.mouse, this.camera );

        // calculate objects intersecting the picking ray
	    const intersects = this.raycaster.intersectObjects( this.scene.children );

        if(intersects.length != 0){
            if(intersects[0].object.userData["type"] == 'planet' && intersects[0].object.userData["classInstance"] != this.hoveredPlanet){
                if(this.hoveredPlanet){
                    this.hoveredPlanet.mouseLeaveEffects();
                }
                const hoveredPlanet = intersects[0].object.userData["classInstance"];
                hoveredPlanet.hoverEffects();
                this.hoveredPlanet = hoveredPlanet;
            }
        }else{
            if(this.hoveredPlanet) this.hoveredPlanet.mouseLeaveEffects();
            
            this.hoveredPlanet = null;
        } 
    }

    backToMap(){
        this.showObjects();
        Utils.moveObject(this.camera,this.camera.position,new THREE.Vector3(0,400,0),1000);     

        if(this.focusedPlanet){
            this.focusedPlanet.focused = false;
            this.focusedPlanet = null;
        }

        DOMCategory.hide();
    }

    startCinematic(){
        this.cinematic = Utils.moveObject(this.camera,this.camera.position, new THREE.Vector3(0,400,0), 4000);
        this.spacename.startCinematic();
    }

    
    hideObjects(){
        this.objects.forEach((object) => {
            if(this.focusedPlanet != object && object.isRemovable) object.remove();
        });
    }

    showObjects(){
        this.objects.forEach((object) => {
            if(this.focusedPlanet != object && object.isRemovable) object.addObjectsToScene(this.scene);
        });
    }
}
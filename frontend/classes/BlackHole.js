import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default class BlackHole {
    
    constructor(){
        this.isRemovable = true;

        const loader = new GLTFLoader();
        loader.load("../assets/3dmodels/blackhole/scene.gltf", (gltf) => {
            
            this.blackhole = gltf.scene;
            this.blackhole.scale.set(0.8,0.8,0.8);
            this.blackhole.rotateX(-1.65);
            this.blackhole.rotateY(0.5);
            this.blackhole.position.set(600,-300,300);
        }, (gltf) => {}, (err) => console.log(err));

    }

    addObjectsToScene(scene){
        scene.add(this.blackhole);
    }

    animation(camera){
        this.blackhole.rotation.y += 0.01;
    }

    remove(){
        this.blackhole.removeFromParent();
    }
}
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default class SpaceSuit {
    
    constructor(){
        this.isRemovable = true;
        
        const loader = new GLTFLoader();
        loader.load("../assets/3dmodels/low-poly_astronaut/scene.gltf", (gltf) => {
            this.spacesuit = gltf.scene;

            this.spacesuit.traverse((child) => {
                if(child.type == "Mesh") {
                    child.geometry.center();
                }  
            });

            this.spacesuit.scale.set(1.5,1.5,1.5);
            this.spacesuit.position.set(30,30,30);
        }, (gltf) => {}, (err) => console.log(err));

        this.rotationAxis = new THREE.Vector3(0.5,0.5,-0.5);
        this.rotationSpeed = 1;
        this.t = 0;


    }

    addObjectsToScene(scene){
        scene.add(this.spacesuit);
    }

    animation(camera){
        this.t+=0.01;
        this.spacesuit.position.x = 170*Math.sin(this.t) + 0;
        this.spacesuit.position.y = 100*Math.cos(this.t) + 0;
        this.spacesuit.position.z = 100*Math.cos(this.t) + 0;
        this.spacesuit.lookAt(new THREE.Vector3(0,0,0));
    }

    remove(){
        this.spacesuit.removeFromParent();
    }
}
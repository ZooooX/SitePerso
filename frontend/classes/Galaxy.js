import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


export default class Galaxy {
    
    constructor(){
        this.isRemovable = true;

        const loader = new GLTFLoader();
        loader.load("../assets/3dmodels/need_some_space/scene.gltf", (gltf) => {
            this.galaxy = gltf.scene;

            /*this.spacesuit.traverse((child) => {
                if(child.type == "Mesh") {
                    child.geometry.center();
                }  
            });*/

            this.galaxy.scale.set(3,3,3);
            this.galaxy.rotateX(1);
            this.galaxy.position.set(1000,-2000,-800);
            console.log(this.galaxy);
        }, (gltf) => {}, (err) => console.log(err));

    }

    addObjectsToScene(scene){
        scene.add(this.galaxy);

        const box = new THREE.BoxHelper( this.galaxy, 0xffff00 );
        scene.add( box );
    }

    animation(camera){
    }

    remove(){
        this.galaxy.removeFromParent();
    }
}
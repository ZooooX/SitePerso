import * as THREE from 'three';
import { FontLoader } from 'three/src/loaders/FontLoader.js';
import { TextGeometry } from 'three/src/geometries/TextGeometry.js';
import Utils from './Utils';
import { Vector3 } from 'three';

export default class SpaceName {
    
    constructor(){
        const loader = new FontLoader();
        this.name = "Rémy Tupenot";
        this.dev = "Développeur\nfull stack";

        this.textGroup = new THREE.Group();
        this.isRemovable = true;

        loader.load("/assets/fonts/SpaceAge_Regular.json", (font) => {
            this.font = font;

            this.spacename = new THREE.Mesh (
                new TextGeometry(this.dev, {
                    font: font,
                    size: 30,
                    height: 5
                }),[
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("white")
                        
                    }),
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("grey")                        
                    }) 
                ]
                
            );

            this.spacedev = new THREE.Mesh (
                new TextGeometry(this.name, {
                    font: font,
                    size: 13    ,
                    height: 2
                }),[
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("white")
                        
                    }),
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("grey")                        
                    }) 
                ]
            ); 
            
            this.textGroup.add(this.spacename);
            this.textGroup.add(this.spacedev);
            this.textGroup.position.set(-550,4000,-200);
            this.textGroup.rotateX(-1.57);
            
            this.spacedev.position.set(0,-70,0);
        });
    }

    addObjectsToScene(scene){
        scene.add(this.textGroup);
    }

    animation(camera){
        
    }

    startCinematic(){
        Utils.moveObject(this.textGroup,this.textGroup.position,new Vector3(-550,0,-200),5000);
    }

    remove(){
        this.textGroup.removeFromParent();
    }
}
import planetVertexShader from '../shaders/planetVertex.glsl?raw';
import planetFragmentShader from '../shaders/planetFragment.glsl?raw';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl?raw';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl?raw';
import glowVertex from '../shaders/glowVertex.glsl?raw';
import glowFragment from '../shaders/glowFragment.glsl?raw';

import * as THREE from "three";
import { FontLoader } from 'three/src/loaders/FontLoader.js';
import { TextGeometry } from 'three/src/geometries/TextGeometry.js';
import SoundPlayer from './SoundPlayer';

export default class Planet {

    constructor(name,coords,atmosphereColor,texturePath,scene,camera){
        this.name = name;
        this.type = "planet";
        this.isRemovable = true;
        
        this.initObjects(coords,atmosphereColor,texturePath,scene,camera);
    }

    initObjects(coords,atmosphereColor,texturePath,camera){
        this.planet = new THREE.Mesh( 
            new THREE.SphereBufferGeometry( 50, 60, 30 ),
            new THREE.ShaderMaterial( {
                uniforms: {
                    color : {value : atmosphereColor},
                    planetTexture : { value : new THREE.TextureLoader().load(texturePath)},
                    objectPosition : {value : coords}     
                },
                vertexShader : planetVertexShader,
                fragmentShader : planetFragmentShader
            })
        );

        this.planetGlow = new THREE.Mesh( 
            new THREE.SphereBufferGeometry( 50.35, 60, 30 ),
            new THREE.ShaderMaterial( {
                uniforms: {
                    color : {value : atmosphereColor},
                    objectPosition : {value : coords}        
                },
                vertexShader : glowVertex,
                fragmentShader : glowFragment,
                blending : THREE.AdditiveBlending,
                side : THREE.FrontSide,
                transparent: true
            })
        );
         
        this.atmosphere = new THREE.Mesh( 
            new THREE.SphereBufferGeometry(55,60,30),
            new THREE.ShaderMaterial( {
                uniforms: {
                    color : {value : atmosphereColor},
                    objectPosition : {value : coords}        
                },
                vertexShader : atmosphereVertexShader,
                fragmentShader : atmosphereFragmentShader,
                blending : THREE.AdditiveBlending,
                side : THREE.BackSide,
                transparent: true
            })
        );

        
        this.planet.position.lerp(coords,1);
        this.planetGlow.position.lerp(coords,1);
        this.atmosphere.position.lerp(coords,1);

        this.planet.userData["classInstance"] = this;
        this.planetGlow.userData["classInstance"] = this;
        this.atmosphere.userData["classInstance"] = this;
        
        this.planet.userData["type"] = this.type;
        this.planetGlow.userData["type"] = this.type;
        this.atmosphere.userData["type"] = this.type;
        
        this.planet.lookAt(new THREE.Vector3(coords.x,coords.y + 1000, coords.z));

        const loader = new FontLoader();

        loader.load("../assets/fonts/SpaceAge_Regular.json", (font) => {
            this.font = font;

            this.planetName = new THREE.Mesh (
                new TextGeometry(this.name, {
                    font: font,
                    size: 10,
                    height: 1
                }),
                [
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("white")
                        
                    }),
                    new THREE.MeshBasicMaterial({
                        color : new THREE.Color("grey")                        
                    }) 
                ]
            );

            this.planetName.geometry.center();
            this.planetName.position.lerp(coords.clone().add(new THREE.Vector3(0,0,-70)) ,1);
            this.planetName.quaternion.copy(camera.quaternion);
            
            this.planetName.visible = false;
        });
    }

    addObjectsToScene(scene){
        scene.add(this.planet);
        scene.add(this.planetGlow);
        scene.add(this.atmosphere);
        scene.add(this.planetName);
    }

    animation(camera){
        this.planet.rotation.y += 0.005;
        if(this.planetName) this.planetName.quaternion.copy(camera.quaternion);
    }

    scaleUp(){
        this.planet.scale.set(1.1,1.1,1.1);
        this.planetGlow.scale.set(1.1,1.1,1.1);
        this.atmosphere.scale.set(1.1,1.1,1.1);
    }

    scaleDown(){
        this.planet.scale.set(1,1,1);
        this.planetGlow.scale.set(1,1,1);
        this.atmosphere.scale.set(1,1,1);
    }

    hoverEffects(){
        this.planetName.visible = true;
        document.body.style.cursor = "pointer";
        this.scaleUp();
        SoundPlayer.playHoverSound();
    }

    mouseLeaveEffects(){
        this.planetName.visible = false;
        document.body.style.cursor = "auto";
        this.scaleDown();
        SoundPlayer.stopHoverSound();
    }

    remove(){
        this.planet.removeFromParent();
        this.planetGlow.removeFromParent();
        this.atmosphere.removeFromParent();
        this.planetName.removeFromParent();
    }
}
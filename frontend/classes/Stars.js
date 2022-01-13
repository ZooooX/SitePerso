import * as THREE from "three";


export default class Stars {
    constructor(){
        this.isRemovable = false;
        
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color : 0xffffff
        });
        const starVertices = [];
        
        for(let i = 0; i < 18000; i++){
            const x = (Math.random()-0.5) * 5000;
            const y = (-Math.random()) * 2000;
            const z = (Math.random()-0.5) * 5000;
            starVertices.push(x,y,z);
        }

        starGeometry.setAttribute("position",new THREE.Float32BufferAttribute(starVertices,3));

        this.stars = new THREE.Points(starGeometry,starMaterial);


    }

    addObjectsToScene(scene){
        scene.add(this.stars);
    }
}
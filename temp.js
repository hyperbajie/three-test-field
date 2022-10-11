import * as THREE from "./node_modules/three/build/three.module.js";

function run() {
    let renderer = new THREE.WebGLRenderer({
        antials: true
    });
    renderer.setSize(window.innerWidth, 600);

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / 600, 1, 1000);
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    let scene = new THREE.Scene();

    let vertices = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 10)
    ]
    let geometry = new THREE.BufferGeometry().setFromPoints(vertices);
    
    let material = new THREE.LineBasicMaterial({
        color: "#0000ff"
    });
    let line = new THREE.Line(geometry, material);
    scene.add(line);

    renderer.render(scene, camera);


}

run();
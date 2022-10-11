import * as THREE from "./node_modules/three/build/three.module.js";

function run() {
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#000");
    document.body.appendChild(renderer.domElement);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0,0,10);
    camera.lookAt(0,0,0);

    let geo = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial(
        {
            color: "pink"
        }
    );

    let mesh = new THREE.Mesh(geo, material);

    scene.add(mesh);

    renderer.render(scene, camera);
    

}

run();
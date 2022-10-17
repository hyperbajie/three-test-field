import * as THREE from "../node_modules/three/build/three.module.js"

function run() {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setClearColor(0xffffff)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.lookAt(0,0,0)

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({
        color: "pink"
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    window.addEventListener("resize", function() {
        camera.aspect = window.innerWidth / window.innerHeight 
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.updateProjectionMatrix()
    })

    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }

    render()
}

run()
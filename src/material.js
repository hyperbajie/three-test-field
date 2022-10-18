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
    camera.position.set(5, 5, 5)
    camera.lookAt(0,0,0)

    const light = new THREE.DirectionalLight(0xff0000, 1)
    light.position.set(0,0,10)
    scene.add(light)

    // const ambientlight = new THREE.AmbientLight(0xffffff, 1)
    // scene.add(ambientlight)

    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        emissive: 0xff0000
    })
    const box = new THREE.Mesh(geometry, material)
    scene.add(box)

    window.addEventListener("resize", function() {
        camera.aspect = window.innerWidth / window.innerHeight 
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.updateProjectionMatrix()
    })

    function render() {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    window.parent.window.scene = scene
    render()
}

run()
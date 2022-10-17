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

    let material = new THREE.MeshBasicMaterial({
        color: "pink"
    })
    let geo = new THREE.BoxGeometry(1,1,1)
    let box = new THREE.Mesh(geo, material)
    scene.add(box)
    
    window.addEventListener("resize", function() {
        camera.aspect = window.innerWidth / window.innerHeight 
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.updateProjectionMatrix()
    })

    const mixer = new THREE.AnimationMixer(box)

    function getClip(pos =[0,0,0]) {
        const [x,y,z] = pos
        const times = [0,1]
        const values = [x,y,z,x,y+3,z]

        const posTrack = new THREE.VectorKeyframeTrack("box.position", times, values)
        const duration = 1
        return new THREE.AnimationClip("boxPositionClip", duration, [posTrack])
    }

    const action = mixer.clipAction(getClip())
    // action.timeScale = 1
    action.loop = THREE.LoopPingPong
    action.play()

    let clock = new THREE.Clock()
    function render() {
        requestAnimationFrame(render)
        mixer.update(clock.getDelta())
        renderer.render(scene, camera)
    }

    render()
}

run()
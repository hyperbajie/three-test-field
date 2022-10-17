import * as THREE from "../node_modules/three/build/three.module.js"

function run() {
    let renderer = new THREE.WebGLRenderer({
        anitials: true
    })
    renderer.setClearColor(0xffffff)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 50)
    camera.lookAt(0, 0, 0)

    const grid = new THREE.GridHelper(100, 100)
    grid.rotation.set(-Math.PI / 2, 0, 0)


    const planeMaterial = new THREE.MeshBasicMaterial()
    const planeGeo = new THREE.PlaneGeometry(100, 100)
    const planeXY = new THREE.Mesh(planeGeo, planeMaterial)
    planeXY.name = "planeXY"
    planeXY.visible = false

    // scene.add(grid)
    scene.add(planeXY)

    function animation() {
        requestAnimationFrame(animation)

        renderer.render(scene, camera)
    }
    animation()

    window.addEventListener("resize", function () {
        let rect = renderer.domElement.getBoundingClientRect()
        camera.aspect = rect.width / rect.height
        renderer.setSize(rect.width, rect.height)
        camera.updateProjectionMatrix()
    })

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    function handleMouseClick(event) {
        const { clientX, clientY } = event
        let rect = renderer.domElement.getBoundingClientRect()
        mouse.x = (clientX - rect.left) / rect.width * 2 - 1
        mouse.y = -((clientY - rect.top) / rect.height * 2) + 1
        console.log("camera:", camera)
        raycaster.setFromCamera(mouse, camera)
        let intersects = raycaster.intersectObjects([planeXY])
        if( intersects.length == 0 ) {
            return
        }

        const point = intersects[0].point;
        let material = new THREE.LineBasicMaterial({
            color: "pink"
        })
        let geo = new THREE.BufferGeometry()
        geo.setFromPoints([
            new THREE.Vector3(0, 0, 0),
            point
        ])
        let line = new THREE.Line(geo, material)
        scene.add(line)
    }
    renderer.domElement.addEventListener("mousedown", handleMouseClick)
}

run();
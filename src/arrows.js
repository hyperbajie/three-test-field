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
    camera.lookAt(0, 0, 0)

    const texture = new THREE.TextureLoader().load("../assets/arrows.png")
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff
    })
    const arrow = new THREE.Sprite(spriteMaterial)
    scene.add(arrow)
    const arrowAni = new TextureAnimation(texture, 13, 1, 13, 75)






    const clock = new THREE.Clock()

    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.updateProjectionMatrix()
    })

    function render() {
        requestAnimationFrame(render)
        arrowAni.update(clock.getDelta()*1000)
        renderer.render(scene, camera)
    }

    render()
}

run()

function TextureAnimation(texture, tilesHori, tilesVert, numTiles, tileDisDuration) {
    this.texture = texture
    this.tilesHorizontal = tilesHori
    this.tilesVertical = tilesVert
    this.numOfTiles = numTiles
    this.texture.wrapS = THREE.RepeatWrapping
    this.texture.wrapT = THREE.RepeatWrapping
    this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)

    this.tileDisplayDuration = tileDisDuration
    this.currentDisplayTime = 0
    this.currentTileNum = 0
    this.update = (milliSec) => {
        this.currentDisplayTime += milliSec
        if (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= 0
            this.currentTileNum++
            if (this.currentTileNum >= this.numOfTiles) {
                this.currentTileNum = 0
            }
            const currentColumn = this.currentTileNum % this.tilesHorizontal
            this.texture.offset.x = currentColumn / this.tilesHorizontal
            const currentRow = this.currentTileNum % this.tilesVertical
            this.texture.offset.y = currentRow / this.tilesVertical

        }
    }
}
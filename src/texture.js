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
    camera.position.set(0, 0, 5)
    camera.lookAt(0,0,0)

    const texture = new THREE.TextureLoader().load("../assets/people-action.png")
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture
    })
    const people = new THREE.Sprite(spriteMaterial)
    scene.add(people)
    const peopleAnimation = new TextureAnimation(texture, 8, 8, 7, 75)
    const clock = new THREE.Clock()

    function render() {
        requestAnimationFrame(render)
        peopleAnimation.update(clock.getDelta()*1000)
        renderer.render(scene, camera)
    }

    render()
    window.addEventListener("resize", function() {
        camera.aspect = window.innerWidth / window.innerHeight 
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.updateProjectionMatrix()
    })
    window.addEventListener("keydown", function(e) {
        if( e.key == "a" ) {
            peopleAnimation.setDirection(6);
        } else if( e.key == "s") {
            peopleAnimation.setDirection(7);
        } else if( e.key == "d" ) {
            peopleAnimation.setDirection(5);
        } else if( e.key == "w" ) {
            peopleAnimation.setDirection(4);
        }
    })
    window.parent.window.scene = scene
}

run()

function TextureAnimation(texture, tilesOfHorizontal, tilesOfVertical,numOfVertical, displayTime ) {
    this.texture = texture;
    this.tilesOfHorizontal = tilesOfHorizontal;
    this.tilesOfVertical = tilesOfVertical;
    this.displayTime = displayTime;
    this.numOfVertical = numOfVertical;

    this.numOfHorizontal = 0;
    this.showTime = 0;
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set( 1 /this.tilesOfHorizontal, 1 / this.tilesOfVertical);
    this.texture.offset.set(this.numOfHorizontal / this.tilesOfHorizontal, this.numOfVertical / this.tilesOfVertical);
    this.update = function(time) {
        this.showTime += time;
        if( this.showTime >= this.displayTime ) {
            this.showTime = 0;
            
            this.numOfHorizontal ++;
            if( this.numOfHorizontal >= this.tilesOfHorizontal ) {
                this.numOfHorizontal = 0;
            }
            this.texture.offset.x = this.numOfHorizontal / this.tilesOfHorizontal;
            this.texture.offset.y =  this.numOfVertical / this.tilesOfVertical;
        }
    }
    this.setDirection = function(d) {
        this.numOfVertical = d;
    }
}
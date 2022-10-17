import * as THREE from "../node_modules/three/build/three.module.js";

function run() {
  const renderer = new THREE.WebGLRenderer({
    anitials: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(200, 200, 200);
  camera.lookAt(0, 0, 0);

  let geometry = new THREE.CylinderGeometry(5, 10, 120, 50, 300);
  geometry.translate(0, 60, 0);
  let positions = geometry.getAttribute("position");
  const vertex = new THREE.Vector3();
  const skinIndices = [];
  const skinWeights = [];
  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);

    if (vertex.y <= 60) {
      skinIndices.push(0, 0, 0, 0);
      skinWeights.push(1 - vertex.y / 60, 0, 0, 0);
    } else if (vertex.y > 60 && vertex.y < 100) {
      skinIndices.push(1, 0, 0, 0);
      skinWeights.push(1 - (vertex.y - 60) / 40, 0, 0, 0);
    } else if (vertex.y <= 120) {
      skinIndices.push(2, 0, 0, 0);
      skinWeights.push(1 - (vertex.y - 100) / 20, 0, 0, 0);
    }
  }

  geometry.setAttribute(
    "skinIndices",
    new THREE.Uint16BufferAttribute(skinIndices, 4)
  );
  geometry.setAttribute(
    "skinWeights",
    new THREE.Float32BufferAttribute(skinWeights, 4)
  );

  let material = new THREE.MeshPhongMaterial({
    skinned: true,
  });
  let skinnedMesh = new THREE.SkinnedMesh(geometry, material);
  skinnedMesh.position.set(50, 120, 50);
  skinnedMesh.rotateX(Math.PI);
  scene.add(skinnedMesh);

  let Bone1 = new THREE.Bone();
  let Bone2 = new THREE.Bone();
  let Bone3 = new THREE.Bone();
  Bone1.add(Bone2);
  Bone2.add(Bone3);
  Bone2.position.y = 60;
  Bone3.position.y = 40;
  let skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]);
  skinnedMesh.add(Bone1);
  skinnedMesh.bind(skeleton);

  let skeletonHelper = new THREE.SkeletonHelper(skinnedMesh);
  scene.add(skeletonHelper);

  skeleton.bones[1].rotation.x = 0.5;
  skeleton.bones[2].rotation.x = 0.5;

  let n = 0;
  let T = 50;
  let step = 0.01;

  function render() {
    requestAnimationFrame(render);

    n++;
    if (n < T) {
      skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x - step;
      skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x + step;
      skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
    }
    if (n < 2 * T && n > T) {
      skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x + step;
      skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x - step;
      skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x - 2 * step;
    }
    if (n === 2 * T) {
      n = 0;
    }
    renderer.render(scene, camera);
  }

  render();
}

run();

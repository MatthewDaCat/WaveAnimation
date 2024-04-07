import {
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  PlaneGeometry,
  DoubleSide,
  Vector3,
} from 'three';


function createMaterial() {
  const material = new MeshStandardMaterial({
    color: 'purple',
    side: DoubleSide,
    wireframe: true,
  });

  return material;
}

// VARS:
let step = 0;
let vertexIndex = 0;

let speed = {
  name: 'speed',
  value: 0.1,
};
let sineOffset = {
  name: 'sineOffset',
  value: 0,
};
let waveHeight = {
  name: 'waveHeight',
  value: 5,
};
let reload = {
  name: 'reload',
  value: false,
}

function setVariables(varName, value) {

  if (varName === waveHeight.name) {
    waveHeight.value = value;
  }
  if (varName === sineOffset.name) {
    sineOffset.value = value;
  }
  if (varName === speed.name) {
    speed.value = value;
  }
}


function createWave() {
  const geometry = new PlaneGeometry(4, 3, 40, 30);
  const material = createMaterial();
  const wave = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  wave.rotation.set(-0.3 * Math.PI, 0, 10);

  wave.tick = (delta) => {
    // const movement = 10 * Math.abs(Math.sin(delta * 39));
    step += speed.value;
    const vertices = geometry.attributes.position;
    // const vertexIndex = Math.floor(Math.random() * vertices.array.length);
    if (vertexIndex <= (41 * 31)) {
      vertexIndex += 1;
    }


    const oscillatingNumber = Math.sin(waveHeight.value * 0.01);
    const displacement = oscillatingNumber * Math.abs(Math.sin(step + sineOffset.value));
    const vertexX = vertices.getX(vertexIndex);
    const vertexY = vertices.getY(vertexIndex);

    vertices.setXYZ(vertexIndex, vertexX, vertexY, displacement);

    vertices.needsUpdate = true;
    waveHeight.needsUpdate = true;

  };

  return wave;
}

export { createWave, setVariables };

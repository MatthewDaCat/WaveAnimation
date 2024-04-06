import { 
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from 'three';


function createMaterial() {

  // const textureLoader = new TextureLoader();
  // create a "standard" material
  const material = new MeshStandardMaterial({ color: 'purple' });
  
  return material;
}




function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  cube.rotation.set(-0.5, -0.1, 0.8);

  cube.tick = () => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };

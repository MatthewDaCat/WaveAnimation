import {
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
  DoubleSide,
  SphereGeometry,
  Vector3,
} from 'three';

function createMaterial() {

  // const textureLoader = new TextureLoader();
  const material = new MeshStandardMaterial({
    color: 'indigo',
    side: DoubleSide,
    // wireframe: true,
  });

  return material;
}

function createEarth() {
  const geometry = new SphereGeometry(2, 50, 50);
  const material = createMaterial();
  const earth = new Mesh(geometry, material);

  const radiansPerSecond = MathUtils.degToRad(30);

  earth.rotation.set(0, 0, 0.3);

  earth.tick = (delta) => {
    const movement = 10 * Math.abs(Math.sin(delta));
    // let step = 0;
    // const speed = 0.8;
    // step += speed;
    // earth.rotation.z += radiansPerSecond * delta/speed;
    earth.rotation.y += radiansPerSecond * delta / 2;
    // earth.rotation.x += radiansPerSecond * delta/speed;

    // earth.geometry.attributes.position.array[1000] += 0.3 * Math.abs(Math.sin(step));
    // earth.geometry.attributes.position.array[3000] += 0.3 * Math.abs(Math.sin(step));
    // earth.geometry.attributes.position.array[5000] += 0.3 * Math.abs(Math.sin(step));
    // earth.geometry.attributes.position.array[7000] += 0.3 * Math.abs(Math.sin(step));
    // earth.geometry.attributes.position.needsUpdate = true;

    // // Supponiamo che "earth" sia la tua mesh e "index" sia l'indice del vertice che vuoi muovere
    // const positionAttribute = earth.geometry.getAttribute('position');
    // const index = Math.floor(Math.random()* positionAttribute.array.length);

    // // Ottieni la posizione attuale del vertice
    // const currentZ = positionAttribute.array[index * 3 + 2]; // L'array position.array contiene le coordinate (x, y, z) per ogni vertice

    // // Calcola una posizione casuale tra -1 e 1
    // const randomOffset = (Math.random() - 0.5) * 0.3;

    // // Calcola un valore da aggiungere alla coordinata z basato su una funzione sinusoidale
    // const step = 0.1; // Fattore di velocità della sinusoide
    // let deltaZ = Math.sin(performance.now() * step) * 0.3; // 0.3 rappresenta l'ampiezza della sinusoide
    // const maxDeltaZ = 0.3 ; // Valore massimo consentito per deltaZ
    // deltaZ = Math.min(deltaZ, maxDeltaZ);
    // // Applica la nuova posizione al vertice
    // positionAttribute.array[index * 3 + 2] = currentZ + randomOffset + deltaZ;

    // // Notifica Three.js che gli attributi sono stati modificati
    // positionAttribute.needsUpdate = true;

    // Supponiamo che "sphereGeometry" sia la geometria della sfera
    const vertices = geometry.attributes.position;

    // // Per ogni vertice
    // for (let i = 0; i < vertices.count; i++) {
    //   // Ottieni la posizione del vertice
    //   const vertex = new Vector3();
    //   vertex.fromBufferAttribute(vertices, i);

    //   // Calcola la normale del vertice (è semplicemente la posizione del vertice normalizzata)
    //   const normal = vertex.clone().normalize();

    //   // Moltiplica la normale per la distanza desiderata di spostamento
    //   const displacement = normal.multiplyScalar(0.1);

    //   // Aggiungi il vettore di spostamento alla posizione originale del vertice
    //   vertex.add(displacement);

    //   // Assegna la nuova posizione al vertice
    //   vertices.setXYZ(i, vertex.x, vertex.y, vertex.z);
    // }

    const positionAttribute = earth.geometry.getAttribute('position');



    const vertex = new Vector3();
    const index = Math.floor(Math.random() * positionAttribute.array.length);
    vertex.fromBufferAttribute(vertices, index);
    const normal = vertex.clone().normalize();
    const displacement = normal.multiplyScalar(2);
    vertex.add(Math.abs(displacement));
    // console.log(displacement)
    vertices.setXYZ(vertex.x, vertex.y, vertex.z);

    // Notifica Three.js che gli attributi sono stati modificati
    vertices.needsUpdate = true;


  };

  return earth;
}

export { createEarth };
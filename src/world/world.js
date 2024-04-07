import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/resizer.js';
import { Loop } from './systems/loop.js';
import { createWave, setVariables } from './components/wave.js';
import { createControls } from './systems/controls.js';
import { createGui } from './systems/gui.js';

import { AxesHelper } from 'three';

let loop;
let renderer;
let scene;
let camera;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    const controls = createControls(camera, renderer.domElement);
    const axesHelper = new AxesHelper(10);

    const { ambientLight, mainLight } = createLights();

    loop = new Loop(camera, scene, renderer);

    let wave = createWave();

    loop.updatables.push(wave);

    // SCENE ADD
    scene.add(axesHelper, ambientLight, mainLight, wave);
    const resizer = new Resizer(container, camera, renderer);

    // GUI
    const gui = createGui();

    const options = {
      waveSpeed: 0,
      waveVertexIndex: 0,
      waveSineOffset: 0,
      waveHeight: 5,
      reload: false,
    };


    // UPDATE VARS (view->model)
    gui.add(options, 'waveHeight').onChange(function (value) {
      setVariables('waveHeight', value);
    });
    gui.add(options, 'waveSpeed').onChange(function (value) {
      setVariables('speed', value);
    });
    gui.add(options, 'waveSineOffset').onChange(function (value) {
      setVariables('sineOffset', value);
    });
    gui.add(options, 'reload').onChange(function (value) {
      setVariables('reaload', value);
    });









    container.append(renderer.domElement);

    controls.update();

  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };

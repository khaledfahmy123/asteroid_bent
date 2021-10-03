import "../../node_modules/three/build/three.min.js";
import "../../node_modules/three/examples/js/loaders/OBJLoader.js";
import "../../node_modules/three/examples/js/loaders/GLTFLoader.js";
import "../../node_modules/three/examples/js/loaders/EXRLoader.js";
import "../../node_modules/three/examples/js/loaders/RGBELoader.js";
import { GUI } from "../../node_modules/three/examples/jsm/libs/dat.gui.module.js";
import { asteroids } from "./data.js";
import { changeChart } from "./chart.js";
/*=========================== Defaults =============================*/
const canvas = document.querySelector("canv-view");
const scene = new THREE.Scene();
const gui = new GUI();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
const cameraP = gui.addFolder("Camera Position");
const cameraR = gui.addFolder("Camera Rotation");
const lightP = gui.addFolder("Light Position");
const modelC = gui.addFolder("asteroids");

camera.position.x = 50;
camera.position.y = 35;
camera.position.z = 50;
camera.rotation.x = -0.3;
camera.rotation.y = 0.55;
camera.rotation.z = 0;
cameraP.add(camera.position, "x", -500, 500);
cameraP.add(camera.position, "y", -500, 500);
cameraP.add(camera.position, "z", -500, 500);
cameraR.add(camera.rotation, "x", -6, 6);
cameraR.add(camera.rotation, "y", -6, 6);
cameraR.add(camera.rotation, "z", -6, 6);

const light = new THREE.PointLight(0xe6edf6, 1, 1000);
light.position.set(0, 0, 100);
scene.add(light);
lightP.add(light.position, "x", -500, 500);
lightP.add(light.position, "y", -500, 500);
lightP.add(light.position, "z", -500, 500);
lightP.add(light, "distance", 0, 2000);
lightP.add(light, "intensity", 0, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canv"),
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*=========================== OBJECTS =============================*/

var model;
var obj_s = { size: 0.2 };
const loader = new THREE.OBJLoader();

/*========================= Render Animation Functions =============================*/

function animate() {
  const astro = scene.getObjectByName("astro");
  if (astro) {
    astro.rotation.y += 0.005;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const changeObj = (e) => {
  const obj = asteroids[e];
  light.intensity = obj.intens;
  const tex = new THREE.TextureLoader().load(obj.tex);
  const mtrl = new THREE.MeshLambertMaterial({ map: tex });
  scene.remove(scene.getObjectByName("astro"));
  obj_s.size = obj.scale;
  loader.load(obj.path, (mdl) => {
    mdl.name = "astro";
    mdl.scale.set(obj_s.size, obj_s.size, obj_s.size);
    mdl.position.set(obj.shift.x, obj.shift.y, obj.shift.z);
    mdl.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = mtrl;
        child.castShadow = true;
        child.wireframe = true;
        child.receiveShadow = true;
        child.renderOrder = 0;
      }
    });

    scene.add(mdl);
  });

  changeChart(obj.data);
};

const openGui = (e) => {
  cameraP.open();
  cameraR.open();
  lightP.open();
};

// openGui();

$(".card").click((e) => {
  $("#chart").remove();
  $(".card").removeClass("obj-active");
  changeObj(e.currentTarget.id);
  $(e.currentTarget).addClass("obj-active");
});

animate();
changeObj("astro_1");

/*========================= Render Chart =============================*/

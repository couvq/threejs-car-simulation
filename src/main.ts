import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Plane, PlaneImpl } from "./Plane";
import { GridHelper, Plane, Vector3 } from "three";
import { Car, CarImpl } from "./Car";

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  //@ts-ignore
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(-50);
camera.position.setY(30);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// TODO - remove once complete
// Helpers
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
const AxesHelper = new THREE.AxesHelper(500);
scene.add(AxesHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// draw plane
const plane: Plane = new PlaneImpl();
plane.drawPlane(scene);

// draw car
const car: Car = new CarImpl(scene);

// move car onKeydown
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "ArrowUp") {
    car.moveCarX(1);
  }
  if (e.key === "ArrowDown") {
    car.moveCarX(-1);
  }
  if (e.key === "ArrowRight") {
    car.moveCarZ(1);
  }
  if (e.key === "ArrowLeft") {
    car.moveCarZ(-1);
  }
});

// game loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  camera.lookAt(car.getPosition());
  renderer.render(scene, camera);
}

animate();

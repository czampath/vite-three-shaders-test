import '../css/style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(75);
renderer.render(scene, camera);

//Sphere
const sphereGeometry = new THREE.CylinderGeometry(10,10,50);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
sphere.position.set( 10, 10, 10);
scene.add(sphere);

// Box 
const boxGeometry = new THREE.BoxGeometry(10,10,10);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
box.position.set(-10, -10, -10);
scene.add(box);

//Point Light
const pointLight = new THREE.PointLight(0xffffff, 100, 100, 1);
pointLight.position.set(20, 10, 30);
scene.add(pointLight);

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff,0.2);
scene.add(ambientLight)

//Camera controls
const controls = new OrbitControls(camera, renderer.domElement);

//Animator
function animate(){
  requestAnimationFrame(animate);
  box.rotation.z += 0.001
  sphere.rotation.z += -0.001

  controls.update();
  renderer.render(scene,camera);
}
animate();
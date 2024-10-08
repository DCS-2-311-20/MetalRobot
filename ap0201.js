//
// 応用プログラミング 第2回 課題1 (ap0201)
// G284002022 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from 'three';
import GUI from 'ili-gui';
import { makeMetalRobot } from './robot.js'

// ３Ｄページ作成関数の定義
function init() {
  const cameraParam = { // カメラの設定値
    fov: 50, // 視野角
    x: 5,
    y: 10,
    z: 20
  };

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  // axes.visible = false;


  // 平面の設定
  const planeGeometry = new THREE.PlaneGeometry(20, 10);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x007030});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);

  // 金属製ロボットの追加
  const metalRobot = makeMetalRobot();
  scene.add(metalRobot);

  // 光源の設定
  const spotLight = new THREE.SpotLight(0xffffff, 2500);
  spotLight.position.set(-10, 30, 10);
  scene.add(spotLight);

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
    cameraParam.fov, window.innerWidth/window.innerHeight, 0.1, 1000);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x406080 );
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 描画関数の定義
  function render() {
    camera.fov = cameraParam.fov;
    camera.position.x = cameraParam.x;
    camera.position.y = cameraParam.y;
    camera.position.z = cameraParam.z;
    camera.lookAt(0, 5, 0);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }

  // カメラのコントローラ
  const gui = new GUI();
  gui.add(cameraParam, "fov", 10, 100).onChange(render);
  gui.add(cameraParam, "x", -40, 40).onChange(render);
  gui.add(cameraParam, "y", -40, 40).onChange(render);
  gui.add(cameraParam, "z", -40, 40).onChange(render);

  // 描画
  render();
}

// 3Dページ作成関数の呼び出し
init();

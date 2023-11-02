// display a house on ground





function createGround(scene) {
    let ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      scene
    );
    const groundMat = new BABYLON.StandardMaterial("groundmat")
    groundMat.diffuseColor = new BABYLON.Color3(0,1,0);
    ground.material = groundMat;

    return ground;
  } 
  
  function createBox(scene) {
    let box = BABYLON.MeshBuilder.CreateBox("box", scene);
    box.scaling = new BABYLON.Vector3(1, 1, 1);
    box.position = new BABYLON.Vector3(0.0, 0.5, 0.0);
    box.rotation.z = 0;
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture("./assets/textures/floor.png",scene);
    box.material = boxMat;

  
    return box;
  }
  
  function createRoof(scene) {
      let roof = BABYLON.MeshBuilder.CreateCylinder("roof",{diameter:1.3,height: 1.2, tessellation: 3},scene);
      roof.scaling = new BABYLON.Vector3(0.75, 1, 1);
        roof.position = new BABYLON.Vector3(0.0, 1.2, 0.0);
        roof.rotation.z = Math.PI / 2;
        const roofMat = new BABYLON.StandardMaterial("roofMat");
        roofMat.diffuseTexture = new BABYLON.Texture("./assets/textures/roof.jpg", scene);
        roof.material = roofMat;
        return roof;
  }
  
  
  function createLight(scene) {
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      scene
    );
    light.intensity = 0.7;
    return light;
  }
  
  function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 10;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene
    );
    camera.attachControl(true);
    return camera;
  }
  
  export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();
  
    let box = (that.box = createBox(scene));
    let roof = (that.roof = createRoof(scene));
    let light = (that.light = createLight(scene));
    let ground = (that.ground = createGround(scene));
    let camera = (that.camera = createArcRotateCamera(scene));
  
    return that;
  }
  
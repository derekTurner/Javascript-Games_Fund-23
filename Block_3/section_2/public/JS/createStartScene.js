function createBox(scene){
    let box = BABYLON.MeshBuilder.CreateBox("box", scene);
    box.position.y = 3;
    return box;
}

function createTiledBox(scene){
    var mat = new BABYLON.StandardMaterial("arrows");
	mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/arrows.jpg");
	
	const pat = BABYLON.Mesh.FLIP_N_ROTATE_ROW;

    const columns = 6;  // 6 columns
    const rows = 1;  // 4 rows

    const faceUV = new Array(6);

    for (let i = 0; i < 6; i++) {
        faceUV[i] = new BABYLON.Vector4(i / columns, 0, (i + 1) / columns, 1 / rows);
    }
	
	const options = {
		pattern: pat,
        faceUV: faceUV,
		width: 7,
		height: 4,
		depth: 4,
		tileSize: 1,
		tileWidth:1
	}
	
    const tiledBox = BABYLON.MeshBuilder.CreateTiledBox("tiled box", options, scene); 
    tiledBox.position.y = 6;
    tiledBox.material = mat;
    return tiledBox;
}

function createSphere(scene){
    const options = {
		segments:32,
        diameter: 1,
		diameterX: 1,
		diameterY: 0.5,
		diameterZ: 0.7,
		arc: 0.9,
		slice:0.9
	}
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", options, scene);
    sphere.position.y = 1;
    return sphere;
}

function createCylinder(scene){
    const options = {
		height:2,
        diameter: 0.5,
        diameterTop: 1,     //overwrites diameter
        diameterBottom: 2,  //overwrites diameter
		tessellation: 8,
		subdivision: 2,
		diameterZ: 0.7,
		arc: 0.9,
		hasRings:true,
        enclose: false
	}
    let cylinder = BABYLON.MeshBuilder.CreateCylinder("cone", options, scene);
    cylinder.position.y = 6;
    return cylinder;
}

function createCapsule(scene){
    const options = {
		orientation:new BABYLON.Vector3(0.2,0,1),
        subdivisions: 4,
        tessellation: 10,     
        height: 1,  
		radius: 1.2,
		radiusTop: 0.7,
		radiusBottom: 1.5,
        capSubdivisions: 6,
		topCapSubdivisions:7,
        bottomCapSubdivisions:5
	}
    let capsule = BABYLON.MeshBuilder.CreateCapsule("capsule", options, scene);
    capsule.position.y = 10;
    return capsule;
}
    
function createPlane(scene){
    const options = {
		size:3,
        width: 3,
        height: 1,     
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        sourcePlane: null
	}
    let plane = BABYLON.MeshBuilder.CreatePlane("plane", options, scene);
    plane.position.y = 12;
    return plane;
}

function createDisc(scene){
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    return sphere;
}

function createTorus(scene){
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    return sphere;
}

function createGround(scene){
    let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    return ground;
}

function createTiledGround(scene){
    let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    return ground;
}

function createLight(scene){
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0),scene);
    light.intensity = 0.7;
    return light;
}
   

function createArcRotateCamera(scene){
    let camAlpha = -Math.PI / 2,
    camBeta  =  Math.PI / 2.5,
    camDist  =  10,
    camTarget = new BABYLON.Vector3(0, 0, 0); 
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}
  
export default function createStartScene(engine) {
    let that = {};
    let scene = that.scene = new BABYLON.Scene(engine);
    //scene.debugLayer.show();

    let box = that.starbox = createBox(scene);
    // let tiledBox = that.tiledBox = createTiledBox(scene);
    let cylinder = createCylinder(scene);
    let capsule = createCapsule(scene);
    let plane = createPlane(scene);
    let light = that.light = createLight(scene);
    let sphere = that.sphere = createSphere(scene);
    let ground = that.ground = createGround(scene);
    let camera = that.camera = createArcRotateCamera(scene);
    return that;
}
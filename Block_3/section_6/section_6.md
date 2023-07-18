# Frame based animations

The properties of meshes such as boxes and spheres can be modified on a frame by frame basis to produce an animation effect.

The general process to create an amimation is:

1. Determine a frame rate in frames per second at which the animation should run.  In many instances this will be global so that all animations on a page are running at the same rate.  However, this is not a requirement.

2. Create an named animation object w.hich applies to a particular property, setting the type and mode of the animation.

3. Create an array of keyframes and apply these to the animation object.

4. Push the animation object to the animations collection of mesh or object which responds to the animated property

## Animating position.x

My scenes are created in a series of separate javascript module files starting at **createScenen.js**.  

In this example a box will be animated with a framerate of 30 frames per second.

Each element in the scene is created by calling a function, so createBox(scene) will return a simple cube.

```javascript
const frameRate = 30;

function createBox(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;
    return box;
}
```

The animation is also created in a function.
This first animation is named xSlide and can be applied to control the position.x property of any any element which has this property, such as a standard mesh.

The frameRate is passed into the function so that this is a pure function (the returned value depends only on the input parameters).

```javascript
function createxSlide(frameRate){
```

The type and mode of the animation are selected from:

    Types
    BABYLON.Animation.ANIMATIONTYPE_FLOAT
    BABYLON.Animation.ANIMATIONTYPE_VECTOR2
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3
    BABYLON.Animation.ANIMATIONTYPE_QUATERNION
    BABYLON.Animation.ANIMATIONTYPE_COLOR3

    Modes
    BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT

```javascript
    const xSlide = new BABYLON.Animation(
        "xSlide",
        "position.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
```

An array of keyframes is created and the frame number and value for each key frame is pushed into this array.     

The values of the keyframes (particularly the last one) need to be selected with care to prevent a jerky glitch on each repeat of the animation.

Here the framerate is 30 so for a 2 second animation duration 59 frames need to be described and then the 60th frame wraps round to the first frame.

In this example the value starts at 2 at the first frame and by frame 30 it has changed to -2.  The relative motion was -4, so to return to the origin the return motion is +4.

However only 29 further frames are described so the value will not quite have the full return motion, but 29/30 times the full motion of 4.

This is expressed in the equation below and demonstrates that cyclical motion needs careful planning!

```javascript
    const keyFramesX = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: (2 * frameRate)-1, value: (-2 + (4 * ( frameRate /2) / ((frameRate/2) -1))) });

}
```

The key frames array is then associated with the animation that it relates to.  

```javascript
    xSlide.setKeys(keyFramesX);
```

Finally the animation is returned by the creating function


```javascript
    return xSlide
}
```

The full function is then:

```javascript
function createxSlide(frameRate){
    const xSlide = new BABYLON.Animation(
        "xSlide",
        "position.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesX = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: (2 * frameRate)-1, value: (-2 + (4 * ( frameRate /2) / ((frameRate/2) -1))) });

    xSlide.setKeys(keyFramesX);

    return xSlide
}
```

The whole scene is put together in a function createStartScene(engine) which is exported from the module.

Within this function the box is created in the scene and the animation returned by createxSlide is pushed into the animations collection of the box.

```javascript
    let box = (that.box = createBox(scene));
    box.animations.push(createxSlide(frameRate));
```

The animation on the box is started.

```javascript
    that.scene.beginAnimation(box, 0, 2 * frameRate, true); 
```

The resulting animation in the x direction is shown in scene 1 of this example.

<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="frame animaations" 
    src="Block_3/section_6/ex_01_animation/index.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

The full listing of the scene is:

**createScene1.js**
```javascript
const frameRate = 30;

function createBox(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.x = 2;
    return box;
}

function createxSlide(frameRate){
    const xSlide = new BABYLON.Animation(
        "xSlide",
        "position.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesX = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: (2 * frameRate)-1, value: (-2 + (4 * ( frameRate /2) / ((frameRate/2) -1))) });

    xSlide.setKeys(keyFramesX);

    return xSlide
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 10;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let box = (that.box = createBox(scene));
    box.animations.push(createxSlide(frameRate));

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));

    that.scene.beginAnimation(box, 0, 2 * frameRate, true);
    return that;
}
```
## Animating position.y

In the following examples I have been less pernickerty about the animation values so there may be a repeat glitch - I leave it as an exercise for you to fix this!

Creating an animation on the y position is a matter of adding a function createySlide to animate position.y following the same pattern as that for the previous animation of position.x

```javascript
function createySlide(frameRate){
    const ySlide = new BABYLON.Animation(
        "ySlide",
        "position.y",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesY = [];
    keyFramesY.push({ frame: 0, value: 2 });
    keyFramesY.push({ frame: frameRate, value: -2 });
    keyFramesY.push({ frame: 2 * frameRate, value: 2 });

    ySlide.setKeys(keyFramesY);

    return ySlide
}
```

The extra animation is added to the box in the createStartScene(engine)  function.

```javascript
export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let box = (that.box = createBox(scene));
    box.animations.push(createxSlide(frameRate));
    box.animations.push(createySlide(frameRate));

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));

    that.scene.beginAnimation(box, 0, 2 * frameRate, true);
    return that;
}
```

The combined x and y animation is shown on tab 2 of the example.

## Animating rotation

A function is provided to create rotation around the x axis.  Note that the rotation values are expressed as radians.

```javascript
function createxRotate(frameRate){
    const xRotation = new BABYLON.Animation(
        "xRotation",
        "rotation.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesRX = [];
    keyFramesRX.push({ frame: 0, value: 0 });
    keyFramesRX.push({ frame: frameRate, value: Math.PI });
    keyFramesRX.push({ frame: 2 * frameRate, value: Math.PI * 2 });

    xRotation.setKeys(keyFramesRX);

    return xRotation
}
```

A similarly patterned function provides rotation about the y axis.  Both of these are added to the createStartSene(engine)
 function.

```javascript
export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let box = (that.box = createBox(scene));
    box.animations.push(createxSlide(frameRate));
    box.animations.push(createySlide(frameRate));
    box.animations.push(createxRotate(frameRate));
    box.animations.push(createyRotate(frameRate));

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));

    that.scene.beginAnimation(box, 0, 2 * frameRate, true);
    return that;
}
```
The combined motion and rotation can be seen under example tab 3.

## Animating scale

So far the animations used have  had an animation type of float.  It iss also posssiblee to create a vector3  animation type to control x,y and z aspects of parameters such as scaling.

The keyframes are now expressed as vector3 quantities.

```javascript
function createV3scaling(frameRate) {
    const v3scaling = new BABYLON.Animation(
        "v3Scaling",
        "scaling",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesv3s = [];
    keyFramesv3s.push({ frame: 0, value: new BABYLON.Vector3(1, 2, 3) }),
    keyFramesv3s.push({ frame: 0.66 * frameRate, value: new BABYLON.Vector3(2, 3, 1) });
    keyFramesv3s.push({ frame: 1.32 * frameRate, value: new BABYLON.Vector3(3, 1, 2) });
    keyFramesv3s.push({ frame: 2 * frameRate, value: new BABYLON.Vector3(1, 2, 3) });

    v3scaling.setKeys(keyFramesv3s);

    return v3scaling;
}
```

Adding this animation to the others will produce a shape change in example tab 4.

## Animating Color

Color is not a property of a mesh, but of a material.  So to see color a material must be added to the box.  In this case standard material is used.

```javascript
function createBox(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    var materialBox = new BABYLON.StandardMaterial("texture1", scene);
    box.material = materialBox;
    box.position.x = 2;
    return box;
}
```

Material does not have a color property but a range of color properties: diffuseColor, specularColor, emissiveColor and ambientColor.  These colors  have red, green and blue  components which can be described by a vector3 value.

In this example the color animation is applied to the diffuse color of the material.

```javascript
function createColorShift(frameRate) {
    const colorShift = new BABYLON.Animation(
        "color3",
        "material.diffuseColor",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesC3 = [];
    keyFramesC3.push({ frame: 0, value: new BABYLON.Color3(1, 0.5, 0.2) }),
    keyFramesC3.push({ frame: 0.66 * frameRate, value: new BABYLON.Color3(0.5, 0.2, 1) });
    keyFramesC3.push({ frame: 1.32 * frameRate, value: new BABYLON.Color3(0.2, 1, 0.5) });
    keyFramesC3.push({ frame: 2 * frameRate, value: new BABYLON.Color3(1, 0.5, 0.2) });

   colorShift.setKeys(keyFramesC3);

    return colorShift;
}
```

This is added to the list of animations in tab 5 of the example.

The full listing of the scene with all animations described is:

**createScene5.js**
```javascript
const frameRate = 30;

function createBox(scene) {
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    var materialBox = new BABYLON.StandardMaterial("texture1", scene);
    box.material = materialBox;
    box.position.x = 2;
    return box;
}

function createxSlide(frameRate) {
    const xSlide = new BABYLON.Animation(
        "xSlide",
        "position.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesX = [];
    keyFramesX.push({ frame: 0, value: 2 });
    keyFramesX.push({ frame: frameRate, value: -2 });
    keyFramesX.push({ frame: 2 * frameRate, value: 2 });

    xSlide.setKeys(keyFramesX);

    return xSlide;
}

function createySlide(frameRate) {
    const ySlide = new BABYLON.Animation(
        "ySlide",
        "position.y",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesY = [];
    keyFramesY.push({ frame: 0, value: 2 });
    keyFramesY.push({ frame: frameRate, value: -2 });
    keyFramesY.push({ frame: 2 * frameRate, value: 2 });

    ySlide.setKeys(keyFramesY);

    return ySlide;
}

function createxRotate(frameRate) {
    const xRotation = new BABYLON.Animation(
        "xRotation",
        "rotation.x",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesRX = [];
    keyFramesRX.push({ frame: 0, value: 0 });
    keyFramesRX.push({ frame: frameRate, value: Math.PI });
    keyFramesRX.push({ frame: 2 * frameRate, value: Math.PI * 2 });

    xRotation.setKeys(keyFramesRX);

    return xRotation;
}

function createyRotate(frameRate) {
    const yRotation = new BABYLON.Animation(
        "yRotation",
        "rotation.y",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesRY = [];
    keyFramesRY.push({ frame: 0, value: 0 });
    keyFramesRY.push({ frame: 2 * frameRate, value: Math.PI });
    keyFramesRY.push({ frame: 4 * frameRate, value: Math.PI * 2 });

    yRotation.setKeys(keyFramesRY);

    return yRotation;
}

function createV3scaling(frameRate) {
    const v3scaling = new BABYLON.Animation(
        "v3Scaling",
        "scaling",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesv3s = [];
    keyFramesv3s.push({ frame: 0, value: new BABYLON.Vector3(1, 2, 3) }),
    keyFramesv3s.push({ frame: 0.66 * frameRate, value: new BABYLON.Vector3(2, 3, 1) });
    keyFramesv3s.push({ frame: 1.32 * frameRate, value: new BABYLON.Vector3(3, 1, 2) });
    keyFramesv3s.push({ frame: 2 * frameRate, value: new BABYLON.Vector3(1, 2, 3) });

    v3scaling.setKeys(keyFramesv3s);

    return v3scaling;
}

function createColorShift(frameRate) {
    const colorShift = new BABYLON.Animation(
        "color3",
        "material.diffuseColor",
        frameRate,
        BABYLON.Animation.ANIMATIONTYPE_COLOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keyFramesC3 = [];
    keyFramesC3.push({ frame: 0, value: new BABYLON.Color3(1, 0.5, 0.2) }),
    keyFramesC3.push({ frame: 0.66 * frameRate, value: new BABYLON.Color3(0.5, 0.2, 1) });
    keyFramesC3.push({ frame: 1.32 * frameRate, value: new BABYLON.Color3(0.2, 1, 0.5) });
    keyFramesC3.push({ frame: 2 * frameRate, value: new BABYLON.Color3(1, 0.5, 0.2) });

   colorShift.setKeys(keyFramesC3);

    return colorShift;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 10;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let box = (that.box = createBox(scene));
    box.animations.push(createxSlide(frameRate));
    box.animations.push(createySlide(frameRate));
    box.animations.push(createxRotate(frameRate));
    box.animations.push(createyRotate(frameRate));
    box.animations.push(createV3scaling(frameRate));
    box.animations.push(createColorShift(frameRate));

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));

    that.scene.beginAnimation(box, 0, 2 * frameRate, true);
    return that;
}
```
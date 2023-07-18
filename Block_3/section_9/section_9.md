# Moving a mesh by keyboard action

A mesh can be added to a scene using the BABYLON.SceneLoader.ImportMesh(meshNames, rootUrl, sceneFilename, scene, onSuccess, onProgress, onError, message: , pluginExtension)) The parameters are optional so in this example only the first 5 are used.

This example prepares a scene with a single mesh which can be manipulated by the wasd keys of the arrow keys.

The item in **createScene1.js** is a variable declared as an empty array.  This will be global within the module described in this file, but the values will not be available within other modules.  So similarly named variables in multiple createSceneN.js modules would not be in conflict.

```javascript
var keyDownMap =[];
```
The keyDownMap array will store the state of keyboard presses which are monitored by a scene action manager.

Only one scene action manager is needed.

```javascript
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);
```

An action can then be registered with the with this action manager. This will be an execute code action stating what condition will trigger the execution of the code.  The trigger condition can be filtered by parameters.  The code to be executed is then stated as a function.

The first execute code action to be registered is triggered by an `onKeyDownTrigger` which genereates an event when a key is pressed.  If you wanted to limit the triggering to a single key, this could be added as a parameter.  This is illustrated for the 'w' key, but that is commented out so that all keys trigger an event `evt`.

The function makes an entry in the keyDownMaw indexed by the key pressed and sets this to true.  So for example keyDownMap["w"] = true when the "w" key is pressed.  

If two keys are pressed there will be two entries in the array so possibly  keyDownMap["w"] = true and also keyDownMap["a"] = true.

```javascript
      new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyDownTrigger,
            //parameters: 'w'      
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
        )
    );
```

An execute code action which is triggered when a key is released is then also registered with the actionManager.

This will set the array entry for that key to false.  So, on raising the "w" key keyDownMap["w"] = false.

The scene action manager is returned at the end of the actionManager function.

```javascript
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger
            
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
        )
    );
    return scene.actionManager;
```

The function importMesh() ises a BABYLON.SceneLoader.ImportMesh() function to load a mesh which is in this case in the .babylon format.  The last argument in the function is a function which will be run on the successful loading of the `newMeshes`. This function has another optional parameter of `skeletons`, but this is not required here.

The function then reads the first array member newMesh[0] into a convenient local variable.

This then adds an anonymous function to the list of functions which the scene will render before each frame.

Note that the although the function refers to the mesh positions and rotations it is not a property or method of the imported mesh but is a feature of the scene.

```javascript
function importMesh(scene, x, y) {
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes) {
        let mesh = newMeshes[0];
        scene.onBeforeRenderObservable.add(()=> {
```
The details of the function inspect the state of the keyDownMap and increment the position and set the degree of rotation to move the mesh.  Note that the keyDownMap is only read not written, so as long as a listed key is pressed the position will be incremented once per frame.

To make a "one shot" version, the keyDownMap could be cleared at the end of the function.

Finaly the mesh plugin is returned  at the close of the importMesh() function.

```javascript
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
            }
        });
    });
    return item
}    
```

As an addition to the scene audio is added from an mp3 file which will start automatically and loop continuously.

It is a policy of browsers not to allow audio to autoplay, so some browsers will force you to click an icon to allow the audio to play.

```javascript
function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}
```
Mote that the camera is usually controlled by the arrow keys, so to prevent this the camera controls are not attached.

```javascript
    //camera.attachControl(true);
```

The result is that the character can be moved by the usual keys.  Try pressing "w" and "a" for diagonal motion.

<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="Mesh wasd" 
    src="Block_3/section_9/ex_01_player_motion/showScene1.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

A full listing of **createScene1** is provided:
```javascript
var keyDownMap =[];

function importMesh(scene, x, y) {
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes) {
        let mesh = newMeshes[0];
        scene.onBeforeRenderObservable.add(()=> {
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
            }
        });
    });
    return item
}    
    
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyDownTrigger,
            //parameters: 'w'      
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
        )
    );
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger
            
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
        )
    );
    return scene.actionManager;
}

function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}

function createGround(scene){
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 4});
    return ground;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 15;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    //camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));
    let ground = (that.ground = createGround(scene));
    let manager = (that.actionManager = actionManager(scene));
    let mesh1   = (that.mesh1 = importMesh(scene, 0, 0));
    let bgMusic = (that.bgMusic = backgroundMusic(scene));
    
    return that;
}
```

## Incremental Motion

In the last example motion was added to the scene.1`onBeforeRenderObservable`.  In this example additonal rotational motion is added via an `IncrementalValueAction`.

In **createScene2.js** Within the importMesh() a flag object `tempItem` is added which can take the values true and false and is initially false. 

```javascript
var keyDownMap =[];

function importMesh(scene, x, y) {
    let tempItem = { flag: false }
```
The `onBeforeRenderObservable` section is unchanged to provide the keypress control of translational motion. 

```javascript

    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes, skeletons) {
        let mesh = newMeshes[0];
        scene.onBeforeRenderObservable.add(()=> {
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
            }
        });
```

An `IncrementalValueAction` is registered to the `scene.actionManager` which will be triggered on every frame.  This will increment the mesh.rotation.y by 0.1 every frame provided that the value of tempItem.flag is true.

Initially this flag is set false so there is no continuous rotation.

```javascript
       scene.actionManager.registerAction(
            new BABYLON.IncrementValueAction(
                BABYLON.ActionManager.OnEveryFrameTrigger,
                mesh,
                'rotation.y',
                0.1,
                new BABYLON.PredicateCondition(
                    mesh.actionManager,
                    function () {
                        return tempItem.flag == true
                    }
                )
            )
        ); 
```

An new `actionManager` is now attached to the `mesh`

```javascript
       mesh.actionManager = new BABYLON.ActionManager(scene);
```

A `SetValueAction` is registered to the `mesh.actionManager`.  When this `SetValueAction` is triggered by the mouse key being held down over the mesh to cause an `onPickDownTrigger`, the value of tempItem is set to true.  This will allow the mesh to start spinning.

```javascript
      mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnPickDownTrigger,
                tempItem,
                'flag',
                true
            )
        );
```

Holding the mouse key down over the mesh for a longer time will fire an `OnLongPressTrigger` and the tempItem flag will be returned to false.  Spinning will stop.

```javascript
        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnLongPressTrigger,
                tempItem,
                'flag',
                false
            )
        ); 
```
The `importMesh()` function is then finished off by returning the item.

The result is shown in the example below.  Note what happens to the rotation when the "wasd" keys are used.

<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="Mesh wasd" 
    src="Block_3/section_9/ex_01_player_motion/showScene2.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

The full listing of **createScene2.js** is then:

```javascript
var keyDownMap =[];

function importMesh(scene, x, y) {
    let tempItem = { flag: false }
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes, skeletons) {
        let mesh = newMeshes[0];
        scene.onBeforeRenderObservable.add(()=> {
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
            }
        });

        scene.actionManager.registerAction(
            new BABYLON.IncrementValueAction(
                BABYLON.ActionManager.OnEveryFrameTrigger,
                mesh,
                'rotation.y',
                0.1,
                new BABYLON.PredicateCondition(
                    mesh.actionManager,
                    function () {
                        return tempItem.flag == true
                    }
                )
            )
        ); 

        mesh.actionManager = new BABYLON.ActionManager(scene);
    
    
        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnPickDownTrigger,
                tempItem,
                'flag',
                true
            )
        );
        
        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnLongPressTrigger,
                tempItem,
                'flag',
                false
            )
        ); 

    });

    return item
}    
    
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyDownTrigger,
            //parameters: 'w'      
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger
            
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
        )
    );   


    return scene.actionManager;
}

function addRotation(target, scene){

 /*    */
} 

function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}

function createGround(scene){
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 4});
    return ground;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 15;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    //camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));
    let ground = (that.ground = createGround(scene));
    
    let manager = (that.actionManager = actionManager(scene));
    let mesh1 = (that.mesh1 = importMesh(scene, 0, 0));
    addRotation(mesh1, scene);

    let bgMusic = (that.bgMusic = backgroundMusic(scene));
    
    
    return that;
}
```

## Baked in animations

The dummy mesh which is being imported has a set of animations which were baked into the model.   These include a walking animation which can be used when the player moves.

All the changes needed can be added to the `importMesh()` function.  The 'onSucess' function will now need to include arguments: newMeshes, particleSystems and skeletons.  The particle systems are not being used, but because the argument order is important, the function will not recognise skeletons unless the particleSystems are included.



```javascript
function importMesh(scene, x, y) {
    let tempItem = { flag: false }
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes, particleSystems ,skeletons) {
```

Now a variable is added to use skeletons[0].

The animation properties baked into the model can be modified by controlling the properties of a new `AnimationProperties`

```javascript
        let mesh = newMeshes[0];
        let skeleton = skeletons[0];
        skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        skeleton.animationPropertiesOverride.enableBlending = true;
        skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        skeleton.animationPropertiesOverride.loopMode = 1;
```

Read the animation ranges in from the skeleton.  I am using the "Ybot_Walk", there are others available which I have commented out which may be useful later.

```javascript
        var walkRange = skeleton.getAnimationRange("YBot_Walk");
        // var runRange = skeleton.getAnimationRange("YBot_Run");
        // var leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
        // var rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");
        //var idleRange = skeleton.getAnimationRange("YBot_Idle");
```
If the bot is not animating the animation must be begun when the bot moves, however if the bot is in continuous movement the animation should not be restarted on each frame.  To contol this an animating variable os added.

```javascript
      var animating = false;
```

Now the `onBeforeRenderObservable` added function proceeds to set the x y motion on the basis of keypresses.  If a valid key is detected the keydown variable is set true.

```javascript
       scene.onBeforeRenderObservable.add(()=> {
            var keydown = false;
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
                keydown=true;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
                keydown=true;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
                keydown=true;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
                keydown=true;
            }
```

If the bot is moving at this point keydown will be true and this is used to start the animation, providing it is not already running.



```javascript
           if(keydown){
                if(!animating){
                    animating = true;
                    scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
                }
            }else{
                animating = false;
                scene.stopAnimation(skeleton)
            }
        });
```

The rest of the file is unchanged.

The scene now looks like this:

<iframe 
    height="460" 
    width="100%" 
    scrolling="no" 
    title="Mesh stride" 
    src="Block_3/section_9/ex_01_player_motion/showScene3.html" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>

The full listing of **createScene3.js** is now:

```javascript
// references https://www.babylonjs-playground.com/#15EY4F#15
var keyDownMap =[];

function importMesh(scene, x, y) {
    let tempItem = { flag: false }
    let item = BABYLON.SceneLoader.ImportMesh("", "./assets/models/", "dummy3.babylon", scene, function(newMeshes, particleSystems ,skeletons) {
        let mesh = newMeshes[0];
        let skeleton = skeletons[0];
        skeleton.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        skeleton.animationPropertiesOverride.enableBlending = true;
        skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
        skeleton.animationPropertiesOverride.loopMode = 1;
        
        var walkRange = skeleton.getAnimationRange("YBot_Walk");
        // var runRange = skeleton.getAnimationRange("YBot_Run");
        // var leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
        // var rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");
        //var idleRange = skeleton.getAnimationRange("YBot_Idle");
        var animating = false;

        scene.onBeforeRenderObservable.add(()=> {
            var keydown = false;
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                mesh.position.z += 0.1;
                mesh.rotation.y = 0;
                keydown=true;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                mesh.position.x -= 0.1;
                mesh.rotation.y = 3 * Math.PI / 2;
                keydown=true;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                mesh.position.z -= 0.1;
                mesh.rotation.y = 2 * Math.PI / 2;
                keydown=true;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                mesh.position.x += 0.1;
                mesh.rotation.y = Math.PI / 2;
                keydown=true;
            }

            if(keydown){
                if(!animating){
                    animating = true;
                    scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true);
                }
            }else{
                animating = false;
                scene.stopAnimation(skeleton)
            }
        });

        scene.actionManager.registerAction(
            new BABYLON.IncrementValueAction(
                BABYLON.ActionManager.OnEveryFrameTrigger,
                mesh,
                'rotation.y',
                0.1,
                new BABYLON.PredicateCondition(
                    mesh.actionManager,
                    function () {
                        return tempItem.flag == true
                    }
                )
            )
        ); 

        mesh.actionManager = new BABYLON.ActionManager(scene);
    
    
        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnPickDownTrigger,
                tempItem,
                'flag',
                true
            )
        );
        
        mesh.actionManager.registerAction(
            new BABYLON.SetValueAction(
                BABYLON.ActionManager.OnLongPressTrigger,
                tempItem,
                'flag',
                false
            )
        ); 

    });

    return item
}    
    
function actionManager(scene){
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyDownTrigger,
            //parameters: 'w'      
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = true; }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
            trigger: BABYLON.ActionManager.OnKeyUpTrigger
            
            },
            function(evt) {keyDownMap[evt.sourceEvent.key] = false; }
        )
    );   


    return scene.actionManager;
}

function addRotation(target, scene){

 /*    */
} 

function backgroundMusic(scene){
    let music = new BABYLON.Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    return music;
}

function createGround(scene){
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 10, width: 10, subdivisions: 4});
    return ground;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2;
    let camBeta = Math.PI / 2.5;
    let camDist = 15;
    let camTarget = new BABYLON.Vector3(0, 0, 0);
    let camera = new BABYLON.ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    //camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = {};
    let scene = (that.scene = new BABYLON.Scene(engine));
    //scene.debugLayer.show();

    let light = (that.light = createLight(scene));
    let camera = (that.camera = createArcRotateCamera(scene));
    let ground = (that.ground = createGround(scene));
    
    let manager = (that.actionManager = actionManager(scene));
    let mesh1 = (that.mesh1 = importMesh(scene, 0, 0));
    addRotation(mesh1, scene);

    let bgMusic = (that.bgMusic = backgroundMusic(scene));
    
    
    return that;
}
```


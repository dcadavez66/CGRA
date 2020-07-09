/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 20, 20);
        this.cylinder = new MyCylinder(this,20);
        this.position = [0 ,10 ,0];
        this.vehicle = new MyVehicle(this,0,this.position);
        this.cubescene = new MyUnitCubeQuad(this);
        this.terrain = new MyTerrain(this);
        this.supply = new MySupply(this);
        this.antena = new MyAntena(this);
        this.billboard = new MyBillboard(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.scalaracceleration = 0;
        this.scalarangle = 0;
        this.selectedTexture = -1;  
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.Spressed = false;
        this.Apressed = false;
        this.Dpressed = false;
        this.Ppressed = false;

        this.textureIds = { 'Mountain': 0, 'Mountain 2': 1 };

        this.Material = new CGFappearance(this);
        this.Material.setAmbient(0.1, 0.1, 0.1, 1);
        this.Material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.Material.setSpecular(0.1, 0.1, 0.1, 1);
        this.Material.setShininess(10.0);
        this.Material.loadTexture('images/earth.jpg');
        this.Material.setTextureWrap('REPEAT', 'REPEAT');


        this.texture = new CGFtexture(this, 'images/earth.jpg');
        
        this.Material.setTexture(this.texture);


        this.time = 0;

        //precalculations
        this.piForths = Math.PI/4;
        this.piNinetieth = Math.PI/90;
        this.NpiNinetieth = -Math.PI/90;

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0, 10, 0, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();

        this.lights[2].setPosition(1, 1, 1, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[2].enable();
        this.lights[2].update();

    }
    initCameras() {
        this.camera = new CGFcamera(0.5, 1, 1000, vec3.fromValues(60, 60, 60 ), vec3.fromValues(0, 0, 0));
       

        
    }   

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateAppliedTexture() {
        this.cubescene.updateCubeAppliedTexture(this.selectedTexture);
    }
   
    checkKeys() {

        var text = "Keys pressed: ";
        var keysPressed = false;
        this.Spressed = false;
        this.Apressed = false;
        this.Dpressed = false;


        if(this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed=true;
            this.scalaracceleration += 0.1;
            this.vehicle.accelarate(this.scalaracceleration);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text +=" S ";
            keysPressed = true;
            this.Spressed = true;        
            this.scalaracceleration -= 0.1;
            this.vehicle.accelarate(this.scalaracceleration);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.Apressed = true;
            this.scalarangle = this.piNinetieth;
            this.vehicle.turn(this.scalarangle);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            this.Dpressed = true;   
            this.scalarangle = this.NpiNinetieth;
            this.vehicle.turn(this.scalarangle);   
        }


        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;
            this.vehicle.reset();
            this.scalaracceleration = 0;
            this.scalarangle = 0;
            this.vehicle.accelarate(this.scalaracceleration);
            this.vehicle.turn(this.scalarangle);

        }

        if(this.gui.isKeyPressed("KeyO")){
            text += " O ";
            keysPressed = true;
            this.vehicle.openCabine();
        }

        if(this.gui.isKeyPressed("KeyL")){
            text += " L ";
            keysPressed = true;
            this.vehicle.dropSupply();
        }

        if(this.gui.isKeyPressed("KeyP")){
            text += " P ";
            keysPressed = true;
            this.vehicle.autoPilot();
        }

        if(keysPressed){
            console.log(text);
        }
    }


    // called periodically (as per setUpdatePeriod() in init())
    update(t){

        this.time = t;
        this.checkKeys();
        this.vehicle.update(this.time, this.speedFactor);
        this.billboard.update(this.vehicle.cargoIndex);
    }


    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();
        
        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
            this.translate(0, 5 , 0);
            this.scale(50,50,50);
            this.cubescene.display();

        this.popMatrix();

        
        this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.vehicle.display();
        this.popMatrix();

       this.pushMatrix();
            this.scale(50 , 1, 50);       
            this.terrain.display();
        this.popMatrix();
        
        this.setActiveShader(this.defaultShader);
               
       this.pushMatrix();
            this.translate(-9 , 7.5 , -11);
            this.rotate(this.piForths , 0 , 1 , 0);
            this.billboard.display();
        this.popMatrix();

        this.setActiveShader(this.defaultShader);
              
        // ---- END Primitive drawing section
    }
}
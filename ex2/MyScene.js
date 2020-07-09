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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.table = new MyTable(this);
        /*this.tangram = new MyTangram(this);
        this.cube = new MyUnitCube(this);
        this.quad = new MyQuad(this);
        this.cubeQuad = new MyUnitCubeQuad(this);
<<<<<<< HEAD
        this.diamond = new MyDiamond(this);
=======
        this.table = new MyTable(this); 
       /* this.diamond = new MyDiamond(this);
>>>>>>> 97b1df5a7484aa654e19c93220d9a7d35c2f4731
        this.triangle = new MyTriangle(this);
        this.parallelogram = new MyParallelogram(this);
        this.smallTriangle = new MyTriangleSmall(this);
        this.bigTriangle = new MyTriangleBig(this);
        this.bigTriangle2 = new MyTriangleBig(this);
        
        //Objects connected to MyInterface*/
        this.displayAxis = true;

       /* this.displayDiamond = true;
        this.displayTriangle = true;
        this.displayParallelogram = true;
        this.displayBigTriangle = true;
        this.displayBigTriangle2 = true;
        this.displaySmallTriangle = true;
        this.displayTangram = true;
        this.displayCube = true;
        this.displayQuad = true;*/
        this.scaleFactor = 1;

        
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(0, 0, -5, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].enable();
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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



        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        this.multMatrix(sca);

        this.table.display();

        /*if(this.displayQuad)
            this.quad.display();*/

<<<<<<< HEAD
/*
        this.pushMatrix();
            this.scale(4, 4 , 4);
=======

        /*this.pushMatrix();
            this.scale(5, 5 , 5);
>>>>>>> 97b1df5a7484aa654e19c93220d9a7d35c2f4731
            this.translate(0.5, -0.5, 0.5);
            if(this.displayCube)
                //this.cube.display();
                this.cubeQuad.display();
        this.popMatrix();

        this.pushMatrix();

        this.setAmbient(0.6, 0.8, 0, 1.0);
        this.setDiffuse(0.6, 0.8, 0, 1.0);
        this.setSpecular(0.6, 0.8, 0, 1.0);
        this.setShininess(10.0);
*/
        this.table.display();
/*
        this.scale(0.5 , 0.5 , 0.5);
        this.translate(4 ,1 , 7);
        this.rotate(-Math.PI/2 , 1 , 0 , 0);
        if(this.displayTangram)
            this.tangram.display();
<<<<<<< HEAD
        this.popMatrix();
       */
=======
        this.popMatrix();*/
       
>>>>>>> 97b1df5a7484aa654e19c93220d9a7d35c2f4731
        
        // ---- END Primitive drawing section
    }
}
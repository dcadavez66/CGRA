
class MyCabine extends CGFobject{

	constructor(scene) {
        super(scene);
        this.init();
        this.initMaterials();
    }

    init(){

        this.openAngle = 0;
    	this.platform1 = new MyQuarterCylinder(this.scene, 40 , false);
        this.platform2 = new MyQuarterCylinder(this.scene, 40 , false);
        this.c = new MyCylinder(this.scene, 40 , false);
    	this.half1 = new MyQuarterSphere(this.scene , 16 , 8);
    	this.half2 = new MyQuarterSphere(this.scene , 16 , 8);
        this.halfcircle1 = new MyQuarterCircle(this.scene);
        this.halfcircle2 = new MyQuarterCircle(this.scene);

        this.halfcircle3 = new MyQuarterCircle(this.scene);
        this.halfcircle4 = new MyQuarterCircle(this.scene);

        this.tampa = new MyQuad(this.scene);

        //precalculations
        this.piHalfs = Math.PI/2;
        this.NpiHalfs = -Math.PI/2;
        this.Npi = -Math.PI; 
    }

    initMaterials(){

        this.material1 = new CGFappearance(this.scene);
        this.material1.setAmbient(1, 1, 1, 1);
        this.material1.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material1.setSpecular(0.1, 0.1, 0.1, 1);
        this.material1.setShininess(10.0);
        this.material1.loadTexture('images/tampa.png');
        this.material1.setTextureWrap('REPEAT', 'REPEAT');

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(1, 1, 1, 1);
        this.material2.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material2.setSpecular(0.1, 0.1, 0.1, 1);
        this.material2.setShininess(10.0);
        this.material2.loadTexture('images/cabine2.png');
        this.material2.setTextureWrap('REPEAT', 'REPEAT');

        this.material3 = new CGFappearance(this.scene);
        this.material3.setAmbient(1, 1, 1, 1);
        this.material3.setDiffuse(0.1, 0.1, 0.1, 1);
        this.material3.setSpecular(0.1, 0.1, 0.1, 1);
        this.material3.setShininess(10.0);
        this.material3.loadTexture('images/cabine.png');
        this.material3.setTextureWrap('REPEAT', 'REPEAT');




    }

    display(){

        this.scene.pushMatrix();
            this.material1.apply();
            this.scene.translate(-1 , -0.4 , 0);
            this.scene.scale(2 , 0 , 1.5);
            this.tampa.display();
        this.scene.popMatrix();

        this.material3.apply();

        this.scene.pushMatrix();
            this.scene.scale(1 , -1 , 1);
            this.scene.rotate(this.piHalfs , 0, 1, 0);
            this.halfcircle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.scale(1 , -1 , 1);
            this.scene.rotate(this.NpiHalfs , 0, 1, 0);
            this.halfcircle1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-2 , 0 , 0);
            this.scene.scale(1 , -1 , 1);
            this.scene.rotate(this.piHalfs , 0, 1, 0);
            this.halfcircle3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-2 , 0 , 0);
            this.scene.scale(1 , -1 , 1);
            this.scene.rotate(this.NpiHalfs , 0, 1, 0);
            this.halfcircle4.display();
        this.scene.popMatrix();
        
        this.material2.apply();
        
    	this.scene.pushMatrix();
    		this.scene.rotate(this.NpiHalfs ,1,0,0);
    		this.half1.display();
    	this.scene.popMatrix();

        this.scene.pushMatrix();

            this.scene.rotate(this.Npi , 0 , 1 , 0);
            this.scene.translate(4 , 0 , 0);

        	this.scene.pushMatrix();
        		this.scene.rotate(this.NpiHalfs ,1,0,0);
        		this.scene.translate(-2 , 0 ,0);
        		this.half2.display();
        	this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();

            this.scene.rotate(-this.openAngle , 1 ,0,0);
        	this.scene.pushMatrix();
        		this.scene.rotate(this.piHalfs , 0, 0 , 1);
        		this.scene.scale(1 , 2 ,1 );
        		this.platform1.display();
        	this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.pushMatrix();

            this.scene.rotate(this.openAngle , 1 ,0,0);
            this.scene.pushMatrix();
                this.scene.rotate(this.piHalfs , 0, 0 , 1);
                this.scene.scale(1 , 2 ,-1 );
                this.platform2.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
    }


    openCabine(openAngle){
        this.openAngle = openAngle;
    }
}
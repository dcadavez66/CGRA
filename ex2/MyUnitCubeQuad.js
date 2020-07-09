/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {


	constructor(scene) {
		super(scene);
		this.init();
		this.display();
	}

	init(){

      this.face0 = new MyQuad(this.scene);    
      this.face1 = new MyQuad(this.scene);
      this.face2 = new MyQuad(this.scene);
      this.face3 = new MyQuad(this.scene);
      this.face4 = new MyQuad(this.scene);
	  this.face5 = new MyQuad(this.scene);

	}
	
	display(){

        //face0
        this.scene.pushMatrix();
            this.scene.translate(0 , -0.5 , 0);
            this.scene.rotate(-Math.PI , 1 , 0 , 0 );
            this.face0.display();
        this.scene.popMatrix();

        //face1
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.5 , 0);
            this.face1.display();
        this.scene.popMatrix();
        
        //face2
        this.scene.pushMatrix();
            this.scene.translate(0.5 , 0 , 0);
            this.scene.rotate(-Math.PI/2 , 0 ,0, 1);
            this.face2.display();
        this.scene.popMatrix();
        
        //face3
        this.scene.pushMatrix();
            this.scene.translate(-0.5 , 0 , 0);
            this.scene.rotate(Math.PI/2 , 0 ,0, 1);
            this.face3.display();
        this.scene.popMatrix();
        
        //face4
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , 0.5);
            this.scene.rotate(Math.PI/2 , 1 ,0, 0);
            this.face4.display();
        this.scene.popMatrix();

        //face5
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , -0.5);
            this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
            this.face5.display();
        this.scene.popMatrix();
		
		
	}
}


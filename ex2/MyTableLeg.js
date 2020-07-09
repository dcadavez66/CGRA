/**
 * MyTableLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTableLeg extends CGFobject {


	constructor(scene) {
		super(scene);
		this.init();
		this.display();
	}

	init(){

            this.tableleg = new MyUnitCubeQuad(this.scene);


	}
	
	display(){

        this.scene.pushMatrix();
        this.scene.scale(0.1,0.9,0.1);
        this.tableleg.display();
        this.scene.popMatrix();
      
	}
}

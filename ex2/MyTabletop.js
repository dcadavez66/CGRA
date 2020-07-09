/**
 * MyTabletop
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTabletop extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
		this.display();
	}
	init() {

		this.tabletop = new MyUnitCubeQuad(this.scene);

	}

	display(){

		this.scene.pushMatrix();
            this.scene.scale(1 , 0.1 , 1);
            this.tabletop.display();
        this.scene.popMatrix();

	}
}


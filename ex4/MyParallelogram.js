/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
                     B_________D____F			
				   -              -
				 -              -
	 			A____C________ E

 */
class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0 A
			1, 1, 0,	//1 B
			1, 0, 0,	//2 C
			2, 1, 0,	//3 D
			2, 0, 0,	//4 E
			3, 1, 0,	//5 F
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//primeira face 
			0,2,1,
			2,3,1,
			4,3,2,
			4,5,3,
			//segunda face
			0,1,2,
			3,2,1,
			3,4,2,
			5,4,3

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;
		
		this.initGLBuffers();
	}
}


/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangleBig extends CGFobject {
	constructor(scene, coords) {
		
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
		/*
		this.aux=[];
		this.aux=this.aux.concat(coords);
		console.log(coords);
		console.log(this.aux);
		*/
	}

	initBuffers() {

		this.vertices = [
			0, 2, 0,	//2 C
		   -2, 0, 0,    //5 F
		    2, 0, 0,    //6 G
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, 
			2, 1, 0,
		];

		this.texCoords=[ 0,0,1,0,0,2];
		

		console.log(this.texCoords);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;


		this.initGLBuffers();
	}

		updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
		
}


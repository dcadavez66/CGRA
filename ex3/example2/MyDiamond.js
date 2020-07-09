/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene,nDivs) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

		this.nDivs = nDivs;
        this.patchLength = 2.0 / nDivs;
		this.initBuffers();
	}
	initBuffers() {


		let divs = this.nDivs;
		
		this.vertices = [];

		for(var j = 1.0 ; j >= -1.0 ; j -= this.patchLength ){

			for(var i = -1.0 ; i <= 1.0 ; i += this.patchLength ){

					this.vertices.push(i , j , 0);
			}
		}

		this.indices = [];
		this.normals = [];

		for(var i = 0 ; i < Math.pow(divs,2) + divs -1 ; i++){
			this.indices.push(i , i+divs+1 , i+1);
			this.indices.push( i+divs +1 , i + divs +2 , i+1  );
			
			this.indices.push(i+divs+1 , i ,i+1);
			this.indices.push(  i + divs +2, i+divs +1 , i+1  );
		}

		for(var i = 0 ; i <= this.vertices.length ; i++){
			this.normals.push(0 , 0, 1);
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}


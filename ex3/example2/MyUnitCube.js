/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene , nDivs) {
		super(scene);
		nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

		this.nDivs = nDivs;
        this.patchLength = 1.0 / nDivs;

		this.initBuffers();
	}
	initBuffers() {

		//console.log(this.nDivs);

		let divs = this.nDivs;
		this.vertices = [];

		
		for(var j = 0.5 ; j >= -0.5 ; j -= this.patchLength ){

			for(var i = -0.5 ; i <= 0.5 ; i += this.patchLength ){

					this.vertices.push(i , j , 0);
			}
		}

		//console.log(this.vertices);

		this.indices = [];
		this.normals = [];

		for(var i = 0 ; i < Math.pow(divs,2) + divs -1 ; i++){
			this.indices.push(i , i+divs+1 , i+1);
			this.indices.push( i+divs +1 , i + divs +2 , i+1  );
			
			this.indices.push(i+divs+1 , i ,i+1);
			this.indices.push(  i + divs +2, i+divs +1 , i+1  );
		}
	
	

		//console.log(this.indices);
		

		for(var i = 0 ; i <= this.vertices.length ; i++){
			this.normals.push(0 , 0, 1);
		}

		//console.log(this.normals);

		
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	display(){

		//Z+
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , 0.5);
            //this.scene.rotate(-Math.PI , 1 , 0 , 0 );
           	super.display();
        this.scene.popMatrix();

        //Z-
        this.scene.pushMatrix();
            this.scene.translate(0 , 0 , -0.5);
            this.scene.rotate(Math.PI , 1 ,0, 0);
            super.display();
        this.scene.popMatrix();

        //Y+
        this.scene.pushMatrix();
            this.scene.translate(0 , 0.5 , 0);
            this.scene.rotate(-Math.PI/2 , 1 ,0, 0);
            super.display();
        this.scene.popMatrix();
        
        
        //Y-
        this.scene.pushMatrix();
            this.scene.translate(0 , -0.5 , 0);
            this.scene.rotate(Math.PI/2, 1 ,0, 0);
            super.display();
        this.scene.popMatrix();
        
        //X-
        this.scene.pushMatrix();
            this.scene.translate(-0.5 , 0 , 0);
            this.scene.rotate(-Math.PI/2 , 0 ,1, 0);
            super.display();
        this.scene.popMatrix();
        
        //X+
        this.scene.pushMatrix();
            this.scene.translate(0.5 , 0 , 0);
            this.scene.rotate(Math.PI/2 , 0 ,1, 0);
            super.display();
        this.scene.popMatrix();

      
		
	}

	
	updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


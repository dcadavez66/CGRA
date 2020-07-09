
class MyTerrain extends CGFobject{



	constructor(scene){
		super(scene);
		this.init();
		this.initMaterials();
	}


	init(){
		this.plane = new MyPlane(this.scene , 20);

	    //precalculations
	    this.NpiHalfs = -Math.PI/2;
	}

	initMaterials(){

		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.appearance.setShininess(120);

		this.texture = new CGFtexture(this.scene,"images/terrain_EXP.jpg");
		this.appearance.setTexture(this.texture);
		this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.shader = new CGFshader(this.scene.gl ,"shaders/terrain.vert", "shaders/terrain.frag");
		this.shader.setUniformsValues({ uSampler2: 1 });
		this.texture2 = new CGFtexture(this.scene,"images/heightmap_EXP.jpg");		
	}


	display(){

		this.appearance.apply();
		this.scene.setActiveShader(this.shader);
		this.texture2.bind(1);

		this.scene.pushMatrix();
			this.scene.pushMatrix();
				this.scene.rotate(this.NpiHalfs , 1 , 0 , 0);
				this.plane.display();
			this.scene.popMatrix();
		this.scene.popMatrix();
	}
}
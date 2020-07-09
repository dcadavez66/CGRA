#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;
uniform int suppliesDropped;

void main() {

	vec4 color = texture2D(uSampler2, vTextureCoord);
	

	if(color.b  == 0.0){

		if(vTextureCoord.x < 0.9 && vTextureCoord.x > 0.74 && suppliesDropped >= 1){
			gl_FragColor = vec4(1.0,(-1.0/0.4)*vTextureCoord.x+(0.9/0.4), 0.0 , 1.0);	
		}

		else if( vTextureCoord.x < 0.74 && vTextureCoord.x >0.58 && suppliesDropped >= 2 ){
			gl_FragColor = vec4(1.0,(-1.0/0.4)*vTextureCoord.x+(0.9/0.4), 0.0 , 1.0);	
		}
		else if(vTextureCoord.x < 0.58 && vTextureCoord.x > 0.5 && suppliesDropped >= 3 ){
			gl_FragColor = vec4(1.0,(-1.0/0.4)*vTextureCoord.x+(0.9/0.4), 0.0 , 1.0);
		}

		else if(vTextureCoord.x < 0.5 && vTextureCoord.x > 0.42 && suppliesDropped >= 3 ){
			gl_FragColor = vec4((1.0/0.4)*vTextureCoord.x-(0.1/0.4),1.0, 0.0 , 1.0);
		}

		else if(vTextureCoord.x < 0.42 && vTextureCoord.x > 0.26 && suppliesDropped >= 4){
			gl_FragColor = vec4((1.0/0.4)*vTextureCoord.x-(0.1/0.4),1.0, 0.0 , 1.0);
		}
		else if(vTextureCoord.x < 0.26 && vTextureCoord.x > 0.1 && suppliesDropped >= 5){
			gl_FragColor = vec4((1.0/0.4)*vTextureCoord.x-(0.1/0.4),1.0, 0.0 , 1.0);	
		}
		else{
			gl_FragColor = vec4(0.5 , 0.5 , 0.5 , 1);
		}	
	}
	else{
		gl_FragColor = color;	
	}			
}
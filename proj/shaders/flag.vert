attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float velocity;
uniform float angleRotation;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
	
    vec3 offset = vec3(0.0,0.0,0.0);

    if(velocity == 0.0){
        offset.z = 0.0;
    }
    else {
        offset.z = sin(0.5*velocity*timeFactor+(12.566)*aTextureCoord.x)*0.05;
    }
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);

    vTextureCoord = aTextureCoord;
}


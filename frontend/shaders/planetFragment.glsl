uniform sampler2D planetTexture;

varying vec2 vertexUV;



void main() {
    gl_FragColor = vec4(texture2D(planetTexture, vertexUV).xyz,1.0);
}
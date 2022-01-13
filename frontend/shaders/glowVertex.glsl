varying float intensity;
uniform vec3 objectPosition;

void main() {

    vec3 vNormal = normalize( normalMatrix * normal );
	vec3 vNormel = normalize( normalMatrix * (cameraPosition - objectPosition));
    intensity = pow(1.05 - dot(vNormal,vNormel),1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
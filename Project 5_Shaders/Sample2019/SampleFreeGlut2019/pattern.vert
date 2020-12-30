#version 330 compatibility

uniform float	uTime;		// "Time", from Animate( )
uniform bool verShaderOn;
out vec2  	vST;		// texture coords
out  vec3  vN;			// normal vector
out  vec3  vL;			// vector from point to light
out  vec3  vE;			// vector from point to eye

const vec3 LIGHTPOSITION = vec3( 5., 8., 0.);

const float PI = 	3.14159265;
const float AMP = 	0.2;		// amplitude
const float W = 	2.;		// frequency

void
main( )
{ 
	float x=0;
	vST = gl_MultiTexCoord0.st;
	vec3 vert = gl_Vertex.xyz;
	

	vec4 ECposition = gl_ModelViewMatrix * gl_Vertex;
	vN = normalize( gl_NormalMatrix * gl_Normal );	// normal vector
	vL = LIGHTPOSITION - ECposition.xyz;	// vector from the point
											// to the light position
	vE = vec3( 0., 0., 0. ) - ECposition.xyz;	// vector from the point
												// to the eye position 
		
	
	if (verShaderOn)
	{
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
	}
	else
	{
	
	x = vert.z - uTime;
	//this gives a good one for Sphere
	//vert.x =  sin(PI * (vert.x - uTime*2));
	//vert.y =  sin(PI * (vert.y - uTime*2));
	//vert.z =  sin(PI * (vert.z - uTime*2));
	//gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1. );
	gl_Position = gl_ModelViewProjectionMatrix * vec4( vert + gl_Normal * cos(2 * PI * (x)) * AMP, 1. );
	
	
	}
}

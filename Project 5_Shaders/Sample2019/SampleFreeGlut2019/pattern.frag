#version 330 compatibility
uniform float   uKa, uKd, uKs;	// coefficients of each type of lighting
uniform vec3  uColor;	// object color
uniform vec3  uSpecularColor;	// light color
uniform float   uShininess;  // specular exponent
in vec2   vST;	// texture cords
in  vec3  vN;	// normal vector
in  vec3  vL;	// vector from point to light
in  vec3  vE;	// vector from point to eye
uniform float	uTime;		// "Time", from Animate( )
//in vec2  	vST;		// texture coords
uniform float   uS0, uT0, Ds, Dt, uSize;
//uniform bool uBoolFrag;
uniform bool fragShaderOn;
uniform bool fragIdle;
void
main( )
{

		vec3 Normal = normalize(vN);
		vec3 Light     = normalize(vL);
		vec3 Eye        = normalize(vE);
		vec3 myColor = uColor;
	
		//vec3 ambient = uKa * uColor;

		float d = max( dot(Normal,Light), 0. ); // only do diffuse if the light can see the point
		vec3 diffuse = uKd * d * uColor;

		float s = 0.;
		if( dot(Normal,Light) > 0. )	// only do specular if the light can see the point
		{
			vec3 ref = normalize(  reflect( -Light, Normal )  );
			s = pow( max( dot(Eye,ref),0. ), uShininess );
		}
		vec3 specular = uKs * s * uSpecularColor;
	

	
	if (fragShaderOn)
	{
	//teapot - Sin waves
	float pattern1 = sin(uTime * 3.14);
	
	if (vST.t < sin((vST.s * pattern1 * 2)) && uS0 - uSize/3. <= vST.s && vST.s <= uS0 + uSize/3.)
        myColor = vec3( 1., 0, 0. );
	else
		myColor = vec3( 0, 1, 0);
		
		
	
	if ( cos(uTime+uS0 - uSize/2.) <= uS0-Ds+uSize && cos(uTime+uT0+Dt-uSize/2.) <= vST.t && vST.t <= uT0-Dt+uSize/2. )
			myColor = vec3( 0., 0, 1. );
	}
    
			
	vec3 ambient = uKa * myColor;
	
	gl_FragColor = vec4( ambient + diffuse + specular,  1. );
	
	
}




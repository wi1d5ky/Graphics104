var gl;
var points;

function run()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL 無法使用QQ。" ); }

    var vertices = [
        vec3( -1, 0, 0 ), vec3(-0.65, 1, 0 ), vec3( -0.25, 0.25, 0 ),
        vec3( -1, 0, 0 ), vec3(-0.65, -1, 0 ), vec3( -0.25, -0.25, 0 ),

        vec3(-0.25, 0.25, 0), vec3(0, 1, 0 ), vec3( 0.25, 0.25, 0 ),
        vec3(-0.25, -0.25, 0), vec3(0, -1, 0 ), vec3( 0.25, -0.25, 0 ),

        vec3( 0.25, 0.25, 0 ), vec3( 0.65, 1, 0 ), vec3( 1, 0, 0 ),
        vec3( 0.25, -0.25, 0 ), vec3( 0.65, -1, 0 ), vec3( 1, 0, 0 )
    ];

    var colors = [
        vec3( 1, 0, 0 ), vec3( 1, 0.5, 0 ), vec3( 1, 1, 0 ),
        vec3( 1, 0, 0 ), vec3( 1, 0.5, 0 ), vec3( 1, 1, 0 ),

        vec3( 0.75, 1, 0 ), vec3( 0, 1, 0 ), vec3( 0, 0.25, 0.75 ),
        vec3( 0.75, 1, 0 ), vec3( 0, 1, 0 ), vec3( 0, 0.25, 0.75 ),

        vec3( 0, 0, 1 ), vec3( 0.5, 0, 0.5 ), vec3( 1, 0, 1 ),
        vec3( 0, 0, 1 ), vec3( 0.5, 0, 0.5 ), vec3( 1, 0, 1 )
    ];

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.75, 1.0, 1.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Load the data into the GPU
    var cBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );


    for (var i = 0; i < 6; i++) {
        gl.drawArrays( gl.TRIANGLES, i*3, 3 );
    }
};

window.onload = function() {
    run();
};

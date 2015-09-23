var gl;
var points;

function run()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL 沒辦法用QQ。" ); }


    // Three Vertices

    var a,b,c;
    a = Math.random()*2 - 1;
    b = Math.random()*2 - 1;
    c = Math.random()*2 - 1;

    var vertices = [
        vec2( a, 0 ),
        vec2(  b, 1 ),
        vec2(  c, -1 ),

        vec2( 0, a ),
        vec2(  1, b ),
        vec2(  -1, c ),

        vec2( a, a ),
        vec2(  -b, b ),
        vec2(  c, c )
    ];

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( Math.abs(a), Math.abs(b), Math.abs(c), 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 9 );
}

window.onload = function() {
    setInterval( run, 1000);
};

<?php

$paths = [ 
    'auth_info'=>__DIR__.'/../auth_info.html',
];

${_INIT_CONFIG}=[
    'paths'=>$paths,
    'assetsRoot'=>'/assets/',
    'webpackVendor'=>[]
];

if ('cli'===getenv("DUMP")){
    echo json_encode(${_INIT_CONFIG});
}

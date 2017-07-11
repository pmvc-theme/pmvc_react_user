import React from 'react';

import FacebookIcon from 'ricon/Facebook';

import {
    Button,
    SemanticUI
} from 'react-atomic-molecule';

import {ajaxStore} from 'organism-react-ajax';

const keys=Object.keys;

const popout = (providerId) =>
{
    const url = ajaxStore.getRawUrl({
        path: '/auth/'+providerId
    });
    let win = window;
    let w = 600;
    let h = 540;
    let top  = ((win.innerHeight - h) / 2) + win.screenY; 
    let left = ((win.innerWidth  - w) / 2) + win.screenX;
    let params = {
        width: w,
        height: h,
        top: top,
        left: left
    };
    let textPaams = keys(params).map((key)=>{
        return key+'='+params[key];
    }).join(',');
    let openwin = win.open(url, '', textPaams);
    win.loginReturn = () => {
    }
}

const FbButton = (props) =>
    <Button
        icon={<FacebookIcon />}
        className="facebook"
        type="button"
        {...props}
    >
        FACEBOOK CONNECT
    </Button>

const FacebookLoginButton = (props)=>
<FbButton {...props} onClick={popout.bind(this,'facebook')} />

export default FacebookLoginButton;

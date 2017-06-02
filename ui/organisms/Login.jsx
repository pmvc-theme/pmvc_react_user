import React from 'react';
import {dispatch, pageStore, reshow, ReshowComponent} from 'reshow';
import get from 'get-object-value';

import {
    Divider,
    Button,
    SemanticUI,
    reactStyle
} from 'react-atomic-molecule';

import {
    CardTitle,
    CardField,
    CardButtons,
    CardButton,
    CardFooter,
    CardLink,
    Card
} from '../molecules/material_card';

import {userDispatch} from '../../src/actions/userDispatcher';
import FbButton from '../molecules/FacebookLoginButton';

const EmailLoginButton = (props) =>
    <Button type="button" {...props}>
        Use Email Login
    </Button>


const UserPasswordLoginForm = (props) =>
     <Card atom="form">              
         <CardTitle>Login</CardTitle>
         <CardField id="username" label="Username" />
         <CardField id="password" label="Password" type="password" />
         <CardButtons>
             <CardButton>Go</CardButton>
         </CardButtons>
         <CardFooter>
             <CardLink href="#">Forgot your password?</CardLink>
         </CardFooter>
     </Card>


const loginCallback = (response)=>
{
    console.log('callback', response);
    userDispatch({
        type: 'login/return',
        params: {
            code: response.code
        }
    });
}

let accountKitInit = false;

const handleEmailLogin = () => {
    if (!accountKitInit) {
        const state = pageStore.getState();
        AccountKit.init({
            appId: state.get('accountKitAppId'),
            state: 'test',
            version: state.get('accountKitVersion')
        });
        accountKitInit = true;
    }
    AccountKit.login('EMAIL', {emailAddress: ''}, loginCallback);
};

const ThirdPartyLoginForm = (props) =>
    <Card atom="form">              
        <CardTitle>Login</CardTitle>
        <div style={Styles.row}>
            <FbButton />
        </div>
        <div style={Styles.row}>
            <EmailLoginButton onClick={handleEmailLogin} />
        </div>
    </Card>


class RegisterForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            alerts: [] 
        }
    }

    render()
    {
        return (
              <Card
                atom="form"
                ref={dom=>this.form=dom}
                action={this.props.action}
              > 
                  {this.state.alerts}
                  <CardTitle>ALMOST DONE</CardTitle>
                  <CardField name="username" label="Choose a username" />
                  <CardField name="email" label="Enter your email" value={this.props.email}/>
                  <CardButtons>
                    <CardButton type="submit">JOIN</CardButton>
                  </CardButtons>
              </Card>
        )
    }
}

class Login extends ReshowComponent 
{

   static get initStates()
   {
        return ['isLogin', 'data', 'I18N'];
   }

    render()
    {
        let form;
        const {isLogin, data} = get(this, ['state'], {});
        if (isLogin) {
            form = <RegisterForm {...data} />;
        } else {
            form = <ThirdPartyLoginForm  {...data} />; 
        }

        return (
            <SemanticUI style={Styles.container}>
                <Card style={Styles.firstCard} />
                {form}
            </SemanticUI>
        );
    }
}

export default reshow(Login);

const Styles = {
    firstCard: {
       backgroundColor: '#fafafa',
       height: '10px',
       borderRadius: '5px 5px 0 0',
       margin: '0 10px',
       padding: 0
    },
    container: {
        position: 'relative',
        maxWidth: '460px',
        width: '100%',
        margin: '100px auto 100px',
    },
    row: {
        marginBottom: 10,
        textAlign: 'center'
    }
};

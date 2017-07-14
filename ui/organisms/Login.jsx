import React, {PureComponent} from 'react';
import {reshow, ReshowComponent, ReForm} from 'reshow';
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
import FbButton from '../organisms/FacebookLoginButton';
import AccountKit from '../organisms/AccountKit';

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

const ThirdPartyLoginForm = ({
    accountKitAppId,
    accountKitVersion,
    I18N_Default,
    I18N,
    ...props
}) => {
    I18N = {...I18N_Default, ...I18N};
    return (
        <Card>
            <CardTitle>Login</CardTitle>
            <div style={Styles.buttonRow}>
                <FbButton style={Styles.button}/>
            </div>
            <Divider className="horizontal">{I18N.or}</Divider>
            <AccountKit
                I18N={I18N}
                accountKitAppId={accountKitAppId}
                accountKitVersion={accountKitVersion}
            />
        </Card>
    );
};
ThirdPartyLoginForm.defaultProps = {
    I18N_Default: {
        or: 'OR'
    }
};


class RegisterForm extends React.Component
{
    handleErrors = (json, text, response) =>
    {
        let alerts = {type: {}, message: {}};
        const errors = get(json,['data', 'errors']);
        errors.forEach((item)=>{
            const field = get(item, ['field']);
            alerts.type[field]='error';
            alerts.message[field]=get(item, ['message']);
        });
        this.setState({alerts: alerts});
    }

    constructor(props)
    {
        super(props);
        this.state = {
            alerts: {}
        }
    }

    render()
    {
        const {path, email} = this.props;
        const alerts = this.state.alerts;
        return (
              <Card> 
                  <ReForm path={path} ui={false} errorCallback={this.handleErrors}>
                      <CardTitle>ALMOST DONE</CardTitle>
                      <CardField name="legalName" label="Choose a username"
                        messageType={get(alerts, ['type', 'legalName'])}
                        message={get(alerts, ['message', 'legalName'])}
                      />
                      <CardField name="email" label="Enter your email"
                        messageType={get(alerts, ['type', 'email'])}
                        message={get(alerts, ['message', 'email'])}
                        value={email}
                      />
                      <CardButtons>
                        <CardButton type="submit">JOIN</CardButton>
                      </CardButtons>
                   </ReForm>
              </Card>
        )
    }
}

class Welcome extends PureComponent  
{
    render()
    {
        const {welcome} = this.props;
        return (
            <Card> 
                <ReForm path='/user/logout' method="get" updateUrl={true} ui={false}>
                    <CardTitle>{welcome}</CardTitle>
                    <CardButtons>
                        <CardButton type="submit">Logout</CardButton>
                    </CardButtons>
                </ReForm>
            </Card>
        );
    }
}

class Login extends ReshowComponent 
{

   static get initStates()
   {
        return ['isLogin', 'isRegistered', 'data', 'I18N'];
   }

    render()
    {
        const {isLogin, isRegistered, data, I18N} = get(this, ['state'], {});
        const {registerActionPath} = get(data, null, {})
        let form;
        if (isLogin) {
            if (isRegistered) {
                form = <Welcome {...data} I18N={I18N} />; 
            } else {
                form = <RegisterForm {...data} I18N={I18N} path={registerActionPath} />;
            }
        } else {
            form = <ThirdPartyLoginForm {...data} I18N={I18N} />; 
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
    buttonRow: {
        maxWidth: '80%',
        margin: '0 auto'
    },
    button: {
        width: '100%'
    }
};

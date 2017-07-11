import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import get from 'get-object-value';
import {
    CardField,
    CardButtons,
    CardButton,
} from '../molecules/material_card';
import {userDispatch} from '../../src/actions/userDispatcher';

class AccountKitEl extends PureComponent
{

    loginCallback = (response)=>
    {
        const state = get(response, ['status']);
        if ('BAD_PARAMS'===state) {
            return;
        }
        userDispatch({
            type: 'login/return',
            params: {
                code: response.code,
                providerId: 'accountKit'
            }
        });
    }

    accountKitInit = false;
    handleAccountKitLogin = (e) => {
        const {accountKitAppId, accountKitVersion} = this.props;
        e.preventDefault();
        if (!this.accountKitInit) {
            AccountKit.init({
                appId: accountKitAppId,
                state: 'test',
                version: accountKitVersion
            });
            this.accountKitInit = true;
        }
        const loginElVal = this.loginEl.value;
        if (-1 !== loginElVal.indexOf('@')) {
            AccountKit.login(
                'EMAIL',
                {emailAddress: loginElVal},
                this.loginCallback
            );
        } else {
            AccountKit.login(
                'PHONE',
                {
                    countryCode: '+886', 
                    phoneNumber: loginElVal
                },
                this.loginCallback
            );
        }
    }

    render()
    {
        const {I18N_Default, I18N} = this.props; 
        const i18n = {...I18N_Default, ...I18N};
        return (
         <form onSubmit={this.handleAccountKitLogin}>
            <CardField
                name="login"
                label={i18n.login}
                refCb={el=>this.loginEl=el}
            />
             <CardButtons>
                 <CardButton>{i18n.getStart}</CardButton>
             </CardButtons>
         </form>
        );
    }
}

AccountKitEl.propTypes = {
    accountKitAppId: PropTypes.string.isRequired,
    accountKitVersion: PropTypes.string.isRequired,
};

AccountKitEl.defaultProps = {
    I18N_Default: {
        login: 'Your Email or Mobile Phone',
        getStart: 'Get Start!'
    }
};

export default AccountKitEl; 

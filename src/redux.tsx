import { Alert } from 'react-native';
import { Dispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { Dispatchable, StandardAction } from './_common/action';
import {
    DefaultApiFactory as AccountApi, login_FAILURE, login_SUCCESS, loginParams,
    smsCode_FAILURE,
    smsCode_SUCCESS,
    smsCodeParams, smsLogin_FAILURE, smsLogin_SUCCESS,
    smsLoginParams, smsSignup_FAILURE, smsSignup_SUCCESS, smsSignupParams
} from './api/account-private/gen/';
import {
    AuthorizationCode, authorize_FAILURE, authorize_SUCCESS,
    DefaultApiFactory as OauthPrivateApi
} from './api/oauth-private/gen/';
import {
    DefaultApiFactory as UserPrivateApi, oauthJump_FAILURE, oauthJump_SUCCESS, OauthJumpResponse, oauthState_FAILURE,
    oauthState_SUCCESS
} from './api/user-private/gen';

const accountApi = AccountApi(undefined, undefined, 'http://127.0.0.1:8083/api-private/v1/accounts');
const oauthPrivateApi = OauthPrivateApi(undefined, undefined, 'http://127.0.0.1:8085/api-private/v1/oauth');
const userPrivateApi = UserPrivateApi(undefined, undefined, 'http://127.0.0.1:8086/api-private/v1/users');

export interface ToastInfo {
    text: string;
    timestamp: Date;
}

const GLOBAL_TOAST_ACTION = 'GLOBAL_TOAST_ACTION';

export interface RootState {
    apiError: string;
    globalToast: ToastInfo;
    oauthJumpResponse: OauthJumpResponse;
}

function  onAccountLoginSuccess(jwt: string): Dispatchable {
    return (dispatch: Dispatch<StandardAction>) => {
        return userPrivateApi.oauthState('fromApp')
            .then((state: string) => {
                dispatch({type: oauthState_SUCCESS, payload: state});
                return oauthPrivateApi.authorize(jwt, 'code', '100002', 'fromApp', 'BASIC', state)
                    .then((authorizationCode: AuthorizationCode) => {
                        if (authorizationCode.code === undefined) {
                            return dispatch({type: authorize_FAILURE, error: true, payload: 'code is null'});
                        }
                        dispatch({type: authorize_SUCCESS, payload: authorizationCode});
                        userPrivateApi.oauthJump('fromApp', authorizationCode.code, state)
                            .then((oauthJumpResponseData: OauthJumpResponse) => {
                                dispatch({type: oauthJump_SUCCESS, payload: oauthJumpResponseData});
                                dispatch({
                                    type: GLOBAL_TOAST_ACTION,
                                    payload: {text: '登录成功', timestamp: new Date()}
                                });
                            }).catch((err) => {
                            dispatch({type: oauthJump_FAILURE, error: true, payload: err});
                        });
                    }).catch((err) => {
                        dispatch({type: authorize_FAILURE, error: true, payload: err});
                    });
            }).catch((err) => {
                dispatch({type: oauthState_FAILURE, error: true, payload: err});
            });
    };
}

export function apiAccountSmsCode(p: smsCodeParams): Dispatchable {
    return (dispatch: Dispatch<StandardAction>) => {
        return accountApi.smsCode(p.scene, p.phone, p.captchaId, p.captchaCode)
            .then(() => {
                dispatch({type: smsCode_SUCCESS});
                dispatch({
                    type: GLOBAL_TOAST_ACTION,
                    payload: {text: '已发送', timestamp: new Date()}
                });
            }).catch((err) => {
                dispatch({type: smsCode_FAILURE, error: true, payload: err});
            });
    };
}

export function apiAccountSmsLogin(p: smsLoginParams): Dispatchable {
    return (dispatch: Dispatch<StandardAction>) => {
        return accountApi.smsLogin(p.phone, p.smsCode)
            .then((jwt: string) => {
                dispatch({type: smsLogin_SUCCESS, payload: jwt});
                dispatch(onAccountLoginSuccess(jwt));
            }).catch((err) => {
                dispatch({type: smsLogin_FAILURE, error: true, payload: err});
            });
    };
}

export function apiAccountLogin(p: loginParams): Dispatchable {
    return (dispatch: Dispatch<StandardAction>) => {
        return accountApi.login(p.name, p.password)
            .then((jwt: string) => {
                dispatch({type: login_SUCCESS, payload: jwt});
                dispatch(onAccountLoginSuccess(jwt));
            }).catch((err) => {
                dispatch({type: login_FAILURE, error: true, payload: err});
            });
    };
}

export function apiAccountSmsSignup(p: smsSignupParams): Dispatchable {
    return (dispatch: Dispatch<StandardAction>) => {
        return accountApi.smsSignup(p.phone, p.smsCode, p.password)
            .then((jwt: string) => {
                dispatch({type: smsSignup_SUCCESS, payload: jwt});
                dispatch(onAccountLoginSuccess(jwt));
            })
            .catch((err) => {
                dispatch({type: smsSignup_FAILURE, error: true, payload: err});
            });
    };
}

function globalToast(state: ToastInfo, action: StandardAction): ToastInfo {
    if (state === undefined) {
        return {text: '', timestamp: new Date()};
    }

    switch (action.type) {
        case GLOBAL_TOAST_ACTION:
            return action.payload;
        default:
            return state;
    }
}

function apiError(state: string, action: StandardAction): string {
    if (state === undefined) {
        return '';
    }

    switch (action.type) {
        case login_FAILURE:
        case smsCode_FAILURE:
        case smsLogin_FAILURE:
        case oauthState_FAILURE:
        case authorize_FAILURE:
        case oauthJump_FAILURE:
            Alert.alert('请求失败', action.payload === undefined ? '' : action.payload.toString());
            return action.payload === undefined ? '' : JSON.stringify(action.payload);
        default:
            return state;
    }
}

function oauthJumpResponse(state: OauthJumpResponse, action: StandardAction): OauthJumpResponse {
    if (state === undefined) {
        return {};
    }

    switch (action.type) {
        case oauthJump_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    apiError,
    globalToast,
    oauthJumpResponse
});
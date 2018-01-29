/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * User Private API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


import * as url from "url";
import * as portableFetch from "portable-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "http://localhost/api-private/v1/users".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *  
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 * 
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = portableFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 * 
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface OauthJumpResponse
 */
export interface OauthJumpResponse {
    /**
     * 
     * @type {string}
     * @memberof OauthJumpResponse
     */
    token?: string;
    /**
     * 
     * @type {string}
     * @memberof OauthJumpResponse
     */
    refreshToken?: string;
    /**
     * 
     * @type {string}
     * @memberof OauthJumpResponse
     */
    queryString?: string;
}


/**
 * DefaultApi - fetch parameter creator
 * @export
 */
export const DefaultApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {string} token 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(token: string, refreshToken: string, options: any = {}): FetchArgs {
            // verify required parameter 'token' is not null or undefined
            if (token === null || token === undefined) {
                throw new RequiredError('token','Required parameter token was null or undefined when calling logout.');
            }
            // verify required parameter 'refreshToken' is not null or undefined
            if (refreshToken === null || refreshToken === undefined) {
                throw new RequiredError('refreshToken','Required parameter refreshToken was null or undefined when calling logout.');
            }
            const localVarPath = `/token/logout`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (token !== undefined) {
                localVarQueryParameter['token'] = token;
            }

            if (refreshToken !== undefined) {
                localVarQueryParameter['refreshToken'] = refreshToken;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} redirectUri 
         * @param {string} authorizationCode 
         * @param {string} state 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthJump(redirectUri: string, authorizationCode: string, state: string, options: any = {}): FetchArgs {
            // verify required parameter 'redirectUri' is not null or undefined
            if (redirectUri === null || redirectUri === undefined) {
                throw new RequiredError('redirectUri','Required parameter redirectUri was null or undefined when calling oauthJump.');
            }
            // verify required parameter 'authorizationCode' is not null or undefined
            if (authorizationCode === null || authorizationCode === undefined) {
                throw new RequiredError('authorizationCode','Required parameter authorizationCode was null or undefined when calling oauthJump.');
            }
            // verify required parameter 'state' is not null or undefined
            if (state === null || state === undefined) {
                throw new RequiredError('state','Required parameter state was null or undefined when calling oauthJump.');
            }
            const localVarPath = `/token/oauthJump`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (redirectUri !== undefined) {
                localVarQueryParameter['redirectUri'] = redirectUri;
            }

            if (authorizationCode !== undefined) {
                localVarQueryParameter['authorizationCode'] = authorizationCode;
            }

            if (state !== undefined) {
                localVarQueryParameter['state'] = state;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} queryString 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthState(queryString: string, options: any = {}): FetchArgs {
            // verify required parameter 'queryString' is not null or undefined
            if (queryString === null || queryString === undefined) {
                throw new RequiredError('queryString','Required parameter queryString was null or undefined when calling oauthState.');
            }
            const localVarPath = `/token/oauthState`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (queryString !== undefined) {
                localVarQueryParameter['queryString'] = queryString;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken(refreshToken: string, options: any = {}): FetchArgs {
            // verify required parameter 'refreshToken' is not null or undefined
            if (refreshToken === null || refreshToken === undefined) {
                throw new RequiredError('refreshToken','Required parameter refreshToken was null or undefined when calling refreshToken.');
            }
            const localVarPath = `/token/refresh`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (refreshToken !== undefined) {
                localVarQueryParameter['refreshToken'] = refreshToken;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 
         * @param {string} token 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(token: string, refreshToken: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response> {
            const localVarFetchArgs = DefaultApiFetchParamCreator(configuration).logout(token, refreshToken, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return new Promise<Response>((resolve) => {return resolve(response);})
                    } else {
                        return response.json().then((data: {}) => {throw JSON.stringify(data); });
                    }
                });
            };
        },
        /**
         * 
         * @summary 
         * @param {string} redirectUri 
         * @param {string} authorizationCode 
         * @param {string} state 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthJump(redirectUri: string, authorizationCode: string, state: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<OauthJumpResponse> {
            const localVarFetchArgs = DefaultApiFetchParamCreator(configuration).oauthJump(redirectUri, authorizationCode, state, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return response.json().then((data: {}) => {throw JSON.stringify(data); });
                    }
                });
            };
        },
        /**
         * 
         * @summary 
         * @param {string} queryString 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthState(queryString: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string> {
            const localVarFetchArgs = DefaultApiFetchParamCreator(configuration).oauthState(queryString, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return response.json().then((data: {}) => {throw JSON.stringify(data); });
                    }
                });
            };
        },
        /**
         * 
         * @summary 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken(refreshToken: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<string> {
            const localVarFetchArgs = DefaultApiFetchParamCreator(configuration).refreshToken(refreshToken, options);
            return (fetch: FetchAPI = portableFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return response.json().then((data: {}) => {throw JSON.stringify(data); });
                    }
                });
            };
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @summary 
         * @param {string} token 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(token: string, refreshToken: string, options?: any) {
            return DefaultApiFp(configuration).logout(token, refreshToken, options)(fetch, basePath);
        },
        /**
         * 
         * @summary 
         * @param {string} redirectUri 
         * @param {string} authorizationCode 
         * @param {string} state 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthJump(redirectUri: string, authorizationCode: string, state: string, options?: any) {
            return DefaultApiFp(configuration).oauthJump(redirectUri, authorizationCode, state, options)(fetch, basePath);
        },
        /**
         * 
         * @summary 
         * @param {string} queryString 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        oauthState(queryString: string, options?: any) {
            return DefaultApiFp(configuration).oauthState(queryString, options)(fetch, basePath);
        },
        /**
         * 
         * @summary 
         * @param {string} refreshToken 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken(refreshToken: string, options?: any) {
            return DefaultApiFp(configuration).refreshToken(refreshToken, options)(fetch, basePath);
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary 
     * @param {} token 
     * @param {} refreshToken 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public logout(token: string, refreshToken: string, options?: any) {
        return DefaultApiFp(this.configuration).logout(token, refreshToken, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary 
     * @param {} redirectUri 
     * @param {} authorizationCode 
     * @param {} state 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public oauthJump(redirectUri: string, authorizationCode: string, state: string, options?: any) {
        return DefaultApiFp(this.configuration).oauthJump(redirectUri, authorizationCode, state, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary 
     * @param {} queryString 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public oauthState(queryString: string, options?: any) {
        return DefaultApiFp(this.configuration).oauthState(queryString, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary 
     * @param {} refreshToken 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public refreshToken(refreshToken: string, options?: any) {
        return DefaultApiFp(this.configuration).refreshToken(refreshToken, options)(this.fetch, this.basePath);
    }

}

export interface logoutParams {
    token: string;
    refreshToken: string;
}
export interface oauthJumpParams {
    redirectUri: string;
    authorizationCode: string;
    state: string;
}
export interface oauthStateParams {
    queryString: string;
}
export interface refreshTokenParams {
    refreshToken: string;
}

export const logout_REQUEST = "logout_REQUEST";
export const logout_FAILURE = "logout_FAILURE";
export const logout_SUCCESS = "logout_SUCCESS";
export const oauthJump_REQUEST = "oauthJump_REQUEST";
export const oauthJump_FAILURE = "oauthJump_FAILURE";
export const oauthJump_SUCCESS = "oauthJump_SUCCESS";
export const oauthState_REQUEST = "oauthState_REQUEST";
export const oauthState_FAILURE = "oauthState_FAILURE";
export const oauthState_SUCCESS = "oauthState_SUCCESS";
export const refreshToken_REQUEST = "refreshToken_REQUEST";
export const refreshToken_FAILURE = "refreshToken_FAILURE";
export const refreshToken_SUCCESS = "refreshToken_SUCCESS";


const onResponse = async (response: any) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    const body = await response.json();
    return Promise.reject({ status: response.status, body });
}

export const post = (body: any, url: string, cache: RequestCache | undefined = 'no-store', headers?: any) => fetch(url, {
    method: 'POST',
    cache: cache,
    body: JSON.stringify(body),
    headers: headers
}).then(onResponse);

export const get = (url: string, cache: RequestCache | undefined = 'no-store', headers?: any) => fetch(url, {
    cache: cache,
    method: 'GET',
    headers: headers
}).then(onResponse);

export const put = (body: any, url: string) => fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body)
}).then(onResponse);

export const deleteR = (url: string) => fetch(url, {
    method: 'DELETE'
}).then(onResponse);

export const patch = (body: any, url: string, cache: RequestCache | undefined = 'no-store', headers?: any) => fetch(url, {
    method: 'PATCH',
    cache: cache,
    body: JSON.stringify(body),
    headers: headers
}).then(onResponse);

export function createPathParams(params: any) {
    let pathParams: string[] = [];
    for (const param in params) {
        if (params[param]) {
            if (Array.isArray(params[param])) {
                params[param].forEach((paramValue: string) => pathParams.push(`${param}=${paramValue}`))
            } else {
                pathParams.push(`${param}=${params[param]}`);
            }
        }
    }
    return pathParams.join("&");
}

export const createCookieHeader = (cookies: any) => ({ cookie: 'token=' + cookies.get('token')?.value })

export const getHost = (headers: any): string => headers.get("host");
const onResponse = async (response: any) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    const body = await response.json();
    return Promise.reject({ status: response.status, body });
}

export const post = (body: any, url: string, cache: RequestCache | undefined = 'no-store') => fetch(url, {
    method: 'POST',
    cache: cache,
    body: JSON.stringify(body)
}).then(onResponse);

export const get = (url: string, cache: RequestCache | undefined = 'no-store') => fetch(url, {
    cache: cache,
    method: 'GET',
}).then(onResponse);

export const put = (body: any, url: string) => fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body)
}).then(onResponse);

export const deleteR = (url: string) => fetch(url, {
    method: 'DELETE'
}).then(onResponse);

export function createPathParams(params: any) {
    var pathParams = "";
    for (const param in params) {
        if (params[param]) {
            if (pathParams.length > 0) {
                pathParams += '&';
            }
            pathParams += `${param}=${params[param]}`
        }
    }
    return pathParams;
}
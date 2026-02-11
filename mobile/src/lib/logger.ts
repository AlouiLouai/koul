export const logger = {
    log: (message?: any, object?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.log(message, JSON.stringify(object, null, 2), ...optionalParams);
    },
    error: (message?: any, object?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.error(message, JSON.stringify(object, null, 2), ...optionalParams);
    },
    warn: (message?: any, object?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.warn(message, JSON.stringify(object, null, 2), ...optionalParams);
    },
    info: (message?: any, object?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.info(message, JSON.stringify(object, null, 2), ...optionalParams);
    },
    debug: (message: string, object?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.debug(message, JSON.stringify(object, null, 2), ...optionalParams);
    },
    trace: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.trace(message, ...optionalParams);
    },
}
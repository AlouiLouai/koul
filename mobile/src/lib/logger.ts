export const logger = {
    log: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.log(message, ...optionalParams);
    },
    error: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.error(message, ...optionalParams);
    },
    warn: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.warn(message, ...optionalParams);
    },
    info: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.info(message, ...optionalParams);
    },
    debug: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.debug(message, ...optionalParams);
    },
    trace: (message?: any, ...optionalParams: any[]) => {
        if (__DEV__)
            console.trace(message, ...optionalParams);
    },
}
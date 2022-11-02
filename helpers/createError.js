export const createError = (status, code, message, data) => {
    // return json object
    return {
        status,
        code,
        message,
        data
    }
}




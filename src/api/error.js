const DEFAULT_ERR = '暂时无法处理您的请求哦，请稍后再试！'

const errMapping = {
    3000: DEFAULT_ERR
}

class GeneralException {
    constructor(customerMessage) {
        let errorCode = 3000
        let errMessage = errMapping[errorCode]
        if (customerMessage || !errMessage) {
            errMessage = customerMessage
        }
        this.errorCode = errorCode
        this.errorMessage = errMessage
    }
}

export { GeneralException }

class baseController {
    constructor () {
        if (this.constructor === baseController) {
            throw new Error("baseController is an abstract class and can not be instance!!!!!!")
        }
    }

    toError (res, error) {
        res.status(500).send(error.toString())
    }

}

export default baseController
import { getEnv } from "./utils.js";
import swaggerJSDoc from "swagger-jsdoc";
import user from "../Swagger-docs/user.js";


const options = {
    definition : {
        openapi : "3.0.0",
        info : {
            title : getEnv("SWAGGER_TITLE"),
            version : getEnv("SWAGGER_VERSION"),
        },
        servers : [
            {
                url : getEnv("APP_URL"),
            },
        ]

    },
    apis : [],
    swaggerDefinition : {
        paths: {
            ...user
        }
    }
}

export default swaggerJSDoc(options)
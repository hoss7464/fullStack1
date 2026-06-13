export default {
  
  "/user/profile": {
    get: {
      tags: ["Users"],
      summary: "User get profile",
      description: "Authenticate a user with email and password",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "x-token",
          in: "header",
          description: "x-token",
          required: true,
          type: "string",
          
        }
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: { 
                type: "object",
                properties: {
                  user_info: { type: "string" }
                }
              }
            }
          }
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" }
            }
          }
        }
      }
    }
  },

  "/user/refresh-token": {
    post: {
      tags: ["Users"],
      summary: "User refresh token",
      description: "Authenticate a user with email and password",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "access_token",
          in: "formData",
          description: "access_token",
          required: true,
          type: "string",
          
        },
        {
          name: "refresh_token",
          in: "formData",
          description: "refresh_token",
          required: true,
          type: "string",
          
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: { 
                type: "object",
                properties: {
                  user_info: { type: "string" }
                }
              }
            }
          }
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" }
            }
          }
        }
      }
    }
  },

  "/user/login": {
    post: {
      tags: ["Users"],
      summary: "User login",
      description: "Authenticate a user with email and password",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "email",
          in: "formData",
          description: "User's email address",
          required: true,
          type: "string",
          example: "user@example.com",
        },
        {
          name: "password",
          in: "formData",
          description: "User's password",
          required: true,
          type: "string",
          example: "yourpassword123",
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: {
                type: "object",
                properties: {
                  user_info: { type: "string" },
                },
              },
            },
          },
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
            },
          },
        },
      },
    },
  },

"/user/logout": {
    get: {
      tags: ["Users"],
      summary: "User get profile",
      description: "Authenticate a user with email and password",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "x-token",
          in: "header",
          description: "x-token",
          required: true,
          type: "string",
          
        }
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: { 
                type: "object",
                properties: {
                  user_info: { type: "string" }
                }
              }
            }
          }
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" }
            }
          }
        }
      }
    }
  },

  "/user/register": {
     post: {
      tags: ["Users"],
      summary: "User register",
      description: "user register",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "username",
          in: "formData",
          description: "User name",
          required: true,
          type: "string",
          example: "hossein12344",
        },
        {
          name: "email",
          in: "formData",
          description: "User's email address",
          required: true,
          type: "string",
          example: "user@example.com",
        },
        {
          name: "phone",
          in: "formData",
          description: "User phone number",
          required: true,
          type: "string",
          example: "+98123456789",
        },
        {
          name: "password",
          in: "formData",
          description: "User's password",
          required: true,
          type: "string",
          example: "yourpassword123",
        },
        {
          name: "confirmPass",
          in: "formData",
          description: "confirm your password",
          required: true,
          type: "string",
          example: "yourpassword123",
        },
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: {
                type: "object",
                properties: {
                  user_info: { type: "string" },
                },
              },
            },
          },
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
            },
          },
        },
      },
    },
  },

  "/user/forgot": {
    post: {
      tags: ["Users"],
      summary: "User forget password",
      description: "forget your password",
      consumes: ["application/x-www-form-urlencoded"], // Changed for form-data
      produces: ["application/json"],
      parameters: [
        {
          name: "email",
          in: "formData",
          description: "User's email address",
          required: true,
          type: "string",
          example: "user@example.com",
        }
      ],
      responses: {
        200: {
          description: "Successful operation",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
              data: {
                type: "object",
                properties: {
                  user_info: { type: "string" },
                },
              },
            },
          },
        },
        404: {
          description: "Not found",
          schema: {
            type: "object",
            properties: {
              msg: { type: "string" },
            },
          },
        },
      },
    },
  }

};

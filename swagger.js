
export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Classroom Observation API',
            version: '1.0.0',
            description: 'A classroom observation API',
            contact: {
                "name": "API Support",
                "url": "http://www.example.com/support",
                "email": "support@example.com"
            },
            servers: [{
                url: 'http://localhost:8000'
            },
            ]
        },

        paths: {
            // add a title as auth apis 

            '/': {
                post: {
                    tags: ['Base'],
                    summary: 'Base route',
                    description: 'This is a base route',
                }
            },

            '/users/login': {
                post: {
                    tags: ['Login'],
                    summary: 'Api for logging in a existing user',
                    description: 'This is a login route',
                    requestBody: {
                        content: {
                            'application/json': {
                                // add email and password as required
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string',
                                            required: true
                                        },
                                        password: {
                                            type: 'string',
                                            required: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'User logged in successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string'

                                            },
                                            status: {
                                                type: 'number'
                                            },
                                            message: {
                                                type: 'string'
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    token: {
                                                        type: 'string'
                                                    },
                                                    user: {
                                                        type: 'object',
                                                        properties: {
                                                            id: {
                                                                type: 'string'
                                                            },
                                                            name: {
                                                                type: 'string'
                                                            },
                                                            email: {
                                                                type: 'string'
                                                            },
                                                            role: {
                                                                type: 'string'
                                                            },
                                                            createdAt: {
                                                                type: 'string'
                                                            },
                                                            updatedAt: {
                                                                type: 'string'
                                                            },
                                                            __v: {
                                                                type: 'number'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },

                }
            },
            '/users/register': {
                post: {
                    tags: ['Register'],
                    summary: 'Api for registering a new user',
                    description: 'This is a register route',
                    requestBody: {
                        content: {
                            'application/json': {
                                // add email and password as required
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string',
                                            required: true
                                        },
                                        email: {
                                            type: 'string',
                                            required: true
                                        },
                                        password: {
                                            type: 'string',
                                            required: true
                                        },
                                        role: {
                                            type: 'string',
                                            required: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'User registered successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string'
                                            },
                                            status: {
                                                type: 'number'
                                            },
                                            message: {
                                                type: 'string'
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    token: {
                                                        type: 'string'
                                                    },
                                                    user: {
                                                        type: 'object',
                                                        properties: {
                                                            id: {
                                                                type: 'string'
                                                            },
                                                            name: {
                                                                type: 'string'
                                                            },
                                                            email: {
                                                                type: 'string'
                                                            },
                                                            role: {
                                                                type: 'string'
                                                            },
                                                            createdAt: {
                                                                type: 'string'
                                                            },
                                                            updatedAt: {
                                                                type: 'string'
                                                            },
                                                            __v: {
                                                                type: 'number'
                                                            },

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    parameters: [
                        {
                            name: 'name',
                            in: 'body',
                            description: 'Name of the user',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'email',
                            in: 'body',
                            description: 'Email of the user',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'password',
                            in: 'body',
                            description: 'Password of the user',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'role',
                            in: 'body',
                            description: 'Role of the user',
                            required: false,
                            type: 'string'
                        }
                    ],
                }
            },
            '/users/{id}': {
                put: {
                    tags: ['Update User'],
                    summary: 'Api for updating a user',
                    description: 'This is a update route',
                    requestBody: {
                        content: {
                            'application/json': {
                                // add email and password as required
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string',
                                            required: false
                                        },
                                        email: {
                                            type: 'string',
                                            required: false
                                        },
                                        role: {
                                            type: 'string',
                                            required: false
                                        }
                                    }
                                }
                            }
                        }
                    },
                    respponses: {
                        '200': {
                            description: 'User updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string'
                                            },
                                            status: {
                                                type: 'number'
                                            },
                                            message: {
                                                type: 'string'

                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    token: {
                                                        type: 'string'
                                                    },
                                                    user: {
                                                        type: 'object',
                                                        properties: {
                                                            id: {
                                                                type: 'string'
                                                            },
                                                            name: {
                                                                type: 'string',
                                                            },
                                                            email: {
                                                                type: 'string'
                                                            },
                                                            role: {
                                                                type: 'string'
                                                            },
                                                            createdAt: {
                                                                type: 'string'
                                                            },
                                                            updatedAt: {
                                                                type: 'string'
                                                            },
                                                            __v: {
                                                                type: 'number'
                                                            }

                                                            }
                                                        }
                                                    }
                                                }

                                            },
                                        },
                                    }
                                }
                            }
                    },
                    parameters: [
                        {
                            name: 'name',
                            in: 'body',
                            description: 'Name of the user',
                            required: false,
                            type: 'string'
                        },
                    ]
                }
            },
            '/videos/addvideo': {
                post: {
                    tags: ['Add Video'],
                    summary: 'Api for adding a new video',
                    description: 'This is a add video route',
                    requestBody: {
                        content: {
                            'application/json': {
                                // add email and password as required
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            required: true
                                        },
                                        description: {
                                            type: 'string',
                                            required: true
                                        },
                                        videoUrl: {
                                            type: 'string',
                                            required: true
                                        },
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Video added successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            error: {
                                                type: 'string'
                                            },
                                            status: {
                                                type: 'number'
                                            },
                                            message: {
                                                type: 'string'
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    video: {
                                                        type: 'object',
                                                        properties: {
                                                            id: {
                                                                type: 'string'
                                                            },
                                                            title: {
                                                                type: 'string'
                                                            },
                                                            description: {
                                                                type: 'string'
                                                            },
                                                            videoUrl: {
                                                                type: 'string'
                                                            },
                                                            createdAt: {
                                                                type: 'string'
                                                            },
                                                            updatedAt: {
                                                                type: 'string'
                                                            },
                                                            __v: {
                                                                type: 'number'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    parameters: [
                        {
                            name: 'userId',
                            in: 'body',
                            description: 'User Id of the user',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'uploadedBy',
                            in: 'body',
                            description: 'Uploaded By of the user',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'title',
                            in: 'body',
                            description: 'Title of the video',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'description',
                            in: 'body',
                            description: 'Description of the video',
                            required: false,
                            type: 'string'
                        },
                        {
                            name: 'videoUrl',
                            in: 'body',
                            description: 'Video Url of the video',
                            required: true,
                            type: 'string'
                        },
                    ],
                }
            },
            '/videos/deletevideo': {
                delete: {
                    tags: ['Delete Video'],
                    summary: 'Api for deleting a video',
                    description: 'This is a delete video route',
                    parameters: [
                        {
                            name: 'id',
                            in: 'body',
                            description: 'Id of the video',
                            required: true,
                            type: 'string'
                        },
                    ],
                }
            },
            '/videos/updatevideo': {
                put: {
                    tags: ['Update Video'],
                    summary: 'Api for updating a video',
                    description: 'This is a update video route',
                    parameters: [
                        {
                            name: 'id',
                            in: 'body',
                            description: 'Id of the video',
                            required: false,
                            type: 'string'
                        },
                        {
                            name: 'title',
                            in: 'body',
                            description: 'Title of the video',
                            required: true,
                            type: 'string'
                        },
                        {
                            name: 'description',
                            in: 'body',
                            description: 'Description of the video',
                            required: false,
                            type: 'string'
                        },
                        {
                            name: 'videoUrl',
                            in: 'body',
                            description: 'Video Url of the video',
                            required: false,
                            type: 'string'
                        },
                    ],
                }
            },
            '/videos/getvideos/all': {
                get: {
                    tags: ['Get All Videos'],
                    summary: 'Api for getting all videos',
                    description: 'This is a get videos route',
                    paramenters: [
                        {
                            name: 'id',
                            in: 'url',
                            description: 'Id of the video',
                            required: false,
                            type: 'string'
                        },
                    ],
                }
            },
            '/videos/getvideo/:id': {
                get: {
                    tags: ['Get Video'],
                    summary: 'Api for getting a video',
                    description: 'This is a get video route',
                    parameters: [
                        {
                            name: 'id',
                            in: 'url',
                            description: 'Id of the video',
                            required: true,
                            type: 'string'
                        },
                    ],
                }
            },
        }
    },
    apis: ['./routes/*.js']
}
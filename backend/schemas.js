const testIdSchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: "^[0-9a-zA-Z_\.\-]+$" }
    },
    required: ["id"],
    additionalProperties: false
};

const idSchema = {
    type: "object",
    properties: {
        id: { type: "string", pattern: "^[0-9a-fA-F]{24}$" }
    },
    required: ["id"],
    additionalProperties: false
};

const dateSchema = {
    type: "object",
    properties: {
        date: { type: "string", format: "date-time" }
    },
    required: ["date"],
    additionalProperties: false
};

const aliasSchema = {
    type: "object",
    properties: {
        alias: { type: "string", pattern: "^[a-zA-Z0-9_\.\-]+$"}
    },
    required: ["alias"],
    additionalProperties: false
};

module.exports = {
    testIdSchema,
    idSchema,
    dateSchema,
    aliasSchema
};

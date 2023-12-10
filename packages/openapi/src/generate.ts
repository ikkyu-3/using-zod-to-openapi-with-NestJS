import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import yaml from "yaml";
import fs from "fs";
import path from "path";
import {
  PetSchema,
  PetsSchema,
  ErrorSchema,
  LimitQuerySchema,
  NewPetSchema,
} from "./schemas.js";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

const petSchema = registry.register("Pet", PetSchema);
const newPetSchema = registry.register("NewPet", NewPetSchema);
const petsSchema = registry.register("Pets", PetsSchema);
const errorSchema = registry.register("Error", ErrorSchema);

registry.registerPath({
  path: "/pets",
  method: "get",
  summary: "List all pets",
  operationId: "listPets",
  tags: ["pets"],
  request: {
    query: z.object({
      limit: LimitQuerySchema.openapi({
        param: {
          name: "limit",
          in: "query",
          description: "How many items to return at one time (max 100)",
        },
      }),
    }),
  },
  responses: {
    200: {
      description: "A paged array of pets",
      content: {
        "application/json": {
          schema: petsSchema,
        },
      },
    },
    default: {
      description: "unexpected error",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
    },
  },
});
registry.registerPath({
  path: "/pets",
  method: "post",
  summary: "Create a pet",
  operationId: "createPets",
  tags: ["pets"],
  request: {
    body: {
      description: "pet data",
      content: {
        "application/json": {
          schema: newPetSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "pet response",
      content: {
        "application/json": {
          schema: petSchema,
        },
      },
    },
    default: {
      description: "unexpected error",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
    },
  },
});
registry.registerPath({
  path: "/pets/{petId}",
  method: "get",
  summary: "Info for a specific pet",
  operationId: "showPetById",
  tags: ["pets"],
  request: {
    params: z.object({
      petId: z.string().openapi({
        param: {
          name: "petId",
          in: "path",
          description: "The id of the pet to retrieve",
        },
      }),
    }),
  },
  responses: {
    200: {
      description: "Expected response to a valid request",
      content: {
        "application/json": {
          schema: petSchema,
        },
      },
    },
    default: {
      description: "unexpected error",
      content: {
        "application/json": {
          schema: errorSchema,
        },
      },
    },
  },
});

function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger Petstore",
      license: {
        name: "MIT",
      },
    },
    servers: [{ url: "http://petstore.swagger.io/v1" }],
  });
}

function writeDocumentation() {
  const docs = getOpenApiDocumentation();

  const fileContent = yaml.stringify(docs);

  const root = path.join(__dirname, "../");
  fs.writeFileSync(`${root}/openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });
}

writeDocumentation();

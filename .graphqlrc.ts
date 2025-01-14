import { CodegenConfig } from "@graphql-codegen/cli"
import { IGraphQLConfig } from "graphql-config"
import * as path from "node:path"
import * as fs from "node:fs"

// NOTE: typescript path aliases do not work out of the box for graphql-codegen
// https://github.com/ardatan/graphql-tools/issues/1544
//
// NOTE: to make sure path aliases are respected, we use tsx to publish the schema
// to a file, then we generate the code using the schema file
//
// NOTE: other useful links -
//   https://github.com/neovim/nvim-lspconfig/blob/master/doc/configs.md#graphql
//   https://the-guild.dev/graphql/config/docs/user/usage#extensions
//
export default {
  schema: fs.readFileSync("schema.gql").toString(),
  documents: ["graphql/**/*.gql"],
  extensions: {
    codegen: {
      generates: {
        [path.join("src", "lib", "client", "generated/")]: {
          preset: "client",
          config: {
            enumsAsTypes: true,
          },
        },
      },
    } satisfies CodegenConfig,
  },
} satisfies IGraphQLConfig

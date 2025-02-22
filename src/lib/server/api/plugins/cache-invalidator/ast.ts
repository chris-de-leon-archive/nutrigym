import { typenameAlias } from "./constants"
import {
  visitWithTypeInfo,
  OperationTypeNode,
  GraphQLSchema,
  DocumentNode,
  TypeInfo,
  visit,
  Kind,
} from "graphql"

export const addTypenameToDocument = (
  schema: GraphQLSchema,
  document: DocumentNode,
) => {
  return visit(
    document,
    visitWithTypeInfo(new TypeInfo(schema), {
      OperationDefinition: {
        enter(node): void | false {
          if (node.operation === OperationTypeNode.SUBSCRIPTION) {
            return false
          }
          if (node.operation === OperationTypeNode.MUTATION) {
            return false
          }
        },
      },
      SelectionSet(node) {
        const hasTypeNameSelection = node.selections.some(
          (selection) =>
            selection.kind === Kind.FIELD &&
            selection.name.value === "__typename" &&
            !selection.alias,
        )
        return {
          ...node,
          selections: [
            ...node.selections,
            ...(hasTypeNameSelection
              ? []
              : [
                  {
                    kind: Kind.FIELD,
                    name: { kind: Kind.NAME, value: "__typename" },
                    alias: { kind: Kind.NAME, value: typenameAlias },
                  },
                ]),
          ],
        }
      },
    }),
  )
}

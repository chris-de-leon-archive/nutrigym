/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  Uuid: { input: any; output: any }
}

export type Body = {
  __typename?: "Body"
  birthday: Scalars["Date"]["output"]
  gender: Scalars["String"]["output"]
  id: Scalars["String"]["output"]
  userId: Scalars["String"]["output"]
}

export type BodyMeasurement = {
  __typename?: "BodyMeasurement"
  armsInInches?: Maybe<Scalars["Float"]["output"]>
  calvesInInches?: Maybe<Scalars["Float"]["output"]>
  chestInInches?: Maybe<Scalars["Float"]["output"]>
  createdAt: Scalars["Date"]["output"]
  forearmsInInches?: Maybe<Scalars["Float"]["output"]>
  heightInInches: Scalars["Float"]["output"]
  hipsInInches?: Maybe<Scalars["Float"]["output"]>
  id: Scalars["String"]["output"]
  logId: Scalars["String"]["output"]
  neckInInches?: Maybe<Scalars["Float"]["output"]>
  shouldersInInches?: Maybe<Scalars["Float"]["output"]>
  sleepInHours?: Maybe<Scalars["Float"]["output"]>
  steps?: Maybe<Scalars["Int"]["output"]>
  thighsInInches?: Maybe<Scalars["Float"]["output"]>
  waistInInches?: Maybe<Scalars["Float"]["output"]>
  waterInMilliliters?: Maybe<Scalars["Float"]["output"]>
  weightInPounds: Scalars["Float"]["output"]
}

export type Count = {
  __typename?: "Count"
  count: Scalars["Int"]["output"]
}

export type CreateBodyInput = {
  birthday: Scalars["Date"]["input"]
  gender: Gender
}

export type CreateBodyMeasurementInput = {
  armsInInches?: InputMaybe<Scalars["Float"]["input"]>
  calvesInInches?: InputMaybe<Scalars["Float"]["input"]>
  chestInInches?: InputMaybe<Scalars["Float"]["input"]>
  forearmsInInches?: InputMaybe<Scalars["Float"]["input"]>
  heightInInches: Scalars["Float"]["input"]
  hipsInInches?: InputMaybe<Scalars["Float"]["input"]>
  neckInInches?: InputMaybe<Scalars["Float"]["input"]>
  shouldersInInches?: InputMaybe<Scalars["Float"]["input"]>
  sleepInHours?: InputMaybe<Scalars["Float"]["input"]>
  steps?: InputMaybe<Scalars["Int"]["input"]>
  thighsInInches?: InputMaybe<Scalars["Float"]["input"]>
  waistInInches?: InputMaybe<Scalars["Float"]["input"]>
  waterInMilliliters?: InputMaybe<Scalars["Float"]["input"]>
  weightInPounds: Scalars["Float"]["input"]
}

export type CreateFoodInput = {
  brand: Scalars["String"]["input"]
  calciumInMilligrams?: InputMaybe<Scalars["Float"]["input"]>
  calories: Scalars["Float"]["input"]
  cholesterolInMilligrams?: InputMaybe<Scalars["Float"]["input"]>
  dietaryFiberInGrams?: InputMaybe<Scalars["Float"]["input"]>
  ironInMilligrams?: InputMaybe<Scalars["Float"]["input"]>
  monounsaturatedFatInGrams?: InputMaybe<Scalars["Float"]["input"]>
  name: Scalars["String"]["input"]
  polyunsaturatedFatInGrams?: InputMaybe<Scalars["Float"]["input"]>
  potassiumInMilligrams?: InputMaybe<Scalars["Float"]["input"]>
  saturatedFatInGrams?: InputMaybe<Scalars["Float"]["input"]>
  servingSize: Scalars["Float"]["input"]
  servingUnit: Scalars["String"]["input"]
  sodiumInMilligrams?: InputMaybe<Scalars["Float"]["input"]>
  sugarsInGrams?: InputMaybe<Scalars["Float"]["input"]>
  totalCarbsInGrams?: InputMaybe<Scalars["Float"]["input"]>
  totalFatInGrams?: InputMaybe<Scalars["Float"]["input"]>
  totalProteinInGrams?: InputMaybe<Scalars["Float"]["input"]>
}

export type CreateFoodMeasurementFromFoodDetailsInput = {
  food: CreateFoodInput
  servingsConsumed: Scalars["Float"]["input"]
}

export type CreateFoodMeasurementFromFoodIdInput = {
  food: UuidInput
  servingsConsumed: Scalars["Float"]["input"]
}

export type CreateGoalInput = {
  calories: Scalars["Float"]["input"]
  carbsPercentage: Scalars["Float"]["input"]
  fatPercentage: Scalars["Float"]["input"]
  proteinPercentage: Scalars["Float"]["input"]
  sleepInHours: Scalars["Float"]["input"]
  steps: Scalars["Int"]["input"]
  waterInMilliliters: Scalars["Float"]["input"]
  weightInPounds: Scalars["Float"]["input"]
}

export type DateInput = {
  date: Scalars["Date"]["input"]
}

export type Food = {
  __typename?: "Food"
  brand: Scalars["String"]["output"]
  calciumInMilligrams?: Maybe<Scalars["Float"]["output"]>
  calories: Scalars["Float"]["output"]
  cholesterolInMilligrams?: Maybe<Scalars["Float"]["output"]>
  dietaryFiberInGrams?: Maybe<Scalars["Float"]["output"]>
  ironInMilligrams?: Maybe<Scalars["Float"]["output"]>
  monounsaturatedFatInGrams?: Maybe<Scalars["Float"]["output"]>
  name: Scalars["String"]["output"]
  polyunsaturatedFatInGrams?: Maybe<Scalars["Float"]["output"]>
  potassiumInMilligrams?: Maybe<Scalars["Float"]["output"]>
  saturatedFatInGrams?: Maybe<Scalars["Float"]["output"]>
  servingSize: Scalars["Float"]["output"]
  servingUnit: Scalars["String"]["output"]
  sodiumInMilligrams?: Maybe<Scalars["Float"]["output"]>
  sugarsInGrams?: Maybe<Scalars["Float"]["output"]>
  totalCarbsInGrams?: Maybe<Scalars["Float"]["output"]>
  totalFatInGrams?: Maybe<Scalars["Float"]["output"]>
  totalProteinInGrams?: Maybe<Scalars["Float"]["output"]>
}

export type FoodMeasurement = {
  __typename?: "FoodMeasurement"
  createdAt: Scalars["Date"]["output"]
  foodId: Scalars["String"]["output"]
  id: Scalars["String"]["output"]
  logId: Scalars["String"]["output"]
  servingsConsumed: Scalars["Float"]["output"]
}

export type Gender = "Female" | "Male"

export type GenericId = {
  __typename?: "GenericID"
  id: Scalars["String"]["output"]
}

export type Goal = {
  __typename?: "Goal"
  calories: Scalars["Float"]["output"]
  carbsPercentage: Scalars["Float"]["output"]
  createdAt: Scalars["Date"]["output"]
  fatPercentage: Scalars["Float"]["output"]
  id: Scalars["String"]["output"]
  latest: Scalars["Boolean"]["output"]
  proteinPercentage: Scalars["Float"]["output"]
  sleepInHours: Scalars["Float"]["output"]
  steps: Scalars["Int"]["output"]
  version: Scalars["String"]["output"]
  waterInMilliliters: Scalars["Float"]["output"]
  weightInPounds: Scalars["Float"]["output"]
}

export type Mutation = {
  __typename?: "Mutation"
  createBody: GenericId
  createBodyMeasurement: GenericId
  createFoodMeasurementFromFoodDetails: GenericId
  createFoodMeasurementFromFoodID: GenericId
  createGoal: GenericId
  removeBodyMeasurements: Count
  removeFoodMeasurements: Count
  updateBody: Count
  updateBodyMeasurement: Count
  updateFoodMeasurement: Count
}

export type MutationCreateBodyArgs = {
  data: CreateBodyInput
}

export type MutationCreateBodyMeasurementArgs = {
  data: CreateBodyMeasurementInput
}

export type MutationCreateFoodMeasurementFromFoodDetailsArgs = {
  data: CreateFoodMeasurementFromFoodDetailsInput
}

export type MutationCreateFoodMeasurementFromFoodIdArgs = {
  data: CreateFoodMeasurementFromFoodIdInput
}

export type MutationCreateGoalArgs = {
  data: CreateGoalInput
}

export type MutationRemoveBodyMeasurementsArgs = {
  ids?: InputMaybe<Array<Scalars["Uuid"]["input"]>>
}

export type MutationRemoveFoodMeasurementsArgs = {
  ids?: InputMaybe<Array<Scalars["Uuid"]["input"]>>
}

export type MutationUpdateBodyArgs = {
  data: UpdateBodyInput
  id: Scalars["Uuid"]["input"]
}

export type MutationUpdateBodyMeasurementArgs = {
  data: UpdateBodyMeasurementInput
  id: Scalars["Uuid"]["input"]
}

export type MutationUpdateFoodMeasurementArgs = {
  data: UpdateFoodMeasurementInput
  id: Scalars["Uuid"]["input"]
}

export type Query = {
  __typename?: "Query"
  bodyByID?: Maybe<Body>
  bodyMeasurementByDate?: Maybe<BodyMeasurement>
  foodMeasurementsByDate: Array<FoodMeasurement>
  goalByDate?: Maybe<Goal>
  goalByID?: Maybe<Goal>
}

export type QueryBodyByIdArgs = {
  id: Scalars["Uuid"]["input"]
}

export type QueryBodyMeasurementByDateArgs = {
  date: Scalars["Date"]["input"]
}

export type QueryFoodMeasurementsByDateArgs = {
  date: Scalars["Date"]["input"]
}

export type QueryGoalByDateArgs = {
  date: Scalars["Date"]["input"]
}

export type QueryGoalByIdArgs = {
  id: Scalars["Uuid"]["input"]
}

export type UpdateBodyInput = {
  birthday?: InputMaybe<Scalars["Date"]["input"]>
  gender?: InputMaybe<Gender>
}

export type UpdateBodyMeasurementInput = {
  armsInInches?: InputMaybe<Scalars["Float"]["input"]>
  calvesInInches?: InputMaybe<Scalars["Float"]["input"]>
  chestInInches?: InputMaybe<Scalars["Float"]["input"]>
  forearmsInInches?: InputMaybe<Scalars["Float"]["input"]>
  heightInInches?: InputMaybe<Scalars["Float"]["input"]>
  hipsInInches?: InputMaybe<Scalars["Float"]["input"]>
  neckInInches?: InputMaybe<Scalars["Float"]["input"]>
  shouldersInInches?: InputMaybe<Scalars["Float"]["input"]>
  sleepInHours?: InputMaybe<Scalars["Float"]["input"]>
  steps?: InputMaybe<Scalars["Int"]["input"]>
  thighsInInches?: InputMaybe<Scalars["Float"]["input"]>
  waistInInches?: InputMaybe<Scalars["Float"]["input"]>
  waterInMilliliters?: InputMaybe<Scalars["Float"]["input"]>
  weightInPounds?: InputMaybe<Scalars["Float"]["input"]>
}

export type UpdateFoodMeasurementInput = {
  servingsConsumed?: InputMaybe<Scalars["Float"]["input"]>
}

export type UuidInput = {
  id: Scalars["Uuid"]["input"]
}

export type CreateBodyMutationVariables = Exact<{
  data: CreateBodyInput
}>

export type CreateBodyMutation = {
  __typename?: "Mutation"
  createBody: { __typename?: "GenericID"; id: string }
}

export type BodyQueryVariables = Exact<{
  id: Scalars["Uuid"]["input"]
}>

export type BodyQuery = {
  __typename?: "Query"
  bodyByID?: {
    __typename?: "Body"
    id: string
    userId: string
    birthday: any
    gender: string
  } | null
}

export type UpdateBodyMutationVariables = Exact<{
  id: Scalars["Uuid"]["input"]
  data: UpdateBodyInput
}>

export type UpdateBodyMutation = {
  __typename?: "Mutation"
  updateBody: { __typename?: "Count"; count: number }
}

export type CreateGoalMutationVariables = Exact<{
  data: CreateGoalInput
}>

export type CreateGoalMutation = {
  __typename?: "Mutation"
  createGoal: { __typename?: "GenericID"; id: string }
}

export type GoalByDateQueryVariables = Exact<{
  date: Scalars["Date"]["input"]
}>

export type GoalByDateQuery = {
  __typename?: "Query"
  goalByDate?: {
    __typename?: "Goal"
    waterInMilliliters: number
    weightInPounds: number
    sleepInHours: number
    proteinPercentage: number
    carbsPercentage: number
    fatPercentage: number
    calories: number
    steps: number
  } | null
}

export type GoalByIdQueryVariables = Exact<{
  id: Scalars["Uuid"]["input"]
}>

export type GoalByIdQuery = {
  __typename?: "Query"
  goalByID?: {
    __typename?: "Goal"
    waterInMilliliters: number
    weightInPounds: number
    sleepInHours: number
    proteinPercentage: number
    carbsPercentage: number
    fatPercentage: number
    calories: number
    steps: number
  } | null
}

export type CreateBodyMeasurementMutationVariables = Exact<{
  data: CreateBodyMeasurementInput
}>

export type CreateBodyMeasurementMutation = {
  __typename?: "Mutation"
  createBodyMeasurement: { __typename?: "GenericID"; id: string }
}

export type BodyMeasurementByDateQueryVariables = Exact<{
  date: Scalars["Date"]["input"]
}>

export type BodyMeasurementByDateQuery = {
  __typename?: "Query"
  bodyMeasurementByDate?: {
    __typename?: "BodyMeasurement"
    id: string
    createdAt: any
    logId: string
    weightInPounds: number
    heightInInches: number
    waterInMilliliters?: number | null
    shouldersInInches?: number | null
    forearmsInInches?: number | null
    calvesInInches?: number | null
    thighsInInches?: number | null
    waistInInches?: number | null
    chestInInches?: number | null
    armsInInches?: number | null
    neckInInches?: number | null
    hipsInInches?: number | null
    sleepInHours?: number | null
    steps?: number | null
  } | null
}

export type RemoveBodyMeasurementsMutationVariables = Exact<{
  ids: Array<Scalars["Uuid"]["input"]> | Scalars["Uuid"]["input"]
}>

export type RemoveBodyMeasurementsMutation = {
  __typename?: "Mutation"
  removeBodyMeasurements: { __typename?: "Count"; count: number }
}

export type UpdateBodyMeasurementMutationVariables = Exact<{
  id: Scalars["Uuid"]["input"]
  data: UpdateBodyMeasurementInput
}>

export type UpdateBodyMeasurementMutation = {
  __typename?: "Mutation"
  updateBodyMeasurement: { __typename?: "Count"; count: number }
}

export type CreateFoodMeasurementFromFoodDetailsMutationVariables = Exact<{
  data: CreateFoodMeasurementFromFoodDetailsInput
}>

export type CreateFoodMeasurementFromFoodDetailsMutation = {
  __typename?: "Mutation"
  createFoodMeasurementFromFoodDetails: { __typename?: "GenericID"; id: string }
}

export type CreateFoodMeasurementFromFoodIdMutationVariables = Exact<{
  data: CreateFoodMeasurementFromFoodIdInput
}>

export type CreateFoodMeasurementFromFoodIdMutation = {
  __typename?: "Mutation"
  createFoodMeasurementFromFoodID: { __typename?: "GenericID"; id: string }
}

export type FoodMeasurementsByDateQueryVariables = Exact<{
  date: Scalars["Date"]["input"]
}>

export type FoodMeasurementsByDateQuery = {
  __typename?: "Query"
  foodMeasurementsByDate: Array<{
    __typename?: "FoodMeasurement"
    id: string
    createdAt: any
    logId: string
    foodId: string
    servingsConsumed: number
  }>
}

export type RemoveFoodMeasurementsMutationVariables = Exact<{
  ids: Array<Scalars["Uuid"]["input"]> | Scalars["Uuid"]["input"]
}>

export type RemoveFoodMeasurementsMutation = {
  __typename?: "Mutation"
  removeFoodMeasurements: { __typename?: "Count"; count: number }
}

export type UpdateFoodMeasurementMutationVariables = Exact<{
  id: Scalars["Uuid"]["input"]
  data: UpdateFoodMeasurementInput
}>

export type UpdateFoodMeasurementMutation = {
  __typename?: "Mutation"
  updateFoodMeasurement: { __typename?: "Count"; count: number }
}

export const CreateBodyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateBody" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateBodyInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBody" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateBodyMutation, CreateBodyMutationVariables>
export const BodyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Body" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Uuid" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bodyByID" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "birthday" } },
                { kind: "Field", name: { kind: "Name", value: "gender" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BodyQuery, BodyQueryVariables>
export const UpdateBodyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateBody" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Uuid" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateBodyInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBody" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateBodyMutation, UpdateBodyMutationVariables>
export const CreateGoalDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateGoal" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateGoalInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createGoal" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateGoalMutation, CreateGoalMutationVariables>
export const GoalByDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GoalByDate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "goalByDate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "waterInMilliliters" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weightInPounds" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sleepInHours" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proteinPercentage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "carbsPercentage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fatPercentage" },
                },
                { kind: "Field", name: { kind: "Name", value: "calories" } },
                { kind: "Field", name: { kind: "Name", value: "steps" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoalByDateQuery, GoalByDateQueryVariables>
export const GoalByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GoalByID" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Uuid" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "goalByID" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "waterInMilliliters" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weightInPounds" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sleepInHours" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "proteinPercentage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "carbsPercentage" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fatPercentage" },
                },
                { kind: "Field", name: { kind: "Name", value: "calories" } },
                { kind: "Field", name: { kind: "Name", value: "steps" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GoalByIdQuery, GoalByIdQueryVariables>
export const CreateBodyMeasurementDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateBodyMeasurement" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateBodyMeasurementInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createBodyMeasurement" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateBodyMeasurementMutation,
  CreateBodyMeasurementMutationVariables
>
export const BodyMeasurementByDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "BodyMeasurementByDate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bodyMeasurementByDate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "logId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "weightInPounds" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "heightInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "waterInMilliliters" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "shouldersInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "forearmsInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "calvesInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "thighsInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "waistInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "chestInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "armsInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "neckInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "hipsInInches" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sleepInHours" },
                },
                { kind: "Field", name: { kind: "Name", value: "steps" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  BodyMeasurementByDateQuery,
  BodyMeasurementByDateQueryVariables
>
export const RemoveBodyMeasurementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveBodyMeasurements" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Uuid" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeBodyMeasurements" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ids" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ids" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveBodyMeasurementsMutation,
  RemoveBodyMeasurementsMutationVariables
>
export const UpdateBodyMeasurementDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateBodyMeasurement" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Uuid" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateBodyMeasurementInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBodyMeasurement" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBodyMeasurementMutation,
  UpdateBodyMeasurementMutationVariables
>
export const CreateFoodMeasurementFromFoodDetailsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateFoodMeasurementFromFoodDetails" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "CreateFoodMeasurementFromFoodDetailsInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "createFoodMeasurementFromFoodDetails",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateFoodMeasurementFromFoodDetailsMutation,
  CreateFoodMeasurementFromFoodDetailsMutationVariables
>
export const CreateFoodMeasurementFromFoodIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateFoodMeasurementFromFoodID" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "CreateFoodMeasurementFromFoodIdInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createFoodMeasurementFromFoodID" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateFoodMeasurementFromFoodIdMutation,
  CreateFoodMeasurementFromFoodIdMutationVariables
>
export const FoodMeasurementsByDateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FoodMeasurementsByDate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Date" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "foodMeasurementsByDate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "logId" } },
                { kind: "Field", name: { kind: "Name", value: "foodId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "servingsConsumed" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FoodMeasurementsByDateQuery,
  FoodMeasurementsByDateQueryVariables
>
export const RemoveFoodMeasurementsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveFoodMeasurements" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Uuid" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeFoodMeasurements" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ids" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ids" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveFoodMeasurementsMutation,
  RemoveFoodMeasurementsMutationVariables
>
export const UpdateFoodMeasurementDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateFoodMeasurement" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Uuid" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateFoodMeasurementInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateFoodMeasurement" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "count" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateFoodMeasurementMutation,
  UpdateFoodMeasurementMutationVariables
>

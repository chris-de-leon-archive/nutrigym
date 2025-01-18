/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  Date: { input: Date; output: string; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  Uuid: { input: string; output: string; }
};

export type Body = {
  __typename?: 'Body';
  birthday: Scalars['Date']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type BodyMeasurement = {
  __typename?: 'BodyMeasurement';
  armsInInches?: Maybe<Scalars['Float']['output']>;
  calvesInInches?: Maybe<Scalars['Float']['output']>;
  chestInInches?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['Date']['output'];
  forearmsInInches?: Maybe<Scalars['Float']['output']>;
  heightInInches: Scalars['Float']['output'];
  hipsInInches?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  neckInInches?: Maybe<Scalars['Float']['output']>;
  shouldersInInches?: Maybe<Scalars['Float']['output']>;
  sleepInHours?: Maybe<Scalars['Float']['output']>;
  steps?: Maybe<Scalars['Int']['output']>;
  thighsInInches?: Maybe<Scalars['Float']['output']>;
  waistInInches?: Maybe<Scalars['Float']['output']>;
  waterInMilliliters?: Maybe<Scalars['Float']['output']>;
  weightInPounds: Scalars['Float']['output'];
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int']['output'];
};

export type CreateBodyInput = {
  birthday: Scalars['Date']['input'];
  gender: Gender;
};

export type CreateFoodInput = {
  brand: Scalars['String']['input'];
  calciumInMilligrams?: InputMaybe<Scalars['Float']['input']>;
  calories: Scalars['Float']['input'];
  cholesterolInMilligrams?: InputMaybe<Scalars['Float']['input']>;
  dietaryFiberInGrams?: InputMaybe<Scalars['Float']['input']>;
  ironInMilligrams?: InputMaybe<Scalars['Float']['input']>;
  monounsaturatedFatInGrams?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  polyunsaturatedFatInGrams?: InputMaybe<Scalars['Float']['input']>;
  potassiumInMilligrams?: InputMaybe<Scalars['Float']['input']>;
  saturatedFatInGrams?: InputMaybe<Scalars['Float']['input']>;
  servingSize: Scalars['Float']['input'];
  servingUnit: Scalars['String']['input'];
  sodiumInMilligrams?: InputMaybe<Scalars['Float']['input']>;
  sugarsInGrams?: InputMaybe<Scalars['Float']['input']>;
  totalCarbsInGrams?: InputMaybe<Scalars['Float']['input']>;
  totalFatInGrams?: InputMaybe<Scalars['Float']['input']>;
  totalProteinInGrams?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateFoodMeasurementFromFoodDetailsInput = {
  food: CreateFoodInput;
  servingsConsumed: Scalars['Float']['input'];
};

export type CreateFoodMeasurementFromFoodIdInput = {
  food: UuidInput;
  servingsConsumed: Scalars['Float']['input'];
};

export type CreateGoalInput = {
  calories: Scalars['Float']['input'];
  carbsPercentage: Scalars['Float']['input'];
  fatPercentage: Scalars['Float']['input'];
  proteinPercentage: Scalars['Float']['input'];
  sleepInHours: Scalars['Float']['input'];
  steps: Scalars['Int']['input'];
  waterInMilliliters: Scalars['Float']['input'];
  weightInPounds: Scalars['Float']['input'];
};

export type DateInput = {
  date: Scalars['Date']['input'];
};

export type Food = {
  __typename?: 'Food';
  brand: Scalars['String']['output'];
  calciumInMilligrams?: Maybe<Scalars['Float']['output']>;
  calories: Scalars['Float']['output'];
  cholesterolInMilligrams?: Maybe<Scalars['Float']['output']>;
  dietaryFiberInGrams?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Uuid']['output'];
  ironInMilligrams?: Maybe<Scalars['Float']['output']>;
  monounsaturatedFatInGrams?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  polyunsaturatedFatInGrams?: Maybe<Scalars['Float']['output']>;
  potassiumInMilligrams?: Maybe<Scalars['Float']['output']>;
  saturatedFatInGrams?: Maybe<Scalars['Float']['output']>;
  servingSize: Scalars['Float']['output'];
  servingUnit: Scalars['String']['output'];
  sodiumInMilligrams?: Maybe<Scalars['Float']['output']>;
  sugarsInGrams?: Maybe<Scalars['Float']['output']>;
  totalCarbsInGrams?: Maybe<Scalars['Float']['output']>;
  totalFatInGrams?: Maybe<Scalars['Float']['output']>;
  totalProteinInGrams?: Maybe<Scalars['Float']['output']>;
};

export type FoodMeasurement = {
  __typename?: 'FoodMeasurement';
  createdAt: Scalars['Date']['output'];
  food: Food;
  foodId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  logId: Scalars['String']['output'];
  servingsConsumed: Scalars['Float']['output'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type GenericId = {
  __typename?: 'GenericID';
  id: Scalars['String']['output'];
};

export type Goal = {
  __typename?: 'Goal';
  calories: Scalars['Float']['output'];
  carbsPercentage: Scalars['Float']['output'];
  createdAt: Scalars['Date']['output'];
  fatPercentage: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  latest: Scalars['Boolean']['output'];
  proteinPercentage: Scalars['Float']['output'];
  sleepInHours: Scalars['Float']['output'];
  steps: Scalars['Int']['output'];
  version: Scalars['String']['output'];
  waterInMilliliters: Scalars['Float']['output'];
  weightInPounds: Scalars['Float']['output'];
};

export type MeasurementLog = {
  __typename?: 'MeasurementLog';
  bodyMeasurement?: Maybe<BodyMeasurement>;
  createdAt: Scalars['Date']['output'];
  day: Scalars['Int']['output'];
  foodMeasurements: Array<FoodMeasurement>;
  goalId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  month: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBody: GenericId;
  createFoodMeasurementFromFoodDetails: GenericId;
  createFoodMeasurementFromFoodID: GenericId;
  createGoal: GenericId;
  removeMeasurements: Count;
  updateBody: Count;
  updateFoodMeasurement: Count;
  upsertBodyMeasurement: Count;
};


export type MutationCreateBodyArgs = {
  data: CreateBodyInput;
};


export type MutationCreateFoodMeasurementFromFoodDetailsArgs = {
  data: CreateFoodMeasurementFromFoodDetailsInput;
  date: Scalars['Date']['input'];
};


export type MutationCreateFoodMeasurementFromFoodIdArgs = {
  data: CreateFoodMeasurementFromFoodIdInput;
  date: Scalars['Date']['input'];
};


export type MutationCreateGoalArgs = {
  data: CreateGoalInput;
};


export type MutationRemoveMeasurementsArgs = {
  data: RemoveMeasurementsInput;
  id: Scalars['Uuid']['input'];
};


export type MutationUpdateBodyArgs = {
  data: UpdateBodyInput;
  id: Scalars['Uuid']['input'];
};


export type MutationUpdateFoodMeasurementArgs = {
  data: UpdateFoodMeasurementInput;
  date: Scalars['Date']['input'];
  id: Scalars['Uuid']['input'];
};


export type MutationUpsertBodyMeasurementArgs = {
  data: UpsertBodyMeasurementInput;
  date: Scalars['Date']['input'];
};

export type Query = {
  __typename?: 'Query';
  body?: Maybe<Body>;
  foods: Array<Food>;
  goalByDate?: Maybe<Goal>;
  goalByID?: Maybe<Goal>;
  goalByLatest?: Maybe<Goal>;
  measurementsByDate?: Maybe<MeasurementLog>;
};


export type QueryGoalByDateArgs = {
  date: Scalars['Date']['input'];
};


export type QueryGoalByIdArgs = {
  id: Scalars['Uuid']['input'];
};


export type QueryMeasurementsByDateArgs = {
  date: Scalars['Date']['input'];
};

export type RemoveMeasurementsInput = {
  bodyIds: Array<Scalars['Uuid']['input']>;
  foodIds: Array<Scalars['Uuid']['input']>;
};

export type UpdateBodyInput = {
  birthday?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Gender>;
};

export type UpdateFoodMeasurementInput = {
  servingsConsumed?: InputMaybe<Scalars['Float']['input']>;
};

export type UpsertBodyMeasurementInput = {
  armsInInches?: InputMaybe<Scalars['Float']['input']>;
  calvesInInches?: InputMaybe<Scalars['Float']['input']>;
  chestInInches?: InputMaybe<Scalars['Float']['input']>;
  forearmsInInches?: InputMaybe<Scalars['Float']['input']>;
  heightInInches: Scalars['Float']['input'];
  hipsInInches?: InputMaybe<Scalars['Float']['input']>;
  neckInInches?: InputMaybe<Scalars['Float']['input']>;
  shouldersInInches?: InputMaybe<Scalars['Float']['input']>;
  sleepInHours?: InputMaybe<Scalars['Float']['input']>;
  steps?: InputMaybe<Scalars['Int']['input']>;
  thighsInInches?: InputMaybe<Scalars['Float']['input']>;
  waistInInches?: InputMaybe<Scalars['Float']['input']>;
  waterInMilliliters?: InputMaybe<Scalars['Float']['input']>;
  weightInPounds: Scalars['Float']['input'];
};

export type UuidInput = {
  id: Scalars['Uuid']['input'];
};

export type CreateBodyMutationVariables = Exact<{
  data: CreateBodyInput;
}>;


export type CreateBodyMutation = { __typename?: 'Mutation', createBody: { __typename?: 'GenericID', id: string } };

export type BodyQueryVariables = Exact<{ [key: string]: never; }>;


export type BodyQuery = { __typename?: 'Query', body?: { __typename?: 'Body', id: string, userId: string, birthday: string, gender: string } | null };

export type UpdateBodyMutationVariables = Exact<{
  id: Scalars['Uuid']['input'];
  data: UpdateBodyInput;
}>;


export type UpdateBodyMutation = { __typename?: 'Mutation', updateBody: { __typename?: 'Count', count: number } };

export type FoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type FoodsQuery = { __typename?: 'Query', foods: Array<{ __typename?: 'Food', id: string, name: string, brand: string, calories: number, servingSize: number, servingUnit: string, totalProteinInGrams?: number | null, totalCarbsInGrams?: number | null, totalFatInGrams?: number | null, polyunsaturatedFatInGrams?: number | null, monounsaturatedFatInGrams?: number | null, saturatedFatInGrams?: number | null, potassiumInMilligrams?: number | null, sodiumInMilligrams?: number | null, dietaryFiberInGrams?: number | null, sugarsInGrams?: number | null, cholesterolInMilligrams?: number | null, calciumInMilligrams?: number | null, ironInMilligrams?: number | null }> };

export type CreateGoalMutationVariables = Exact<{
  data: CreateGoalInput;
}>;


export type CreateGoalMutation = { __typename?: 'Mutation', createGoal: { __typename?: 'GenericID', id: string } };

export type GoalByDateQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type GoalByDateQuery = { __typename?: 'Query', goalByDate?: { __typename?: 'Goal', waterInMilliliters: number, weightInPounds: number, sleepInHours: number, proteinPercentage: number, carbsPercentage: number, fatPercentage: number, calories: number, steps: number } | null };

export type GoalByIdQueryVariables = Exact<{
  id: Scalars['Uuid']['input'];
}>;


export type GoalByIdQuery = { __typename?: 'Query', goalByID?: { __typename?: 'Goal', waterInMilliliters: number, weightInPounds: number, sleepInHours: number, proteinPercentage: number, carbsPercentage: number, fatPercentage: number, calories: number, steps: number } | null };

export type GoalByLatestQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalByLatestQuery = { __typename?: 'Query', goalByLatest?: { __typename?: 'Goal', waterInMilliliters: number, weightInPounds: number, sleepInHours: number, proteinPercentage: number, carbsPercentage: number, fatPercentage: number, calories: number, steps: number } | null };

export type BodyMeasurementByDateQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type BodyMeasurementByDateQuery = { __typename?: 'Query', measurementsByDate?: { __typename?: 'MeasurementLog', id: string, createdAt: string, goalId: string, userId: string, month: number, year: number, day: number, bodyMeasurement?: { __typename?: 'BodyMeasurement', id: string, createdAt: string, logId: string, weightInPounds: number, heightInInches: number, waterInMilliliters?: number | null, shouldersInInches?: number | null, forearmsInInches?: number | null, calvesInInches?: number | null, thighsInInches?: number | null, waistInInches?: number | null, chestInInches?: number | null, armsInInches?: number | null, neckInInches?: number | null, hipsInInches?: number | null, sleepInHours?: number | null, steps?: number | null } | null } | null };

export type UpsertBodyMeasurementMutationVariables = Exact<{
  date: Scalars['Date']['input'];
  data: UpsertBodyMeasurementInput;
}>;


export type UpsertBodyMeasurementMutation = { __typename?: 'Mutation', upsertBodyMeasurement: { __typename?: 'Count', count: number } };

export type CreateFoodMeasurementFromFoodDetailsMutationVariables = Exact<{
  date: Scalars['Date']['input'];
  data: CreateFoodMeasurementFromFoodDetailsInput;
}>;


export type CreateFoodMeasurementFromFoodDetailsMutation = { __typename?: 'Mutation', createFoodMeasurementFromFoodDetails: { __typename?: 'GenericID', id: string } };

export type CreateFoodMeasurementFromFoodIdMutationVariables = Exact<{
  date: Scalars['Date']['input'];
  data: CreateFoodMeasurementFromFoodIdInput;
}>;


export type CreateFoodMeasurementFromFoodIdMutation = { __typename?: 'Mutation', createFoodMeasurementFromFoodID: { __typename?: 'GenericID', id: string } };

export type FoodMeasurementsByDateQueryVariables = Exact<{
  date: Scalars['Date']['input'];
}>;


export type FoodMeasurementsByDateQuery = { __typename?: 'Query', measurementsByDate?: { __typename?: 'MeasurementLog', id: string, createdAt: string, goalId: string, userId: string, month: number, year: number, day: number, foodMeasurements: Array<{ __typename?: 'FoodMeasurement', id: string, createdAt: string, logId: string, foodId: string, servingsConsumed: number, food: { __typename?: 'Food', id: string, name: string, brand: string, calories: number, servingSize: number, servingUnit: string, totalProteinInGrams?: number | null, totalCarbsInGrams?: number | null, totalFatInGrams?: number | null, polyunsaturatedFatInGrams?: number | null, monounsaturatedFatInGrams?: number | null, saturatedFatInGrams?: number | null, potassiumInMilligrams?: number | null, sodiumInMilligrams?: number | null, dietaryFiberInGrams?: number | null, sugarsInGrams?: number | null, cholesterolInMilligrams?: number | null, calciumInMilligrams?: number | null, ironInMilligrams?: number | null } }> } | null };

export type UpdateFoodMeasurementMutationVariables = Exact<{
  id: Scalars['Uuid']['input'];
  date: Scalars['Date']['input'];
  data: UpdateFoodMeasurementInput;
}>;


export type UpdateFoodMeasurementMutation = { __typename?: 'Mutation', updateFoodMeasurement: { __typename?: 'Count', count: number } };

export type RemoveMeasurementsMutationVariables = Exact<{
  id: Scalars['Uuid']['input'];
  data: RemoveMeasurementsInput;
}>;


export type RemoveMeasurementsMutation = { __typename?: 'Mutation', removeMeasurements: { __typename?: 'Count', count: number } };


export const CreateBodyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBody"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBodyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBody"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateBodyMutation, CreateBodyMutationVariables>;
export const BodyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}}]}}]} as unknown as DocumentNode<BodyQuery, BodyQueryVariables>;
export const UpdateBodyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBody"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBodyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBody"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UpdateBodyMutation, UpdateBodyMutationVariables>;
export const FoodsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"foods"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"servingSize"}},{"kind":"Field","name":{"kind":"Name","value":"servingUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalProteinInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"totalCarbsInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"totalFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"polyunsaturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"monounsaturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"saturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"potassiumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"sodiumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryFiberInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"sugarsInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"cholesterolInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"calciumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"ironInMilligrams"}}]}}]}}]} as unknown as DocumentNode<FoodsQuery, FoodsQueryVariables>;
export const CreateGoalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGoal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGoalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGoal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGoalMutation, CreateGoalMutationVariables>;
export const GoalByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoalByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goalByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waterInMilliliters"}},{"kind":"Field","name":{"kind":"Name","value":"weightInPounds"}},{"kind":"Field","name":{"kind":"Name","value":"sleepInHours"}},{"kind":"Field","name":{"kind":"Name","value":"proteinPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"carbsPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"fatPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"steps"}}]}}]}}]} as unknown as DocumentNode<GoalByDateQuery, GoalByDateQueryVariables>;
export const GoalByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoalByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goalByID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waterInMilliliters"}},{"kind":"Field","name":{"kind":"Name","value":"weightInPounds"}},{"kind":"Field","name":{"kind":"Name","value":"sleepInHours"}},{"kind":"Field","name":{"kind":"Name","value":"proteinPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"carbsPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"fatPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"steps"}}]}}]}}]} as unknown as DocumentNode<GoalByIdQuery, GoalByIdQueryVariables>;
export const GoalByLatestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GoalByLatest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goalByLatest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waterInMilliliters"}},{"kind":"Field","name":{"kind":"Name","value":"weightInPounds"}},{"kind":"Field","name":{"kind":"Name","value":"sleepInHours"}},{"kind":"Field","name":{"kind":"Name","value":"proteinPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"carbsPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"fatPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"steps"}}]}}]}}]} as unknown as DocumentNode<GoalByLatestQuery, GoalByLatestQueryVariables>;
export const BodyMeasurementByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BodyMeasurementByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measurementsByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMeasurement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"logId"}},{"kind":"Field","name":{"kind":"Name","value":"weightInPounds"}},{"kind":"Field","name":{"kind":"Name","value":"heightInInches"}},{"kind":"Field","name":{"kind":"Name","value":"waterInMilliliters"}},{"kind":"Field","name":{"kind":"Name","value":"shouldersInInches"}},{"kind":"Field","name":{"kind":"Name","value":"forearmsInInches"}},{"kind":"Field","name":{"kind":"Name","value":"calvesInInches"}},{"kind":"Field","name":{"kind":"Name","value":"thighsInInches"}},{"kind":"Field","name":{"kind":"Name","value":"waistInInches"}},{"kind":"Field","name":{"kind":"Name","value":"chestInInches"}},{"kind":"Field","name":{"kind":"Name","value":"armsInInches"}},{"kind":"Field","name":{"kind":"Name","value":"neckInInches"}},{"kind":"Field","name":{"kind":"Name","value":"hipsInInches"}},{"kind":"Field","name":{"kind":"Name","value":"sleepInHours"}},{"kind":"Field","name":{"kind":"Name","value":"steps"}}]}}]}}]}}]} as unknown as DocumentNode<BodyMeasurementByDateQuery, BodyMeasurementByDateQueryVariables>;
export const UpsertBodyMeasurementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertBodyMeasurement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertBodyMeasurementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertBodyMeasurement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UpsertBodyMeasurementMutation, UpsertBodyMeasurementMutationVariables>;
export const CreateFoodMeasurementFromFoodDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFoodMeasurementFromFoodDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFoodMeasurementFromFoodDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFoodMeasurementFromFoodDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFoodMeasurementFromFoodDetailsMutation, CreateFoodMeasurementFromFoodDetailsMutationVariables>;
export const CreateFoodMeasurementFromFoodIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFoodMeasurementFromFoodID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFoodMeasurementFromFoodIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFoodMeasurementFromFoodID"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFoodMeasurementFromFoodIdMutation, CreateFoodMeasurementFromFoodIdMutationVariables>;
export const FoodMeasurementsByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FoodMeasurementsByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measurementsByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"goalId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"day"}},{"kind":"Field","name":{"kind":"Name","value":"foodMeasurements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"logId"}},{"kind":"Field","name":{"kind":"Name","value":"foodId"}},{"kind":"Field","name":{"kind":"Name","value":"servingsConsumed"}},{"kind":"Field","name":{"kind":"Name","value":"food"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"servingSize"}},{"kind":"Field","name":{"kind":"Name","value":"servingUnit"}},{"kind":"Field","name":{"kind":"Name","value":"totalProteinInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"totalCarbsInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"totalFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"polyunsaturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"monounsaturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"saturatedFatInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"potassiumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"sodiumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryFiberInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"sugarsInGrams"}},{"kind":"Field","name":{"kind":"Name","value":"cholesterolInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"calciumInMilligrams"}},{"kind":"Field","name":{"kind":"Name","value":"ironInMilligrams"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FoodMeasurementsByDateQuery, FoodMeasurementsByDateQueryVariables>;
export const UpdateFoodMeasurementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFoodMeasurement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFoodMeasurementInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFoodMeasurement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UpdateFoodMeasurementMutation, UpdateFoodMeasurementMutationVariables>;
export const RemoveMeasurementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMeasurements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveMeasurementsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMeasurements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveMeasurementsMutation, RemoveMeasurementsMutationVariables>;
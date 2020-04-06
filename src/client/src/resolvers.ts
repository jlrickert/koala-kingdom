import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";

export const typeDefs = gql``;

type ResolveFn = (
    parent: any,
    args: any,
    { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolveMap {
    [field: string]: ResolveFn;
}

interface AppResolvers extends Resolvers {
    Mutate: ResolveMap;
}

export const resolvers: AppResolvers = {
    Mutate: {}
};

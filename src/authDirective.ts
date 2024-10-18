import { defaultFieldResolver, GraphQLString } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'; // Use utilities from graphql-tools

// AuthDirective function that modifies field resolvers
// Custom directive transformer
export default function authDirective(directiveName: string) {
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(requires: Role = USER) on FIELD_DEFINITION`,

    authDirectiveTransformer: (schema: any) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          // console.log(`fieldConfig: `,fieldConfig);
          const directives = getDirective(schema, fieldConfig, directiveName);
          // console.log(`\ndirectives:= `,directives);
          if (directives && directives.length > 0) {
            const { requires } = directives[0]; // Read "requires" argument from directive
            console.log(`\n fieldConfig:= `,fieldConfig);
            const { resolve = defaultFieldResolver } = fieldConfig;

            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.user) {
                throw new Error('Not authenticated');
              }

              // Check if the user has the required role
              if (requires && context.user.role !== requires) {
                throw new Error('Not authorized');
              }

              return resolve(source, args, context, info);
            };
          }
          return fieldConfig;
        },
      }),
  };
}
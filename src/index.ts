import 'reflect-metadata';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { customAuthChecker } from './auth/custom-auth-checker';

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  try {
    const app = express();
    dotenv.config();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [__dirname + '/resolvers/**/*-resolver.{ts,js}'],
        emitSchemaFile: true,
        container: Container,
        authChecker: customAuthChecker,
      }),
      context: ({ req }) => ({ req }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

bootstrap().catch((err) => console.log(err));

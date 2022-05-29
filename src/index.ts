import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello-resolver';

const PORT = process.env.PORT || 4000;

const bootstrap = async () => {
  try {
    const app = express();

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver],
        emitSchemaFile: true,
      }),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

bootstrap().catch((err) => console.log(err));

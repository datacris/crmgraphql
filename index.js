const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const conectarDB = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

conectarDB();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET);
        return {
          usuario,
        };
      } catch (error) {
        console.log("Error en context token ==> ", error);
      }
    }
  },
});

// const {url, port} = await server.listen({port:process.env.PORT});
// console.log(`
// Server is running
// Listening on port ${port}
// Query at at ${url}
// `)

// await server.listen({ port: process.env.PORT || 4000 });

server.listen().then(({ url, port }) => {
  const currentPort = process.env.PORT || port || 4000
  console.log("******************************************");
  console.log(`Server running at ${url}`);
  console.log(`Server running at port ${currentPort}`);

});

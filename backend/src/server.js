const express=require("express");
const cors=require("cors");
const { ApolloServer }=require("apollo-server-express");
const typeDefs=require("./graphql/schema");
const resolvers=require("./graphql/resolvers");
const app=express(); app.use(cors());
const server=new ApolloServer({
  typeDefs, resolvers,
  context: ({req})=>({ role: req.headers["x-role"] || "EMPLOYEE" })
});
(async()=>{
  await server.start();
  server.applyMiddleware({app});
  app.listen(4000,()=>console.log("Backend http://localhost:4000/graphql"));
})();

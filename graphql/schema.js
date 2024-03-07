const { GraphQLID, 
    GraphQLObjectType,
    GraphQLBoolean, 
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema} = require('graphql')
const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
name: 'User',
fields: {
_id: { type: GraphQLString},
name: { type: GraphQLString},
lastname: { type: GraphQLString},
email: { type: GraphQLString},
avatar: { type: GraphQLString}
}
})

const UserFilterInput = new GraphQLInputObjectType({
  name: 'UserFilterInput',
  fields: {
  name: {type: GraphQLString},
  lastname: {type: GraphQLString},
  email: {type: GraphQLString}
  }
})

const Message = new GraphQLObjectType({
name: 'Message',
fields: {
_id: { type: GraphQLString},
body: { type: GraphQLString},
from: { type: User},
to: { type: User},
readed: {type: GraphQLBoolean}
}
})

const MessageFilterInput = new GraphQLInputObjectType({
  name: 'MessageFilterInput',
  fields: {
  body: {type: GraphQLString},
  from: {type: GraphQLString},
  to: {type: GraphQLString}
  }
})

//TODO: Implement House GraphQLObjectType
// type House {
//   id: ID!
//   address: String!
//   city: String!
//   state: String!
//   size: Int!
//   type: String!
//   zip_code: String!
//   code: String!
//   rooms: Int!
//   bathrooms: Int!
//   price: Int!
//   image: String!
// }

const House = new GraphQLObjectType({
  name: 'house',
  fields: {
  _id: { type: GraphQLString},
  type: { type: GraphQLString},
  address: { type: GraphQLString},
  city: { type: GraphQLString},
  rooms: { type: GraphQLString},
  bathrooms: { type: GraphQLString},
  price: { type: GraphQLString},
  size: {type: GraphQLString}
  }
})



const HouseFilterInput = new GraphQLInputObjectType({
  name: 'HouseFilterInput',
  fields: {
    id: {type: GraphQLID},
    address: {type: GraphQLString},
    city: {type: GraphQLString},
    state: {type: GraphQLString},
    type: {type: GraphQLString},
    price: {type: GraphQLString}
  }
})

const queries = {
  hello: {
  type: GraphQLString, // Tipo de respuesta
  resolve: resolvers.hello
},
User: {
  type: User,
  resolve: resolvers.User,
  args: {
    id: {type: GraphQLString}
  }
},
Users: {
  type: new GraphQLList(User),
  resolve: resolvers.Users
},
UsersByFilter: {
  type: new GraphQLList(User),
  resolve: resolvers.UsersByFilter,
  args: {
    filter: { type: UserFilterInput }
  }
},
Message: {
  type: Message,
  resolve: resolvers.Message,
  args: {
    id: {type: GraphQLString}
  }
},
Messages: {
  type: new GraphQLList(Message),
  resolve: resolvers.Messages
},
MessagesByFilter: {
  type: new GraphQLList(Message),
  resolve: resolvers.MessagesByFilter,
  args: {
    filter: { type: MessageFilterInput }
  }
},
House: {
  type: House,
  resolve: resolvers.House,
  args: {
    id: {type: GraphQLString}
  }
},
Houses: {
  type: new GraphQLList(House),
  resolve: resolvers.Houses
},
HousesByFilter: {
  type: new GraphQLList(House),
  resolve: resolvers.HousesByFilter,
  args: {
    filter: { type: HouseFilterInput }
  }
},

}
const queryType = new GraphQLObjectType({
name: 'Query',
fields: queries
})

const schema = new GraphQLSchema({
query: queryType
})

module.exports = schema
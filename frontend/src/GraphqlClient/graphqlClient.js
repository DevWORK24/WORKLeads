import { GraphQLClient } from "graphql-hooks"
import memCache from "graphql-hooks-memcache"

const client= new GraphQLClient({
    url:process.env.REACT_APP_GRAPHQL,
    cache:memCache(),
    headers:{"Content-Type":"application/json"},    
})

export default client;
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './blockContent'
import crewMember from './crewMember'
import castMember from './castMember'
import movie from './movie'
import person from './person'
import screening from './screening'
import plotSummary from './plotSummary'
import plotSummaries from './plotSummaries'
import intent from './intent'
import fulfillment from './objects/fulfillment'
import fulfillmentEntity from './objects/fulfillmentEntity'
import fulfillmentFilter from './objects/fulfillmentFilter'
import intentParameter from './objects/intentParameter'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    movie,
    person,
    screening,
    blockContent,
    plotSummary,
    plotSummaries,
    castMember,
    crewMember,
    intent,
    fulfillment,
    fulfillmentEntity,
    fulfillmentFilter,
    intentParameter
  ])
})

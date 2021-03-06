import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'god8gjsp',
  dataset: 'production', 
  useCdn: false // `false` if you want to ensure fresh data
})

//TODO: use groq here isntead
const constructFulfillmentEntityQuery = async (fulfillmentEntity, params) => {
  const baseQueryFilter = `*[_type == '${fulfillmentEntity.entityType}'`
  const endQuery = `][0...${fulfillmentEntity.entityQuantity}]{ title }`
  let addFilter = ""

  const referenceFilters = fulfillmentEntity.filters.filter(filt => filt.filterMetric == 'references')
  addFilter = referenceFilters.map(filt => {
    const nameRef = (filt.filterParam == 'person') ? 'name' : 'title'
    return ` && references(*[${nameRef} == '${params[filt.filterParam]}']._id)`
  }).join(' ')
  const fullQuery = baseQueryFilter + addFilter + endQuery
  const result = await client.fetch(fullQuery)
  return result.map(i => i.title).join(', ')

}

const formatFulfillment = async (blocks = [], params) =>  {
  const res = await Promise.all(
    blocks.map(block => {
      if (block._type == 'fulfillmentEntity') {
        return Promise.resolve(constructFulfillmentEntityQuery(block, params))
      } else {
        return Promise.resolve(block.children.map(child => {
          if (child._type == 'span') { return child.text }
          else if (child._type == 'intentParameter') { return params[child.displayName]}
          else { return '' }
        }).join(''))
      }
    })
  )
  
  return res.join(' ')
}



const handler = async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName
  const intent = await client.fetch(
    `*[_type == 'intent' && name == $intentName][0]`,
    { intentName })
  const chosenFulfillmentIdx = Math.floor(Math.random() * intent.fulfillments.length)
  const formattedFulfillment = await formatFulfillment(intent.fulfillments[chosenFulfillmentIdx].content, req.body.queryResult.parameters)
  const textResponse = {
    fulfillmentMessages: [
      {
        text: {
          text: [
            formattedFulfillment
          ]
        }
      }
    ]
  }

  res.send(JSON.stringify(textResponse), 200)

}

module.exports = handler


export default {
  name: 'fulfillmentEntity',
  title: 'Fulfillment Entity',
  type: 'object',
  fields: [
    {
      title: 'Entity Type',
      name: 'entityType',
      type: 'string',
      description: 'What kind of object are we returning to our user? (e.g., movie, series, etc.)',
      options: {
        list: ['person', 'movie'],
      },
    },
    {
      title: 'Entity Quantity',
      name: 'entityQuantity',
      type: 'number',
      description: 'How many of it are we returning?',
    },
    {
      title: 'Filters',
      name: 'filters',
      description: "How should we determine the entity we're returning?",
      type: 'array',
      of: [
        {type: 'fulfillmentFilter'}
      ]
    },

  ],
}

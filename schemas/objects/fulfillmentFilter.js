export default {
  name: 'fulfillmentFilter',
  title: 'Fulfillment Filter',
  type: 'object',
  fields: [
    {
      title: 'Filter Metric',
      name: 'filterMetric',
      type: 'string',
      description: 'What metric are we using to filter?',
      options: {
        list: ['references', 'highest', 'lowest'],
      },
    },
    {
      title: 'Filter Param',
      name: 'filterParam',
      type: 'string',
      description: 'What does the filter metric apply to?',
      options: {
        list: ['person', 'popularity', 'movie'],
      },
    },
  ]
}

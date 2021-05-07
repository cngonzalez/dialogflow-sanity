export default {
  name: 'fulfillment',
  title: 'Fulfillment',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of this fulfillment. Include anything that would be informative for an editor at first glance!',
    },
    {
      name: 'content',
      title: 'Content',
      description: 'The content of the fulfillment -- what your user sees!',
      type: 'array',
      of: [
        //TODO: add other content types here -- YouTube videos, etc.
        {type: 'block', of: [{type: 'intentParameter'}]},
        {type: 'fulfillmentEntity'}
      ]
    },
]

}

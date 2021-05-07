export default {
  name: 'intent',
  title: 'Intent',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of intent (e.g., "displayname" in dialogflow)',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Human-readable name that describes what this intent does',
    },
    {
      name: 'trainingPhrases',
      title: 'Training Phrases',
      description: 'Phrases to train the bot that will trigger this intent. Please place in bullet list.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [
            {title: 'Bullet', value: 'bullet'},
          ],
          marks: {
            decorators: [],
            annotations: [],
          },
          of: [{type: 'intentParameter'}]
        },
      ]
    },
    {
      name: 'fulfillments',
      title: 'Fulfillments',
      description: 'Options to return when this intent is triggered',
      type: 'array',
      of: [{type: 'fulfillment'}]
    },
  ]
}

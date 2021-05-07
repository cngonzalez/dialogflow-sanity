export default {
  name: 'intentParameter',
  title: 'Intent Parameter',
  type: 'object',
  fields: [
    {
      title: 'Display Name',
      name: 'displayName',
      type: 'string',
      description: 'Display name of this parameter in Dialogflow',
      options: {
        list: ['person', 'movie'],
      },
    },
  ],
  preview: {
    select: {
      title: 'displayName'
    }
  }
}

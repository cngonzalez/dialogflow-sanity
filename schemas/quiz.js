export default {
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Human-readable name that describes this quiz',
    },
    {
      name: 'questions',
      title: 'Questions',
      description: 'All the branching questions in this quiz',
      type: 'array',
      of: [{type: 'quizQuestion'}]
    },
    
  ]
}

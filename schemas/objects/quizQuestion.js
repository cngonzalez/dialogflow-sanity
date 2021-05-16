export default {
  name: 'quizQuestion',
  title: 'Quiz Question',
  type: 'object',
  fields: [
    {
      title: 'Question',
      name: 'question',
      type: 'string',
      description: 'Text of the question.'
    },
    {
      title: 'Question slug',
      name: 'questionSlug',
      type: 'string',
      description: 'Describe the level and option of this question (so it can be referred to by other questions)'
    },
    {
      title: 'Answers',
      name: 'answers',
      description: "Possible answers to this question",
      type: 'array',
      of: [ {
        type: 'object',
        fields: [
          {
            type: 'string',
            name: 'answerSlug',
            title: 'Answer Slug',
            description: 'Slug of the answer this question leads to'
          },
          {
            type: 'string',
            name: 'answer',
            title: 'Answer',
            description: 'Text answer the user chooses to proceed in this quiz.'
          }
        ]
      } ]
    }
  ]
}

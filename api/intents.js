const dialogflow = require('@google-cloud/dialogflow');

const projectId = "earth-and-me"

function formatTrainingPhrases(blocks = []) {
  const trainingPhrases = []
  const parameters = new Set()
  blocks.forEach(block => {
    if (block.listItem === 'bullet' && block.children) {
      const trainingPhrase = {
        type: 'EXAMPLE',
        parts: []
      }

      block.children.forEach(child => {
        if (child.displayName) {
          trainingPhrase.parts.push({
            text: `$${child.displayName}`,
            alias: child.displayName,
            entityType: "@sys.any",
            userDefined: true
          })
          parameters.add(child.displayName)
          } else {
            trainingPhrase.parts.push({
              text: child.text
            })
          }
      })
      trainingPhrases.push(trainingPhrase)
    }
  })
  const formattedParameters = Array.from(parameters).map(param => (
    {name: '', display_name: param}))
  return [trainingPhrases, formattedParameters]
}


const handler = async (req, res) => {
  const intentsClient = new dialogflow.IntentsClient()
  const agentPath = intentsClient.agentPath(projectId)

  const rawIntent = JSON.parse(req.body).intent
  const [trainingPhrases, parameters] = formatTrainingPhrases(rawIntent.trainingPhrases)
  
  const formattedIntent = {
    displayName: rawIntent.name,
    webhookState: true,
    trainingPhrases,
    parameters
  }

  const [response] = await intentsClient.createIntent({
    parent: agentPath,
    intent: formattedIntent
  })

  return res.status(200).send(JSON.stringify(response))
}

module.exports = handler

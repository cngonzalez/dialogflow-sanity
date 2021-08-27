const dialogflow = require('@google-cloud/dialogflow')
const fetch = require('node-fetch')

import googlecreds from "./google-credentials.enc"
const projectId = "earth-and-me"

function formatTrainingPhrases(blocks = []) {
  const trainingPhrases = []
  const parameters = new Set()

  blocks.forEach(block => {
    //training phrases are individual items in a bullet list
    if (block.listItem === 'bullet' && block.children) {

      const trainingPhrase = {
        type: 'EXAMPLE',
        parts: []
      }

      block.children.forEach(child => {
        /* turn block text into list of 2 different kinds of items
        * 1) plain text and 2) the 'entity' param in a format dialogflow likes
        */
        if (child.displayName) {
          trainingPhrase.parts.push({
            text: child.displayName,
            alias: child.displayName,
            entityType: "@sys.any",
            userDefined: true
          })
          //all individual params need to be saved at top level as well
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

  //we used a set to remove dupes, now turn to array and format to dialogflow reqs
  const formattedParameters = Array.from(parameters).map(param => (
    {name: '', displayName: param}))

  return [trainingPhrases, formattedParameters]
}


const handler = async (req, res) => {
const baseURL = process.env.VERCEL_URL ?? 
                process.env.LOCAL_DEV_URL ??
                'http://localhost:3000/'

  const decryptedCreds = await fetch(`${baseURL}api/decrypt`, {
    method: 'POST',
    body: googlecreds.encrypted
  })
  .then(res => res.data)
  console.log(decryptedCreds)
  // const config = { credentials: decryptedCreds }
  //const intentsClient = new dialogflow.IntentsClient(config)
  //const agentPath = intentsClient.agentPath(projectId)

  //const rawIntent = JSON.parse(req.body).intent
  //const [trainingPhrases, parameters] = formatTrainingPhrases(rawIntent.trainingPhrases)
  
  //const formattedIntent = {
  //  displayName: rawIntent.name,
  //  webhookState: "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING",
  //  trainingPhrases,
  //  parameters
  //}

  ////TODO: a create or update action
  //const [response] = await intentsClient.createIntent({
  //  parent: agentPath,
  //  intent: formattedIntent
  //})

  // return res.status(200).send(JSON.stringify(response))
  return res.status(200).send(JSON.stringify('ok'))
}

module.exports = handler

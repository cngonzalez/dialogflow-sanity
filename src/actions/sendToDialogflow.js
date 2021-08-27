import React, { useEffect, useState } from 'react'
import { useDocumentOperation, useEditState } from '@sanity/react-hooks'
import { Inline, Button } from '@sanity/ui'

const hitIntentEndpoint = async (intent) => {
  return await fetch('/api/intents', {
    method: 'POST',
    body: JSON.stringify({intent}),
  })
  .then(response => response.json())
}

export const SendToDialogflow = ({
  id,
  type,
  draft,
  published,
  onComplete}) => {
  
  const { patch, publish } = useDocumentOperation(id, type)
  const intent = draft ?? published
  const [dialogOpen, setDialogOpen] = React.useState(false)
  return {
    label: 'Send To Dialogflow',
    icon: () =>  '🤖',
    onHandle: async () => {
      const res = await hitIntentEndpoint(intent)
      console.log(res)
      if (draft) {
        await publish.execute()
      }
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'modal',
      onClose: onComplete,
      content: <div>
        <h3>Confirm action</h3>
        <p>
          Are you sure you want to send these updated intents and fulfillments to Dialogflow?
        </p>
        <Inline space={[3, 3, 4]}>
          <Button tone='positive' text='Confirm' />
        </Inline>
      </div>    
    }
  }
}


import React, { useEffect, useState } from 'react'
import { useDocumentOperation, useEditState } from '@sanity/react-hooks'

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
      await publish.execute()
      setDialogOpen(true)
    },
    dialog: dialogOpen && {
      type: 'popover',
      onClose: onComplete,
      content: "Done!"
    }
  }
}


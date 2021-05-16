import S from '@sanity/desk-tool/structure-builder'
import { MdRemoveRedEye } from 'react-icons/md'
import React from 'react'

export const getDefaultDocumentNode = (props) => {
  if (props.schemaType == 'intent') {
    return S.document().views([
      S.view.form(),
      S.view.component(document => 
      <div>
          <p>If you're editing training phrases, click 'Push to Dialogflow' first!</p>
          <p>This preview should be able to return draft versions of your fulfillment(s)</p>
      </div>
    )
    .title('Web Preview')
    .icon(MdRemoveRedEye),
    ])
  }

  return S.document()
}

export default () => 
  S.list()
    .title('Movie Studio')
    .items(
      S.documentTypeListItems()
    )

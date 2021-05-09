// import the default document actions
import defaultResolve from 'part:@sanity/base/document-actions'
import schema from 'part:@sanity/base/schema'
import { SendToDialogflow } from './actions/sendToDialogflow'

export default function resolveDocumentActions(props) {
  const actions = [
    (props.type == 'intent' ? SendToDialogflow : null),
    ...defaultResolve(props),
  ].filter(Boolean)

  return actions
}

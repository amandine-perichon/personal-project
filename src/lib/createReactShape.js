import React from 'react'
import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from '../client/components/shapes'

export default function (shape, onTextChange, editable, key) {
  switch (shape.type) {
    case ("SVGRectangle"):
      return <SVGRectangle {...shape.attributes} key={key} />

    case ("SVGLine"):
      return <SVGLine {...shape.attributes} key={key} />

    case ("SVGEllipse"):
      return <SVGEllipse {...shape.attributes} key={key} />

    case ("SVGText"):
      return <SVGText {...shape.attributes} key={key} />

    case("ForeignObjectText"):
      return createTextShape(shape, onTextChange, editable, key)

    default:
      return {}
  }
}

function createTextShape(shape, onTextChange, editable, key) {
  return(
    <foreignObject  width="100%" height="100%" className="foreign" key={key}
                    transform={"translate(" + shape.attributes.x + " " + shape.attributes.y + ")"}>
      <div  dangerouslySetInnerHTML={{__html: shape.attributes.text}}
            contentEditable={editable} width="auto"
            className="insideforeign"
            onInput={evt => {
              const updatedAttributes = Object.assign({}, shape.attributes, {text: evt.target.innerHTML})
              const updatedShape = Object.assign({}, shape, {attributes: updatedAttributes})
              onTextChange(updatedShape)
            }} />
    </foreignObject>
  )
}

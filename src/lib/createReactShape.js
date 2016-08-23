import React from 'react'
import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from '../client/components/shapes'

export default function (shape, key = 0) {
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
      return createTextShape(shape)

    default:
      return {}
  }
}

function createTextShape(shape) {
  return(
    <foreignObject  width="100%" height="100%" className="foreign"
                    transform={"translate(" + shape.attributes.x + " " + shape.attributes.y + ")"}>
      <div  contentEditable="true" width="auto"
            className="insideforeign"
            onInput={evt => {
              console.log(evt.target.innerHTML)
            }}>
        {shape.attributes.text}<br/>
      </div>
    </foreignObject>
  )
}

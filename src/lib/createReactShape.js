import React from 'react'
import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from '../src/components/shapes'

export default function (shape, key) {
  switch (shape.type) {
    case ("SVGRectangle"):
      return <SVGRectangle {...shape.attributes} key={key} />

    case ("SVGLine"):
      return <SVGLine {...shape.attributes} key={key} />

    case ("SVGEllipse"):
      return <SVGEllipse {...shape.attributes} key={key} />

    case ("SVGText"):
      return <SVGText {...shape.attributes} key={key} />

    case ("SVGArrow"):
      return <SVGArrow {...shape.attributes} key={key} />

    default:
      return {}
  }
}
import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from './diagramEditor'

export function buildShape(shapeType, evt) {
  switch (shapeType) {

    case ("rectangle"):
      return {
        type: SVGRectangle,
        attributes: {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY,
          width: 150,
          height: 100
        }
      }

    case ("line"):
      return {
        type: SVGLine,
        attributes: {
          x1: evt.nativeEvent.offsetX,
          y1: 200,
          x2: 200,
          y2: evt.nativeEvent.offsetY
        }
      }

    case ("ellipse"):
      return {
        type: SVGEllipse,
        attributes: {
          cx: evt.nativeEvent.offsetX,
          cy: evt.nativeEvent.offsetY,
          rx: 100,
          ry: 50
        }
      }

    case ("text"):
      return {
      type: SVGText,
      attributes: {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetY,
          text: "Miaou"
        }
      }

    case ("arrow"):
      return {
        type: SVGArrow,
        attributes: {
          x1: evt.nativeEvent.offsetX,
          y1: 200,
          x2: 200,
          y2: evt.nativeEvent.offsetY
        }
      }

    default:
      return {}
  }
}

import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from './reactShapes'

export function buildShape(shapeType, evt) {
  switch (shapeType) {

    case ("rectangle"):
      return {
        type: SVGRectangle,
        attributes: {
          x: evt.nativeEvent.offsetX,
          y: evt.nativeEvent.offsetX,
          width: 100,
          height: 100
        }
      }

    case ("line"):
      return {
        type: SVGLine,
        attributes: {
          x1: evt.nativeEvent.offsetX,
          y1: evt.nativeEvent.offsetY,
          x2: 200,
          y2: 200
        }
      }

    case ("ellipse"):
      return {
        type: SVGEllipse,
        attributes: {
          cx: evt.nativeEvent.offsetX,
          cy: evt.nativeEvent.offsetX,
          rx: 50,
          ry: 100
        }
      }

    default:
      return {}
  }
}
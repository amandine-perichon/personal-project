import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from './shapes'

export function buildShape(shapeType, action) {
  switch (shapeType) {

    case ("rectangle"):
      if (action.initial.x > action.final.x) {
        [action.initial.x, action.final.x] = [action.final.x, action.initial.x]
      }
      if (action.initial.y > action.final.y) {
        [action.initial.y, action.final.y] = [action.final.y, action.initial.y]
      }
      return {
        type: SVGRectangle,
        attributes: {
          x: action.initial.x,
          y: action.initial.y,
          width: Math.abs(action.final.x - action.initial.x),
          height: Math.abs(action.final.y - action.initial.y)
        }
      }

    case ("line"):
      return {
        type: SVGLine,
        attributes: {
          x1: action.initial.x,
          y1: action.initial.y,
          x2: action.final.x,
          y2: action.final.y
        }
      }

    case ("ellipse"):
      return {
        type: SVGEllipse,
        attributes: {
          cx: action.initial.x,
          cy: action.initial.y,
          rx: Math.abs(action.final.x - action.initial.x),
          ry: Math.abs(action.final.y - action.initial.y)
        }
      }

    case ("text"):
      return {
      type: SVGText,
      attributes: {
          x: action.final.x,
          y: action.final.y,
          text: "Miaou"
        }
      }

    case ("arrow"):
      return {
        type: SVGArrow,
        attributes: {
          x1: action.initial.x,
          y1: action.initial.y,
          x2: action.final.x,
          y2: action.final.y
        }
      }

    default:
      return {}
  }
}

import {SVGLine, SVGRectangle, SVGEllipse, SVGText, SVGArrow} from './shapes'

export function buildShape(shapeType, action) {
  let {initial: {x: ix, y: iy}, final: {x: fx, y: fy}} = action

  switch (shapeType) {
    case ("rectangle"):
      if (ix > fx) {
        [ix, fx] = [fx, ix]
      }
      if (iy > fy) {
        [iy, fy] = [fy, iy]
      }
      return {
        type: SVGRectangle,
        attributes: {
          x: ix,
          y: iy,
          width: Math.abs(fx - ix),
          height: Math.abs(fy - iy)
        }
      }

    case ("line"):
      return {
        type: SVGLine,
        attributes: {
          x1: ix,
          y1: iy,
          x2: fx,
          y2: fy
        }
      }

    case ("ellipse"):
      if (ix > fx) {
        [ix, fx] = [fx, ix]
      }
      if (iy > fy) {
        [iy, fy] = [fy, iy]
      }
      const rx = (fx - ix) /2
      const ry = (fy - iy) /2
      return {
        type: SVGEllipse,
        attributes: {
          cx: ix + rx,
          cy: iy + ry,
          rx: rx,
          ry: ry
        }
      }

    case ("text"):
      return {
      type: SVGText,
      attributes: {
          x: fx,
          y: fy,
          text: "Miaou"
        }
      }

    case ("arrow"):
      return {
        type: SVGArrow,
        attributes: {
          x1: ix,
          y1: iy,
          x2: fx,
          y2: fy
        }
      }

    default:
      return {}
  }
}

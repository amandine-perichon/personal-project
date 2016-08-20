import arrowhead from './arrowhead'

// return an array of shapes

export default function (shapeType, action) {
  let {initial: {x: ix, y: iy}, final: {x: fx, y: fy}} = action
  // console.log(action, ix, iy, fx, fy, (fx - ix), (fy - iy))
  switch (shapeType) {
    case ("rectangle"):
      if (ix > fx) {
        [ix, fx] = [fx, ix]
      }
      if (iy > fy) {
        [iy, fy] = [fy, iy]
      }
      return [{
        "type": "SVGRectangle",
        "attributes": {
          "x": ix,
          "y": iy,
          "width": Math.abs(fx - ix),
          "height": Math.abs(fy - iy)
        }
      }]

    case ("line"):
      return [{
        "type": "SVGLine",
        "attributes": {
          "x1": ix,
          "y1": iy,
          "x2": fx,
          "y2": fy
        }
      }]

    case ("ellipse"):
      if (ix > fx) {
        [ix, fx] = [fx, ix]
      }
      if (iy > fy) {
        [iy, fy] = [fy, iy]
      }
      const rx = (fx - ix) /2
      const ry = (fy - iy) /2
      return [{
        "type": "SVGEllipse",
        "attributes": {
          "cx": ix + rx,
          "cy": iy + ry,
          "rx": rx,
          "ry": ry
        }
      }]

    case ("text"):
      return {
      "type": "SVGText",
      "attributes": {
          "x": fx,
          "y": fy,
          "text": "Miaou"
        }
      }

    case ("arrow"):
      const [h1x, h1y, h2x, h2y] = arrowhead(ix, iy, fx, fy)
      return [
          {
          "type": "SVGLine",
          "attributes": {
            "x1": ix,
            "y1": iy,
            "x2": fx,
            "y2": fy
          }
        },
        {
          "type": "SVGLine",
          "attributes": {
            "x1": h1x,
            "y1": h1y,
            "x2": fx,
            "y2": fy
          }
        },
        {
          "type": "SVGLine",
          "attributes": {
            "x1": h2x,
            "y1": h2y,
            "x2": fx,
            "y2": fy
          }
        }
      ]

    default:
      return {}
  }
}

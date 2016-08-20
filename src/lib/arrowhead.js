import Victor from 'victor'

export default function (ix, iy, fx, fy) {
  const A = new Victor (ix, iy)
  const B = new Victor (fx, fy)
  const h = 10*Math.sqrt(3)
  const w = 10
  const U = B.subtract(A).normalize()
  const V = new Victor (-U.y, U.x)
  //console.log(A,B,H,W,U,V)
  const firstHead = (new Victor(h*U.x, h*U.y)).add(new Victor(w*V.x, w*V.y))
  const secondHead = (new Victor(h*U.x, h*U.y)).subtract(new Victor(w*V.x, w*V.y))
  return [fx-Math.floor(firstHead.x), fy-Math.floor(firstHead.y),
          fx-Math.floor(secondHead.x), fy-Math.floor(secondHead.y)]
}

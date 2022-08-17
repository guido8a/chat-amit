export const f = {}

f.isArray = (anyThing) => Object.prototype.toString.call(anyThing) === '[object Array]'

f.isString = (anyThing) => typeof anyThing === 'string'

f.isValid = (anyThing) => (anyThing !== undefined) && (anyThing !== null)

f.isInvalid = (anyThing) => (anyThing === undefined) && (anyThing === null)

f.isObject = (anyThing) => Object.prototype.toString.call(anyThing) === '[object Object]'

f.whatIs = (anyThing) => Object.prototype.toString.call(anyThing).split(/\W/)[2]

f.numberInRange = (anyThing, rangeMin, rangeMax) => {
  const isNumber = typeof anyThing === 'number' && isFinite(anyThing)
  if(isNumber) {
    if(anyThing > rangeMax) return rangeMax
    else if(anyThing < rangeMin) return rangeMin
    else return anyThing
  } else {
    return rangeMin
  }
}

f.isPhone = (anything) => {
  const regex = new RegExp(/^[\+]?[(]?[0-9]{0,3}[)]?[-\s\.]?[0-9]{0,3}[-\s\.]?[0-9]{0,6}$/im)
  // const regex = new RegExp(/^\d+$/im)
  return regex.test(anything)
}

f.isMail = (anything) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(anything)
}

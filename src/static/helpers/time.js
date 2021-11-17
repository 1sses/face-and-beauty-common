export function toDate (x) {
  const date = x.split('#')[0].split('.')
  const time = x.split('#')[1].split(':')
  return new Date(+date[2], +date[1] - 1, +date[0], +time[0], +time[1])
}

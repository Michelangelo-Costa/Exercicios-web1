const curso = 'web2'

console.log(curso.charAt(1))
console.log(curso.charAt(10))
console.log(curso.indexOf('2'))

console.log(curso.substring(1))
console.log(curso.substring(0,3))
console.log("curso ".concat (curso).concat(" de javaScripit"))
console.log(curso.replace('2','e'))
console.log("Ana,Maria,pedro".split(','))

// template String

const nome = 'João'
const concatenacao = nome + ' tem ' + 20 + ' anos '

const template = 'Ola ${nome}'
console.log('1 + 1 = ${1+1}')
console.log(concatenacao)
console.log(template)

const up = texto => texto.toUpperCase()
console.log(up('teste'))
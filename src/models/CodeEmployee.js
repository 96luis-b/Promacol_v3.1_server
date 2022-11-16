export const generateCode = (category, count) => {
    let cadena = category.toUpperCase()
    let extraido = cadena.substring(0, 2)
    return `${extraido}-${count+1}`
}
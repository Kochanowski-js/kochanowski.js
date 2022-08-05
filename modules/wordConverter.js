export default function wordConverter(src) {

    for (let i in src) {
        src[i] = src[i].replaceAll(/Drukuj(?=([^"]*"[^"]*")*[^"]*$)/g, 'console.log')
        src[i] = src[i].replaceAll(/Jeżeli(?=([^"]*"[^"]*")*[^"]*$)/g, 'if')
        src[i] = src[i].replaceAll(/jest równe(?=([^"]*"[^"]*")*[^"]*$)/g, '==')
    }

    return src.join(';\n')+';'
}
export const parseSearchParamsFromURL = (qs:string) => {
    const arr = qs.split('&')
    const newarr = []
    for (let i of arr) {
        newarr.push(i.split('='))
    }
    const params: any = {}
    const numberParams = ['page', 'pageCount', 'min', 'max']
    for (let i of newarr) {
        if (numberParams.some(numberParam => numberParam === i[0])) {
            params[i[0]] = Number(i[1])
        } else {
            params[i[0]] = i[1]
        }
    }
    return params
}
export const currency = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const round = num =>{
    return Math.round((parseFloat(num) + Number.EPSILON) * 100)/100
}
const rupiahFormat = (number) => {
    return new Intl.NumberFormat('ID-id', {
        style: 'currency',
        currency: 'IDR'
    }).format(number)
}

export default rupiahFormat
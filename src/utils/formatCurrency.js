const formatCurrency = (currency, amount) => {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency
    }).format(amount) // retorna string
}

export default formatCurrency;
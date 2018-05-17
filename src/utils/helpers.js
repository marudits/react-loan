export function formatCurrency(value, decimal = 2, symbol = ''){
    return value ? `${symbol} ${parseFloat(value).toFixed(decimal)}` : value === 0 ? 0 : value ;
}
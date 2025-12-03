export function FormatMoney (curency){
    return `$${(curency / 100).toFixed(2)}`;
}
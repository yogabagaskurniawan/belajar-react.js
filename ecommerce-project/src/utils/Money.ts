export function FormatMoney (curency: number){
    return `$${(curency / 100).toFixed(2)}`;
}
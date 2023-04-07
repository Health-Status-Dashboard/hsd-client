export const colors = {
    mitreDarkBlue: "rgb(16,44,76)",
    mitreYellow: "rgb(256,244,4)",
    mitreBlue: "rgb(0,91,148)",
    vermilion: "rgb(255,60,56)",
    cerise: "rgb(206, 71, 96)",
    saffron: "rgb(249, 194, 46)",
    green: "rgb(77, 139, 49)",
    white: "rgb(255,255,255)",
    black: "rgb(0,0,0)", //todo need 12 colors for months 
    lightOrange: "rgb(252, 199, 146)", //can change later
    darkOrange: "rgb(252, 144, 35)", //can change later
    lightBlue: "rgb(150, 220, 255)",//can change later
    pink:"rgb(240, 77, 218)"//can change later
}

export function gradient(color: string, cardinality: number): Array<string> {
    var colors = []
    var mod_color = color.slice(0, -1)
    mod_color = mod_color
    var step = 1 / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        var a = step * i
        var out = mod_color + ', ' + a.toString() + ')'
        colors.push(out)
    }
    return colors

}
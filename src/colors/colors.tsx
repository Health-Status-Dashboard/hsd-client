export const colors = {
    mitreDarkBlue: "rgb(16,44,76)",
    mitreYellow: "rgb(256,244,4)",
    mitreBlue: "rgb(0,91,148)",
    vermilion: "rgb(255,60,56)",
    saffron: "rgb(249, 194, 46)",
    green: "rgb(77, 139, 49)",
    white: "rgb(255,255,255)"
}

export function gradient(color: string, cardinality: number) {
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
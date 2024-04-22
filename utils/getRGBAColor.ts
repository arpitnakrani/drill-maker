function getRGB(colorName: string) {
    const colors: Record<string, number[]> = {
        red: [255, 0, 0],
        blue: [0, 0, 255],
        green: [0, 255, 0],
        black: [0, 0, 0],
        orange: [255, 165, 0],
        grey: [128, 128, 128],
        yellow: [255, 255, 0],
        purple: [128, 0, 128],
        pink: [255, 192, 203],
    };

    return colors[colorName.toLowerCase()] || [0, 0, 0];

}

export function convertColorToLightColor(colorName: string, opacity: number) {
    const [r, g, b] = getRGB(colorName);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
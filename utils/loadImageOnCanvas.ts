import { getSVGFromPath } from "./getSVGFromPath";

interface ILoadImageOnCanvasWithColor {
    canvas: HTMLCanvasElement;
    imagePath: string;
    color?: string;
    clientX: number;
    clientY: number;
}
export function loadImageOnCanvasWithColor({ canvas, clientX, clientY,  imagePath }: ILoadImageOnCanvasWithColor) {
    return (color?: string) => {
        let svg = getSVGFromPath(imagePath)
        const image = new Image();
        if (color) {
            svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
        }
        const svgBlob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        image.src = url
        image.onload = () => {
            const canvasContext = canvas.getContext('2d');
            canvasContext?.drawImage(image, clientX, clientY, 30, 30);
        }
    }
}
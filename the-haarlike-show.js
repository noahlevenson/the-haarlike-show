const donny = document.getElementById("donny");
const outputCanvas = document.getElementById("output-canvas");
const overlayCanvas = document.getElementById("output-overlay-canvas");
const sSize = document.getElementById("subwindow-size");
const sX = document.getElementById("subwindow-x-offset");
const sY = document.getElementById("subwindow-y-offset");
const xRect = document.getElementById("x-rectangles");
const yRect = document.getElementById("y-rectangles");
const step = document.getElementById("step");

let loopId;

outputCanvas.width = 640;
outputCanvas.height = 480;

overlayCanvas.width = 640;
overlayCanvas.height = 480;

const outputCtx = outputCanvas.getContext("2d");
const outputOverlayCtx = overlayCanvas.getContext("2d");

window.onload = () => {
	outputCtx.drawImage(donny, 0, 0);
}

function Haarlike(rx, ry) {
	this.rx = rx;
	this.ry = ry;
}

function* generateHaarlike(haarlike, s, sx, sy) {
	for (let i = 0; i < s; i += 1) {
		for (let j = 0; j < s; j += 1) {
			for (let h = 1; h * haarlike.ry + i <= s; h += 1) {
				for (let w = 1; w * haarlike.rx + j <= s; w += 1) {
					const feature = [];
					for (let l = 0; l < haarlike.ry; l += 1) {
						feature.push([]);
						for (let k = 0; k < haarlike.rx; k += 1) {
							feature[l].push([sx + j + k * w, sy + i + l * h, w, h]);
						}
					}
					yield feature;
				}
			}
		}
	}
}

function drawHaarlike(feature, canvas) {
	let color = "white";
	for (let i = 0, ilen = feature.length; i < ilen; i += 1) {
		for (let j = 0, jlen = feature[i].length; j < jlen; j += 1) {
			canvas.fillStyle = color;
			canvas.fillRect(feature[i][j][0], feature[i][j][1], feature[i][j][2], feature[i][j][3]);
			if (j !== jlen - 1 || jlen === 1) color = color === "white" ? "black" : "white";
		}
	}
}
		
function start() {
	if (loopId) clearInterval(loopId);
	const h = new Haarlike(parseInt(xRect.value, 10), parseInt(yRect.value, 10)); 
	const g = generateHaarlike(h, parseInt(sSize.value, 10), parseInt(sX.value, 10), parseInt(sY.value, 10));
	const s = sSize.value;
	const sx = sX.value;
	const sy = sY.value;
	let fcount = 0;
	loopId = setInterval(() => {
		if (!g.done) {
			const f = g.next().value;
			outputOverlayCtx.clearRect(0, 0, 640, 480);
			outputOverlayCtx.strokeStyle = 'yellow';
			outputOverlayCtx.strokeRect(sx, sy, s, s);
			drawHaarlike(f, outputOverlayCtx);
			outputOverlayCtx.font = "18px sans-serif";
			outputOverlayCtx.fillStyle = "black";
			outputOverlayCtx.fillText("feature count: " + fcount, 5, 20);
			fcount += 1;
		} else {
			clearInterval(loopId);
		}
	}, step.value)
}
const bucket_name = 'e2198_compressed';
window.cooldown = 1000;
let seg_id = 113053;

let imgsPerInter = 256;
let count = 0;
let iterCount; 
let start;

function downloadImage(url) {
		let img = new Image();
		
		img.onload = () => { 
			count++;
			interCount++;

			if (interCount === imgsPerInter) {
				console.log('time', Date.now() - start);
				setTimeout(downloadTiles, cooldown);
			}
		};
		img.onerror = (e) => { console.log('error', url, e); };
		img.src = url;
}

function downloadImageFetch(url) {
	fetch(url).then(() => {
		count++;
		interCount++;

		if (interCount === imgsPerInter) {
			console.log('time', Date.now() - start);
			setTimeout(downloadTiles, cooldown);
		}
	}).catch((e) => { console.log('error', url, e); });
}


var downloadTiles = () => {
	start = Date.now();
	interCount = 0;
	for (let i = 0; i < imgsPerInter; i++) {
		const url = `https://storage.googleapis.com/${bucket_name}/${seg_id}-jpgs/${i}.jpg`;
		downloadImageFetch(url);
	}
	seg_id += 2;
}
downloadTiles();

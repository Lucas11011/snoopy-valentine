// IIFE (Immediately Invoked Function Expression): runs once and keeps variables out of the global scope.
(() => {
	// Grab the DOM elements we need.
	const noButton = document.getElementById("noBtn");
	const yesButton = document.getElementById("yesBtn");
	const buttonsWrap = document.querySelector(".buttons");
	const imageEl = document.getElementById("snoopyImg");
	const promptText = document.getElementById("promptText");
	const happySrc = "./snoopyflower.png";
	const sadSrc = "./sadsnoopyflower.png";
	const yesGifSrc = "./Snoopy%20GIF.gif";

	if (!noButton && !yesButton) return;

	let count = 0;
	window.__vdayNoClickCount = count; // Debug: lets you inspect the current No-click count in DevTools.

	const noClickLabels = [
		"haha misclick",
		"wrong button!?",
		"are u sure?",
		"wow",
		"that's crazy",
		"r u srs",
		"miss girl",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
		"-_-",
	];

	// Move the "No" button a bit, but keep it near its original spot.
	const moveNoButtonRandomlyNearby = () => {
		if (!noButton) return;

		// Max distance (in pixels) from the original position.
		const maxDistance = 90;

		// Pick a random point inside a circle of radius maxDistance.
		let dx = 0;
		let dy = 0;
		do {
			dx = (Math.random() * 2 - 1) * maxDistance;
			dy = (Math.random() * 2 - 1) * maxDistance;
		} while (dx * dx + dy * dy > maxDistance * maxDistance);

		noButton.style.setProperty("--btn-jitter-x", `${Math.round(dx)}px`);
		noButton.style.setProperty("--btn-jitter-y", `${Math.round(dy)}px`);
	};

	// click "No": show sad image, tweak button sizes, change the label, and dodge the cursor
	noButton?.addEventListener("click", () => {
		if (imageEl) imageEl.src = sadSrc;

		count += 1;
		window.__vdayNoClickCount = count;

		// Make "No" smaller and "Yes" larger per click.
		const yesScaleStep = 0.4;
		const yesScale = Math.min(1.2 + count * yesScaleStep); // Grow Yes faster, by the same amount each click (with no cap)
		const noScale = Math.max(1 - count * 0.08, 0.25); // Shrink No a bit each click (with a floor)
		yesButton?.style.setProperty("--btn-scale", String(yesScale));
		noButton.style.setProperty("--btn-scale", String(noScale));

		if (count > noClickLabels.length) {
			noButton.style.display = "none";
			console.log(`No clicked ${count} time${count === 1 ? "" : "s"}`);
			return;
		}

		noButton.textContent = noClickLabels[count - 1];
		// Wait until after layout/text updates, then move it.
		requestAnimationFrame(moveNoButtonRandomlyNearby);

		console.log(`No clicked ${count} time${count === 1 ? "" : "s"}`);
	});

	// Clicking "Yes": celebrate with a GIF, update the message, and remove the buttons
	yesButton?.addEventListener("click", () => {
		if (imageEl) imageEl.src = yesGifSrc;
		if (promptText) promptText.textContent = "WOOOOOO!!!! KNEW YOU'D SAY YES >.<";
		if (buttonsWrap) buttonsWrap.remove();
	});
})();

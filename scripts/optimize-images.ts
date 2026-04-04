import { existsSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import sharp from "sharp"

const OUT = resolve("public/images")

if (!existsSync(OUT)) {
	mkdirSync(OUT, { recursive: true })
}

async function optimizePortrait(inputPath: string, name: string) {
	// Portrait widths — smaller since the image sits in a column, not full-bleed
	const widths = [480, 720, 1080]
	for (const w of widths) {
		await sharp(inputPath)
			.resize(w)
			.webp({ quality: 82 })
			.toFile(resolve(OUT, `${name}-${w}w.webp`))
		console.log(`✓ ${name}-${w}w.webp`)
	}
}

async function optimizeAvatar(inputPath: string) {
	// Square crop for nav avatar (multiple densities)
	for (const size of [48, 96]) {
		await sharp(inputPath)
			.resize(size, size, { fit: "cover" })
			.webp({ quality: 85 })
			.toFile(resolve(OUT, `avatar-${size}.webp`))
		console.log(`✓ avatar-${size}.webp`)
	}
	// Larger square crop for the CV header
	for (const size of [160, 320]) {
		await sharp(inputPath)
			.resize(size, size, { fit: "cover" })
			.webp({ quality: 88 })
			.toFile(resolve(OUT, `me-${size}.webp`))
		console.log(`✓ me-${size}.webp`)
	}
}

async function createOgImage(inputPath: string) {
	await sharp(inputPath)
		.resize(1200, 630, { fit: "cover" })
		.jpeg({ quality: 85 })
		.toFile(resolve(OUT, "og-image.jpg"))
	console.log("✓ og-image.jpg")
}

async function main() {
	const portraitInput = process.argv[2]
	const avatarInput = process.argv[3]

	if (!portraitInput || !avatarInput) {
		console.error("Usage: npx tsx scripts/optimize-images.ts <portrait-photo> <avatar-photo>")
		process.exit(1)
	}

	await optimizePortrait(portraitInput, "portrait")
	await optimizeAvatar(avatarInput)
	await createOgImage(portraitInput)
	console.log("\nAll images optimized!")
}

main()

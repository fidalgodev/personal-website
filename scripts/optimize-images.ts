import { existsSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import sharp from "sharp"

const OUT = resolve("public/images")

if (!existsSync(OUT)) {
	mkdirSync(OUT, { recursive: true })
}

async function optimizeWorkingPhoto(inputPath: string) {
	const widths = [640, 1280, 1920]
	for (const w of widths) {
		await sharp(inputPath)
			.resize(w)
			.webp({ quality: 80 })
			.toFile(resolve(OUT, `working-${w}w.webp`))
		console.log(`✓ working-${w}w.webp`)
	}
}

async function optimizeAvatar(inputPath: string) {
	for (const size of [48, 96]) {
		await sharp(inputPath)
			.resize(size, size, { fit: "cover" })
			.webp({ quality: 85 })
			.toFile(resolve(OUT, `avatar-${size}.webp`))
		console.log(`✓ avatar-${size}.webp`)
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
	const workingInput = process.argv[2]
	const avatarInput = process.argv[3]

	if (!workingInput || !avatarInput) {
		console.error("Usage: npx tsx scripts/optimize-images.ts <working-photo> <avatar-photo>")
		process.exit(1)
	}

	await optimizeWorkingPhoto(workingInput)
	await optimizeAvatar(avatarInput)
	await createOgImage(workingInput)
	console.log("\nAll images optimized!")
}

main()

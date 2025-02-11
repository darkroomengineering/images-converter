const sharp = require("sharp")
const fs = require("fs").promises
const path = require("path")

async function convertPNGtoWebP(inputDir, outputDir) {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true })

    // Read all files from input directory
    const files = await fs.readdir(inputDir)

    // Filter only PNG files
    const pngFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".png"
    )

    console.log(`Found ${pngFiles.length} PNG files to convert`)

    let i = 0

    // Process each PNG file
    for (const file of pngFiles) {
      const inputPath = path.join(inputDir, file)
      const outputPath = path.join(outputDir, `${i}.webp`)

      await sharp(inputPath)
        .resize(1920)
        .webp({ quality: 80 }) // You can adjust quality (0-100)
        .toFile(outputPath)

      i++

      console.log(`Converted: ${file} -> ${i}.webp`)
    }

    console.log("Conversion completed successfully!")
  } catch (error) {
    console.error("An error occurred:", error)
  }
}

// Example usage
const inputDirectory = "./png"
const outputDirectory = "./webp"

convertPNGtoWebP(inputDirectory, outputDirectory)

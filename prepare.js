import { writeFileSync } from "fs"
import { join } from "path"

const ROOT_DIR = "." 
const PUBLIC_DIR = join( ROOT_DIR, 'public' )

/**
 * @param { string } url
 * @returns { Promise<Record<string, any>> }
*/
async function downloadJSONFile(url) {
	try {
		const result = await fetch(url);
		return result.json();
	} catch (err) {
		throw err;
	}
}

async function main() {
	const Dictionary = await downloadJSONFile('https://github.com/Jaezmien/old-ponish-db/releases/latest/download/dictionary.json');
	writeFileSync(
		join(PUBLIC_DIR, 'dictionary.json'),
		JSON.stringify( Dictionary )
	)
	console.log('Written dictionary.json')

	const Etymology = await downloadJSONFile('https://github.com/Jaezmien/old-ponish-db/releases/latest/download/etymology.json');
	writeFileSync(
		join(PUBLIC_DIR, 'etymology.json'),
		JSON.stringify( Etymology )
	)
	console.log('Written etymology.json')
}

main()
	.then(() => {
		console.log('Successfully downloaded latest database!')

		process.exit(0)
	})
	.catch((err) => {
		console.error('An error has occured while trying to fetch the latest files.')
		console.error(err)

		process.exit(1)
	})

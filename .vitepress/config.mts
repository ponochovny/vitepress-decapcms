import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import consequences_sidebar from '../config/consequences/sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Base UA-RU',
	description: 'БАЗА',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Главная', link: '/' },
			{
				text: 'Хронология',
				link: '/content/consequences',
				activeMatch: '/content/consequences',
			},
			{
				text: 'Тезисы',
				link: '/content/thesises',
				activeMatch: '/content/thesises',
			},
		],

		sidebar: {
			'/content/consequences': [
				// { text: 'Хронология', link: '/consequences/' },
				// ...getconsequencesLinks(),
				// ...consequences_sidebar.sidebar,
				{ items: [...generateSidebar()] },
			],
			// '/consequences/': [
			// 	// { text: 'Хронология', link: '/consequences/' },
			// 	...getconsequencesLinks(),
			// ],
		},

		socialLinks: [
			{
				icon: {
					svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path id="telegram-1" d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/></svg>',
				},
				link: 'https://www.t.me/cjiaweak',
				ariaLabel: 'Telegram link',
			},
			{
				icon: 'discord',
				link: 'https://discord.gg/Cjq7b2Kh',
				ariaLabel: 'Discord link',
			},
			{
				icon: {
					svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fill-rule="evenodd" clip-rule="evenodd"/></svg>',
				},
				link: 'https://www.twitch.tv/cjiaweak',
				ariaLabel: 'Twitch link',
			},
		],

		docFooter: {
			prev: 'Предыдущая страница',
			next: 'Следующая страница',
		},

		search: {
			provider: 'local',
		},
	},
})

// function getconsequencesLinks() {

// 	// return consequences_sidebar.sidebar.map((section) => ({
// 	// 	text: section.text,
// 	// 	collapsible: true,
// 	// 	items: section.items.map((item) => ({
// 	// 		text: item.text,
// 	// 		link: `/consequences/${item.article}`,
// 	// 	}))
// 	// }))

// 	const consequencesDir = path.resolve(__dirname, '../content/consequences')
// 	const files = fs.readdirSync(consequencesDir)

// 	return files
// 		.filter((file) => file.endsWith('.md') && !file.includes('index'))
// 		.map((file) => {
// 			const filePath = path.join(consequencesDir, file)
// 			const content = fs.readFileSync(filePath, 'utf-8')
// 			const { data } = matter(content)
// 			const name = data.title || file.replace('.md', '')
// 			const link = `/consequences/${file.replace('.md', '')}`
// 			return { text: name, link }
// 		})
// }

function generateSidebar() {
	const result = consequences_sidebar.sidebar.map((section) => ({
		text: section.text,
		collapsed: false,
		items: section.items.map((item) => ({
			text: getArticleTitle(item.article),
			link: `/content/consequences/${item.article.split('/')[0]}/`,
		})),
	}))
	return result
}

function getArticleTitle(articlePath) {
	const mdFilePath = path.resolve(
		process.cwd(),
		'content/consequences',
		`${articlePath}.md`
	)

	if (fs.existsSync(mdFilePath)) {
		const fileContent = fs.readFileSync(mdFilePath, 'utf-8')
		const { data } = matter(fileContent)
		return data.title || articlePath.split('/').pop()
	}

	return articlePath.split('/').pop() // Фолбэк на имя файла, если `title` нет
}

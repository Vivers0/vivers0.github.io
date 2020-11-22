const words = {
    'ru': {
        // Header
        mainFooter: "Web Разработчик",
        // Button
    /* inDevelop: "В разработке", */
        // Projects
        projectsText: "Проекты",
        cardYoungel: "Онлайн чат без регистрации",
        cardStarRevenge: "Discord бот для проекта StarRevenge",
        cardKoln: "Discord бот с модулями админа",
        cardGlasgow: 'Discord бот для получения музыки из аниме',
        cardFrontier: 'Офицальный сайт представительства "Frontier" в России',
        // Footer
        createdBy: "Создано Поветкиным Саввой"
    },
    'en': {
        // Header
        mainFooter: "Web Developer",
        // Button
        /* inDevelop: "In develop", */
        // Projects
        projectsText: "Projects",
        cardYoungel: "Online chat without registration",
        cardStarRevenge: "Discord bot for StarRevenge project",
        cardKoln: "In develop",
        cardGlasgow: 'Discord bot for parsing anime theme',
        cardFrontier: 'Offical site "Frontier" in Russia',
        // Footer
        createdBy: "Created by Savva Povetkin"
    }
}

class Internalisation {
    constructor(lang) {
        this.lang = lang
        this.getElement()
    }

    getElement() {
        let list = words[this.lang]
        for (let el in list) {
            this.element = document.getElementById(el)
            // console.log(this.element, el)
            this.element.innerText = list[el]
        }
    }
}

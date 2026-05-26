export const LANGUAGES = [
  { code: 'uz', label: "O'ZB", name: "O'zbek" },
  { code: 'ru', label: 'РУС', name: 'Русский' },
  { code: 'en', label: 'ENG', name: 'English' },
]

export const translations = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      about: 'Men haqimda',
      skills: "Ko'nikmalar",
      projects: 'Loyihalar',
      experience: 'Tajriba',
      blog: 'Blog',
      contact: 'Aloqa',
      cta: "Bog'lanish",
    },

    hero: {
      badge: 'Ish uchun ochiq',
      // ✅ Ustoz tavsiyasi: kuchli positioning
      positioning: 'Zamonaviy, responsive va foydalanuvchi uchun qulay veb-tajribalar yaratishga ixtisoslashgan Junior Frontend Developer.',
      // Bio eski strukturada saqlanadi (komponent uni ishlatadi)
      bio: 'G\'oyalarni {beautiful}, {fast} va {comfortable} interfeyslarga aylantirib, har bir loyihaga engineering yondashuvi bilan kirishaman.',
      beautiful: 'chiroyli',
      fast: 'tez',
      comfortable: 'qulay',
      ctaProjects: "Loyihalarni ko'rish",
      ctaContact: 'Aloqa',
      scroll: 'Pastga',
      stats: { experience: 'Yil tajriba', projects: 'Loyiha', quality: 'Sifat' },
      typeSequence: [
        'Frontend Developer',
        'React & Next.js',
        'UI/UX ga e\'tibor beraman',
        'Tailwind CSS',
      ],
    },

    about: {
      eyebrow: 'Tanishaylik',
      title: 'Men haqimda',
      whoAmI: 'Kimman men?',
      highlight: 'zamonaviy va intuitiv',
      // ✅ Ustoz tavsiyasi: engineering depth ko'rsatuvchi bio
      bio1: "G'oyalarni responsive va interaktiv interfeyslarga aylantirishdan zavqlanaman. Hozirda frontend engineering ko'nikmalarini chuqurlashtirish, real loyihalar yaratish va {highlight} foydalanuvchi tajribalari shakllantirish bilan shug'ullanmoqdaman.",
      bio2: "Har bir loyihada faqat chiroyli ko'rinishdan emas — toza kod yozish, komponent arxitekturasi va uzoq muddatda saqlanuvchi yechimlar yaratishdan qoniqaman.",
      journey: "Mening yo'lim",
      role: 'Frontend Developer',
      facts: {
        location:   { label: 'Joylashuv',      value: "O'zbekiston, Toshkent"  },
        experience: { label: 'Tajriba',         value: '2+ yil frontend'        },
        energy:     { label: 'Energiya',        value: 'Kofe + kod'             },
        stack:      { label: 'Sevimli stack',   value: 'React + Tailwind'       },
        goal:       { label: 'Maqsad',          value: 'Senior Developer'       },
        hobby:      { label: 'Hobbi',           value: 'UI/UX dizayn'           },
      },
      timeline: [
        { year: '2023', title: "Frontend o'rganish",       desc: "HTML, CSS, JavaScript asoslarini o'rgandim. Birinchi statik sahifalar va layoutlar yaratdim." },
        { year: '2024', title: 'React & zamonaviy stack',  desc: 'React, Tailwind CSS, Framer Motion, Git/GitHub bilan komponentli arxitekturaga o\'tdim.' },
        { year: '2025', title: 'Next.js & TypeScript',     desc: "Next.js App Router, TypeScript va REST API integratsiyasi. SSR/SSG pattern'larni o'rgandim." },
        { year: '2026', title: 'Engineering depth',        desc: "Performance, clean code va real loyihalar orqali frontend engineering ko'nikmalarini chuqurlashtirmoqdaman." },
      ],
    },

    skills: {
      eyebrow: 'Stack',
      title: "Mening ko'nikmalarim",
      categories: {
        languages:  'Tillar',
        frameworks: 'Freymvorklar',
        tools:      'Asboblar',
        other:      "Boshqa ko'nikmalar",
      },
    },

    projects: {
      eyebrow: 'Portfolio',
      title: 'Mening loyihalarim',
      subtitle: "Har bir loyihada yangi muammo yechdim — quyida nima yaratganimni va qanday fikrlaganim ko'rinadi.",
      detail: 'Batafsil',
      comingSoon: 'Tez kunda',
      allProjects: 'Barcha loyihalar',
      badges: { featured: 'Tanlangan', new: 'Yangi', openSource: 'Ochiq manba' },
      // Labels for detail sections
      challengeLabel: 'Qiyinchilik',
      solutionLabel:  'Yechim',
      items: [
        {
          // ✅ Ustoz: "Ecommerce Website" emas, engineering depth ko'rsatuvchi title
          title: "O'yinchoqlar do'koni",
          // ✅ Ustoz: nima muammo yechilgani + stack + foydalanuvchi tajribasi
          description: "Responsive UI, mahsulot filtrlash va qulay xarid tajribasi bilan yaratilgan zamonaviy e-commerce interfeys.",
          // Challenge + yechim + architecture — "real product engineer" vibe
          challenge: "Katta tovar ro'yxatini render performance yo'qotmay ko'rsatish va savatcha holatini sahifalar bo'ylab saqlash.",
          solution:  "React state management va komponentlarni bo'laklashga e'tibor berish orqali toza, kengaytiriluvchi arxitektura qurdim.",
          longDesc:  "React + Tailwind CSS bilan yaratilgan e-commerce interfeys. Mahsulot katalogi, savatcha tizimi, filter va responsive layout — har bir komponent qayta ishlatiladigan tarzda yozilgan.",
        },
        {
          title: "Ta'om shahri",
          description: "Tez ma'lumot boshqaruvi va toza foydalanuvchi tajribasiga yo'naltirilgan restoran va oziq-ovqat do'koni interfeysi.",
          challenge:  "Ko'p kategoriyali menyuni mobil qurilmada ham qulay ishlashi va buyurtma oqimini intuitiv qilish.",
          solution:   "Mobile-first yondashuv va aniq komponent bo'linishi orqali har bir sahifani mustaqil va tez yuklanadigan qildim.",
          longDesc:   "JavaScript + Vite asosida qurilgan platforma. Restoran menyu katalogi, buyurtma berish oqimi va admin boshqaruv paneli — toza UI va aniq ma'lumot ierarxiyasi bilan.",
        },
        {
          title: 'Portfolio sayti',
          description: "Silliq animatsiyalar, responsive layoutlar va zamonaviy frontend amaliyotlari bilan yaratilgan shaxsiy portfolio.",
          challenge:  "PageSpeed 90+ ball saqlab qolgan holda Framer Motion animatsiyalarini samarali ishlatish va CLS = 0 ga erishish.",
          solution:   "Lazy loading, WebP rasmlar, code splitting va will-change optimizatsiyalari orqali performance va vizual sifat balansini ushlash.",
          longDesc:   "React 19, Framer Motion v12, Tailwind CSS v4, Vite 8 bilan yaratilgan portfolio. Ko'p tilli (UZ/RU/EN), dark/light rejim, lazy-loaded sections va WebP rasm optimizatsiyasi.",
        },
      ],
    },

    experience: {
      eyebrow: "Yo'l",
      title: 'Mening tajribam',
      scrollHint: "← chapga/o'ngga surging →",
      stats: { experience: 'Yil tajriba', projects: 'Loyiha', tech: 'Texnologiya', motivation: 'Motivatsiya' },
      cards: [
        { period: '2023 — hozir',  title: "O'z-o'zini o'qitish",         org: 'Onlayn platformalar',    desc: "YouTube, Udemy, freeCodeCamp orqali HTML, CSS, JavaScript, React va Next.js o'rgandim. Har kunlik amaliyot bilan nazariyani mustahkamladim." },
        { period: '2024 — hozir',  title: 'Freelance Frontend Developer', org: 'Mustaqil',               desc: "Mijozlar uchun responsive veb-saytlar va landing pagelar yaratdim. React va Tailwind CSS — asosiy stack. Muddatlarga rioya qilish va client bilan ishlash ko'nikmalarini oshirdim." },
        { period: '2024',          title: 'Portfolio loyihasi',           org: 'Shaxsiy',                desc: "Birinchi to'liq React + Tailwind portfolio saytini yaratdim. Framer Motion animatsiyalari, mobile-first dizayn va accessibility standartlariga rioya qildim." },
        { period: '2025',          title: 'Next.js & TypeScript',         org: "O'z-o'zini o'qitish",    desc: "Next.js App Router, TypeScript va REST API integratsiyasini o'rgandim. SSR/SSG pattern'larini real loyihalarda sinab ko'rdim." },
        { period: '2025 — hozir',  title: 'Ochiq manba',                  org: 'GitHub',                 desc: "Loyihalarni GitHub'da ochiq-manba qilib joylashtirdim. Kod sifati, README yozish va versiya boshqaruvi bo'yicha ko'nikma orttirdim." },
      ],
    },

    blog: {
      eyebrow: 'Bilim ulashish',
      title: 'Maqolalar va blog',
      subtitle: "Dasturlash dunyosidagi yangiliklar, tajribalarim va o'rganganlarimni LinkedIn'da ulashaman.",
      read: "O'qish",
      follow: "LinkedIn'da kuzatish",
      readTime: 'daqiqa',
      posts: [
        { title: 'Frontend evolyutsiyasi: Rust asosidagi kelajak',  description: "Frontend ekotizimi Rust asosidagi bundlerlar (Rspack, Biome, Oxc) bilan yangi tezlik bosqichiga o'tmoqda." },
        { title: 'React 19 — nima yangi keldi?',                   description: 'React 19 ning asosiy yangiliklari: Actions, useOptimistic, use() hook va Server Components yaxshilanishlari.' },
        { title: "Tailwind CSS v4 — o'yin qoidalarini o'zgartirdi", description: "Tailwind v4 bilan konfiguratsiya CSS ichida bo'ldi, JIT yanada tezlashdi va yangi utility classlar qo'shildi." },
        { title: 'Framer Motion — animatsiya sirlari',              description: 'Framer Motion v12 bilan scroll-driven animatsiyalar, layout animations va gesture handling.' },
        { title: 'Vite 7 — ultra tez build vositasi',              description: "Vite 7 ning yangi funksiyalari, Rollup 4 integratsiyasi va React 19 bilan ishlash bo'yicha amaliyotlar." },
        { title: 'Mobile-first dizayn: nima uchun muhim?',         description: "Sayt trafikining katta qismi mobildan keladi. Mobile-first yondashuv va responsive patternlar." },
      ],
      dates:      ['15-mart, 2026', '28-fevral, 2026', '10-fevral, 2026', '22-yanvar, 2026', '5-yanvar, 2026', '18-dekabr, 2025'],
      categories: ['JavaScript', 'React', 'CSS', 'Animatsiya', 'Vositalar', 'Dizayn'],
    },

    contact: {
      eyebrow: 'Suhbatlashamiz',
      title: 'Aloqa uchun',
      subtitle: 'Loyiha, hamkorlik yoki shunchaki salom uchun murojaat qiling. Javob beraman!',
      formTitle: 'Xabar yuboring',
      name: 'Ismingiz',
      email: 'Email manzilingiz',
      message: 'Xabaringiz...',
      send: 'Yuborish',
      sending: 'Yuborilmoqda...',
      success: 'Xabar muvaffaqiyatli yuborildi!',
      error: 'Xatolik yuz berdi. Qayta urining.',
      connect: "Bog'lanish",
      info: { location: "O'zbekiston, Toshkent", timezone: 'UTC+5 (UZT)', open: 'Ish uchun ochiq' },
      telegramMsg: '🚀 *Yangi xabar!*\n\n👤 *Ism:* {name}\n📧 *Email:* {email}\n💬 *Xabar:*\n{message}',
    },

    footer: {
      tagline: 'Zamonaviy, chiroyli va tez veb-ilovalar yaratuvchi frontend dasturchi.',
      pages: 'Sahifalar',
      contact: 'Aloqa',
      rights: 'Barcha huquqlar himoyalangan.',
      built: 'Yaratildi',
      with: 'bilan',
    },

    common: { github: 'GitHub', liveDemo: 'Jonli demo', name: 'Mirkarim Bahodirovich' },
    theme: { light: "Yorug' rejim", dark: "Qorong'u rejim", toggle: 'Rejimni almashtirish' },
  },

  // ─────────────────── RUSSIAN ───────────────────
  ru: {
    nav: {
      home: 'Главная', about: 'Обо мне', skills: 'Навыки',
      projects: 'Проекты', experience: 'Опыт', blog: 'Блог',
      contact: 'Контакты', cta: 'Связаться',
    },
    hero: {
      badge: 'Открыт к работе',
      positioning: 'Junior Frontend Developer, специализирующийся на создании современных, адаптивных и удобных веб-интерфейсов.',
      bio: 'Превращаю идеи в {beautiful}, {fast} и {comfortable} интерфейсы, подходя к каждому проекту с инженерным мышлением.',
      beautiful: 'красивые', fast: 'быстрые', comfortable: 'удобные',
      ctaProjects: 'Смотреть проекты', ctaContact: 'Контакты', scroll: 'Вниз',
      stats: { experience: 'Лет опыта', projects: 'Проектов', quality: 'Качество' },
      typeSequence: ['Frontend Developer', 'React & Next.js', 'Внимание к деталям', 'Tailwind CSS'],
    },
    about: {
      eyebrow: 'Знакомство', title: 'Обо мне', whoAmI: 'Кто я?',
      highlight: 'современный и интуитивный',
      bio1: 'Мне нравится превращать идеи в адаптивные и интерактивные интерфейсы. Сейчас сосредоточен на углублении навыков frontend-разработки, создании реальных проектов и формировании {highlight} пользовательского опыта.',
      bio2: 'В каждом проекте меня удовлетворяет не только красивый внешний вид, но и чистый код, компонентная архитектура и долгосрочные решения.',
      journey: 'Мой путь', role: 'Frontend Developer',
      facts: {
        location:   { label: 'Локация',    value: 'Узбекистан, Ташкент' },
        experience: { label: 'Опыт',       value: '2+ года frontend'    },
        energy:     { label: 'Топливо',    value: 'Кофе + код'          },
        stack:      { label: 'Стек',       value: 'React + Tailwind'    },
        goal:       { label: 'Цель',       value: 'Senior Developer'    },
        hobby:      { label: 'Хобби',      value: 'UI/UX дизайн'        },
      },
      timeline: [
        { year: '2023', title: 'Начало frontend',            desc: 'Изучил основы HTML, CSS, JavaScript. Создал первые статичные страницы и лейауты.' },
        { year: '2024', title: 'React & современный стек',   desc: 'React, Tailwind CSS, Framer Motion, Git/GitHub — компонентная архитектура.' },
        { year: '2025', title: 'Next.js & TypeScript',       desc: 'Next.js App Router, TypeScript, REST API интеграция. Паттерны SSR/SSG.' },
        { year: '2026', title: 'Engineering depth',          desc: 'Performance, чистый код и реальные проекты — углубляю инженерные навыки.' },
      ],
    },
    skills: {
      eyebrow: 'Стек', title: 'Мои навыки',
      categories: { languages: 'Языки', frameworks: 'Фреймворки', tools: 'Инструменты', other: 'Другие навыки' },
    },
    projects: {
      eyebrow: 'Портфолио', title: 'Мои проекты',
      subtitle: 'В каждом проекте я решал реальные задачи — ниже видно, что создал и как мыслил.',
      detail: 'Подробнее', comingSoon: 'Скоро', allProjects: 'Все проекты',
      badges: { featured: 'Избранное', new: 'Новый', openSource: 'Open Source' },
      challengeLabel: 'Сложность', solutionLabel: 'Решение',
      items: [
        {
          title: 'Магазин игрушек',
          description: 'Современный e-commerce интерфейс с адаптивным UI, фильтрацией и плавным опытом покупок.',
          challenge:  'Отображение большого каталога без потери производительности и сохранение состояния корзины.',
          solution:   'Компонентная архитектура React и грамотное управление состоянием для масштабируемости.',
          longDesc:   'React + Tailwind CSS. Каталог, корзина, фильтры и адаптивный дизайн — каждый компонент написан для повторного использования.',
        },
        {
          title: 'Город еды',
          description: 'Интерфейс ресторана и продуктового магазина, ориентированный на быстрое управление данными.',
          challenge:  'Интуитивное меню с множеством категорий, удобное на мобильных устройствах.',
          solution:   'Mobile-first подход и чёткое разделение компонентов для независимой быстрой загрузки.',
          longDesc:   'JavaScript + Vite. Меню ресторана, оформление заказа, панель администратора — чистый UI и понятная иерархия данных.',
        },
        {
          title: 'Сайт-портфолио',
          description: 'Личное портфолио с плавными анимациями, адаптивными лейаутами и современными практиками frontend.',
          challenge:  'Сохранить PageSpeed 90+ с анимациями Framer Motion и достичь CLS = 0.',
          solution:   'Lazy loading, WebP, code splitting и оптимизации will-change для баланса производительности и качества.',
          longDesc:   'React 19, Framer Motion v12, Tailwind CSS v4, Vite 8. Мультиязычность, dark/light, lazy sections, WebP оптимизация.',
        },
      ],
    },
    experience: {
      eyebrow: 'Путь', title: 'Мой опыт', scrollHint: '← прокрутите →',
      stats: { experience: 'Лет опыта', projects: 'Проектов', tech: 'Технологий', motivation: 'Мотивация' },
      cards: [
        { period: '2023 — сейчас', title: 'Самообучение',               org: 'Онлайн-платформы',   desc: 'YouTube, Udemy, freeCodeCamp — HTML, CSS, JavaScript, React, Next.js. Ежедневная практика.' },
        { period: '2024 — сейчас', title: 'Freelance Frontend Developer', org: 'Независимо',         desc: 'Адаптивные сайты и лендинги для клиентов. React + Tailwind CSS. Работа с дедлайнами и клиентами.' },
        { period: '2024',          title: 'Проект портфолио',            org: 'Личный',             desc: 'Первый полноценный сайт на React + Tailwind. Framer Motion, mobile-first, accessibility.' },
        { period: '2025',          title: 'Next.js & TypeScript',        org: 'Самообучение',       desc: 'Next.js App Router, TypeScript, REST API. SSR/SSG в реальных проектах.' },
        { period: '2025 — сейчас', title: 'Open Source',                 org: 'GitHub',             desc: 'Публичные репозитории, README, контроль версий — культура качественного кода.' },
      ],
    },
    blog: {
      eyebrow: 'Делюсь знаниями', title: 'Статьи и блог',
      subtitle: 'Делюсь новостями разработки, опытом и знаниями в LinkedIn.',
      read: 'Читать', follow: 'Подписаться в LinkedIn', readTime: 'мин',
      posts: [
        { title: 'Эволюция Frontend: будущее на Rust',    description: 'Bundler\'ы на Rust (Rspack, Biome, Oxc) — новый уровень скорости.' },
        { title: 'React 19 — что нового?',               description: 'Actions, useOptimistic, хук use() и улучшения Server Components.' },
        { title: 'Tailwind CSS v4 — меняет правила',     description: 'Конфигурация в CSS, JIT быстрее, новые utility-классы.' },
        { title: 'Framer Motion — секреты анимации',     description: 'Scroll-driven, layout animations, gesture handling — v12.' },
        { title: 'Vite 7 — ультрабыстрый сборщик',      description: 'Новые функции, Rollup 4, лучшие практики с React 19.' },
        { title: 'Mobile-first дизайн: почему важен?',  description: 'Mobile-first подход и responsive-паттерны для большинства трафика.' },
      ],
      dates:      ['15 марта 2026', '28 февраля 2026', '10 февраля 2026', '22 января 2026', '5 января 2026', '18 декабря 2025'],
      categories: ['JavaScript', 'React', 'CSS', 'Анимация', 'Инструменты', 'Дизайн'],
    },
    contact: {
      eyebrow: 'Поговорим', title: 'Связаться со мной',
      subtitle: 'Напишите по проекту, сотрудничеству или просто поздороваться. Отвечу!',
      formTitle: 'Отправить сообщение', name: 'Ваше имя', email: 'Ваш email',
      message: 'Ваше сообщение...', send: 'Отправить', sending: 'Отправка...',
      success: 'Сообщение успешно отправлено!', error: 'Произошла ошибка. Попробуйте снова.',
      connect: 'Связаться',
      info: { location: 'Узбекистан, Ташкент', timezone: 'UTC+5 (UZT)', open: 'Открыт к работе' },
      telegramMsg: '🚀 *Новое сообщение!*\n\n👤 *Имя:* {name}\n📧 *Email:* {email}\n💬 *Сообщение:*\n{message}',
    },
    footer: {
      tagline: 'Frontend-разработчик, создающий современные, красивые и быстрые веб-приложения.',
      pages: 'Страницы', contact: 'Контакты', rights: 'Все права защищены.', built: 'Создано', with: 'с',
    },
    common: { github: 'GitHub', liveDemo: 'Демо', name: 'Миркарим Баходирович' },
    theme: { light: 'Светлая тема', dark: 'Тёмная тема', toggle: 'Сменить тему' },
  },

  // ─────────────────── ENGLISH ───────────────────
  en: {
    nav: {
      home: 'Home', about: 'About', skills: 'Skills',
      projects: 'Projects', experience: 'Experience', blog: 'Blog',
      contact: 'Contact', cta: 'Get in touch',
    },
    hero: {
      badge: 'Open to work',
      positioning: 'Junior Frontend Developer focused on building modern, responsive and user-friendly web experiences.',
      bio: 'I turn ideas into {beautiful}, {fast} and {comfortable} interfaces, approaching every project with an engineering mindset.',
      beautiful: 'beautiful', fast: 'fast', comfortable: 'user-friendly',
      ctaProjects: 'View projects', ctaContact: 'Contact', scroll: 'Scroll',
      stats: { experience: 'Years experience', projects: 'Projects', quality: 'Quality' },
      typeSequence: ['Frontend Developer', 'React & Next.js', 'Detail-oriented', 'Tailwind CSS'],
    },
    about: {
      eyebrow: 'Introduction', title: 'About me', whoAmI: 'Who am I?',
      highlight: 'modern and intuitive',
      bio1: 'I enjoy turning ideas into responsive and interactive interfaces. Currently focused on improving my frontend engineering skills, building real-world projects and creating user experiences that feel {highlight}.',
      bio2: 'In every project, I care not just about clean visuals — but about clean code, component architecture and solutions that scale.',
      journey: 'My journey', role: 'Frontend Developer',
      facts: {
        location:   { label: 'Location',   value: 'Uzbekistan, Tashkent' },
        experience: { label: 'Experience', value: '2+ years frontend'    },
        energy:     { label: 'Fuel',       value: 'Coffee + code'        },
        stack:      { label: 'Stack',      value: 'React + Tailwind'     },
        goal:       { label: 'Goal',       value: 'Senior Developer'     },
        hobby:      { label: 'Hobby',      value: 'UI/UX design'         },
      },
      timeline: [
        { year: '2023', title: 'Started frontend',          desc: 'HTML, CSS, JavaScript fundamentals. Built first static pages and layouts.' },
        { year: '2024', title: 'React & modern stack',      desc: 'React, Tailwind CSS, Framer Motion, Git/GitHub — component-driven architecture.' },
        { year: '2025', title: 'Next.js & TypeScript',      desc: 'Next.js App Router, TypeScript, REST API integration. SSR/SSG patterns.' },
        { year: '2026', title: 'Engineering depth',         desc: 'Performance, clean code and real projects — deepening frontend engineering skills.' },
      ],
    },
    skills: {
      eyebrow: 'Stack', title: 'My skills',
      categories: { languages: 'Languages', frameworks: 'Frameworks', tools: 'Tools', other: 'Other skills' },
    },
    projects: {
      eyebrow: 'Portfolio', title: 'My projects',
      subtitle: 'Each project solved a real problem — here you can see what I built and how I thought about it.',
      detail: 'Details', comingSoon: 'Coming soon', allProjects: 'All projects',
      badges: { featured: 'Featured', new: 'New', openSource: 'Open Source' },
      challengeLabel: 'Challenge', solutionLabel: 'Solution',
      items: [
        {
          title: 'Toys Store',
          description: 'Modern ecommerce experience with responsive UI, product filtering and smooth product browsing.',
          challenge:  'Rendering a large product catalog without performance loss and persisting cart state across the app.',
          solution:   'Component-driven React architecture with clean state management for scalability and maintainability.',
          longDesc:   'Built with React + Tailwind CSS. Product catalog, cart system, filters and responsive layout — every component written for reuse.',
        },
        {
          title: 'Food Town',
          description: 'Restaurant and food store interface focused on fast data management and clean user experience.',
          challenge:  'Making a multi-category menu intuitive on mobile while keeping the order flow simple and clear.',
          solution:   'Mobile-first approach with clear component separation, so each view loads independently and fast.',
          longDesc:   'JavaScript + Vite. Restaurant menu catalog, order flow and admin panel — clean UI with intentional data hierarchy.',
        },
        {
          title: 'Portfolio site',
          description: 'Personal portfolio crafted with smooth animations, responsive layouts and modern frontend practices.',
          challenge:  'Keeping PageSpeed 90+ with Framer Motion animations while achieving CLS = 0 throughout.',
          solution:   'Lazy loading, WebP images, code splitting and will-change optimizations to balance performance and visual quality.',
          longDesc:   'React 19, Framer Motion v12, Tailwind CSS v4, Vite 8. Multi-language (UZ/RU/EN), dark/light mode, lazy-loaded sections and WebP image optimization.',
        },
      ],
    },
    experience: {
      eyebrow: 'Journey', title: 'My experience', scrollHint: '← swipe →',
      stats: { experience: 'Years experience', projects: 'Projects', tech: 'Technologies', motivation: 'Motivation' },
      cards: [
        { period: '2023 — present', title: 'Self-learning',               org: 'Online platforms', desc: 'YouTube, Udemy, freeCodeCamp — HTML, CSS, JavaScript, React, Next.js. Daily practice to reinforce theory.' },
        { period: '2024 — present', title: 'Freelance Frontend Developer', org: 'Independent',      desc: 'Responsive websites and landing pages for clients. React + Tailwind CSS. Meeting deadlines and client collaboration.' },
        { period: '2024',           title: 'Portfolio project',            org: 'Personal',         desc: 'First full React + Tailwind site. Framer Motion, mobile-first design, accessibility standards.' },
        { period: '2025',           title: 'Next.js & TypeScript',         org: 'Self-learning',    desc: 'Next.js App Router, TypeScript, REST API. SSR/SSG patterns in real projects.' },
        { period: '2025 — present', title: 'Open Source',                  org: 'GitHub',           desc: 'Public repos, README documentation and version control — building a culture of quality code.' },
      ],
    },
    blog: {
      eyebrow: 'Knowledge sharing', title: 'Articles & blog',
      subtitle: 'I share development news, experiences and learnings on LinkedIn.',
      read: 'Read', follow: 'Follow on LinkedIn', readTime: 'min',
      posts: [
        { title: 'Frontend evolution: Rust-powered future',  description: 'Rust-based bundlers (Rspack, Biome, Oxc) are pushing the ecosystem to new speed levels.' },
        { title: 'React 19 — what\'s new?',                 description: 'Actions, useOptimistic, use() hook and Server Components improvements.' },
        { title: 'Tailwind CSS v4 — game changer',          description: 'Config lives in CSS, JIT is faster, new utility classes added.' },
        { title: 'Framer Motion — animation secrets',       description: 'Scroll-driven, layout animations and gesture handling in v12.' },
        { title: 'Vite 7 — ultra-fast build tool',          description: 'New features, Rollup 4 integration and best practices with React 19.' },
        { title: 'Mobile-first design: why it matters',     description: 'Mobile-first approach and responsive patterns for the majority of traffic.' },
      ],
      dates:      ['March 15, 2026', 'February 28, 2026', 'February 10, 2026', 'January 22, 2026', 'January 5, 2026', 'December 18, 2025'],
      categories: ['JavaScript', 'React', 'CSS', 'Animation', 'Tooling', 'Design'],
    },
    contact: {
      eyebrow: "Let's talk", title: 'Get in touch',
      subtitle: 'Reach out for a project, collaboration or just to say hello. I will reply!',
      formTitle: 'Send a message', name: 'Your name', email: 'Your email',
      message: 'Your message...', send: 'Send', sending: 'Sending...',
      success: 'Message sent successfully!', error: 'Something went wrong. Please try again.',
      connect: 'Connect',
      info: { location: 'Uzbekistan, Tashkent', timezone: 'UTC+5 (UZT)', open: 'Open to work' },
      telegramMsg: '🚀 *New message!*\n\n👤 *Name:* {name}\n📧 *Email:* {email}\n💬 *Message:*\n{message}',
    },
    footer: {
      tagline: 'Frontend developer creating modern, beautiful and fast web applications.',
      pages: 'Pages', contact: 'Contact', rights: 'All rights reserved.', built: 'Built', with: 'with',
    },
    common: { github: 'GitHub', liveDemo: 'Live demo', name: 'Mirkarim Bahodirovich' },
    theme: { light: 'Light mode', dark: 'Dark mode', toggle: 'Toggle theme' },
  },
}

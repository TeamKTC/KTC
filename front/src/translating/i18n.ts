import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uk: {
    translation: {
      forAll: {
        save: "Зберегти",
        cancel: "Скасувати",
        settings: "Налаштування",
        security: "Безпека",
        password: "Пароль",
        saveChanges: "Зберегти зміни",
        personalCabinet: "Особистий кабінет",
        personalData: "Персональні дані",
        loading: "Завантаження...",
        failedToLoad: "Не вдалося завантажити дані користувача",
        main: "Головна",
        failedToLoadProducts: "Не вдалося завантажити товари",
        recommendedProducts: "Рекомендовані товари",
        recommendedCategories: "Рекомендовані категорії",
        failedToLoadCategories: "Не вдалося завантажити категорії",
        failedToLoadBrands: "Не вдалося завантажити бренди",
        brand: "Бренд"

      },
      main: {
        hero: {
          title: "Техніка, яка",
          titleF: "працює для вас",
          subtitle: "Обирайте сучасні гаджети з<br/>гарантією якості та швидкою<br/>доставкою по Україні",
          catalogBtn: "Перейти до каталогу",
          newArrivalsBtn: "Новинки",
          badgeOfficial: "Офіційна продукція",
          badgeWarranty: "Гарантія від виробника",
          badgeReturn: "Легке повернення",
          promo1Title: "Знижки до -20%<br /> на ноутбуки",
          promo2Title: "Аксесуари зі<br />знижкою",
          promo3Title: "Розстрочка до<br />24 місяців!",
          moreDetails: "Детальніше"
        },
        guideBanner: {
          title: "Як обрати ідеальний<br />ноутбук у 2026 році",
          subtitle: "Покроковий гайд для роботи,<br /> навчання та розваг. Поради<br /> експертів PixelRoom.",
          readGuideBtn: "Читати гайд",
          installmentTitle: "Покупка частинами до<br /> 10 платежів",
          installmentDesc: "Оформлюйте онлайн<br /> без довідок та передплат.",
          freeDeliveryTitle: "Безкоштовна доставка<br /> від 2 000 грн",
          freeDeliveryDesc: "Швидка доставка по Україні <br />та зручні способи оплати",
          supportTitle: "Підтримка 24/7",
          supportDesc: "Ми завжди на зв'язку <br />та готові допомогти",
          moreDetails: "Детальніше"
        },
        sections: {
          recommended: "Рекомендовані товари",
          viewAll: "Переглянути всі",
          categories: "Категорії",
          bestsellers: "Хіт продажів",
          brands: "Бренди",
          pickedForYou: "Підібрано для вас"
        },
        curated: {
          workTitle: "Для роботи<br /> та навчання",
          workDesc: "Надійні пристрої <br />для продуктивності",
          peripheralsTitle: "Периферія<br /> для комфорту",
          peripheralsDesc: "Клавіатура, миші, <br />килимки та інше",
          gamersTitle: "Для геймерів",
          gamersDesc: "Максимальна швидкість<br /> та повне занурення",
          homeTitle: "Для дому",
          homeDesc: "Техніка, <br />яка спрощує побут",
          smartTitle: "Смарт-пристрої",
          smartDesc: "Все для розумного дому<br /> в одному місці",
          moreDetails: "Детальніше",
          view: "Переглянути"
        },
        bottomBar: {
          fastDelivery: "Швидка доставка",
          officialWarranty: "Офіційна гарантія",
          easyReturn: "14 днів на повернення",
          convenientPayment: "Зручна оплата",
          support247: "Підтримка 24/7"
        }
      },
      settings: {
          personalSettings: {
            title: "Особисті налаштування",
            currency: "Валюта",
            currencyUah: "Українська гривня (₴)",
            currencyUsd: "Долар США ($)",
            language: "Мова",
            theme: "Тема інтерфейсу",
            themeLight: "Світла",
            themeDark: "Темна",
            
          },
          privacy: {
            title: "Конфіденційність",
            savedCardsTitle: "Збережені картки",
            savedCardsDesc: "Керування збереженими платіжними картками",
            manageCards: "Керувати картками",
            personalizationTitle: "Персоналізація",
            personalizationDesc: "Налаштування рекомендацій та персональних даних",
            dataManagementTitle: "Керування даними",
            dataManagementDesc: "Завантажити або видалити персональні дані",
            download: "Завантажити",
            deleteAccount: "Видалити акаунт"
        },
        notifications: {
          title: "Сповіщення",
          emailTitle: "Email повідомлення",
          emailDesc: "Отримувати важливі повідомлення на email",
          smsTitle: "SMS повідомлення",
          smsDesc: "Отримувати SMS про замовлення та акції",
          bonusTitle: "Бонусні сповіщення",
          bonusDesc: "Інформувати про нарахування бонусів",
          promosTitle: "Акції та новини",
          promosDesc: "Отримувати інформацію про знижки та акції",
          orderStatusTitle: "Статус замовлення",
          orderStatusDesc: "Інформувати про зміну статусу замовлення",
        },
        security: {
          lastChange: "Остання зміна: ",
          changePassword: "Змінити пароль",
          activeDevicesTitle: "Активні пристрої",
          activeDevicesDesc: "Керування пристроями, на яких здійснено вхід",
          currentSession: "Поточний сеанс",
          logoutAll: "Вийти з усіх пристроїв",
        },
      },
      profile: {
        sidebar: {
          bonusBalanceTitle: "Бонусний баланс",
          bonusCount: " бонусів",
          bonusRate: "1 бонус = 1 грн",
          myProfile: "Мій профіль",
          myOrders: "Мої замовлення",
          favorites: "Обране",
          deliveryAddresses: "Адреси доставки",
          bonuses: "Бонуси",
          settings: "Налаштування",
          logout: "Вийти"
        },
        
        footerBenefits: {
          deliveryTitle: "Доставка",
          deliveryDesc1: "По Україні 1-3 дні",
          deliveryDesc2: "Самовивіз з магазинів",
          paymentTitle: "Оплата",
          paymentDesc1: "Готівкою, карткою онлайн або",
          paymentDesc2: "частинами до 10 платежів",
          warrantyTitle: "Гарантія",
          warrantyDesc1: "12 місяців офіційної гарантії",
          warrantyDesc2: "Apple",
          returnTitle: "Повернення",
          returnDesc1: "14 днів на повернення",
          returnDesc2: "товару"
        },
        bonusHistory: {
          title: "Мої замовлення",
          viewAll: "Переглянути всі",
          orderNumber: "№ замовлення",
          date: "Дата",
          status: "Статус",
          amount: "Сума"
        },
        securityProfile: {
          title: "Безпека та паролі",
          subtitle: "Рекомендуємо змінювати пароль кожні 3-6 місяців.",
          changePassword: "Змінити пароль",
          twoFactorTitle: "Двоетапна перевірка",
          twoFactorNotActive: "Не активовано",
          twoFactorActive: "Активовано"
        },
        bonusCard: {
          title: "Бонусна програма",
          subtitle: "Ваш бонусний баланс",
          bonusCount: " бонусів",
          infoText: "Накопичуйте бонуси за покупки та використовуйте їх для оплати {{percent}}% вартості замовлення",
          recentTransactions: "Останні операції",
          allOperations: "Всі операції з бонусами"
        },
      },
      navbar: {
        admin: "Адмін",
        topBar: {
          city: "Місто",
          deliveryAndPayment: "Доставка і оплата",
          support: "Підтримка",
          warranty: "Гарантія",
          aboutUs: "Про нас",
          store: "Магазин"
        },
        catalogBtn: "Каталог товарів",
        searchPlaceholder: "Пошук товарів...",
        profile: "Профіль",
        cart: "Кошик",
        favorites: "Обране"
      },
      footer: {
        subscribe: {
          title: "Підписуйся на знижки!",
          subtitle: "Не турбуйся, ми не спамимо",
          placeholder: "Email",
          submitBtn: "Відправити"
        },
        catalogTitle: "Каталог товарів",
        onlineStore: {
          title: "Інтернет-магазин",
          aboutUs: "Про нас",
          promotions: "Акції",
          warranty: "Гарантії",
          delivery: "Доставка",
          payment: "Оплата",
          contacts: "Контакти",
          store: "Магазин",
          privacyPolicy: "Політика конфіденційності",
          blackFriday: "Black Friday"
        },
        service: {
          title: "Сервіс",
          warrantyService: "Гарантійне обслуговування",
          appleAuthorization: "Авторизація Apple"
        },
        callCenter: {
          title: "Call-центр",
          schedule: "Call-центр працює по буднях з 9:00 до 20:00 <br />та у вихідні з 9:00 до 20:00",
          y: "Мережа магазинів PixelRoom™ 2002-2026. Всі права захищені."
        }
      },
      productDetails: {
        askQuestion: "Поставити запитання",
        inStock: "В наявності",
        outOfStock: "Немає в наявності",
        deliveryTime: "Доставка 1-3 дні",
        bonus: "бонусів",
        bonusesForPurchase: "на вашу покупку",
        quantity: "Кількість:",
        addToCart: "Додати в кошик",
        buyOneClick: "Купити в 1 клік",
        addToFavorites: "Додати в обране",
        compare: "Порівняти",
        viewAllSpecs: "Дивитися всі характеристики",
        tabs: {
          description: "Опис",
          specifications: "Характеристики"
        },
        reviews: {
          title: "Відгуки",
          basedOn: "на основі {{count}} відгуків",
          writeReview: "Написати відгук"
        },
        similarProducts: "Схожі товари"
      },
    }
  },
  en: {
    translation: {
      forAll: {
          save: "Save",
          cancel: "Cancel",
          settings: "Settings",
          security: "Security",
          password: "Password",
          saveChanges: "Save changes",
          personalCabinet: "Personal cabinet",
          personalData: "Personal data",
          loading: "Loading...",
          failedToLoad: "Failed to load user data",
          main: "Main",
          failedToLoadProducts: "Failed to load products",
          recommendedProducts: "Recommended products",
          recommendedCategories: "Recommended categories",
          failedToLoadCategories: "Failed to load categories",
          failedToLoadBrands: "Failed to load brands",
          brand: "Brand"
      },
      main: {
        hero: {
          title: "Technology that",
          titleF: "works for you",
          subtitle: "Choose modern gadgets with<br/>quality warranty and fast<br/>delivery across Ukraine",
          catalogBtn: "Go to catalog",
          newArrivalsBtn: "New arrivals",
          badgeOfficial: "Official products",
          badgeWarranty: "Manufacturer warranty",
          badgeReturn: "Easy return",
          promo1Title: "Discounts up to -20%<br />on laptops",
          promo2Title: "Discounted accessories",
          promo3Title: "Installments up to<br />24 months!",
          moreDetails: "Learn more"
        },
        guideBanner: {
          title: "How to choose the ideal<br />laptop in 2026",
          subtitle: "A step-by-step guide for work, <br />study, and entertainment. Expert advice<br />from PixelRoom.",
          readGuideBtn: "Read guide",
          installmentTitle: "Purchase in installments up<br /> to 10 payments",
          installmentDesc: "Apply online <br />with no certificates or advance payments.",
          freeDeliveryTitle: "Free delivery on orders<br /> over 2,000 UAH",
          freeDeliveryDesc: "Fast delivery across Ukraine<br /> and convenient payment methods",
          supportTitle: "24/7 Support",
          supportDesc: "We are always online<br /> and ready to help",
          moreDetails: "Learn more"
        },
        sections: {
          recommended: "Recommended products",
          viewAll: "View all",
          categories: "Categories",
          bestsellers: "Bestsellers",
          brands: "Brands",
          pickedForYou: "Picked for you"
        },
        curated: {
          workTitle: "For work<br /> and study",
          workDesc: "Reliable devices<br /> for productivity",
          peripheralsTitle: "Peripherals<br /> for comfort",
          peripheralsDesc: "Keyboards, mice,<br /> pads and more",
          gamersTitle: "For gamers",
          gamersDesc: "Maximum speed <br />and complete immersion",
          homeTitle: "For home",
          homeDesc: "Appliances that simplify<br />everyday life",
          smartTitle: "Smart devices",
          smartDesc: "Everything for a smart home <br />in one place",
          moreDetails: "Learn more",
          view: "View"
        },
        bottomBar: {
          fastDelivery: "Fast delivery",
          officialWarranty: "Official warranty",
          easyReturn: "14 days for returns",
          convenientPayment: "Convenient payment",
          support247: "24/7 Support"
        }
      },
      settings: {
        personalSettings: {
            title: "Personal Settings",
            currency: "Currency",
            currencyUah: "Ukrainian Hryvnia (₴)",
            currencyUsd: "US Dollar ($)",
            language: "Language",
            theme: "Interface Theme",
            themeLight: "Light",
            themeDark: "Dark",
        },
        privacy: {
          title: "Privacy",
          savedCardsTitle: "Saved cards",
          savedCardsDesc: "Manage saved payment cards",
          manageCards: "Manage cards",
          personalizationTitle: "Personalization",
          personalizationDesc: "Recommendations and personal data settings",
          dataManagementTitle: "Data management",
          dataManagementDesc: "Download or delete personal data",
          download: "Download",
          deleteAccount: "Delete account"
        },
        notifications: {
          title: "Notifications",
          emailTitle: "Email notifications",
          emailDesc: "Receive important notifications via email",
          smsTitle: "SMS notifications",
          smsDesc: "Receive SMS about orders and promotions",
          bonusTitle: "Bonus notifications",
          bonusDesc: "Notify about bonus accruals",
          promosTitle: "Promotions and news",
          promosDesc: "Receive information about discounts and promotions",
          orderStatusTitle: "Order status",
          orderStatusDesc: "Notify about order status changes",
        },
        security: {
          lastChange: "Last changed: ",
          changePassword: "Change password",
          activeDevicesTitle: "Active devices",
          activeDevicesDesc: "Manage devices where you are logged in",
          currentSession: "Current session",
          logoutAll: "Log out from all devices"
        },
      },
      profile: {
        sidebar: {
          bonusBalanceTitle: "Bonus balance",
          bonusCount: " bonuses",
          bonusRate: "1 bonus = 1 UAH",
          myProfile: "My profile",
          myOrders: "My orders",
          favorites: "Favorites",
          deliveryAddresses: "Delivery addresses",
          bonuses: "Bonuses",
          settings: "Settings",
          logout: "Log out"
        },
        footerBenefits: {
          deliveryTitle: "Delivery",
          deliveryDesc1: "Across Ukraine 1-3 days",
          deliveryDesc2: "Pickup from stores",
          paymentTitle: "Payment",
          paymentDesc1: "Cash, card online or",
          paymentDesc2: "in installments up to 10 payments",
          warrantyTitle: "Warranty",
          warrantyDesc1: "12 months official warranty from",
          warrantyDesc2: "Apple",
          returnTitle: "Returns",
          returnDesc1: "14 days for product",
          returnDesc2: "returns"
        },
        bonusHistory: {
          title: "My orders",
          viewAll: "View all",
          orderNumber: "Order No.",
          date: "Date",
          status: "Status",
          amount: "Amount"
        },
        securityProfile: {
          title: "Security & Passwords",
          subtitle: "We recommend changing your password every 3-6 months.",
          changePassword: "Change password",
          twoFactorTitle: "Two-step verification",
          twoFactorNotActive: "Not activated",
          twoFactorActive: "Activated"
        },
        bonusCard: {
          title: "Bonus program",
          subtitle: "Your bonus balance",
          bonusCount: " bonuses",
          infoText: "Earn bonuses for purchases and use them to pay up to {{percent}}% of the order value",
          recentTransactions: "Recent transactions",
          allOperations: "All bonus operations"
        }
      },
      navbar: {
        admin: "Admin",
        topBar: {
          city: "City",
          deliveryAndPayment: "Delivery & Payment",
          support: "Support",
          warranty: "Warranty",
          aboutUs: "About Us",
          store: "Store"
        },
        catalogBtn: "Product Catalog",
        searchPlaceholder: "Search products...",
        profile: "Profile",
        cart: "Cart",
        favorites: "Favorites"
      },
      footer: {
        subscribe: {
          title: "Subscribe for discounts!",
          subtitle: "Don't worry, we don't spam",
          placeholder: "Email",
          submitBtn: "Submit"
        },
        catalogTitle: "Product catalog",
        onlineStore: {
          title: "Online store",
          aboutUs: "About us",
          promotions: "Promotions",
          warranty: "Warranties",
          delivery: "Delivery",
          payment: "Payment",
          contacts: "Contacts",
          store: "Store",
          privacyPolicy: "Privacy policy",
          blackFriday: "Black Friday"
        },
        service: {
          title: "Service",
          warrantyService: "Warranty service",
          appleAuthorization: "Apple authorization"
        },
        callCenter: {
          title: "Call center",
          schedule: "Call center is open weekdays from 9:00 to 20:00<br /> and weekends from 9:00 to 20:00",
          y: "PixelRoom™ store network 2002-2026. All rights reserved."
        }
      },
      productDetails: {
        askQuestion: "Ask a question",
        inStock: "In stock",
        outOfStock: "Out of stock",
        deliveryTime: "Delivery 1-3 days",
        bonus: "bonuses",
        bonusesForPurchase: "on your purchase",
        quantity: "Quantity:",
        addToCart: "Add to cart",
        buyOneClick: "Buy in 1 click",
        addToFavorites: "Add to favorites",
        compare: "Compare",
        viewAllSpecs: "View all specifications",
        tabs: {
          description: "Description",
          specifications: "Specifications"
        },
        reviews: {
          title: "Reviews",
          basedOn: "based on {{count}} reviews",
          writeReview: "Write a review"
        },
        similarProducts: "Similar products"
      },
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('app-lang') || 'uk',
  fallbackLng: 'uk',
  interpolation: { escapeValue: false }
});

export default i18n;
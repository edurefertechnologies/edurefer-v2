export const translations = {
  en: {
    dashboard: "Dashboard",
    courses: "Courses",
    savedCourses: "Saved Courses",
    notifications: "Notifications",
    myLearning: "My Learning",
    aiAssistant: "AI Assistant",
    wallet: "Wallet",
    referrals: "Referrals",
    orders: "Orders",
    profile: "Profile",
    settings: "Settings",

    overview: "Overview",
    workspace: "Workspace",
    logout: "Logout",
  },

  hi: {
    dashboard: "डैशबोर्ड",
    courses: "कोर्स",
    savedCourses: "सेव किए गए कोर्स",
    notifications: "सूचनाएं",
    myLearning: "मेरी पढ़ाई",
    aiAssistant: "AI सहायक",
    wallet: "वॉलेट",
    referrals: "रेफरल",
    orders: "ऑर्डर",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",

    overview: "अवलोकन",
    workspace: "कार्यस्थल",
    logout: "लॉग आउट",
  },

  mr: {
    dashboard: "डॅशबोर्ड",
    courses: "कोर्सेस",
    savedCourses: "सेव्ह केलेले कोर्सेस",
    notifications: "सूचना",
    myLearning: "माझे शिक्षण",
    aiAssistant: "AI सहाय्यक",
    wallet: "वॉलेट",
    referrals: "रेफरल",
    orders: "ऑर्डर्स",
    profile: "प्रोफाइल",
    settings: "सेटिंग्ज",

    overview: "आढावा",
    workspace: "वर्कस्पेस",
    logout: "लॉग आउट",
  },
} as const;

export type Language = keyof typeof translations;

export type TranslationKey =
  keyof typeof translations.en;
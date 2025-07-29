import { createContext, useContext, useState, useEffect } from "react";

type Language = "fr" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.providers": "Prestataires",
    "nav.club_pro": "Club Pro",
    "nav.messages": "Messages",
    "nav.project": "Projets",
    "nav.support": "Support",
    "nav.login": "Connexion",
    "nav.register": "Inscription",
    "nav.contact": "Contact",
    "nav.about": "À propos",
    "nav.profile": "Profil",
    
    // Hero section
    "hero.title": "Trouvez le bon",
    "hero.title_highlight": "prestataire",
    "hero.subtitle": "La première plateforme marocaine qui connecte clients et prestataires de services professionnels",
    "hero.search_placeholder": "Que recherchez-vous ? (ex: plombier, électricien...)",
    "hero.search_button": "Rechercher",
    "hero.location": "Casablanca",
    "hero.city_placeholder": "Ville (ex: Casablanca, Rabat...)",
    "hero.provider_placeholder": "Rechercher un prestataire spécifique (optionnel)",
    
    // Services
    "services.title": "Nos services populaires",
    "services.subtitle": "Découvrez notre large gamme de services professionnels disponibles dans tout le Maroc",
    "services.explore": "Explorer",
    "services.popular": "Services Populaires",
    "services.popular_in": "Services populaires à",
    "services.plumbing": "Plomberie",
    "services.electricity": "Électricité",
    "services.cleaning": "Ménage",
    "services.gardening": "Jardinage",
    "services.painting": "Peinture",
    "services.repair": "Réparation",
    "services.installation": "Installation",
    "services.deep_cleaning": "Nettoyage approfondi",
    "services.moving": "Déménagement",
    
    // How it works
    "how_it_works.title": "Comment ça marche ?",
    "how_it_works.subtitle": "Trouvez le bon prestataire en 3 étapes simples",
    "how_it_works.step1": "1. Recherchez",
    "how_it_works.step1_desc": "Décrivez votre besoin et votre localisation",
    "how_it_works.step2": "2. Comparez",
    "how_it_works.step2_desc": "Consultez les profils et avis des prestataires",
    "how_it_works.step3": "3. Contactez",
    "how_it_works.step3_desc": "Échangez directement et planifiez votre service",
    
    // Providers
    "providers.title": "Prestataires Vérifiés",
    "providers.subtitle": "Découvrez nos prestataires Club Pro vérifiés et hautement qualifiés",
    "providers.club_pro_badge": "Club Pro Vérifié",
    "providers.online": "En ligne",
    "providers.contact": "Contacter",
    "providers.reviews": "avis",
    
    // Chat
    "chat.title": "Messagerie Instantanée",
    "chat.subtitle": "Communiquez directement avec vos prestataires grâce à notre système de messagerie temps réel avec appels audio et vidéo intégrés.",
    "chat.features.realtime": "Messages en temps réel",
    "chat.features.calls": "Appels audio et vidéo",
    "chat.features.files": "Partage de fichiers sécurisé",
    "chat.input_placeholder": "Tapez votre message...",
    
    // Club Pro
    "club_pro.title": "Rejoignez l'Élite des Prestataires",
    "club_pro.subtitle": "Accédez à des fonctionnalités premium et augmentez votre visibilité avec notre programme Club Pro vérifié",
    "club_pro.home_subtitle": "Accédez aux projets de grandes ampleurs et bénéficiez d'avantages exclusifs pour seulement 50 DH/mois.",
    "club_pro.cta": "Devenir Club Pro",
    "club_pro.join_cta": "Devenir Club Pro - 50 DH/mois",
    "club_pro.badge_benefit": "Badge Club Pro pour se démarquer",
    "club_pro.priority_benefit": "Priorité dans les résultats de recherche",
    "club_pro.support_benefit": "Support dédié aux prestataires Club Pro",
    "club_pro.exclusive_access": "🏆 ACCÈS EXCLUSIF",
    "club_pro.large_projects": "Projets de grandes ampleurs réservés aux Club Pro",
    "club_pro.verification.title": "Vérification Complète",
    "club_pro.verification.desc": "Documents professionnels vérifiés : patente, RC, assurance et reconnaissance faciale",
    "club_pro.visibility.title": "Visibilité Premium",
    "club_pro.visibility.desc": "Apparaissez en tête des résultats de recherche avec un badge Club Pro distinctif",
    "club_pro.trust.title": "Confiance Renforcée",
    "club_pro.trust.desc": "Gagnez la confiance des clients avec votre statut vérifié et vos garanties étendues",
    "club_pro.verification_24h": "Vérification en 24h",
    "club_pro.priority_support": "Support prioritaire",
    "club_pro.premium_badge": "Badge premium",
    "club_pro.why_choose": "Pourquoi Choisir Club Pro ?",
    "club_pro.join_elite": "Rejoignez l'élite des prestataires et multipliez vos opportunités",
    "club_pro.benefit_badge_title": "Badge Club Pro Distinctif",
    "club_pro.benefit_badge_desc": "Votre profil sera marqué d'un badge premium visible par tous les clients",
    "club_pro.benefit_ranking_title": "Classement Prioritaire",
    "club_pro.benefit_ranking_desc": "Apparaissez en premier dans les résultats de recherche",
    "club_pro.benefit_projects_title": "Accès aux Projets Premium",
    "club_pro.benefit_projects_desc": "Recevez les demandes de projets les plus valorisés",
    "club_pro.benefit_support_title": "Support Client Prioritaire",
    "club_pro.benefit_support_desc": "Assistance dédiée et temps de réponse accéléré",
    "club_pro.pricing_title": "Un seul abonnement, tous les avantages",
    "club_pro.pricing_subtitle": "Rejoignez le Club Pro et accédez aux plus grands projets",
    "club_pro.per_month": "par mois",
    "club_pro.commitment_1_year": "Engagement 1 an",
    "club_pro.join_button": "Rejoindre le Club Pro",
    "club_pro.payment_methods": "Moyens de paiement acceptés",
    
    // Project page
    "project.hero.badge": "Publier un Projet",
    "project.hero.find_the": "Trouvez le",
    "project.hero.ideal_provider": "Prestataire Idéal",
    "project.hero.description": "Décrivez votre projet et recevez des propositions de prestataires qualifiés. Comparez les offres et choisissez le meilleur professionnel pour vos besoins.",
    "project.form.title": "Publier un Nouveau Projet",
    "project.form.project_title": "Titre du Projet",
    "project.form.title_placeholder": "Ex: Installation électrique dans salon",
    "project.form.category": "Catégorie",
    "project.form.category_placeholder": "Choisir une catégorie",
    "project.form.budget": "Budget",
    "project.form.budget_placeholder": "Sélectionner le budget",
    "project.form.location": "Localisation",
    "project.form.location_placeholder": "Ex: Casablanca, Maarif",
    "project.form.deadline": "Délai souhaité",
    "project.form.deadline_placeholder": "Ex: Dans la semaine, Urgent",
    "project.form.description": "Description détaillée",
    "project.form.description_placeholder": "Décrivez votre projet en détail : travaux à effectuer, contraintes, matériel fourni ou non...",
    "project.form.skills": "Compétences recherchées",
    "project.form.skills_placeholder": "Ex: Électricien certifié, expérience domotique",
    "project.form.publishing": "Publication...",
    "project.form.publish_button": "Publier le Projet",
    "project.form.other": "Autre",
    "project.budget.under_500": "Moins de 500 DH",
    "project.budget.500_1000": "500 - 1000 DH",
    "project.budget.1000_2000": "1000 - 2000 DH",
    "project.budget.2000_5000": "2000 - 5000 DH",
    "project.budget.over_5000": "Plus de 5000 DH",
    "project.budget.negotiable": "À négocier",
    "project.toast.success_title": "Projet publié !",
    "project.toast.success_description": "Votre projet a été publié avec succès. Les prestataires vont recevoir des notifications.",
    "project.toast.error_title": "Erreur de publication",
    "project.toast.error_description": "Une erreur s'est produite lors de la publication.",
    "project.how_it_works.title": "Comment ça marche ?",
    "project.how_it_works.step1_title": "Publiez votre projet",
    
    // Search and filters
    "search.suggestions": "Suggestions",
    "search.clear_filters": "Effacer les filtres",
    "search.active_filters": "Filtres actifs",
    "search.search_term": "Recherche",
    "search.service": "Service",
    "search.city": "Ville",
    "search.price": "Prix",
    "search.available": "Disponible",
    "search.club_pro": "Club Pro",
    "search.date": "Date",
    "calendar.available": "Disponible",
    "calendar.unavailable": "Indisponible",
    "calendar.selected": "Sélectionné",
    "calendar.legend": "Légende",
    "project.how_it_works.step1_desc": "Décrivez vos besoins en détail",
    "project.how_it_works.step2_title": "Recevez des propositions",
    "project.how_it_works.step2_desc": "Les prestataires vous contactent",
    "project.how_it_works.step3_title": "Choisissez le meilleur",
    "project.how_it_works.step3_desc": "Comparez et sélectionnez",
    "project.recent.title": "Projets Récents",
    "project.status.completed": "Terminé",
    "project.status.active": "Actif",
    "project.proposals": "propositions",
    "project.examples.ac_installation": "Installation climatisation",
    "project.examples.bathroom_renovation": "Rénovation salle de bain", 
    "project.examples.gardening": "Jardinage et entretien",
    "project.tips.title": "Conseils pour réussir",
    "project.tips.tip1": "Soyez précis dans votre description",
    "project.tips.tip2": "Mentionnez votre budget réaliste",
    "project.tips.tip3": "Ajoutez des photos si nécessaire",
    "project.tips.tip4": "Répondez rapidement aux prestataires",
    
    // Cities
    "cities.casablanca": "Casablanca",
    "cities.rabat": "Rabat",
    "cities.marrakech": "Marrakech",
    
    // Header
    "header.register": "Inscription",
    "header.login": "Connexion",
    "header.language": "Langue",
    "header.sos": "SOS",
    "header.sos_alert": "Service SOS activé - Aide d'urgence en cours",
    
    // Messages page
    "messages.badge": "Messages",
    "messages.title": "Mes Conversations",
    "messages.description": "Communiquez directement avec les prestataires",
    "messages.conversations": "Conversations",
    "messages.no_conversations": "Aucune conversation",
    "messages.start_conversation": "Commencez une conversation",
    "messages.last_message_1": "Le devis sera prêt demain",
    "messages.last_message_2": "Parfait, je confirme pour jeudi",
    "messages.last_message_3": "Photos envoyées",
    
    // Profile page
    "profile.stats.projects": "Projets",
    "profile.stats.rating": "Note",
    "profile.stats.favorites": "Favoris",
    "profile.verified": "Vérifié",
    "profile.member_since": "Membre depuis",
    "profile.account_settings": "Paramètres du compte",
    "profile.menu.edit_profile": "Modifier le profil",
    "profile.menu.edit_profile_desc": "Informations personnelles et photo",
    "profile.menu.verification": "Vérification",
    "profile.menu.verification_desc": "Vérifiez votre identité",
    "profile.menu.payments": "Paiements",
    "profile.menu.payments_desc": "Moyens de paiement et facturation",
    "profile.menu.settings": "Paramètres",
    "profile.menu.settings_desc": "Notifications et préférences",
    
    // Common
    "common.configure": "Configurer",
    "common.search": "Rechercher",
    
    // SOS
    "sos.title": "Service SOS 24/7",
    "sos.subtitle": "Urgences ? Nous Sommes Là !",
    "sos.description": "Accès direct aux numéros d'urgence officiels avec géolocalisation automatique",
    "sos.police": "Police",
    "sos.fire": "Pompiers/SAMU",
    "sos.gendarmerie": "Gendarmerie",
    "sos.call_now": "Appeler Maintenant",
    
    // Testimonials
    "testimonials.title": "Ce que disent nos utilisateurs",
    "testimonials.subtitle": "Des milliers de clients satisfaits nous font confiance",
    
    // Newsletter
    "newsletter.title": "Restez informé avec notre newsletter",
    "newsletter.subtitle": "Inscrivez-vous gratuitement et ne manquez aucune actualité de Khadamat",
    "newsletter.placeholder": "Votre email",
    "newsletter.subscribe": "S'inscrire",
    "newsletter.privacy": "Vos données sont protégées et ne seront jamais partagées",
    
    // Footer
    "footer.tagline": "La plateforme qui connecte les clients aux meilleurs prestataires de services du Maroc.",
    "footer.services": "Services",
    "footer.company": "Entreprise",
    "footer.support": "Support",
    "footer.careers": "Carrières",
    "footer.press": "Presse",
    "footer.partners": "Partenaires",
    "footer.help": "Centre d'aide",
    "footer.faq": "FAQ",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Politique de confidentialité",
    "footer.rights": "Tous droits réservés.",
    "footer.made_in": "Développé avec ❤️ au Maroc",
    
    // Featured Providers
    "featured_providers.title": "Prestataires en Vedette",
    "featured_providers.subtitle": "Découvrez nos meilleurs prestataires sélectionnés selon leur note et leur expérience",
    "featured_providers.verified": "Vérifié",
    "featured_providers.pro": "Pro",
    "featured_providers.reviews": "avis",
    "featured_providers.view_profile": "Voir le profil",
    "featured_providers.view_all": "Voir tous les prestataires",
    
    // Common
    "common.currency": "DH",
    "footer.secure": "Paiements Sécurisés",
    
    // Mobile navigation
    "mobile.home": "Accueil",
    "mobile.search": "Recherche",
    "mobile.post": "Publier",
    "mobile.messages": "Messages",
    "mobile.profile": "Profil",
    
    // Common
    "common.join": "Rejoindre Khadamat",
    "common.loading": "Chargement...",
    "common.error": "Une erreur s'est produite",
    "common.retry": "Réessayer",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.services": "الخدمات",
    "nav.providers": "مقدمو الخدمات",
    "nav.club_pro": "نادي المحترفين",
    "nav.project": "المشاريع",
    "nav.support": "الدعم",
    "nav.login": "تسجيل الدخول",
    "nav.register": "التسجيل",
    "nav.messages": "الرسائل",
    "nav.contact": "اتصل بنا",
    "nav.about": "حول",
    "nav.profile": "الملف الشخصي",
    
    // Hero section
    "hero.title": "ابحث عن",
    "hero.title_highlight": "مقدم الخدمة المناسب",
    "hero.subtitle": "أول منصة مغربية تربط العملاء بمقدمي الخدمات المهنية",
    "hero.search_placeholder": "ماذا تبحث عن؟ (مثل: سباك، كهربائي...)",
    "hero.search_button": "بحث",
    "hero.location": "الدار البيضاء",
    "hero.city_placeholder": "المدينة (مثل: الدار البيضاء، الرباط...)",
    "hero.provider_placeholder": "البحث عن مقدم خدمة محدد (اختياري)",
    
    // Services
    "services.title": "خدماتنا الشائعة",
    "services.subtitle": "اكتشف مجموعتنا الواسعة من الخدمات المهنية المتاحة في جميع أنحاء المغرب",
    "services.explore": "استكشف جميع الخدمات",
    "services.popular": "الخدمات الشائعة",
    "services.popular_in": "الخدمات الشائعة في",
    "services.plumbing": "السباكة",
    "services.electricity": "الكهرباء",
    "services.cleaning": "التنظيف",
    "services.gardening": "البستنة",
    "services.painting": "الدهان",
    "services.repair": "الإصلاح",
    "services.installation": "التركيب",
    "services.deep_cleaning": "التنظيف العميق",
    "services.moving": "النقل",
    
    // How it works
    "how_it_works.title": "كيف يعمل؟",
    "how_it_works.subtitle": "اعثر على مقدم الخدمة المناسب في 3 خطوات بسيطة",
    "how_it_works.step1": "1. ابحث",
    "how_it_works.step1_desc": "صف احتياجك وموقعك",
    "how_it_works.step2": "2. قارن",
    "how_it_works.step2_desc": "راجع ملفات تعريف مقدمي الخدمات وآرائهم",
    "how_it_works.step3": "3. تواصل",
    "how_it_works.step3_desc": "تواصل مباشرة ونسق خدمتك",
    
    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "آلاف العملاء الراضين يثقون بنا",
    
    // Providers
    "providers.title": "مقدمو خدمات معتمدون",
    "providers.subtitle": "اكتشف مقدمي خدمات نادي المحترفين المعتمدين وذوي المؤهلات العالية",
    "providers.club_pro_badge": "نادي المحترفين معتمد",
    "providers.online": "متصل",
    "providers.contact": "اتصل",
    "providers.reviews": "مراجعة",
    
    // Chat
    "chat.title": "المراسلة الفورية",
    "chat.subtitle": "تواصل مباشرة مع مقدمي الخدمات من خلال نظام المراسلة الفورية مع المكالمات الصوتية والمرئية المدمجة.",
    "chat.features.realtime": "رسائل في الوقت الفعلي",
    "chat.features.calls": "مكالمات صوتية ومرئية",
    "chat.features.files": "مشاركة ملفات آمنة",
    "chat.input_placeholder": "اكتب رسالتك...",
    
    // Club Pro
    "club_pro.title": "انضم إلى نخبة مقدمي الخدمات",
    "club_pro.subtitle": "احصل على ميزات مميزة وزد من ظهورك مع برنامج نادي المحترفين المعتمد",
    "club_pro.home_subtitle": "احصل على المشاريع الكبيرة واستفد من المزايا الحصرية مقابل 50 درهم فقط شهرياً.",
    "club_pro.cta": "أصبح محترف نادي",
    "club_pro.join_cta": "انضم لنادي المحترفين - 50 درهم/شهر",
    "club_pro.badge_benefit": "شارة نادي المحترفين للتميز",
    "club_pro.priority_benefit": "الأولوية في نتائج البحث",
    "club_pro.support_benefit": "دعم مخصص لمقدمي خدمات نادي المحترفين",
    "club_pro.exclusive_access": "🏆 وصول حصري",
    "club_pro.large_projects": "المشاريع الكبيرة حصرية لنادي المحترفين",
    "club_pro.verification.title": "التحقق الكامل",
    "club_pro.verification.desc": "المستندات المهنية المعتمدة: البراءة، السجل التجاري، التأمين والتعرف على الوجه",
    "club_pro.visibility.title": "ظهور مميز",
    "club_pro.visibility.desc": "ظهر في أعلى نتائج البحث مع شارة نادي المحترفين المميزة",
    "club_pro.trust.title": "ثقة معززة",
    "club_pro.trust.desc": "اكسب ثقة العملاء مع حالتك المعتمدة والضمانات الممتدة",
    "club_pro.verification_24h": "التحقق خلال 24 ساعة",
    "club_pro.priority_support": "دعم أولوي",
    "club_pro.premium_badge": "شارة مميزة",
    "club_pro.why_choose": "لماذا تختار نادي المحترفين؟",
    "club_pro.join_elite": "انضم إلى نخبة مقدمي الخدمات وضاعف فرصك",
    "club_pro.benefit_badge_title": "شارة نادي المحترفين المميزة",
    "club_pro.benefit_badge_desc": "سيتم وضع علامة على ملفك الشخصي بشارة مميزة مرئية لجميع العملاء",
    "club_pro.benefit_ranking_title": "ترتيب أولوي",
    "club_pro.benefit_ranking_desc": "تظهر أولاً في نتائج البحث",
    "club_pro.benefit_projects_title": "الوصول إلى المشاريع المميزة",
    "club_pro.benefit_projects_desc": "احصل على طلبات المشاريع الأكثر قيمة",
    "club_pro.benefit_support_title": "دعم العملاء الأولوي",
    "club_pro.benefit_support_desc": "مساعدة مخصصة ووقت استجابة متسارع",
    "club_pro.pricing_title": "اشتراك واحد، جميع المزايا",
    "club_pro.pricing_subtitle": "انضم إلى نادي المحترفين واحصل على أكبر المشاريع",
    "club_pro.per_month": "شهرياً",
    "club_pro.commitment_1_year": "التزام لسنة واحدة",
    "club_pro.join_button": "انضم إلى نادي المحترفين",
    "club_pro.payment_methods": "وسائل الدفع المقبولة",
    
    // Project page
    "project.hero.badge": "نشر مشروع",
    "project.hero.find_the": "اعثر على",
    "project.hero.ideal_provider": "مقدم الخدمة المثالي",
    "project.hero.description": "صف مشروعك واحصل على عروض من مقدمي خدمات مؤهلين. قارن العروض واختر أفضل محترف لاحتياجاتك.",
    "project.form.title": "نشر مشروع جديد",
    
    // Search and filters
    "search.suggestions": "اقتراحات",
    "search.clear_filters": "مسح المرشحات",
    "search.active_filters": "المرشحات النشطة",
    "search.search_term": "بحث",
    "search.service": "خدمة",
    "search.city": "مدينة",
    "search.price": "سعر",
    "search.available": "متاح",
    "search.club_pro": "نادي المحترفين",
    "search.date": "تاريخ",
    "calendar.available": "متاح",
    "calendar.unavailable": "غير متاح",
    "calendar.selected": "محدد",
    "calendar.legend": "مفتاح",
    "project.form.project_title": "عنوان المشروع",
    "project.form.title_placeholder": "مثال: تركيب كهرباء في الصالون",
    "project.form.category": "الفئة",
    "project.form.category_placeholder": "اختر فئة",
    "project.form.budget": "الميزانية",
    "project.form.budget_placeholder": "حدد الميزانية",
    "project.form.location": "الموقع",
    "project.form.location_placeholder": "مثال: الدار البيضاء، المعاريف",
    "project.form.deadline": "الموعد المطلوب",
    "project.form.deadline_placeholder": "مثال: خلال الأسبوع، عاجل",
    "project.form.description": "وصف مفصل",
    "project.form.description_placeholder": "صف مشروعك بالتفصيل: الأعمال المطلوبة، القيود، المواد المقدمة أم لا...",
    "project.form.skills": "المهارات المطلوبة",
    "project.form.skills_placeholder": "مثال: كهربائي معتمد، خبرة في المنازل الذكية",
    "project.form.publishing": "جاري النشر...",
    "project.form.publish_button": "نشر المشروع",
    "project.form.other": "أخرى",
    "project.budget.under_500": "أقل من 500 درهم",
    "project.budget.500_1000": "500 - 1000 درهم",
    "project.budget.1000_2000": "1000 - 2000 درهم",
    "project.budget.2000_5000": "2000 - 5000 درهم",
    "project.budget.over_5000": "أكثر من 5000 درهم",
    "project.budget.negotiable": "قابل للتفاوض",
    "project.toast.success_title": "تم نشر المشروع!",
    "project.toast.success_description": "تم نشر مشروعك بنجاح. سيتلقى مقدمو الخدمات إشعارات.",
    "project.toast.error_title": "خطأ في النشر",
    "project.toast.error_description": "حدث خطأ أثناء النشر.",
    "project.how_it_works.title": "كيف يعمل؟",
    "project.how_it_works.step1_title": "انشر مشروعك",
    "project.how_it_works.step1_desc": "صف احتياجاتك بالتفصيل",
    "project.how_it_works.step2_title": "احصل على عروض",
    "project.how_it_works.step2_desc": "مقدمو الخدمات سيتواصلون معك",
    "project.how_it_works.step3_title": "اختر الأفضل",
    "project.how_it_works.step3_desc": "قارن واختر",
    "project.recent.title": "المشاريع الحديثة",
    "project.status.completed": "مكتمل",
    "project.status.active": "نشط",
    "project.proposals": "عروض",
    "project.examples.ac_installation": "تركيب تكييف",
    "project.examples.bathroom_renovation": "تجديد الحمام",
    "project.examples.gardening": "البستنة والصيانة",
    "project.tips.title": "نصائح للنجاح",
    "project.tips.tip1": "كن دقيقاً في وصفك",
    "project.tips.tip2": "اذكر ميزانيتك الواقعية",
    "project.tips.tip3": "أضف صوراً إذا لزم الأمر",
    "project.tips.tip4": "رد بسرعة على مقدمي الخدمات",
    
    // Cities
    "cities.casablanca": "الدار البيضاء",
    "cities.rabat": "الرباط",
    "cities.marrakech": "مراكش",
    
    // Header
    "header.register": "التسجيل",
    "header.login": "تسجيل الدخول",
    "header.language": "اللغة",
    "header.sos": "طوارئ",
    "header.sos_alert": "تم تفعيل خدمة الطوارئ - المساعدة العاجلة قيد التقدم",
    
    // Messages page
    "messages.badge": "الرسائل",
    "messages.title": "محادثاتي",
    "messages.description": "تواصل مباشرة مع مقدمي الخدمات",
    "messages.conversations": "المحادثات",
    "messages.no_conversations": "لا توجد محادثات",
    "messages.start_conversation": "ابدأ محادثة",
    "messages.last_message_1": "العرض سيكون جاهزاً غداً",
    "messages.last_message_2": "ممتاز، أؤكد ليوم الخميس",
    "messages.last_message_3": "تم إرسال الصور",
    
    // Profile page
    "profile.stats.projects": "المشاريع",
    "profile.stats.rating": "التقييم",
    "profile.stats.favorites": "المفضلة",
    "profile.verified": "موثق",
    "profile.member_since": "عضو منذ",
    "profile.account_settings": "إعدادات الحساب",
    "profile.menu.edit_profile": "تعديل الملف الشخصي",
    "profile.menu.edit_profile_desc": "المعلومات الشخصية والصورة",
    "profile.menu.verification": "التوثيق",
    "profile.menu.verification_desc": "تحقق من هويتك",
    "profile.menu.payments": "المدفوعات",
    "profile.menu.payments_desc": "وسائل الدفع والفواتير",
    "profile.menu.settings": "الإعدادات",
    "profile.menu.settings_desc": "الإشعارات والتفضيلات",
    
    // Common
    "common.configure": "تكوين",
    "common.search": "بحث",
    
    // SOS
    "sos.title": "خدمة الطوارئ 24/7",
    "sos.subtitle": "طوارئ؟ نحن هنا!",
    "sos.description": "الوصول المباشر لأرقام الطوارئ الرسمية مع تحديد الموقع الجغرافي التلقائي",
    "sos.police": "الشرطة",
    "sos.fire": "الإطفاء/الإسعاف",
    "sos.gendarmerie": "الدرك الملكي",
    "sos.call_now": "اتصل الآن",
    
    // Newsletter
    "newsletter.title": "ابق على اطلاع مع نشرتنا الإخبارية",
    "newsletter.subtitle": "اشترك مجاناً ولا تفوت أي أخبار من خدمات",
    "newsletter.placeholder": "بريدك الإلكتروني",
    "newsletter.subscribe": "اشترك",
    "newsletter.privacy": "بياناتك محمية ولن يتم مشاركتها أبداً",
    
    // Footer
    "footer.tagline": "المنصة التي تربط العملاء بأفضل مقدمي الخدمات في المغرب.",
    "footer.services": "الخدمات",
    "footer.company": "الشركة",
    "footer.support": "الدعم",
    "footer.careers": "الوظائف",
    "footer.press": "الصحافة",
    "footer.partners": "الشركاء",
    "footer.help": "مركز المساعدة",
    "footer.faq": "الأسئلة الشائعة",
    "footer.terms": "شروط الاستخدام",
    "footer.privacy": "سياسة الخصوصية",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.made_in": "مطور بـ ❤️ في المغرب",
    "footer.secure": "مدفوعات آمنة",
    
    // Featured Providers
    "featured_providers.title": "مقدمو الخدمات المميزون",
    "featured_providers.subtitle": "اكتشف أفضل مقدمي الخدمات المختارين حسب تقييمهم وخبرتهم",
    "featured_providers.verified": "موثق",
    "featured_providers.pro": "محترف",
    "featured_providers.reviews": "مراجعة",
    "featured_providers.view_profile": "عرض الملف الشخصي",
    "featured_providers.view_all": "عرض جميع مقدمي الخدمات",
    
    // Common
    "common.currency": "درهم",
    
    // Mobile navigation
    "mobile.home": "الرئيسية",
    "mobile.search": "بحث",
    "mobile.post": "نشر",
    "mobile.messages": "الرسائل",
    "mobile.profile": "الملف الشخصي",
    
    // Common
    "common.join": "انضم إلى خدمات",
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.retry": "أعد المحاولة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("khadamat-language") as Language;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("khadamat-language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    
    if (language === "ar") {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "fr" ? "ar" : "fr");
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

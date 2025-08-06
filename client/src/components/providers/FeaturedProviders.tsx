import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import ArtisanProfileCard from "@/components/providers/ArtisanProfileCard";
import { getTopPriorityProvider } from "@/lib/providerSorting";
import type { SortableProvider } from "@/lib/providerSorting";

// Données mockées des prestataires Club Pro (8 prestataires sélectionnés mensuellement)
const mockProviders: SortableProvider[] = [
  {
    id: 1,
    userId: 1,
    specialties: ["Menuiserie"],
    experience: 15,
    rating: "4.9",
    reviewCount: 127,
    isOnline: true,
    hourlyRate: "150.00",
    bio: "Menuisier professionnel avec 15 ans d'expérience dans la fabrication de meubles et de décoration",
    bioAr: null,
    user: {
      id: 1,
      username: "ahmed_ben_ali",
      email: "ahmed@example.com",
      password: "",
      firstName: "Ahmed",
      lastName: "Ben Ali",
      phone: "+212600000001",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Casablanca",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 45,
    city: "Casablanca"
  },
  {
    id: 2,
    userId: 2,
    specialties: ["Électricité"],
    experience: 12,
    rating: "4.7",
    reviewCount: 156,
    isOnline: false,
    hourlyRate: "120.00",
    bio: "Électricien certifié spécialisé dans les installations électriques modernes",
    bioAr: null,
    user: {
      id: 2,
      username: "mohammed_idrissi",
      email: "mohammed@example.com",
      password: "",
      firstName: "Mohammed",
      lastName: "Idrissi",
      phone: "+212600000002",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Marrakech",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 78,
    city: "Marrakech"
  },
  {
    id: 3,
    userId: 3,
    specialties: ["Nettoyage"],
    experience: 8,
    rating: "4.9",
    reviewCount: 112,
    isOnline: true,
    hourlyRate: "80.00",
    bio: "Service de nettoyage complet avec utilisation de produits écologiques",
    bioAr: null,
    user: {
      id: 3,
      username: "khadija_marrakchi",
      email: "khadija@example.com",
      password: "",
      firstName: "Khadija",
      lastName: "Marrakchi",
      phone: "+212600000003",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Marrakech",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 32,
    city: "Marrakech"
  },
  {
    id: 4,
    userId: 4,
    specialties: ["Plomberie"],
    experience: 10,
    rating: "4.8",
    reviewCount: 94,
    isOnline: true,
    hourlyRate: "100.00",
    bio: "Plombier expert en réparation et installation de tuyauterie et équipements sanitaires",
    bioAr: null,
    user: {
      id: 4,
      username: "hassan_alami",
      email: "hassan@example.com",
      password: "",
      firstName: "Hassan",
      lastName: "Alami",
      phone: "+212600000004",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Casablanca",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 67,
    city: "Casablanca"
  },
  {
    id: 5,
    userId: 5,
    specialties: ["Peinture"],
    experience: 9,
    rating: "4.6",
    reviewCount: 89,
    isOnline: false,
    hourlyRate: "90.00",
    bio: "Peintre décorateur avec expertise en finitions et rénovation",
    bioAr: null,
    user: {
      id: 5,
      username: "amina_el_fassi",
      email: "amina@example.com",
      password: "",
      firstName: "Amina",
      lastName: "El Fassi",
      phone: "+212600000005",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Rabat",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 43,
    city: "Rabat"
  },
  {
    id: 6,
    userId: 6,
    specialties: ["Jardinage"],
    experience: 7,
    rating: "4.5",
    reviewCount: 76,
    isOnline: true,
    hourlyRate: "70.00",
    bio: "Jardinier passionné spécialisé dans l'aménagement et l'entretien de jardins",
    bioAr: null,
    user: {
      id: 6,
      username: "youssef_bidaoui",
      email: "youssef@example.com",
      password: "",
      firstName: "Youssef",
      lastName: "Bidaoui",
      phone: "+212600000006",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Marrakech",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 38,
    city: "Marrakech"
  },
  {
    id: 7,
    userId: 7,
    specialties: ["Réparation"],
    experience: 11,
    rating: "4.7",
    reviewCount: 103,
    isOnline: false,
    hourlyRate: "85.00",
    bio: "Technicien polyvalent spécialisé dans la réparation d'équipements divers",
    bioAr: null,
    user: {
      id: 7,
      username: "abderrahman_tazi",
      email: "abderrahman@example.com",
      password: "",
      firstName: "Abderrahman",
      lastName: "Tazi",
      phone: "+212600000007",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Fès",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 52,
    city: "Fès"
  },
  {
    id: 8,
    userId: 8,
    specialties: ["Installation"],
    experience: 13,
    rating: "4.8",
    reviewCount: 118,
    isOnline: true,
    hourlyRate: "110.00",
    bio: "Installateur professionnel spécialisé dans les équipements modernes",
    bioAr: null,
    user: {
      id: 8,
      username: "fatima_zahra",
      email: "fatima@example.com",
      password: "",
      firstName: "Fatima",
      lastName: "Zahra",
      phone: "+212600000008",
      avatar: null,
      userType: "provider",
      isClubPro: true,
      isVerified: true,
      location: "Agadir",
      createdAt: new Date(),
    },
    isClubPro: true,
    missions: 61,
    city: "Agadir"
  }
];

export default function FeaturedProviders() {
  const { t } = useLanguage();
  
  // Afficher les 8 prestataires Club Pro sélectionnés mensuellement
  const featuredProviders = mockProviders;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Titre et description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("featured_providers.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("featured_providers.subtitle")}
          </p>
        </div>

        {/* Affichage des 8 prestataires en vedette */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProviders.map((provider) => (
            <ArtisanProfileCard 
              key={provider.id}
              provider={{
                id: provider.id.toString(),
                name: `${provider.user.firstName} ${provider.user.lastName}`,
                service: provider.specialties?.[0] || "Service",
                description: provider.bio || undefined,
                location: provider.city,
                rating: parseFloat(provider.rating || "0"),
                reviewCount: provider.reviewCount || 0,
                isVerified: provider.user.isVerified || false,
                isPro: provider.isClubPro,
                avatar: provider.user.avatar || undefined
              }} 
            />
          ))}
        </div>

        {/* Bouton voir plus */}
        <div className="text-center mt-12">
          <Link href="/prestataires">
            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
              {t("featured_providers.view_all")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
} 
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  ArrowRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Trash2,
  Download,
  Eye,
  Lock,
  Key,
  X,
  Camera,
  Upload,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export default function Reglages() {
  const { t, language, toggleLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  // États pour les modales
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // États pour les formulaires
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // États pour 2FA
  const [twoFAMethod, setTwoFAMethod] = useState<'sms' | 'email' | 'app'>('sms');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  // États pour les sessions
  const [activeSessions] = useState([
    {
      id: "1",
      device: "Chrome sur Windows",
      location: "Casablanca, Maroc",
      lastActive: "Il y a 2 heures",
      isCurrent: true
    },
    {
      id: "2",
      device: "Safari sur iPhone",
      location: "Rabat, Maroc",
      lastActive: "Il y a 1 jour",
      isCurrent: false
    },
    {
      id: "3",
      device: "Firefox sur Mac",
      location: "Fès, Maroc",
      lastActive: "Il y a 3 jours",
      isCurrent: false
    }
  ]);

  // Références pour les inputs de fichiers
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Gestion du mode sombre avec persistence
  const handleDarkModeToggle = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem('darkMode', enabled.toString());
    // Ici vous pouvez ajouter la logique pour appliquer le thème
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Gestion du changement de mot de passe
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError("Tous les champs sont requis");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      // Simulation de l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordSuccess("Mot de passe modifié avec succès !");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 2000);
    } catch (error) {
      setPasswordError("Erreur lors de la modification du mot de passe");
    }
  };

  // Gestion de l'upload d'avatar
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Ici vous ajouteriez la logique d'upload vers votre API
      console.log("Upload d'avatar:", file);
      
      // Simulation de succès
      setTimeout(() => {
        setShowAvatarModal(false);
        // Ici vous pourriez mettre à jour l'avatar dans le contexte utilisateur
      }, 1000);
    }
  };

  // Gestion de l'export des données
  const handleExportData = () => {
    // Simulation des données utilisateur
    const userData = {
      profile: {
        name: "Ahmed Ben Ali",
        email: "ahmed@example.com",
        phone: "+212 6 12 34 56 78",
        location: "Casablanca"
      },
      reservations: [
        { id: "1", service: "Plomberie", date: "2024-01-15" },
        { id: "2", service: "Électricité", date: "2024-01-20" }
      ],
      favorites: [
        { id: "1", provider: "Ahmed Ben Ali", service: "Plomberie" }
      ],
      settings: {
        language: language,
        notifications: notifications,
        darkMode: darkMode
      }
    };

    // Créer et télécharger le fichier JSON
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `khadamat-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    // Ici vous appelleriez votre API de déconnexion
    console.log("Déconnexion...");
    // Redirection vers la page de connexion
    setLocation("/login");
  };

  // Gestion de la suppression de compte
  const handleDeleteAccount = async () => {
    try {
      // Ici vous appelleriez votre API de suppression de compte
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Compte supprimé");
      setLocation("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
    }
  };

  // Gestion des notifications
  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulation de l'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowNotificationsModal(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des notifications:", error);
    }
  };

  // Gestion de la déconnexion d'une session
  const handleLogoutSession = (sessionId: string) => {
    console.log(`Déconnexion de la session ${sessionId}`);
    // Ici vous appelleriez votre API pour déconnecter la session
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Réglages
          </h1>
          <p className="text-gray-600">
            Gérez vos préférences et paramètres de compte
          </p>
        </div>

        <div className="space-y-6">
          {/* Section Profil */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-orange-600" />
                <span>Profil et informations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Informations personnelles</h3>
                  <p className="text-sm text-gray-500">Nom, email, téléphone, localisation</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/profile/info")}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Modifier
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Avatar et photo</h3>
                  <p className="text-sm text-gray-500">Changer votre photo de profil</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAvatarModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Modifier
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Préférences de langue</h3>
                  <p className="text-sm text-gray-500">Français / العربية</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleLanguage}
                  className="text-orange-500 hover:text-orange-600"
                >
                  {language === 'fr' ? 'Français' : 'العربية'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Sécurité */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span>Sécurité et accès</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Mot de passe</h3>
                  <p className="text-sm text-gray-500">Changer votre mot de passe</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowPasswordModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Modifier
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-500">Sécurisez votre compte</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShow2FAModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Configurer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Sessions actives</h3>
                  <p className="text-sm text-gray-500">Gérer vos connexions</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowSessionsModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Voir
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Notifications */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Paramètres de notifications</h3>
                  <p className="text-sm text-gray-500">Email, SMS, push notifications</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotificationsModal(true)}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Configurer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Mode sombre</h3>
                  <p className="text-sm text-gray-500">Activer le thème sombre</p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section Paiement */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span>Paiement et facturation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Méthodes de paiement</h3>
                  <p className="text-sm text-gray-500">Cartes, portefeuille électronique</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/profile/payment")}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Gérer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Historique des paiements</h3>
                  <p className="text-sm text-gray-500">Factures et reçus</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/profile/billing")}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Voir
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Support et Aide */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                <span>Support et aide</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Centre d'aide</h3>
                  <p className="text-sm text-gray-500">FAQ et guides</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/faq")}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Consulter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Contacter le support</h3>
                  <p className="text-sm text-gray-500">Assistance 24/7</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/contact")}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Contacter
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Section Compte */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-orange-600" />
                <span>Gestion du compte</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Exporter mes données</h3>
                  <p className="text-sm text-gray-500">Télécharger vos informations</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleExportData}
                  className="text-orange-500 hover:text-orange-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Se déconnecter</h3>
                  <p className="text-sm text-gray-500">Fermer votre session</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Supprimer mon compte</h3>
                  <p className="text-sm text-gray-500">Action irréversible</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Supprimer définitivement
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Avatar */}
      <Dialog open={showAvatarModal} onOpenChange={setShowAvatarModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier votre photo de profil</DialogTitle>
            <DialogDescription>
              Choisissez une nouvelle photo pour votre profil
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => avatarInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choisir une image
              </Button>
              <Button
                variant="outline"
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Prendre une photo
              </Button>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAvatarModal(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Mot de passe */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le mot de passe</DialogTitle>
            <DialogDescription>
              Entrez votre mot de passe actuel et choisissez un nouveau mot de passe
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Ancien mot de passe</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {passwordError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                {passwordSuccess}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowPasswordModal(false)}>
                Annuler
              </Button>
              <Button type="submit">
                Modifier
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal 2FA */}
      <Dialog open={show2FAModal} onOpenChange={setShow2FAModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentification à deux facteurs</DialogTitle>
            <DialogDescription>
              Sécurisez votre compte avec une authentification supplémentaire
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <p className="text-sm text-gray-500">Protection supplémentaire pour votre compte</p>
              </div>
              <Switch
                checked={twoFAEnabled}
                onCheckedChange={setTwoFAEnabled}
              />
            </div>

            {twoFAEnabled && (
              <div className="space-y-3">
                <div>
                  <Label>Méthode d'authentification</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sms"
                        name="twoFAMethod"
                        value="sms"
                        checked={twoFAMethod === 'sms'}
                        onChange={(e) => setTwoFAMethod(e.target.value as 'sms')}
                      />
                      <Label htmlFor="sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="email"
                        name="twoFAMethod"
                        value="email"
                        checked={twoFAMethod === 'email'}
                        onChange={(e) => setTwoFAMethod(e.target.value as 'email')}
                      />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="app"
                        name="twoFAMethod"
                        value="app"
                        checked={twoFAMethod === 'app'}
                        onChange={(e) => setTwoFAMethod(e.target.value as 'app')}
                      />
                      <Label htmlFor="app">Application d'authentification</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShow2FAModal(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShow2FAModal(false)}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Sessions */}
      <Dialog open={showSessionsModal} onOpenChange={setShowSessionsModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Sessions actives</DialogTitle>
            <DialogDescription>
              Gérez vos connexions actives sur différents appareils
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{session.device}</h4>
                    {session.isCurrent && (
                      <Badge variant="secondary" className="text-xs">Actuel</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{session.location}</p>
                  <p className="text-xs text-gray-400">{session.lastActive}</p>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLogoutSession(session.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Déconnecter
                  </Button>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSessionsModal(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Notifications */}
      <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paramètres de notifications</DialogTitle>
            <DialogDescription>
              Configurez vos préférences de notifications
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNotificationSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Notifications par email</Label>
                <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, email: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Notifications SMS</Label>
                <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, sms: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Notifications push</Label>
                <p className="text-sm text-gray-500">Recevoir les notifications push</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, push: checked})
                }
              />
            </div>
          </form>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationsModal(false)}>
              Annuler
            </Button>
            <Button onClick={() => setShowNotificationsModal(false)}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

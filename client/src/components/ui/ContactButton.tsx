import { useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactButtonProps {
  reservationId: string;
  clientId: string;
  providerId: string;
  providerName: string;
  isClient: boolean;
  isPrestataire: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function ContactButton({
  reservationId,
  clientId,
  providerId,
  providerName,
  isClient,
  isPrestataire,
  variant = "outline",
  size = "sm",
  className = ""
}: ContactButtonProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleContact = async () => {
    setIsLoading(true);

    try {
      // Vérifier si l'utilisateur est connecté
      // Ici vous pouvez ajouter votre logique d'authentification
      const isAuthenticated = true; // À remplacer par votre logique

      if (!isAuthenticated) {
        // Rediriger vers la page de connexion
        setLocation("/login");
        return;
      }

      // Déterminer l'ID de l'autre utilisateur selon le rôle
      let otherUserId: string;
      let conversationId: string;

      if (isClient) {
        // Le client veut contacter le prestataire
        otherUserId = providerId;
        conversationId = `client_${clientId}_provider_${providerId}`;
      } else if (isPrestataire) {
        // Le prestataire veut contacter le client
        otherUserId = clientId;
        conversationId = `client_${clientId}_provider_${providerId}`;
      } else {
        // Rôle non défini, utiliser le provider par défaut
        otherUserId = providerId;
        conversationId = `client_${clientId}_provider_${providerId}`;
      }

      // Simulation d'un délai pour l'animation de chargement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Rediriger vers la messagerie avec l'ID de conversation
      setLocation(`/messages/${conversationId}?otherUser=${otherUserId}&reservation=${reservationId}`);

    } catch (error) {
      console.error("Erreur lors de la redirection vers la messagerie:", error);
      // En cas d'erreur, rediriger vers la page de connexion
      setLocation("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleContact}
      disabled={isLoading}
      className={`transition-all duration-200 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <MessageCircle className="w-4 h-4 mr-2" />
      )}
      Contacter
    </Button>
  );
}

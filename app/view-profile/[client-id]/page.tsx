"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Client, Sibling } from "@prisma/client";
import ProfilePDFViewer from "@/app/components/profile-pdf/profile-viewer";

type ClientWithSiblings = Client & {
  siblings: Sibling[];
};

export default function ViewProfilePage() {
  const params = useParams();
  const clientId = params["client-id"] as string;
  const [client, setClient] = useState<ClientWithSiblings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/clients/${clientId}`);
        console.log("response", response);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Client not found");
          } else {
            setError("Failed to fetch client data");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setClient(data.client);
      } catch (err) {
        console.error("Error fetching client:", err);
        setError("Failed to fetch client data");
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-whiteshade flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8b0000] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#1c2526]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen w-full bg-whiteshade flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || "Client not found"}</p>
        </div>
      </div>
    );
  }

  return <ProfilePDFViewer client={client} />;
}

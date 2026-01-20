"use client";

import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MaritalProfilePDF from "./client-profile";
import { Client, Sibling } from "@prisma/client";

type ClientWithSiblings = Client & {
  siblings?: Sibling[];
};

interface ProfilePDFViewerProps {
  client: ClientWithSiblings; // Use your Client type from Prisma with siblings
}

const ProfilePDFViewer: React.FC<ProfilePDFViewerProps> = ({ client }) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side (react-pdf requirement)
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid #8b0000",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#1c2526" }}>Loading PDF Viewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}>
      {/* Header with Download Button */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
        <div>
          <h1
            style={{
              margin: 0,
              color: "#8b0000",
              fontSize: "24px",
              fontWeight: "600",
            }}>
            Marital Profile PDF
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              color: "#b0bec5",
              fontSize: "14px",
            }}>
            Profile ID: {client.id}
          </p>
        </div>

        <PDFDownloadLink
          document={<MaritalProfilePDF client={client} />}
          fileName={`marital-profile-${client.id}.pdf`}
          style={{
            backgroundColor: "#8b0000",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "background-color 0.2s",
            border: "none",
            cursor: "pointer",
          }}>
          {({ loading }) => (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {loading ? "Preparing PDF..." : "Download PDF"}
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* PDF Viewer */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
        <PDFViewer
          width="100%"
          height="800px"
          style={{ border: "none" }}
          showToolbar={true}>
          <MaritalProfilePDF client={client} />
        </PDFViewer>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePDFViewer;

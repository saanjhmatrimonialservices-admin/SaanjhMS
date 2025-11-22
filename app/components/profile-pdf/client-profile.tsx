import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Register fonts (optional - for better typography)
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
// });

interface ClientProfile {
  id: string;
  imageUrl: string | null;
  dateOfBirth: Date;
  gender: string;
  timeOfBirth: string | null;
  placeOfBirth: string | null;
  rashi: string | null;
  height: string | null;
  weight: number | null;
  maritalStatus: string;
  complexion: string | null;
  diet: string;
  drink: boolean;
  smoke: boolean;
  hobbies: string[];
  religion: string;
  motherTongue: string | null;
  caste: string | null;
  subCaste: string | null;
  gotra: string | null;
  manglik: boolean;
  education: string | null;
  collegeName: string | null;
  collegeYear: number | null;
  schoolName: string | null;
  schoolYear: number | null;
  otherDegree: string | null;
  otherOrg: string | null;
  otherYear: number | null;
  employedIn: string | null;
  workingSince: number | null;
  organization: string | null;
  annualIncome: string | null;
  familyType: string | null;
  fatherName: string | null;
  fatherOccupation: string | null;
  motherName: string | null;
  motherOccupation: string | null;
  familyIncome: string | null;
  permanentAddress: string | null;
  residentialAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  numberOfCars: number | null;
  numberOfBikes: number | null;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#8b0000",
    padding: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileSection: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  imageContainer: {
    width: 140,
    height: 160,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    border: "2px solid #8b0000",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  basicInfoContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8b0000",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "2px solid #ffc107",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
    fontSize: 10,
  },
  label: {
    width: "40%",
    color: "#1c2526",
    fontWeight: "bold",
  },
  value: {
    width: "60%",
    color: "#1c2526",
  },
  divider: {
    height: 1,
    backgroundColor: "#b0bec5",
    marginVertical: 12,
  },
  twoColumnSection: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
  badge: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 9,
    color: "#1c2526",
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#b0bec5",
    borderTop: "1px solid #b0bec5",
    paddingTop: 8,
  },
  accentBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
    borderLeft: "3px solid #ffc107",
    marginBottom: 12,
  },
});

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const calculateAge = (dob: Date): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

interface MaritalProfilePDFProps {
  client: ClientProfile;
}

const MaritalProfilePDF: React.FC<MaritalProfilePDFProps> = ({ client }) => {
  const age = calculateAge(client.dateOfBirth);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Saanjh Matrimony Profile</Text>
        </View>

        {/* Profile Section with Image */}
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            {client.imageUrl ? (
              <Image src={client.imageUrl} style={styles.profileImage} />
            ) : (
              <View style={{ padding: 40, textAlign: "center" }}>
                <Text style={{ fontSize: 10, color: "#b0bec5" }}>No Photo</Text>
              </View>
            )}
          </View>

          <View style={styles.basicInfoContainer}>
            <View style={styles.accentBox}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{age} years</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{client.gender}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Height:</Text>
                <Text style={styles.value}>{client.height || "N/A"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Marital Status:</Text>
                <Text style={styles.value}>{client.maritalStatus}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Religion:</Text>
                <Text style={styles.value}>{client.religion}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          <View style={styles.twoColumnSection}>
            <View style={styles.column}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>
                  {formatDate(client.dateOfBirth)}
                </Text>
              </View>
              {client.timeOfBirth && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Time of Birth:</Text>
                  <Text style={styles.value}>{client.timeOfBirth}</Text>
                </View>
              )}
              {client.placeOfBirth && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Place of Birth:</Text>
                  <Text style={styles.value}>{client.placeOfBirth}</Text>
                </View>
              )}
              {client.rashi && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Rashi:</Text>
                  <Text style={styles.value}>{client.rashi}</Text>
                </View>
              )}
              {client.complexion && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Complexion:</Text>
                  <Text style={styles.value}>{client.complexion}</Text>
                </View>
              )}
              {client.weight && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Weight:</Text>
                  <Text style={styles.value}>{client.weight} kg</Text>
                </View>
              )}
            </View>

            <View style={styles.column}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Diet:</Text>
                <Text style={styles.value}>{client.diet}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Drink:</Text>
                <Text style={styles.value}>{client.drink ? "Yes" : "No"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Smoke:</Text>
                <Text style={styles.value}>{client.smoke ? "Yes" : "No"}</Text>
              </View>
              {client.motherTongue && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Mother Tongue:</Text>
                  <Text style={styles.value}>{client.motherTongue}</Text>
                </View>
              )}
              {client.caste && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Caste:</Text>
                  <Text style={styles.value}>{client.caste}</Text>
                </View>
              )}
              {client.gotra && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Gotra:</Text>
                  <Text style={styles.value}>{client.gotra}</Text>
                </View>
              )}
              <View style={styles.infoRow}>
                <Text style={styles.label}>Manglik:</Text>
                <Text style={styles.value}>
                  {client.manglik ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </View>

          {client.hobbies && client.hobbies.length > 0 && (
            <>
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4 }}>
                  Hobbies & Interests:
                </Text>
                <View style={styles.hobbiesContainer}>
                  {client.hobbies.map((hobby, index) => (
                    <Text key={index} style={styles.badge}>
                      {hobby}
                    </Text>
                  ))}
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.divider} />

        {/* Education & Career */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education & Career</Text>
          <View style={styles.twoColumnSection}>
            <View style={styles.column}>
              {client.education && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Education:</Text>
                  <Text style={styles.value}>{client.education}</Text>
                </View>
              )}
              {client.collegeName && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>College:</Text>
                  <Text style={styles.value}>
                    {client.collegeName}{" "}
                    {client.collegeYear ? `(${client.collegeYear})` : ""}
                  </Text>
                </View>
              )}
              {client.schoolName && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>School:</Text>
                  <Text style={styles.value}>
                    {client.schoolName}{" "}
                    {client.schoolYear ? `(${client.schoolYear})` : ""}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.column}>
              {client.employedIn && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Employed In:</Text>
                  <Text style={styles.value}>{client.employedIn}</Text>
                </View>
              )}
              {client.organization && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Organization:</Text>
                  <Text style={styles.value}>{client.organization}</Text>
                </View>
              )}
              {client.workingSince && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Working Since:</Text>
                  <Text style={styles.value}>{client.workingSince}</Text>
                </View>
              )}
              {client.annualIncome && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Annual Income:</Text>
                  <Text style={styles.value}>{client.annualIncome}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Family Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family Details</Text>
          <View style={styles.twoColumnSection}>
            <View style={styles.column}>
              {client.familyType && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Family Type:</Text>
                  <Text style={styles.value}>{client.familyType}</Text>
                </View>
              )}
              {client.fatherName && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>{`Father's Name:`}</Text>
                  <Text style={styles.value}>{client.fatherName}</Text>
                </View>
              )}
              {client.fatherOccupation && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>F{`ather's Occupation:`}</Text>
                  <Text style={styles.value}>{client.fatherOccupation}</Text>
                </View>
              )}
              {client.motherName && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>{`Mother's Name:`}</Text>
                  <Text style={styles.value}>{client.motherName}</Text>
                </View>
              )}
            </View>

            <View style={styles.column}>
              {client.motherOccupation && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>{`Mother's Occupation:`}</Text>
                  <Text style={styles.value}>{client.motherOccupation}</Text>
                </View>
              )}
              {client.familyIncome && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Family Income:</Text>
                  <Text style={styles.value}>{client.familyIncome}</Text>
                </View>
              )}
              {client.numberOfCars !== null && client.numberOfCars > 0 && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Cars:</Text>
                  <Text style={styles.value}>{client.numberOfCars}</Text>
                </View>
              )}
              {client.numberOfBikes !== null && client.numberOfBikes > 0 && (
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Bikes:</Text>
                  <Text style={styles.value}>{client.numberOfBikes}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Contact Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact & Location</Text>
          {client.city && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>City:</Text>
              <Text style={styles.value}>
                {client.city}
                {client.state ? `, ${client.state}` : ""}
                {client.country ? `, ${client.country}` : ""}
              </Text>
            </View>
          )}
          {client.permanentAddress && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Permanent Address:</Text>
              <Text style={styles.value}>{client.permanentAddress}</Text>
            </View>
          )}
          {client.residentialAddress && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Residential Address:</Text>
              <Text style={styles.value}>{client.residentialAddress}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Profile ID: {client.id} | Generated on{" "}
          {new Date().toLocaleDateString("en-IN")}
        </Text>
      </Page>
    </Document>
  );
};

export default MaritalProfilePDF;

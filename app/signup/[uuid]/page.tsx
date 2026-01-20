"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  formDataAtom,
  isSubmittingAtom,
  profileFileAtom,
  SiblingData,
} from "@/app/store/signup";

export default function SignupPage({ params }: { params: { uuid: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [isSubmitting, setIsSubmitting] = useAtom(isSubmittingAtom);
  const [profileFile, setProfileFile] = useAtom(profileFileAtom);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number" ||
            [
              "weight",
              "collegeYear",
              "schoolYear",
              "otherYear",
              "workingSince",
              "numberOfCars",
              "numberOfBikes",
            ].includes(name)
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
    }
  };

  const handleNumberOfSiblingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = Math.max(0, parseInt(e.target.value) || 0);
    const currentSiblings = formData.siblings || [];

    let newSiblings: SiblingData[];
    if (count > currentSiblings.length) {
      // Add new empty siblings
      newSiblings = [
        ...currentSiblings,
        ...Array(count - currentSiblings.length)
          .fill(null)
          .map(() => ({
            name: "",
            age: "",
            gender: "",
            profession: "",
            maritalStatus: "",
          })),
      ];
    } else {
      // Remove excess siblings
      newSiblings = currentSiblings.slice(0, count);
    }

    setFormData((prev) => ({
      ...prev,
      numberOfSiblings: count.toString(),
      siblings: newSiblings,
    }));
  };

  const handleSiblingChange = (
    index: number,
    field: keyof SiblingData,
    value: string
  ) => {
    setFormData((prev) => {
      const newSiblings = [...prev.siblings];
      newSiblings[index] = {
        ...newSiblings[index],
        [field]: value,
      };
      return {
        ...prev,
        siblings: newSiblings,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      // Upload Image
      if (profileFile) {
        toast.loading("Uploading profile image...");
        const formDataImg = new FormData();
        formDataImg.append("file", profileFile);
        formDataImg.append("uuid", params.uuid);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataImg,
        });

        toast.dismiss();
        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageUrl = url;
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Image upload failed!");
          setIsSubmitting(false);
          return;
        }
      }

      // Create User Row
      toast.loading("Creating your account...");
      const response = await fetch(`/api/signup/${params.uuid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageUrl }),
      });

      toast.dismiss();
      if (response.ok) {
        const data = await response.json();
        toast.success("Account created successfully!");
        // Store user name for success page
        localStorage.setItem("userName", data.user.name);
        router.push(`/success/${params.uuid}`);
      } else {
        const error = await response.json();
        toast.error(error.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-red-950 flex items-center justify-center p-4 pt-24">
      <div className="bg-whiteshade rounded-lg text-blackshade shadow-xl w-full max-w-4xl overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-200">
              Fill in your details to create your matrimony profile
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Profile Picture
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* User Info */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Account Info
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Personal Info */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Personal Details
              </h2>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="time"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="placeOfBirth"
                placeholder="Place of Birth"
                value={formData.placeOfBirth}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="rashi"
                placeholder="Rashi"
                value={formData.rashi}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="height"
                placeholder="Height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade">
                <option value="">Select Marital Status</option>
                <option value="NeverMarried">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
              <input
                type="text"
                name="complexion"
                placeholder="Complexion"
                value={formData.complexion}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <select
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade">
                <option value="">Select Diet</option>
                <option value="Jain">Jain</option>
                <option value="Veg">Veg</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="NonVeg">Non-Veg</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="drink"
                  checked={formData.drink}
                  onChange={handleInputChange}
                />
                Drink
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="smoke"
                  checked={formData.smoke}
                  onChange={handleInputChange}
                />
                Smoke
              </label>
              <input
                type="text"
                name="hobbies"
                placeholder="Hobbies (comma-separated)"
                value={formData.hobbies}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <select
                name="religion"
                value={formData.religion}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade">
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Parsi">Parsi</option>
                <option value="Jewish">Jewish</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                name="motherTongue"
                placeholder="Mother Tongue"
                value={formData.motherTongue}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="caste"
                placeholder="Caste"
                value={formData.caste}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="subCaste"
                placeholder="Sub-Caste"
                value={formData.subCaste}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="gotra"
                placeholder="Gotra"
                value={formData.gotra}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="manglik"
                  checked={formData.manglik}
                  onChange={handleInputChange}
                />
                Manglik
              </label>
            </div>

            {/* Academic */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Academic Details
              </h2>
              <input
                type="text"
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="collegeName"
                placeholder="College Name"
                value={formData.collegeName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="collegeYear"
                placeholder="College Year"
                value={formData.collegeYear}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={formData.schoolName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="schoolYear"
                placeholder="School Year"
                value={formData.schoolYear}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="otherDegree"
                placeholder="Other Degree"
                value={formData.otherDegree}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="otherOrg"
                placeholder="Other Organization"
                value={formData.otherOrg}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="otherYear"
                placeholder="Other Year"
                value={formData.otherYear}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Occupation */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Occupation
              </h2>
              <input
                type="text"
                name="employedIn"
                placeholder="Employed In"
                value={formData.employedIn}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="workingSince"
                placeholder="Working Since (Year)"
                value={formData.workingSince}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="annualIncome"
                placeholder="Annual Income"
                value={formData.annualIncome}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Family */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Family Details
              </h2>
              <input
                type="text"
                name="familyType"
                placeholder="Family Type"
                value={formData.familyType}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="fatherName"
                placeholder="Father's Name"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="fatherOccupation"
                placeholder="Father's Occupation"
                value={formData.fatherOccupation}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="motherName"
                placeholder="Mother's Name"
                value={formData.motherName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="motherOccupation"
                placeholder="Mother's Occupation"
                value={formData.motherOccupation}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="familyIncome"
                placeholder="Family Income"
                value={formData.familyIncome}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Siblings */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Siblings Details
              </h2>
              <input
                type="number"
                min="0"
                placeholder="Number of Siblings"
                value={formData.numberOfSiblings}
                onChange={handleNumberOfSiblingsChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />

              {formData.siblings.map((sibling, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border border-gray-300 space-y-3">
                  <h3 className="font-medium text-blackshade">
                    Sibling {index + 1}
                  </h3>
                  <input
                    type="text"
                    placeholder="Name"
                    value={sibling.name}
                    onChange={(e) =>
                      handleSiblingChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg text-blackshade"
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={sibling.age}
                    onChange={(e) =>
                      handleSiblingChange(index, "age", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg text-blackshade"
                  />
                  <select
                    value={sibling.gender}
                    onChange={(e) =>
                      handleSiblingChange(index, "gender", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg text-blackshade">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Profession"
                    value={sibling.profession}
                    onChange={(e) =>
                      handleSiblingChange(index, "profession", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg text-blackshade"
                  />
                  <select
                    value={sibling.maritalStatus}
                    onChange={(e) =>
                      handleSiblingChange(index, "maritalStatus", e.target.value)
                    }
                    className="w-full p-3 border rounded-lg text-blackshade">
                    <option value="">Select Marital Status</option>
                    <option value="NeverMarried">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Contact Details
              </h2>
              <input
                type="text"
                name="permanentAddress"
                placeholder="Permanent Address"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="residentialAddress"
                placeholder="Residential Address"
                value={formData.residentialAddress}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Other */}
            <div className="bg-gray-200 p-6 rounded-lg text-blackshade space-y-4">
              <h2 className="text-xl font-semibold text-blackshade mb-4">
                Other
              </h2>
              <input
                type="number"
                name="numberOfCars"
                placeholder="Number of Cars"
                value={formData.numberOfCars}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
              <input
                type="number"
                name="numberOfBikes"
                placeholder="Number of Bikes"
                value={formData.numberOfBikes}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg text-blackshade"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-whiteshade font-semibold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition">
              {isSubmitting ? "Submitting..." : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

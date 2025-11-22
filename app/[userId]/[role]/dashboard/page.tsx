"use client";

import { loggedInUserAtom } from "@/app/store/user";
import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { Link, Copy } from "lucide-react";
import { Table, ColumnDef } from "@/app/components/table/table";
import Image from "next/image";

interface Client {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  imageUrl: string | null;
  dateOfBirth: string;
  age?: number;
  religion: string;
  caste: string | null;
  diet: string;
  height: string | null;
  weight: number | null;
  employedIn: string | null;
  organization: string | null;
}

export default function Dashboard(): React.ReactElement {
  const user = useAtomValue(loggedInUserAtom);
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string | null>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (user.role === "admin") {
      fetchClients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.role, page, pageSize, sortBy, sortOrder, filter]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortBy: sortBy || "name",
        sortOrder: sortOrder,
        search: filter,
      });

      const response = await fetch(`/api/clients?${params}`);
      if (response.ok) {
        const data = await response.json();
        setClients(data.clients || []);
        setTotalItems(data.pagination?.total || 0);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLink(data.link);
      } else {
        console.error("Failed to generate link");
      }
    } catch (error) {
      console.error("Error generating link:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<Client>[] = [
    {
      key: "name",
      header: "Name",
      accessor: (row) => row.user.name,
      sortKey: "name",
    },
    {
      key: "dobAge",
      header: "DoB & Age",
      render: (row) => (
        <div className="flex flex-col">
          <span>{formatDate(row.dateOfBirth)}</span>
          <span className="text-xs text-greyshade">
            {row.age !== undefined ? `${row.age} years` : "N/A"}
          </span>
        </div>
      ),
      sortKey: "age",
    },
    {
      key: "religionCasteDiet",
      header: "Religion, Caste & Diet",
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">{row.religion}</span>
          {row.caste && (
            <span className="text-sm text-blackshade/70">{row.caste}</span>
          )}
          <span className="text-xs text-greyshade">{row.diet}</span>
        </div>
      ),
    },
    {
      key: "photo",
      header: "Photo",
      render: (row) => (
        <div className="flex items-center justify-center">
          {row.imageUrl ? (
            <Image
              src={row.imageUrl}
              alt={row.user.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-greyshade flex items-center justify-center text-blackshade/50 text-xs">
              No Photo
            </div>
          )}
        </div>
      ),
      sortable: false,
    },
    {
      key: "heightWeight",
      header: "Height & Weight",
      render: (row) => (
        <div className="flex flex-col">
          {row.height && <span>{row.height}</span>}
          {row.weight && (
            <span className="text-sm text-blackshade/70">{row.weight} kg</span>
          )}
          {!row.height && !row.weight && (
            <span className="text-greyshade">N/A</span>
          )}
        </div>
      ),
    },
    {
      key: "job",
      header: "Job/Profession",
      render: (row) => (
        <div className="flex flex-col">
          {row.employedIn && (
            <span className="font-medium">{row.employedIn}</span>
          )}
          {row.organization && (
            <span className="text-sm text-blackshade/70">
              {row.organization}
            </span>
          )}
          {!row.employedIn && !row.organization && (
            <span className="text-greyshade">N/A</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="text-2xl text-primary mb-6">Hi {user.name}</div>

      {user.role === "admin" && (
        <>
          <div className="bg-whiteshade rounded-lg p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold text-blackshade mb-4">
              Admin Tools
            </h2>

            <button
              onClick={handleGenerateLink}
              disabled={isGenerating}
              className="bg-primary text-whiteshade px-6 py-3 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
              <Link size={20} />
              {isGenerating ? "Generating..." : "Generate New Link"}
            </button>

            {generatedLink && (
              <div className="mt-4 p-4 bg-greyshade rounded-lg">
                <p className="text-blackshade font-medium mb-2">
                  Generated Link:
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-secondary text-blackshade px-3 py-2 rounded hover:bg-yellow-500 transition-colors flex items-center gap-1">
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-whiteshade rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-blackshade mb-4">
              Clients List
            </h2>
            {loading ? (
              <div className="text-center py-8 text-blackshade">Loading...</div>
            ) : (
              <Table
                data={clients}
                columns={columns}
                filterable
                onFilterChange={setFilter}
                externalFilter={filter}
                totalItems={totalItems}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                onSortChange={(by, order) => {
                  setSortBy(by);
                  setSortOrder(order);
                }}
                externalSortBy={sortBy}
                externalSortOrder={sortOrder}
                initialPageSize={pageSize}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

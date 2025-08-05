"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  RefreshCw,
  Edit2,
  Trash2,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useWebsites } from "@/hooks/useWebsites";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Sidebar } from "@/components/Sidebar";
import { LatencyGraph } from "@/components/LatencyGraph";
import { WebsiteSummary } from "@/components/WebsiteSummary";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

type UptimeStatus = "good" | "bad" | "unknown";

function StatusCircle({ status }: { status: UptimeStatus }) {
  return (
    <div
      className={`w-3 h-3 rounded-full ${
        status === "good"
          ? "bg-green-500 shadow-green-500/50 shadow-lg"
          : status === "bad"
            ? "bg-red-500 shadow-red-500/50 shadow-lg"
            : "bg-gray-500"
      }`}
    />
  );
}

function UptimeTicks({
  ticks,
  tickData,
}: {
  ticks: UptimeStatus[];
  tickData: Array<{ time: string; latency: number; status: UptimeStatus }>;
}) {
  return (
    <TooltipProvider>
      <div className="flex gap-1 mt-3">
        {ticks.map((tick, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className={`w-8 h-3 rounded-sm cursor-pointer transition-all hover:scale-110 ${
                  tick === "good"
                    ? "bg-gradient-to-t from-orange-600 to-orange-400 shadow-orange-500/30 shadow-sm"
                    : tick === "bad"
                      ? "bg-gradient-to-t from-red-600 to-red-400 shadow-red-500/30 shadow-sm"
                      : "bg-gradient-to-t from-gray-600 to-gray-400"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 border-gray-700">
              <div className="text-xs">
                <p className="text-orange-400 font-medium">
                  {tickData[index]?.time || "Unknown"}
                </p>
                <p className="text-gray-300">
                  {tickData[index]?.latency
                    ? `${tickData[index].latency}ms`
                    : "No data"}
                </p>
                <p
                  className={`capitalize ${
                    tick === "good"
                      ? "text-green-400"
                      : tick === "bad"
                        ? "text-red-400"
                        : "text-gray-400"
                  }`}
                >
                  {tick}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function WebsiteModal({
  isOpen,
  onClose,
  website,
  mode,
}: {
  isOpen: boolean;
  onClose: (data: { url: string; id?: string } | null) => void;
  website?: any;
  mode: "create" | "edit";
}) {
  const [url, setUrl] = useState(website?.url || "");

  React.useEffect(() => {
    if (website) {
      setUrl(website.url);
    } else {
      setUrl("");
    }
  }, [website, isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(null)}>
      <DialogContent className="bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-orange-400">
            {mode === "create" ? "Add New Website" : "Edit Website"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL
            </label>
            <Input
              type="url"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={() => onClose(null)}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={() => onClose({ url, id: website?.id })}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/25"
              disabled={!url.trim()}
            >
              {mode === "create" ? "Add Website" : "Update Website"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
  tickData: Array<{ time: string; latency: number; status: UptimeStatus }>;
  averageResponseTime: number;
  lastResponseTime: number;
  totalChecks: number;
  successfulChecks: number;
  failedChecks: number;
}

function WebsiteCard({
  website,
  onRecheck,
  onEdit,
  onDelete,
  isRechecking,
}: {
  website: ProcessedWebsite;
  onRecheck: (id: string) => void;
  onEdit: (website: any) => void;
  onDelete: (id: string) => void;
  isRechecking: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#0a0a0a] border border-gray-600 rounded-xl shadow-xl overflow-hidden hover:border-gray-700 transition-all duration-300">
      <div
        className="p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-zinc-900 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-white text-lg">
              {website.url.replace(/^https?:\/\//, "")}
            </h3>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {website.lastChecked}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <span
              className={`text-lg font-bold ${
                website.uptimePercentage >= 99
                  ? "text-green-400"
                  : website.uptimePercentage >= 95
                    ? "text-orange-400"
                    : "text-red-400"
              }`}
            >
              {website.uptimePercentage.toFixed(1)}%
            </span>
            <div className="text-md text-gray-300 space-y-1">
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                Avg: {website.averageResponseTime}ms
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Last: {website.lastResponseTime}ms
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onRecheck(website.id);
              }}
              disabled={isRechecking}
              className="text-orange-400 hover:text-orange-300 hover:bg-gray-800 p-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRechecking ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(website);
              }}
              className="text-blue-400 hover:text-blue-300 hover:bg-gray-800 p-2"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                  className="text-red-400 hover:text-red-300 hover:bg-gray-800 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 border-gray-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">
                    Delete Website
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Are you sure you want to delete {website.url}? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(website.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-800 bg-gray-800/30">
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-2 font-medium">
                Last 30 minutes status:
              </p>
              <UptimeTicks
                ticks={website.uptimeTicks}
                tickData={website.tickData}
              />
            </div>

            <LatencyGraph
              data={website.tickData}
              averageLatency={website.averageResponseTime}
            />
            <div className="flex justify-between text-md text-gray-500">
              <h3 className="text-md font-medium text-gray-300 mb-2">
                <span className="text-orange-400 pr-1">
                  {website.totalChecks}
                </span>{" "}
                checks:{" "}
                <span className="text-green-400">
                  {website.successfulChecks}✓
                </span>
                , <span className="text-red-400">{website.failedChecks}✗</span>
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [recheckingIds, setRecheckingIds] = useState<Set<string>>(new Set());
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);

  const { websites, refreshWebsites } = useWebsites();
  const { getToken, isSignedIn } = useAuth();
  if (!isSignedIn) {
    <div className="blur-3xl bg-black/50 fixed inset-0 z-50" />;
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <button
          onClick={() => redirect("/")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2"
        >
          Sign In
        </button>
      </div>
    </div>;
    redirect("/");
  }

  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
      );

      const windows: UptimeStatus[] = [];
      const tickData: Array<{
        time: string;
        latency: number;
        status: UptimeStatus;
      }> = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter((tick) => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        const upTicks = windowTicks.filter(
          (tick) => tick.status === "Good"
        ).length;
        const windowStatus =
          windowTicks.length === 0
            ? "unknown"
            : upTicks / windowTicks.length >= 0.5
              ? "good"
              : "bad";

        windows[9 - i] = windowStatus;

        const avgLatency =
          windowTicks.length > 0
            ? Math.round(
                windowTicks.reduce((sum, tick) => sum + tick.latency, 0) /
                  windowTicks.length
              )
            : 0;

        tickData[9 - i] = {
          time: windowEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          latency: avgLatency,
          status: windowStatus,
        };
      }

      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(
        (tick) => tick.status === "Good"
      ).length;
      const uptimePercentage =
        totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      const currentStatus = windows[windows.length - 1];
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleString()
        : "Never";

      const avgResponseTime =
        sortedTicks.length > 0
          ? Math.round(
              sortedTicks.reduce((sum, tick) => sum + tick.latency, 0) /
                sortedTicks.length
            )
          : 0;

      const lastResponseTime = sortedTicks[0]?.latency || 0;
      const successfulChecks = sortedTicks.filter(
        (tick) => tick.status === "Good"
      ).length;
      const failedChecks = totalTicks - successfulChecks;

      return {
        id: website.id,
        url: website.url,
        status: currentStatus,
        uptimePercentage,
        lastChecked,
        uptimeTicks: windows,
        tickData,
        averageResponseTime: avgResponseTime,
        lastResponseTime: lastResponseTime,
        totalChecks: totalTicks,
        successfulChecks,
        failedChecks,
      };
    });
  }, [websites]);

  const filteredWebsites = useMemo(() => {
    return processedWebsites.filter((website) => {
      const matchesSearch = website.url
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        statusFilter === "all" ||
        (statusFilter === "good" && website.status === "good") ||
        (statusFilter === "bad" && website.status === "bad") ||
        (statusFilter === "unknown" && website.status === "unknown");

      return matchesSearch && matchesFilter;
    });
  }, [processedWebsites, searchQuery, statusFilter]);

  const handleRecheck = useCallback(
    async (websiteId: string) => {
      setRecheckingIds((prev) => new Set(prev).add(websiteId));

      try {
        const token = await getToken();
        await axios.post(
          `${API_BACKEND_URL}/api/v1/website/${websiteId}/check`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Website rechecked successfully!");
        refreshWebsites();
      } catch (error) {
        toast.error("Failed to recheck website");
      } finally {
        setRecheckingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(websiteId);
          return newSet;
        });
      }
    },
    [getToken, refreshWebsites]
  );

  const handleDelete = useCallback(
    async (websiteId: string) => {
      try {
        const token = await getToken();
        await axios.delete(`${API_BACKEND_URL}/api/v1/website/${websiteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("Website deleted successfully!");
        refreshWebsites();
      } catch (error) {
        toast.error("Failed to delete website");
      }
    },
    [getToken, refreshWebsites]
  );

  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className=" min-h-screen bg-black flex">
      <Sidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddWebsite={() => setIsModalOpen(true)}
        websites={processedWebsites}
      />

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-8 pb-24 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Monitor your sites from here
              </h2>
              <p className="text-gray-400">
                {filteredWebsites.length} of {processedWebsites.length} websites
              </p>
            </div>

            <div className="space-y-6">
              {filteredWebsites.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-xl font-semibold text-gray-400 mb-2">
                    {searchQuery || statusFilter !== "all"
                      ? "No websites match your filters"
                      : "No websites added yet"}
                  </div>
                  <p className="text-gray-500">
                    {searchQuery || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "Add your first website to start monitoring uptime"}
                  </p>
                </div>
              ) : (
                filteredWebsites.map((website) => (
                  <WebsiteCard
                    key={website.id}
                    website={website}
                    onRecheck={handleRecheck}
                    onEdit={setEditingWebsite}
                    onDelete={handleDelete}
                    isRechecking={recheckingIds.has(website.id)}
                  />
                ))
              )}
            </div>
            <Footer />
          </div>
        </div>

        {/* Right Panel - Website Summary */}
        {selectedWebsite && (
          <div className="w-96 bg-gray-950 border-l border-gray-800 p-6 overflow-auto">
            <WebsiteSummary
              website={processedWebsites.find((w) => w.id === selectedWebsite)!}
            />
          </div>
        )}
      </div>

      {/* Create Website Modal */}
      <WebsiteModal
        isOpen={isModalOpen}
        mode="create"
        onClose={async (data) => {
          if (data === null) {
            setIsModalOpen(false);
            return;
          }

          const token = await getToken();
          setIsModalOpen(false);

          try {
            await axios.post(
              `${API_BACKEND_URL}/api/v1/website`,
              { url: data.url },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Website added successfully!");
            refreshWebsites();
          } catch (error) {
            toast.error("Failed to add website");
          }
        }}
      />

      {/* Edit Website Modal */}
      <WebsiteModal
        isOpen={!!editingWebsite}
        mode="edit"
        website={editingWebsite}
        onClose={async (data) => {
          if (data === null) {
            setEditingWebsite(null);
            return;
          }

          const token = await getToken();
          const websiteId = editingWebsite.id;
          setEditingWebsite(null);

          try {
            await axios.put(
              `${API_BACKEND_URL}/api/v1/website/${websiteId}`,
              { url: data.url },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            toast.success("Website updated successfully!");
            refreshWebsites();
          } catch (error) {
            toast.error("Failed to update website");
          }
        }}
      />
    </div>
  );
}

export default App;

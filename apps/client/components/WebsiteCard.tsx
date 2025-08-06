import React, { useState } from "react";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  Globe,
  AlertTriangle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LatencyGraph } from "./LatencyGraph";

type UptimeStatus = "good" | "bad" | "unknown";

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

function StatusIndicator({ status }: { status: UptimeStatus }) {
  const getStatusConfig = () => {
    switch (status) {
      case "good":
        return {
          bg: "bg-emerald-500",
          glow: "shadow-emerald-500/50",
          pulse: "animate-pulse",
          text: "Online",
          textColor: "text-emerald-400",
        };
      case "bad":
        return {
          bg: "bg-red-500",
          glow: "shadow-red-500/50",
          pulse: "animate-pulse",
          text: "Offline",
          textColor: "text-red-400",
        };
      default:
        return {
          bg: "bg-amber-500",
          glow: "shadow-amber-500/50",
          pulse: "animate-pulse",
          text: "Unknown",
          textColor: "text-amber-400",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={`w-3 h-3 rounded-full ${config.bg} shadow-lg ${config.glow} ${config.pulse}`}
        />
        <div
          className={`absolute inset-0 w-3 h-3 rounded-full ${config.bg} opacity-75 animate-ping`}
        />
      </div>
      <span className={`text-sm font-medium ${config.textColor}`}>
        {config.text}
      </span>
    </div>
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
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-1">
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

export default function WebsiteCard({
  website,
  onRecheck,
  onEdit,
  onDelete,
  isRechecking,
}: {
  website: ProcessedWebsite;
  onRecheck: (id: string) => void;
  onEdit: (website: ProcessedWebsite) => void;
  onDelete: (id: string) => void;
  isRechecking: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return "text-emerald-400";
    if (uptime >= 95) return "text-amber-400";
    return "text-red-400";
  };

  const formatUrl = (url: string) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <div className="relative bg-[#0a0a0a] border border-gray-600 rounded-xl shadow-xl overflow-hidden hover:border-gray-700 transition-all duration-300">
        <div
          className="p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-zinc-900 transition-colors duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-4">
            <StatusIndicator status={website.status} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <h3 className="font-semibold text-white text-lg">
                  {formatUrl(website.url)}
                </h3>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {getRelativeTime(website.lastChecked)}
                </span>
                {website.status === "unknown" && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="text-sm">Checking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <span
                className={`text-lg font-bold tabular-nums ${getUptimeColor(website.uptimePercentage)}`}
              >
                {website.uptimePercentage.toFixed(1)}%
              </span>
              <div className="text-sm text-gray-300 space-y-1">
                <div className="flex items-center justify-end gap-1">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  <span className="tabular-nums">
                    Avg: {website.averageResponseTime}ms
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" />
                  <span className="tabular-nums">
                    Last: {website.lastResponseTime}ms
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRecheck(website.id);
                }}
                disabled={isRechecking}
                title="Check now"
                className="px-3 py-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/30 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRechecking ? "Checking..." : "Check"}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(website);
                }}
                title="Edit"
                className="px-3 py-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 rounded-md transition-all duration-200"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                title="Delete"
                className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-md transition-all duration-200"
              >
                Remove
              </button>

              <div className="ml-2 p-1">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                )}
              </div>
            </div> */}
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 pb-6 border-t border-gray-800 bg-gray-800/30">
            <div className="mt-6 space-y-6">
              {/* Stats summary */}
              <div className="flex justify-between text-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  <span className="text-orange-400 pr-1">
                    {website.totalChecks.toLocaleString()}
                  </span>
                  checks:
                  <span className="text-green-400 ml-1">
                    {website.successfulChecks.toLocaleString()}✓
                  </span>
                  ,{" "}
                  <span className="text-red-400">
                    {website.failedChecks.toLocaleString()}✗
                  </span>
                </h3>
                <div className="text-xs text-slate-400">Last 30 minutes</div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2 font-medium">
                    Status timeline:
                  </p>
                  <UptimeTicks
                    ticks={website.uptimeTicks}
                    tickData={website.tickData}
                  />
                </div>

                <LatencyGraph
                  data={website.tickData}
                  averageLatency={website.averageResponseTime}
                  className="lg:col-span-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                Delete Website Monitor
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to stop monitoring{" "}
                <span className="text-white font-medium">
                  {formatUrl(website.url)}
                </span>
                ? This will permanently delete all historical data and cannot be
                undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(website.id);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import React from "react";
import {
  Globe,
  Clock,
  Zap,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
} from "lucide-react";

interface WebsiteSummaryProps {
  website: {
    id: string;
    url: string;
    status: "good" | "bad" | "unknown";
    uptimePercentage: number;
    averageResponseTime: number;
    lastResponseTime: number;
    lastChecked: string;
    totalChecks: number;
    successfulChecks: number;
    failedChecks: number;
  };
}

export function WebsiteSummary({ website }: WebsiteSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400";
      case "bad":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500/20 border-green-500/30";
      case "bad":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return "text-green-400";
    if (uptime >= 95) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg border ${getStatusBg(website.status)}`}
          >
            <Globe className={`w-5 h-5 ${getStatusColor(website.status)}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg truncate max-w-xs">
              {website.url.replace(/^https?:\/\//, "")}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`text-sm capitalize ${getStatusColor(website.status)}`}
              >
                {website.status}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {website.lastChecked}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-2xl font-bold ${getUptimeColor(website.uptimePercentage)}`}
          >
            {website.uptimePercentage.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">uptime</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Response Time</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Average</span>
              <span className="text-sm font-medium text-white">
                {website.averageResponseTime}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Latest</span>
              <span className="text-sm font-medium text-orange-400">
                {website.lastResponseTime}ms
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Check Stats</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Total</span>
              <span className="text-sm font-medium text-white">
                {website.totalChecks}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Success</span>
              <span className="text-sm font-medium text-green-400">
                {website.successfulChecks}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-400">
            {website.successfulChecks}
          </div>
          <div className="text-xs text-gray-400">Success</div>
        </div>
        <div className="text-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-red-400">
            {website.failedChecks}
          </div>
          <div className="text-xs text-gray-400">Failed</div>
        </div>
        <div className="text-center">
          <TrendingUp className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-orange-400">
            {website.totalChecks > 0
              ? (
                  (website.successfulChecks / website.totalChecks) *
                  100
                ).toFixed(0)
              : 0}
            %
          </div>
          <div className="text-xs text-gray-400">Reliability</div>
        </div>
      </div>
    </div>
  );
}

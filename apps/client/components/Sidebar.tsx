"use client";
import React, { useState, useEffect } from "react";
import {
  Globe,
  Plus,
  Search,
  Filter,
  BarChart3,
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Menu,
  Zap,
  Shield,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  onAddWebsite: () => void;
  websites: any[];
}

// Animated Counter Component
const AnimatedCounter = ({
  value,
  duration = 1000,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value, duration]);

  return <span>{count}</span>;
};

export function Sidebar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onAddWebsite,
  websites,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWebsites = websites.length;
  const goodWebsites = websites.filter((w) => w.status === "good").length;
  const badWebsites = websites.filter((w) => w.status === "bad").length;
  const unknownWebsites = websites.filter((w) => w.status === "unknown").length;

  const overallUptime =
    totalWebsites > 0
      ? websites.reduce((sum, w) => sum + w.uptimePercentage, 0) / totalWebsites
      : 100;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-slate-950 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setIsCollapsed(true)}
      />

      {/* Sidebar */}
      <div
        className={`
    ${isCollapsed ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
    fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
    w-80 lg:w-80 md:w-72 sm:w-64
    bg-[#0a0a0a]
    border-r border-slate-800/50 h-full flex flex-col
    overflow-y-auto sidebar
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    shadow-2xl lg:shadow-none
  `}
      >
        {/* Mobile close button */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors duration-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="relative p-6 border-b border-slate-800/30">
          <Button
            onClick={onAddWebsite}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Plus className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
            <span className="hidden sm:inline">Add Website</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="relative p-6 border-b border-slate-800/30">
          <h2 className="text-sm font-semibold text-slate-300 mb-6 flex items-center">
            <div className="w-5 h-5 mr-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded flex items-center justify-center">
              <BarChart3 className="w-3 h-3 text-blue-400" />
            </div>
            Overview
          </h2>

          <div className="space-y-5">
            {/* Main uptime card */}
            <div className="group relative overflow-hidden bg-[#0a0a0a] backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 hover:border-slate-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between mb-3">
                <span className="text-slate-400 text-sm font-medium">
                  Overall Uptime
                </span>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                </div>
              </div>
              <div className="relative text-3xl font-bold text-white mb-1">
                {mounted ? (
                  <AnimatedCounter
                    value={parseFloat(overallUptime.toFixed(1))}
                  />
                ) : (
                  "0"
                )}
                %
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: mounted ? `${overallUptime}%` : "0%" }}
                ></div>
              </div>
            </div>

            {/* Status cards grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="group bg-[#0a0a0a] backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-green-500/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-green-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-50" />
                  </div>
                  <div className="text-xl font-bold text-green-400 mb-1">
                    {mounted ? <AnimatedCounter value={goodWebsites} /> : "0"}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Online
                  </div>
                </div>
              </div>

              <div className="group bg-[#0a0a0a] backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-red-500/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-red-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-xl font-bold text-red-400 mb-1">
                    {mounted ? <AnimatedCounter value={badWebsites} /> : "0"}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Down</div>
                </div>
              </div>

              <div className="group bg-[#0a0a0a] backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-slate-500/30 transition-all duration-300 text-center hover:shadow-lg hover:shadow-slate-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="text-xl font-bold text-slate-400 mb-1">
                    {mounted ? (
                      <AnimatedCounter value={unknownWebsites} />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="relative p-6 border-b border-slate-800/30">
          <h2 className="text-sm font-semibold text-slate-300 mb-6 flex items-center">
            <div className="w-5 h-5 mr-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center">
              <Search className="w-3 h-3 text-purple-400" />
            </div>
            <span className="hidden sm:inline">Search & Filter</span>
            <span className="sm:hidden">Filter</span>
          </h2>

          <div className="space-y-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors duration-200 group-focus-within:text-orange-400" />
              <Input
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/40 backdrop-blur-sm border-slate-700/30 text-white placeholder-slate-500 focus:border-orange-500/50 focus:ring-orange-500/20 transition-all duration-200 hover:bg-slate-800/60"
              />
            </div>

            <div className="relative">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-800/40 backdrop-blur-sm border-slate-700/30 text-white hover:bg-slate-800/60 transition-all duration-200">
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-slate-400" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-md border-slate-700/50">
                  <SelectItem
                    value="all"
                    className="text-white hover:bg-slate-800/50 focus:bg-slate-800/50"
                  >
                    All Status
                  </SelectItem>
                  <SelectItem
                    value="good"
                    className="text-green-400 hover:bg-slate-800/50 focus:bg-slate-800/50"
                  >
                    Online
                  </SelectItem>
                  <SelectItem
                    value="bad"
                    className="text-red-400 hover:bg-slate-800/50 focus:bg-slate-800/50"
                  >
                    Down
                  </SelectItem>
                  <SelectItem
                    value="unknown"
                    className="text-slate-400 hover:bg-slate-800/50 focus:bg-slate-800/50"
                  >
                    Pending
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="relative p-6 flex-1">
          <h2 className="text-sm font-semibold text-slate-300 mb-6 flex items-center">
            <div className="w-5 h-5 mr-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded flex items-center justify-center">
              <Activity className="w-3 h-3 text-cyan-400" />
            </div>
            <span className="hidden sm:inline">Quick Stats</span>
            <span className="sm:hidden">Stats</span>
          </h2>

          <div className="space-y-4">
            <div className="group flex justify-between items-center p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-slate-400 text-sm font-medium">
                  Total Sites
                </span>
              </div>
              <span className="text-white font-bold">
                {mounted ? <AnimatedCounter value={totalWebsites} /> : "0"}
              </span>
            </div>

            <div className="group flex justify-between items-center p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-slate-400 text-sm font-medium">
                  Monitored
                </span>
              </div>
              <span className="text-orange-400 font-bold">
                {mounted ? <AnimatedCounter value={totalWebsites} /> : "0"}
              </span>
            </div>

            <div className="group flex justify-between items-center p-3 rounded-lg hover:bg-slate-800/30 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-slate-400 text-sm font-medium">
                  Active
                </span>
              </div>
              <span className="text-green-400 font-bold">
                {mounted ? (
                  <AnimatedCounter value={goodWebsites + badWebsites} />
                ) : (
                  "0"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl text-orange-400 hover:text-orange-300 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isCollapsed
            ? "translate-x-0 opacity-100"
            : "-translate-x-20 opacity-0 pointer-events-none"
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}

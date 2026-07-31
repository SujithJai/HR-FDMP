"use client";

import { useState, useEffect } from "react";
import { FilmIcon, Grid3x3, List, Download, Eye, Plus, X } from "lucide-react";
import { ModulePage } from "@/components/ModulePage";
import { formatNumber, getStatusColor, formatStatus } from "@/lib/utils";

interface AssetItem {
  id: string | number;
  name: string;
  type: string;
  project: string;
  size: string;
  version: number | string;
  status: string;
  downloads: number;
  views: number;
  thumbnail: string;
}

const INITIAL_ASSETS: AssetItem[] = [
  { id: 1, name: "Kaal_Official_Teaser_4K_Final.mp4", type: "video", project: "Project Kaal", size: "4.2 GB", version: "2.4", status: "approved", downloads: 1500, views: 12000, thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400" },
  { id: 2, name: "CyberCity_Poster_Main_8K.psd", type: "poster", project: "Cyber City", size: "850 MB", version: "1.0", status: "approved", downloads: 500, views: 3500, thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400" },
  { id: 3, name: "Chola_Docu_BGM_Master_Stereo.wav", type: "audio", project: "The Legend of Chola", size: "320 MB", version: "3.1", status: "approved", downloads: 210, views: 890, thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" },
  { id: 4, name: "Kaal_Storyboards_Act3.pdf", type: "script", project: "Project Kaal", size: "45 MB", version: "1.2", status: "pending", downloads: 80, views: 400, thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400" },
];

const categories = ["All", "Poster", "Trailer", "Video", "Photo", "Audio", "Script", "Storyboard"];

export default function AssetsPage() {
  const [assetList, setAssetList] = useState<AssetItem[]>(INITIAL_ASSETS);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "video",
    project: "Project Kaal",
    size: "15 MB",
  });

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          const formatted = data.data.map((ast: any, idx: number) => ({
            id: ast.id || `ast-${idx}`,
            name: ast.name || "Untitled Asset",
            type: (ast.type || "video").toLowerCase(),
            project: ast.projectName || ast.project || "General Production",
            size: ast.size || "25 MB",
            version: ast.version || "1.0",
            status: ast.status || "approved",
            downloads: ast.downloads || Math.floor(Math.random() * 200) + 10,
            views: ast.views || Math.floor(Math.random() * 1000) + 100,
            thumbnail: `https://images.unsplash.com/photo-${1478720568477 + idx * 100}?w=400`,
          }));
          setAssetList(formatted);
        }
      })
      .catch((err) => console.log("Assets API notice:", err));
  }, []);

  const handleUploadAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await res.json();

      const newAst: AssetItem = {
        id: `ast-${Date.now()}`,
        name: formData.name,
        type: formData.type,
        project: formData.project,
        size: formData.size,
        version: "1.0",
        status: "approved",
        downloads: 0,
        views: 1,
        thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
      };

      setAssetList([newAst, ...assetList]);
      setIsModalOpen(false);
      setFormData({ name: "", type: "video", project: "Project Kaal", size: "15 MB" });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAssets = activeCategory === "All"
    ? assetList
    : assetList.filter((a) => a.type.toLowerCase() === activeCategory.toLowerCase());

  return (
    <ModulePage
      title="Digital Asset Management"
      subtitle="Organize, preview and distribute media assets"
      icon={<FilmIcon className="w-6 h-6 text-white" />}
      actionLabel="Upload Asset"
      onAction={() => setIsModalOpen(true)}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Assets", value: assetList.length + 2450 },
          { label: "Storage Used", value: "2.8 TB" },
          { label: "Downloads", value: "18.4K" },
          { label: "Pending Approval", value: 3 },
        ].map((stat) => (
          <div key={stat.label} className="card-3d rounded-[22px] p-5">
            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            <div className="font-display text-3xl font-bold gradient-text mt-1">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card-3d rounded-[22px] p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-brand-500 to-cyan-400 text-white shadow-lg"
                    : "bg-white/70 text-slate-600 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:ml-auto">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-brand-100 text-brand-600" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-brand-100 text-brand-600" : "text-slate-500 hover:bg-slate-100"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="card-3d rounded-[22px] overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={asset.thumbnail}
                  alt={asset.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 ${getStatusColor(asset.status)}`}>
                    {formatStatus(asset.status)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm bg-black/70 text-white">
                    v{asset.version}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg backdrop-blur-sm bg-white/90 hover:bg-white text-slate-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg backdrop-blur-sm bg-white/90 hover:bg-white text-slate-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-1 truncate">{asset.name}</h4>
                <p className="text-xs text-slate-500 mb-3">{asset.project}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="uppercase font-bold">{asset.type}</span>
                  <span>{asset.size}</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">{formatNumber(asset.views)} views</span>
                  <span className="text-slate-500">{formatNumber(asset.downloads)} downloads</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-3d rounded-[22px] overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Asset</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Project</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Version</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-3">Stats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={asset.thumbnail} alt={asset.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900">{asset.name}</div>
                        <div className="text-xs text-slate-500">{asset.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm uppercase font-bold text-slate-600">{asset.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{asset.project}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">v{asset.version}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(asset.status)}`}>
                      {formatStatus(asset.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {formatNumber(asset.views)} views · {formatNumber(asset.downloads)} downloads
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-500" /> Upload Digital Asset
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUploadAsset} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700">File Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="Kaal_Teaser_Final_4K.mp4"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Asset Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  >
                    <option value="video">Video / Footage</option>
                    <option value="poster">Poster / Image</option>
                    <option value="audio">Audio / BGM</option>
                    <option value="script">Script / Doc</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Associated Project</label>
                  <input
                    type="text"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                    placeholder="Project Kaal"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Estimated File Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-xl text-sm"
                  placeholder="120 MB"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-premium px-5 py-2 text-sm font-semibold rounded-xl">
                  Upload Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ModulePage>
  );
}


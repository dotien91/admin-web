'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient, CreateCompositionDto } from '@/lib/api';

export default function ParseHtmlPage() {
  const router = useRouter();
  const [html, setHtml] = useState('');
  const [parsedData, setParsedData] = useState<CreateCompositionDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleParse = async () => {
    if (!html.trim()) {
      setError('Vui lòng nhập HTML');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setParsedData(null);

    try {
      const result = await apiClient.parseMobalyticsHTML(html);
      setParsedData(result);
      setSuccess('Parse HTML thành công!');
    } catch (err) {
      console.error('Error parsing HTML:', err);
      setError(err instanceof Error ? err.message : 'Không thể parse HTML');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!parsedData) return;

    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      await apiClient.createComposition(parsedData);
      setSuccess('Tạo composition thành công!');
      setTimeout(() => {
        router.push('/admin/compositions');
      }, 1500);
    } catch (err) {
      console.error('Error creating composition:', err);
      setError(err instanceof Error ? err.message : 'Không thể tạo composition');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin/compositions"
              className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
            >
              ← Quay lại
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">
            Parse HTML từ Mobalytics
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Dán HTML từ trang Mobalytics để tự động tạo composition
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200 font-medium mb-2">Lỗi</p>
            <p className="text-red-700 dark:text-red-300 text-sm whitespace-pre-line">{error}</p>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-800 dark:text-green-200 font-medium">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: HTML Input */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Nhập HTML
            </h2>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Dán HTML từ trang Mobalytics vào đây..."
              className="w-full h-96 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono text-sm"
            />
            <button
              onClick={handleParse}
              disabled={loading || !html.trim()}
              className="mt-4 w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Đang parse...' : 'Parse HTML'}
            </button>
          </div>

          {/* Right: Parsed Result */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                Kết quả
              </h2>
              {parsedData && (
                <button
                  onClick={handleCreate}
                  disabled={creating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {creating ? 'Đang tạo...' : 'Tạo Composition'}
                </button>
              )}
            </div>

            {!parsedData ? (
              <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
                <p>Kết quả parse sẽ hiển thị ở đây</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {/* Basic Info */}
                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                    Thông tin cơ bản
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Comp ID: </span>
                      <span className="text-black dark:text-zinc-50 font-mono">
                        {parsedData.compId}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Tên: </span>
                      <span className="text-black dark:text-zinc-50 font-semibold">
                        {parsedData.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Tier: </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          parsedData.tier === 'S'
                            ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200'
                            : parsedData.tier === 'A'
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
                            : parsedData.tier === 'B'
                            ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200'
                            : parsedData.tier === 'C'
                            ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                            : 'bg-gray-100 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {parsedData.tier || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Plan: </span>
                      <span className="text-black dark:text-zinc-50">
                        {parsedData.plan || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Độ khó: </span>
                      <span className="text-black dark:text-zinc-50">
                        {parsedData.difficulty || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">Late Game: </span>
                      <span className="text-black dark:text-zinc-50">
                        {parsedData.isLateGame ? '✓' : '✗'}
                      </span>
                    </div>
                    {parsedData.metaDescription && (
                      <div>
                        <span className="text-zinc-600 dark:text-zinc-400">Mô tả: </span>
                        <span className="text-black dark:text-zinc-50">
                          {parsedData.metaDescription}
                        </span>
                      </div>
                    )}
                    {parsedData.carouselPriority !== undefined && (
                      <div>
                        <span className="text-zinc-600 dark:text-zinc-400">Carousel Priority: </span>
                        <span className="text-black dark:text-zinc-50 font-semibold">
                          {parsedData.carouselPriority}
                        </span>
                      </div>
                    )}
                    {parsedData.coreChampion && (
                      <div>
                        <span className="text-zinc-600 dark:text-zinc-400">Core Champion: </span>
                        <div className="mt-1 text-black dark:text-zinc-50">
                          <span className="font-semibold">{parsedData.coreChampion.name}</span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2">
                            ({parsedData.coreChampion.championKey}) | Cost: {parsedData.coreChampion.cost} | Star: {parsedData.coreChampion.star}
                            {parsedData.coreChampion.items && parsedData.coreChampion.items.length > 0 && (
                              <span> | Items: {parsedData.coreChampion.items.length}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Augments */}
                {parsedData.augments && parsedData.augments.length > 0 && (
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                    <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                      Augments ({parsedData.augments.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.augments.map((augment, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-sm text-blue-800 dark:text-blue-200 flex items-center gap-1"
                        >
                          <span className="font-semibold">T{augment.tier}:</span>
                          <span>{augment.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Units */}
                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                    Units ({parsedData.units.length})
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {parsedData.units.map((unit, index) => (
                      <div
                        key={index}
                        className="border border-zinc-200 dark:border-zinc-700 rounded p-2 text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-black dark:text-zinc-50">
                            {unit.name}
                          </span>
                          <span className="text-zinc-600 dark:text-zinc-400 text-xs">
                            {unit.championKey}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          Position: ({unit.position.row}, {unit.position.col}) | Star:{' '}
                          {unit.star} | Cost: {unit.cost}
                          {unit.items && unit.items.length > 0 && (
                            <span> | Items: {unit.items.length}</span>
                          )}
                          {unit.needUnlock && <span> | 🔒 Cần unlock</span>}
                        </div>
                        {unit.items && unit.items.length > 0 && (
                          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Items: {unit.items.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carry Items */}
                {parsedData.carryItems && parsedData.carryItems.length > 0 && (
                  <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                    <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                      Carry Items ({parsedData.carryItems.length})
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {parsedData.carryItems.map((carry, index) => (
                        <div
                          key={index}
                          className="border border-zinc-200 dark:border-zinc-700 rounded p-2 text-sm"
                        >
                          <div className="font-medium text-black dark:text-zinc-50">
                            {carry.championName}
                          </div>
                          <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                            Items: {carry.items.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Board Size */}
                <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                  <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                    Board Size
                  </h3>
                  <div className="text-sm text-black dark:text-zinc-50">
                    {parsedData.boardSize.rows} x {parsedData.boardSize.cols}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


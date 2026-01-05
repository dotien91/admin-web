'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient, Composition, FilterCompositionDto } from '@/lib/api';

export default function CompositionsPage() {
  const [compositions, setCompositions] = useState<Composition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filters, setFilters] = useState<FilterCompositionDto>({});
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    // Show API URL for debugging
    setApiUrl(apiClient.getBaseUrl() + '/compositions');
  }, []);

  const fetchCompositions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getCompositions({
        page,
        limit,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });
      setCompositions(response.data);
      setHasNextPage(response.hasNextPage);
    } catch (err) {
      console.error('Error fetching compositions:', err);
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải dữ liệu';
      setError(errorMessage);
      // Set empty array on error to prevent UI issues
      setCompositions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompositions();
  }, [page, filters]);

  const handleDelete = async (id: string | number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa composition này?')) {
      return;
    }

    try {
      await apiClient.deleteComposition(id);
      fetchCompositions();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Không thể xóa composition');
    }
  };

  const handleFilterChange = (key: keyof FilterCompositionDto, value: string | boolean | null) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === '' ? null : value,
    }));
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Quản trị Compositions
            </h1>
            <p className="text-gray-600 text-sm">
              Quản lý danh sách compositions
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/compositions/parse-html"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Parse HTML
            </Link>
            <Link
              href="/admin/compositions/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              + Tạo mới
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Bộ lọc</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tên
              </label>
              <input
                type="text"
                value={filters.name || ''}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                placeholder="Tìm theo tên..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Comp ID
              </label>
              <input
                type="text"
                value={filters.compId || ''}
                onChange={(e) => handleFilterChange('compId', e.target.value)}
                placeholder="Tìm theo compId..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Độ khó
              </label>
              <select
                value={filters.difficulty || ''}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tier
              </label>
              <select
                value={filters.tier || ''}
                onChange={(e) => handleFilterChange('tier', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Late Game
              </label>
              <select
                value={filters.isLateGame === undefined ? '' : filters.isLateGame ? 'true' : 'false'}
                onChange={(e) => handleFilterChange('isLateGame', e.target.value === '' ? null : e.target.value === 'true')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium mb-2">Lỗi kết nối API</p>
            <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
            <div className="mt-3 text-sm text-red-600 dark:text-red-400">
              <p className="font-medium mb-2">Vui lòng kiểm tra:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>API server có đang chạy tại http://localhost:3900?</li>
                <li>Kiểm tra console (F12) để xem chi tiết lỗi</li>
                <li>Nếu API chạy ở port khác, tạo file .env.local với NEXT_PUBLIC_API_URL</li>
              </ul>
              {apiUrl && (
                <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs font-mono break-all">
                  API URL: {apiUrl}
                </div>
              )}
              <button
                onClick={fetchCompositions}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Đang tải...</p>
            </div>
          ) : compositions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">Không có composition nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Comp ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Độ khó
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Late Game
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Units
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {compositions.map((comp) => (
                    <tr key={comp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {comp.compId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comp.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {comp.tier ? (
                          <span className={`px-2 py-1 rounded font-semibold text-xs ${
                            comp.tier === 'S' ? 'bg-purple-100 text-purple-800' :
                            comp.tier === 'A' ? 'bg-red-100 text-red-800' :
                            comp.tier === 'B' ? 'bg-orange-100 text-orange-800' :
                            comp.tier === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {comp.tier}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {comp.difficulty || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {comp.isLateGame ? '✓' : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {comp.units.length} units
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/compositions/${comp.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Sửa
                          </Link>
                          <button
                            onClick={() => handleDelete(comp.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && compositions.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-900"
              >
                Trước
              </button>
              <span className="text-sm text-gray-600">
                Trang {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNextPage}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-gray-900"
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


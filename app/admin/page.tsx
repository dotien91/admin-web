'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Compositions',
      value: '0',
      href: '/admin/compositions',
      icon: '📋',
      description: 'Quản lý compositions',
    },
    {
      name: 'Parse HTML',
      value: 'New',
      href: '/admin/compositions/parse-html',
      icon: '🔍',
      description: 'Parse HTML từ Mobalytics',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Chào mừng trở lại, {user?.email || 'Admin'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Quản lý và điều hành hệ thống TFT Compositions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-4xl mr-4">{stat.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/admin/compositions/new"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mr-3">➕</span>
              <div>
                <p className="font-medium text-gray-900">Tạo Composition mới</p>
                <p className="text-sm text-gray-500">Thêm composition thủ công</p>
              </div>
            </Link>
            <Link
              href="/admin/compositions/parse-html"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mr-3">📥</span>
              <div>
                <p className="font-medium text-gray-900">Parse từ HTML</p>
                <p className="text-sm text-gray-500">Import từ Mobalytics</p>
              </div>
            </Link>
            <Link
              href="/admin/compositions"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mr-3">📋</span>
              <div>
                <p className="font-medium text-gray-900">Xem tất cả</p>
                <p className="text-sm text-gray-500">Danh sách compositions</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


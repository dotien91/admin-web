'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, CreateCompositionDto, BoardSize, Synergy, Unit, CarryItem, TftUnit, TftTrait, Item } from '@/lib/api';

export default function NewCompositionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<TftUnit[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [traits, setTraits] = useState<TftTrait[]>([]);
  const [loadingTraits, setLoadingTraits] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  const [formData, setFormData] = useState<CreateCompositionDto>({
    compId: '',
    name: '',
    plan: '',
    difficulty: '',
    metaDescription: '',
    isLateGame: false,
    tier: '',
    boardSize: { rows: 4, cols: 7 },
    synergies: [],
    units: [],
    bench: [],
    carryItems: [],
    notes: [],
  });

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoadingUnits(true);
        const data = await apiClient.getAllUnits();
        setUnits(data);
      } catch (err) {
        console.error('Error fetching units:', err);
      } finally {
        setLoadingUnits(false);
      }
    };

    const fetchTraits = async () => {
      try {
        setLoadingTraits(true);
        const data = await apiClient.getAllTraits();
        setTraits(data);
      } catch (err) {
        console.error('Error fetching traits:', err);
      } finally {
        setLoadingTraits(false);
      }
    };

    const fetchItems = async () => {
      try {
        setLoadingItems(true);
        const data = await apiClient.getAllItems();
        setItems(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchUnits();
    fetchTraits();
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Không gửi synergies và compId, để API tự tính toán/tạo
      const { synergies, compId, ...dataToSend } = formData;
      await apiClient.createComposition({
        ...dataToSend,
        synergies: [], // Gửi empty array để API tự tính
        compId: undefined, // Không gửi để API tự tạo
      });
      router.push('/admin/compositions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tạo composition');
    } finally {
      setLoading(false);
    }
  };

  const addSynergy = () => {
    setFormData((prev) => ({
      ...prev,
      synergies: [
        ...prev.synergies,
        { id: '', name: '', abbreviation: '', count: 0, max: 0, color: '#000000' },
      ],
    }));
  };

  const updateSynergy = (index: number, field: keyof Synergy, value: any) => {
    setFormData((prev) => ({
      ...prev,
      synergies: prev.synergies.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  const removeSynergy = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      synergies: prev.synergies.filter((_, i) => i !== index),
    }));
  };

  const handleSynergySelect = (index: number, traitId: string) => {
    const selectedTrait = traits.find((t) => t.id.toString() === traitId);
    if (selectedTrait) {
      // Tạo abbreviation từ name (lấy 2-3 chữ cái đầu)
      const abbreviation = selectedTrait.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .substring(0, 3)
        .toUpperCase();

      setFormData((prev) => ({
        ...prev,
        synergies: prev.synergies.map((s, i) =>
          i === index
            ? {
                ...s,
                id: selectedTrait.apiName || selectedTrait.name.toLowerCase().replace(/\s+/g, '-'),
                name: selectedTrait.name,
                abbreviation: abbreviation,
              }
            : s
        ),
      }));
    }
  };

  const addUnit = () => {
    setFormData((prev) => ({
      ...prev,
      units: [
        ...prev.units,
        {
          championId: '',
          championKey: '',
          name: '',
          cost: 1,
          star: 1,
          need3Star: false,
          position: { row: 0, col: 0 },
          items: [],
        },
      ],
    }));
  };

  const updateUnit = (index: number, field: keyof Unit, value: any) => {
    setFormData((prev) => ({
      ...prev,
      units: prev.units.map((u, i) =>
        i === index ? { ...u, [field]: value } : u
      ),
    }));
  };

  const handleUnitSelect = (index: number, unitId: string) => {
    const selectedUnit = units.find((u) => u.id.toString() === unitId);
    if (selectedUnit) {
      setFormData((prev) => ({
        ...prev,
        units: prev.units.map((u, i) =>
          i === index
            ? {
                ...u,
                championId: selectedUnit.id.toString(),
                championKey: selectedUnit.apiName || selectedUnit.name.toLowerCase(),
                name: selectedUnit.name,
                cost: selectedUnit.cost || 1,
                image: selectedUnit.icon || selectedUnit.squareIcon || undefined,
              }
            : u
        ),
      }));
    }
  };

  const removeUnit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      units: prev.units.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">
            Tạo Composition mới
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Điền thông tin để tạo composition mới
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Thông tin cơ bản</h2>
            
            {/* Comp ID tự động tạo, không cần nhập */}
            {false && (
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Comp ID *
              </label>
              <input
                type="text"
                required
                value={formData.compId}
                onChange={(e) => setFormData({ ...formData, compId: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Tên *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Kế hoạch
                </label>
                <input
                  type="text"
                  value={formData.plan || ''}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Độ khó
                </label>
                <select
                  value={formData.difficulty || ''}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="">Chọn độ khó</option>
                  <option value="Dễ">Dễ</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Khó">Khó</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Tier
                </label>
                <select
                  value={formData.tier || ''}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                >
                  <option value="">Chọn tier</option>
                  <option value="S">S</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Mô tả meta
              </label>
              <textarea
                value={formData.metaDescription || ''}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLateGame"
                checked={formData.isLateGame}
                onChange={(e) => setFormData({ ...formData, isLateGame: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isLateGame" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Late Game
              </label>
            </div>
          </div>

          {/* Board Size - Mặc định 4x7, ẩn form */}
          {false && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Kích thước bàn cờ</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Số hàng *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.boardSize.rows}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      boardSize: { ...formData.boardSize, rows: parseInt(e.target.value) },
                    })
                  }
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                  Số cột *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.boardSize.cols}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      boardSize: { ...formData.boardSize, cols: parseInt(e.target.value) },
                    })
                  }
                  className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </div>
          </div>
          )}

          {/* Synergies - Tự động tính toán từ units */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Synergies</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Synergies sẽ được tự động tính toán từ units bạn chọn
                </p>
              </div>
            </div>
            {formData.synergies.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Lưu ý:</strong> Synergies hiện tại sẽ bị ghi đè bởi synergies được tính tự động từ units khi lưu.
                </p>
              </div>
            )}
            {/* Ẩn phần nhập synergies - chỉ hiển thị thông báo */}
            {false && (
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addSynergy}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600"
              >
                + Thêm Synergy
              </button>
            </div>
            )}
            {/* Synergies được tính tự động, không cần nhập */}
            {false && formData.synergies.map((synergy, index) => (
              <div key={index} className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Synergy {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSynergy(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                      Chọn Trait *
                    </label>
                    <select
                      value={synergy.id || ''}
                      onChange={(e) => handleSynergySelect(index, e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      disabled={loadingTraits}
                    >
                      <option value="">-- Chọn trait --</option>
                      {traits.map((t) => (
                        <option key={t.id} value={t.id.toString()}>
                          {t.name} - {t.apiName}
                        </option>
                      ))}
                    </select>
                    {loadingTraits && (
                      <p className="text-xs text-zinc-500 mt-1">Đang tải danh sách traits...</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        ID
                      </label>
                      <input
                        type="text"
                        value={synergy.id}
                        onChange={(e) => updateSynergy(index, 'id', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Tên
                      </label>
                      <input
                        type="text"
                        value={synergy.name}
                        onChange={(e) => updateSynergy(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Viết tắt
                      </label>
                      <input
                        type="text"
                        value={synergy.abbreviation}
                        onChange={(e) => updateSynergy(index, 'abbreviation', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Màu sắc
                      </label>
                      <input
                        type="color"
                        value={synergy.color}
                        onChange={(e) => updateSynergy(index, 'color', e.target.value)}
                        className="w-full h-10 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Count *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={synergy.count}
                        onChange={(e) => updateSynergy(index, 'count', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Max *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={synergy.max}
                        onChange={(e) => updateSynergy(index, 'max', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Units */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Units *</h2>
              <button
                type="button"
                onClick={addUnit}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-zinc-50 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600"
              >
                + Thêm Unit
              </button>
            </div>
            {formData.units.map((unit, index) => (
              <div key={index} className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Unit {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeUnit(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                      Chọn Unit *
                    </label>
                    <select
                      value={unit.championId || ''}
                      onChange={(e) => handleUnitSelect(index, e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      disabled={loadingUnits}
                    >
                      <option value="">-- Chọn unit --</option>
                      {units.map((u) => (
                        <option key={u.id} value={u.id.toString()}>
                          {u.name} {u.cost ? `(${u.cost} cost)` : ''} - {u.apiName}
                        </option>
                      ))}
                    </select>
                    {loadingUnits && (
                      <p className="text-xs text-zinc-500 mt-1">Đang tải danh sách units...</p>
                    )}
                  </div>
                  {/* Thông tin cơ bản */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Champion ID
                      </label>
                      <input
                        type="text"
                        value={unit.championId}
                        onChange={(e) => updateUnit(index, 'championId', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Champion Key
                      </label>
                      <input
                        type="text"
                        value={unit.championKey}
                        onChange={(e) => updateUnit(index, 'championKey', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Tên
                      </label>
                      <input
                        type="text"
                        value={unit.name}
                        onChange={(e) => updateUnit(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                        Cost
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={unit.cost}
                        onChange={(e) => updateUnit(index, 'cost', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Star và Items ở giữa */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-200 dark:border-zinc-700 py-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                        Star *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={unit.star}
                        onChange={(e) => updateUnit(index, 'star', parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                        Items
                      </label>
                      <select
                        multiple
                        value={unit.items || []}
                        onChange={(e) => {
                          const selectedItems = Array.from(e.target.selectedOptions, option => option.value);
                          updateUnit(index, 'items', selectedItems);
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        disabled={loadingItems}
                      >
                        {items.map((item) => (
                          <option key={item.id} value={item.id.toString()}>
                            {item.name} {item.apiName ? `(${item.apiName})` : ''}
                          </option>
                        ))}
                      </select>
                      {loadingItems && (
                        <p className="text-xs text-zinc-500 mt-1">Đang tải danh sách items...</p>
                      )}
                      <p className="text-xs text-zinc-500 mt-1">
                        Giữ Ctrl/Cmd để chọn nhiều items
                      </p>
                      {unit.items && unit.items.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {unit.items.map((itemId) => {
                            const item = items.find((i) => i.id.toString() === itemId);
                            return item ? (
                              <span
                                key={itemId}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs text-blue-800 dark:text-blue-200"
                              >
                                {item.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Position và Checkbox */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                          Row
                        </label>
                        <input
                          type="number"
                          value={unit.position.row}
                          onChange={(e) =>
                            updateUnit(index, 'position', {
                              ...unit.position,
                              row: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium mb-1 text-zinc-600 dark:text-zinc-400">
                          Col
                        </label>
                        <input
                          type="number"
                          value={unit.position.col}
                          onChange={(e) =>
                            updateUnit(index, 'position', {
                              ...unit.position,
                              col: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`need3Star-${index}`}
                        checked={unit.need3Star || false}
                        onChange={(e) => updateUnit(index, 'need3Star', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`need3Star-${index}`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Cần lên 3 sao
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Đang tạo...' : 'Tạo Composition'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-black dark:text-zinc-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


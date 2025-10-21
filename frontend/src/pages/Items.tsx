import { useState, useEffect } from 'react'
import { Search, Package, Filter, Star } from 'lucide-react'
import { apiService } from '../services/api'

interface Item {
  id: string
  name: string
  type: string
  rarity: string
  level?: number
  stats?: Record<string, number>
  description?: string
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('')

  useEffect(() => {
    loadItems()
  }, [selectedType, selectedRarity])

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await apiService.getItems(selectedType, selectedRarity)
      setItems(response.data)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchItems = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await apiService.searchItems(searchQuery, selectedType)
      setItems(response.data)
    } catch (error) {
      console.error('Error searching items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchItems()
    } else {
      loadItems()
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common':
        return 'badge-success'
      case 'uncommon':
        return 'badge-primary'
      case 'rare':
        return 'badge-warning'
      case 'epic':
        return 'badge-error'
      default:
        return 'badge-success'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Danh mục vật phẩm
        </h1>
        <p className="text-lg text-gray-600">
          Khám phá các vật phẩm, trang bị và tài nguyên trong game
        </p>
      </div>

      {/* Search Section */}
      <div className="card">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm vật phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field"
              >
                <option value="">Tất cả loại</option>
                <option value="weapon">Vũ khí</option>
                <option value="armor">Trang bị</option>
                <option value="accessory">Phụ kiện</option>
                <option value="consumable">Vật phẩm tiêu dùng</option>
                <option value="material">Nguyên liệu</option>
              </select>
            </div>
            <div>
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="input-field"
              >
                <option value="">Tất cả độ hiếm</option>
                <option value="common">Thường</option>
                <option value="uncommon">Không thường</option>
                <option value="rare">Hiếm</option>
                <option value="epic">Huyền thoại</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
            <button
              type="button"
              onClick={loadItems}
              className="btn-secondary"
              disabled={loading}
            >
              Xem tất cả
            </button>
          </div>
        </form>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải dữ liệu...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <span className={`badge ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </span>
                      </div>
                      <p className="text-gray-600 capitalize">
                        {item.type}
                        {item.level && ` • Level ${item.level}`}
                      </p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {item.stats && Object.keys(item.stats).length > 0 && (
                      <div className="text-sm text-gray-600">
                        {Object.entries(item.stats).slice(0, 2).map(([key, value]) => (
                          <div key={key}>
                            {key}: +{value}
                          </div>
                        ))}
                        {Object.keys(item.stats).length > 2 && (
                          <div className="text-gray-400">
                            +{Object.keys(item.stats).length - 2} khác
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy vật phẩm
            </h3>
            <p className="text-gray-600">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Items

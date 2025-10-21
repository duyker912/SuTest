import { useState, useEffect } from 'react'
import { Search, User, MapPin, Calendar, Users } from 'lucide-react'
import { apiService } from '../services/api'

interface Character {
  id: string
  name: string
  level: number
  job: string
  server: string
  guild?: string
  lastLogin?: string
  created?: string
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedServer, setSelectedServer] = useState('')
  const [servers, setServers] = useState<string[]>([])

  useEffect(() => {
    loadServers()
    loadCharacters()
  }, [])

  const loadServers = async () => {
    try {
      const response = await apiService.getServers()
      setServers(response.data)
    } catch (error) {
      console.error('Error loading servers:', error)
    }
  }

  const loadCharacters = async () => {
    setLoading(true)
    try {
      const response = await apiService.getCharacters(selectedServer)
      setCharacters(response.data)
    } catch (error) {
      console.error('Error loading characters:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchCharacters = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await apiService.searchCharacters(searchQuery, selectedServer)
      setCharacters(response.data)
    } catch (error) {
      console.error('Error searching characters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchCharacters()
    } else {
      loadCharacters()
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Không có thông tin'
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Danh sách nhân vật
        </h1>
        <p className="text-lg text-gray-600">
          Tìm kiếm và xem thông tin chi tiết của các nhân vật trong game
        </p>
      </div>

      {/* Search Section */}
      <div className="card">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân vật..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className="input-field"
              >
                <option value="">Tất cả server</option>
                {servers.map((server) => (
                  <option key={server} value={server}>
                    {server}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
            <button
              type="button"
              onClick={loadCharacters}
              className="btn-secondary"
              disabled={loading}
            >
              Xem tất cả
            </button>
          </div>
        </form>
      </div>

      {/* Characters List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải dữ liệu...</p>
          </div>
        ) : characters.length > 0 ? (
          <div className="grid gap-4">
            {characters.map((character) => (
              <div key={character.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {character.name}
                      </h3>
                      <p className="text-gray-600">
                        Level {character.level} • {character.job}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{character.server}</span>
                    </div>
                    {character.guild && (
                      <div className="flex items-center text-gray-600 mb-1">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{character.guild}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-xs">
                        Đăng nhập: {formatDate(character.lastLogin)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy nhân vật
            </h3>
            <p className="text-gray-600">
              Thử thay đổi từ khóa tìm kiếm hoặc server
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Characters

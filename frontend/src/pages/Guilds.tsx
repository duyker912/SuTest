import { useState, useEffect } from 'react'
import { Search, Users, MapPin, Calendar, Crown } from 'lucide-react'
import { apiService } from '../services/api'

interface Guild {
  id: string
  name: string
  server: string
  level: number
  members: number
  leader: string
  created?: string
}

const Guilds = () => {
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedServer, setSelectedServer] = useState('')
  const [servers, setServers] = useState<string[]>([])

  useEffect(() => {
    loadServers()
    loadGuilds()
  }, [])

  const loadServers = async () => {
    try {
      const response = await apiService.getServers()
      setServers(response.data)
    } catch (error) {
      console.error('Error loading servers:', error)
    }
  }

  const loadGuilds = async () => {
    setLoading(true)
    try {
      const response = await apiService.getGuilds(selectedServer)
      setGuilds(response.data)
    } catch (error) {
      console.error('Error loading guilds:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchGuilds = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await apiService.searchGuilds(searchQuery, selectedServer)
      setGuilds(response.data)
    } catch (error) {
      console.error('Error searching guilds:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchGuilds()
    } else {
      loadGuilds()
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
          Danh sách Guild
        </h1>
        <p className="text-lg text-gray-600">
          Tìm kiếm và xem thông tin chi tiết của các guild trong game
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
                  placeholder="Tìm kiếm guild..."
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
              onClick={loadGuilds}
              className="btn-secondary"
              disabled={loading}
            >
              Xem tất cả
            </button>
          </div>
        </form>
      </div>

      {/* Guilds List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Đang tải dữ liệu...</p>
          </div>
        ) : guilds.length > 0 ? (
          <div className="grid gap-4">
            {guilds.map((guild) => (
              <div key={guild.id} className="card hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-maple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-maple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {guild.name}
                      </h3>
                      <p className="text-gray-600">
                        Level {guild.level} • {guild.members} thành viên
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{guild.server}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Crown className="w-4 h-4 mr-1" />
                      <span className="text-sm">{guild.leader}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-xs">
                        Tạo: {formatDate(guild.created)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy guild
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

export default Guilds

import { Search, Users, Package, Zap, Shield, Globe } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Tìm kiếm nhân vật',
      description: 'Tìm kiếm và xem thông tin chi tiết của các nhân vật trong game'
    },
    {
      icon: Users,
      title: 'Quản lý Guild',
      description: 'Xem thông tin guild, thành viên và hoạt động của các guild'
    },
    {
      icon: Package,
      title: 'Danh mục vật phẩm',
      description: 'Khám phá các vật phẩm, trang bị và tài nguyên trong game'
    },
    {
      icon: Zap,
      title: 'API mạnh mẽ',
      description: 'Sử dụng API từ MSU để truy cập dữ liệu real-time'
    },
    {
      icon: Shield,
      title: 'Bảo mật cao',
      description: 'Hệ thống bảo mật và xác thực an toàn cho API'
    },
    {
      icon: Globe,
      title: 'Đa server',
      description: 'Hỗ trợ nhiều server và khu vực khác nhau'
    }
  ]

  const stats = [
    { label: 'Nhân vật', value: '10,000+' },
    { label: 'Guild', value: '500+' },
    { label: 'Vật phẩm', value: '5,000+' },
    { label: 'Server', value: '15+' }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            MapleStory N API
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Khai thác và sử dụng API của game MapleStory N từ MSU một cách dễ dàng và hiệu quả
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Bắt đầu ngay
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các tính năng mạnh mẽ giúp bạn tương tác với dữ liệu MapleStory N
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* API Info Section */}
      <section className="bg-gradient-to-r from-primary-50 to-maple-50 rounded-xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sử dụng API MSU
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Tích hợp với API chính thức từ MSU để truy cập dữ liệu game real-time
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin API:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tối đa 10 requests/giây</li>
                <li>• Tối đa 30,000 requests/ngày</li>
                <li>• Hỗ trợ đa server</li>
                <li>• Dữ liệu real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

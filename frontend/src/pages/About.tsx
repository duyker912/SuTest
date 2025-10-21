import { Code, Database, Globe, Shield, Zap, Users } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'API mạnh mẽ',
      description: 'Sử dụng API chính thức từ MSU để truy cập dữ liệu game real-time'
    },
    {
      icon: Database,
      title: 'Database PostgreSQL',
      description: 'Lưu trữ dữ liệu an toàn và hiệu quả với PostgreSQL'
    },
    {
      icon: Globe,
      title: 'Deploy đám mây',
      description: 'Backend trên Railway, Frontend trên Vercel'
    },
    {
      icon: Shield,
      title: 'Bảo mật cao',
      description: 'Hệ thống xác thực và bảo mật API key'
    },
    {
      icon: Zap,
      title: 'Hiệu suất cao',
      description: 'Tối ưu hóa tốc độ và hiệu suất ứng dụng'
    },
    {
      icon: Users,
      title: 'Đa người dùng',
      description: 'Hỗ trợ nhiều người dùng và quản lý quyền truy cập'
    }
  ]

  const techStack = [
    { category: 'Backend', items: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Prisma'] },
    { category: 'Frontend', items: ['React.js', 'TypeScript', 'TailwindCSS', 'Vite'] },
    { category: 'Deployment', items: ['Railway', 'Vercel', 'Docker'] },
    { category: 'Tools', items: ['Git', 'ESLint', 'Prettier', 'Postman'] }
  ]

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Về dự án
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          MapleStory N API là một ứng dụng web cho phép khai thác và sử dụng API của game MapleStory N 
          từ MSU (MapleStory Universe) một cách dễ dàng và hiệu quả.
        </p>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tính năng chính
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các tính năng mạnh mẽ của ứng dụng
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

      {/* Tech Stack Section */}
      <section className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Công nghệ sử dụng
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ứng dụng được xây dựng với các công nghệ hiện đại và tối ưu
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* API Information Section */}
      <section className="bg-gradient-to-r from-primary-50 to-maple-50 rounded-xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thông tin API
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Tích hợp với API chính thức từ MSU (MapleStory Universe)
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Thông số API:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Giới hạn:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Tối đa 10 requests/giây</li>
                  <li>• Tối đa 30,000 requests/ngày</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tính năng:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Hỗ trợ đa server</li>
                  <li>• Dữ liệu real-time</li>
                  <li>• API RESTful</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Liên hệ
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Có câu hỏi hoặc góp ý? Hãy liên hệ với chúng tôi
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://msu.io/builder/docs" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Tài liệu API
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            GitHub Repository
          </a>
        </div>
      </section>
    </div>
  )
}

export default About

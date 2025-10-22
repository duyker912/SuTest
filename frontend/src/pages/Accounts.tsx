import { useState } from 'react'
import { Wallet, Users, Coins, Package, Bitcoin } from 'lucide-react'
import { apiService } from '../services/api'

const Accounts = () => {
  const [wallet, setWallet] = useState('')
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<any[]>([])
  const [currencies, setCurrencies] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [neso, setNeso] = useState<{ onchainNeso?: string; offchainNeso?: string }>({})
  const [error, setError] = useState<string | null>(null)

  const loadAll = async () => {
    if (!wallet.trim()) return
    setLoading(true)
    setError(null)
    try {
      // Gọi tuần tự để tránh rate limit (1 req/s)
      const currRes = await apiService.getAccountCurrencies(wallet)
      setCurrencies(currRes.data?.currency || [])
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      const itemsRes = await apiService.getAccountItems(wallet, { pageNo: 1, pageSize: 10 })
      setItems(itemsRes.data?.elements || [])
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      const charsRes = await apiService.getAccountCharacters(wallet, { isTradable: true, pageNo: 1, pageSize: 10 })
      setCharacters(charsRes.data?.characters || [])
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      const nesoRes = await apiService.getAccountNeso(wallet)
      setNeso(nesoRes || {})
    } catch (e: any) {
      console.error(e)
      setError(e?.response?.data?.error?.message || 'Không thể tải dữ liệu từ OpenAPI')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tra cứu Accounts (v1rc1)</h1>
        <p className="text-lg text-gray-600">Nhập địa chỉ ví để lấy Characters, Currencies, Items, NESO</p>
      </div>

      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x... địa chỉ ví"
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="btn-primary w-full" onClick={loadAll} disabled={loading}>
              {loading ? 'Đang tải...' : 'Tải dữ liệu'}
            </button>
          </div>
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center mb-4"><Users className="w-5 h-5 mr-2" /> <h2 className="font-semibold">Characters</h2></div>
          <div className="space-y-3">
            {characters.length === 0 ? <p className="text-gray-500">Không có dữ liệu</p> : characters.map((c, i) => (
              <div key={i} className="p-3 rounded border">
                <div className="font-semibold">{c.name || c.assetKey || 'N/A'}</div>
                <div className="text-sm text-gray-600">Level: {c.data?.level} • World: {c.data?.world}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center mb-4"><Coins className="w-5 h-5 mr-2" /> <h2 className="font-semibold">Currencies</h2></div>
          <div className="space-y-2">
            {currencies.length === 0 ? <p className="text-gray-500">Không có dữ liệu</p> : currencies.map((c, i) => (
              <div key={i} className="flex justify-between">
                <span>{c.name || c.code}</span>
                <span className="font-medium">{c.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center mb-4"><Package className="w-5 h-5 mr-2" /> <h2 className="font-semibold">Items</h2></div>
          <div className="space-y-3">
            {items.length === 0 ? <p className="text-gray-500">Không có dữ liệu</p> : items.map((it, i) => (
              <div key={i} className="p-3 rounded border">
                <div className="font-semibold">{it.nftItem?.itemName || it.name}</div>
                <div className="text-sm text-gray-600">Token: {it.tokenId || '-'} • Category: {it.categoryNo}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="flex items-center mb-4"><Bitcoin className="w-5 h-5 mr-2" /> <h2 className="font-semibold">NESO</h2></div>
          <div className="space-y-1">
            <div className="flex justify-between"><span>On-chain</span><span className="font-medium">{neso.onchainNeso || '-'}</span></div>
            <div className="flex justify-between"><span>Off-chain</span><span className="font-medium">{neso.offchainNeso || '-'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts


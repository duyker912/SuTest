import { useState } from 'react'
import { Wallet, Users, Coins, Package, Bitcoin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { apiService } from '../services/api'

const Accounts = () => {
  const [wallet, setWallet] = useState('')
  const [loading, setLoading] = useState(false)
  const [characters, setCharacters] = useState<any[]>([])
  const [currencies, setCurrencies] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [neso, setNeso] = useState<{ onchainNeso?: string; offchainNeso?: string }>({})
  const [error, setError] = useState<string | null>(null)
  const [loadingStates, setLoadingStates] = useState({
    currencies: false,
    items: false,
    characters: false,
    neso: false
  })

  const loadAll = async () => {
    if (!wallet.trim()) return
    setLoading(true)
    setError(null)
    setCharacters([])
    setCurrencies([])
    setItems([])
    setNeso({})
    
    try {
      // Currencies
      setLoadingStates(prev => ({ ...prev, currencies: true }))
      const currRes = await apiService.getAccountCurrencies(wallet)
      setCurrencies(currRes.data?.currency || [])
      setLoadingStates(prev => ({ ...prev, currencies: false }))
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      // Items
      setLoadingStates(prev => ({ ...prev, items: true }))
      const itemsRes = await apiService.getAccountItems(wallet, { pageNo: 1, pageSize: 10 })
      setItems(itemsRes.data?.elements || [])
      setLoadingStates(prev => ({ ...prev, items: false }))
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      // Characters
      setLoadingStates(prev => ({ ...prev, characters: true }))
      const charsRes = await apiService.getAccountCharacters(wallet, { isTradable: true, pageNo: 1, pageSize: 10 })
      setCharacters(charsRes.data?.characters || [])
      setLoadingStates(prev => ({ ...prev, characters: false }))
      
      await new Promise(resolve => setTimeout(resolve, 1100)) // Đợi 1.1s
      
      // NESO
      setLoadingStates(prev => ({ ...prev, neso: true }))
      const nesoRes = await apiService.getAccountNeso(wallet)
      setNeso(nesoRes || {})
      setLoadingStates(prev => ({ ...prev, neso: false }))
    } catch (e: any) {
      console.error(e)
      setError(e?.response?.data?.error?.message || 'Không thể tải dữ liệu từ OpenAPI')
    } finally {
      setLoading(false)
      setLoadingStates({ currencies: false, items: false, characters: false, neso: false })
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
        {/* Characters */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">Characters ({characters.length})</h2>
            </div>
            {loadingStates.characters ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            ) : characters.length > 0 ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
          <div className="space-y-3">
            {loadingStates.characters ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Đang tải characters...</span>
              </div>
            ) : characters.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Không có characters</p>
            ) : (
              characters.map((c, i) => (
                <div key={i} className="p-4 rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{c.name || c.assetKey || 'N/A'}</div>
                      <div className="text-sm text-gray-600">
                        Level: {c.data?.level || 'N/A'} • World: {c.data?.world || 'N/A'}
                      </div>
                      {c.data?.jobCode && (
                        <div className="text-xs text-blue-600 mt-1">Job: {c.data.jobCode}</div>
                      )}
                    </div>
                    {c.data?.imageUrl && (
                      <img src={c.data.imageUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Currencies */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Coins className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">Currencies ({currencies.length})</h2>
            </div>
            {loadingStates.currencies ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            ) : currencies.length > 0 ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
          <div className="space-y-2">
            {loadingStates.currencies ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Đang tải currencies...</span>
              </div>
            ) : currencies.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Không có currencies</p>
            ) : (
              currencies.map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                  <div>
                    <span className="font-medium">{c.name || c.code}</span>
                    {c.code && c.name && (
                      <div className="text-xs text-gray-500">{c.code}</div>
                    )}
                  </div>
                  <span className="font-bold text-lg text-green-600">{c.amount}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Items */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">Items ({items.length})</h2>
            </div>
            {loadingStates.items ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            ) : items.length > 0 ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
          <div className="space-y-3">
            {loadingStates.items ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Đang tải items...</span>
              </div>
            ) : items.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Không có items</p>
            ) : (
              items.map((it, i) => (
                <div key={i} className="p-4 rounded-lg border bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {it.nftItem?.itemName || it.name || 'Unknown Item'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Token: {it.tokenId || '-'} • Category: {it.categoryNo || 'N/A'}
                      </div>
                      {it.nftItem && (
                        <div className="flex gap-2 mt-2">
                          {it.nftItem.starforce > 0 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                              ⭐ {it.nftItem.starforce}
                            </span>
                          )}
                          {it.nftItem.potentialGrade > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              Potential: {it.nftItem.potentialGrade}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {it.nftItem?.imageUrl && (
                      <img src={it.nftItem.imageUrl} alt={it.nftItem.itemName} className="w-12 h-12 rounded object-cover" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* NESO */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Bitcoin className="w-5 h-5 mr-2" />
              <h2 className="font-semibold">NESO Balance</h2>
            </div>
            {loadingStates.neso ? (
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            ) : (neso.onchainNeso || neso.offchainNeso) ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : null}
          </div>
          <div className="space-y-3">
            {loadingStates.neso ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">Đang tải NESO...</span>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">On-chain NESO</span>
                    <span className="font-bold text-lg text-green-600">
                      {neso.onchainNeso || '0'}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Off-chain NESO</span>
                    <span className="font-bold text-lg text-blue-600">
                      {neso.offchainNeso || '0'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts


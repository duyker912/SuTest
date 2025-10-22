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
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}
        
        {/* Wallet Info */}
        {wallet && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-blue-800">Wallet Address:</span>
                <div className="text-sm text-blue-600 font-mono">{wallet}</div>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(wallet)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
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
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Không có Characters</p>
                <p className="text-gray-400 text-sm">Ví này chưa có nhân vật nào</p>
              </div>
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
              currencies.map((c, i) => {
                const amount = parseFloat(c.amount) / Math.pow(10, 18); // Convert wei to readable format
                const isMainCurrency = c.code === '1'; // Essence is main currency
                
                return (
                  <div key={i} className={`flex justify-between items-center p-4 rounded-lg border-l-4 ${
                    isMainCurrency 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400' 
                      : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'
                  }`}>
                    <div>
                      <span className={`font-medium ${isMainCurrency ? 'text-yellow-800' : 'text-gray-800'}`}>
                        {c.name || c.code}
                      </span>
                      {c.code && c.name && (
                        <div className="text-xs text-gray-500">Code: {c.code}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`font-bold text-lg ${isMainCurrency ? 'text-yellow-600' : 'text-gray-600'}`}>
                        {amount > 0 ? amount.toLocaleString('en-US', { 
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0 
                        }) : '0'}
                      </span>
                      {isMainCurrency && (
                        <div className="text-xs text-yellow-600 font-medium">ESSENCE</div>
                      )}
                    </div>
                  </div>
                );
              })
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
                <div key={i} className={`p-4 rounded-lg border-l-4 ${
                  it.isSbt 
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400' 
                    : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-semibold ${it.isSbt ? 'text-purple-900' : 'text-blue-900'}`}>
                          {it.nftItem?.itemName || it.name || 'Unknown Item'}
                        </span>
                        {it.isSbt && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                            SBT
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div>ID: {it.itemId} • Category: {it.categoryNo}</div>
                        <div>Minting #: {it.mintingNo}</div>
                      </div>
                      {it.nftItem && (
                        <div className="flex flex-wrap gap-2">
                          {it.nftItem.starforce > 0 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                              ⭐ {it.nftItem.starforce}/{it.nftItem.maxStarforce}
                            </span>
                          )}
                          {it.nftItem.potentialGrade > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              Potential: {it.nftItem.potentialGrade}
                            </span>
                          )}
                          {it.nftItem.bonusPotentialGrade > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Bonus: {it.nftItem.bonusPotentialGrade}
                            </span>
                          )}
                          {it.nftItem.enableStarforce && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                              Starforce Enabled
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {it.nftItem?.imageUrl && (
                      <img 
                        src={it.nftItem.imageUrl} 
                        alt={it.nftItem.itemName} 
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200" 
                      />
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
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-green-800">On-chain NESO</span>
                      <div className="text-xs text-green-600">Blockchain Balance</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xl text-green-600">
                        {neso.onchainNeso ? (parseFloat(neso.onchainNeso) / Math.pow(10, 18)).toLocaleString('en-US', { 
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0 
                        }) : '0'}
                      </span>
                      <div className="text-xs text-green-600 font-medium">NESO</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-blue-800">Off-chain NESO</span>
                      <div className="text-xs text-blue-600">Game Balance</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xl text-blue-600">
                        {neso.offchainNeso ? (parseFloat(neso.offchainNeso) / Math.pow(10, 18)).toLocaleString('en-US', { 
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0 
                        }) : '0'}
                      </span>
                      <div className="text-xs text-blue-600 font-medium">NESO</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">Total NESO</span>
                      <div className="text-xs text-gray-600">Combined Balance</div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-xl text-gray-700">
                        {(() => {
                          const onchain = parseFloat(neso.onchainNeso || '0') / Math.pow(10, 18);
                          const offchain = parseFloat(neso.offchainNeso || '0') / Math.pow(10, 18);
                          return (onchain + offchain).toLocaleString('en-US', { 
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0 
                          });
                        })()}
                      </span>
                      <div className="text-xs text-gray-600 font-medium">NESO</div>
                    </div>
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


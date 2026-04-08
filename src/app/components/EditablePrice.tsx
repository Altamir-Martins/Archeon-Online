import React, { useEffect, useState } from 'react';
import { Edit2, X, Check } from 'lucide-react';

interface EditablePriceProps {
  id: string;
  value: number;
  onChange: (newPrice: number, newPoints: number, currency: string) => void;
  isEditMode: boolean;
  currency?: string;
  displayValue?: number;
  calculatePoints: (price: number) => number;
}

export function EditablePrice({
  id,
  value,
  onChange,
  isEditMode,
  currency = 'USD',
  displayValue,
  calculatePoints,
}: EditablePriceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempPrice, setTempPrice] = useState(value);
  const [tempCurrency, setTempCurrency] = useState(currency);

  useEffect(() => {
    if (!isEditing) {
      setTempCurrency(currency);
    }
  }, [currency, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
    setTempPrice(value);
    setTempCurrency(currency);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    const numPrice = parseFloat(tempPrice.toString());
    
    if (isNaN(numPrice) || numPrice <= 0) {
      alert('Por favor, insira um valor válido');
      return;
    }

    const newPoints = calculatePoints(numPrice);
    onChange(numPrice, newPoints, tempCurrency);
    setIsEditing(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTempPrice(value === '' ? 0 : parseFloat(value));
    }
  };

  const handleIncrement = () => {
    setTempPrice(prev => Math.round((prev + 1) * 100) / 100);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, tempPrice - 1);
    setTempPrice(Math.round(newValue * 100) / 100);
  };

  const currencySymbols: Record<string, string> = {
    BRL: 'R$',
    USD: '$',
    EUR: '€',
  };

  const currentSymbol = currencySymbols[isEditing ? tempCurrency : currency] || (isEditing ? tempCurrency : currency);
  const displayPrice = displayValue !== undefined ? displayValue : value;

  if (isEditing && isEditMode) {
    return (
      <div className="flex items-center gap-1 bg-white border border-[#b8964f] rounded-lg p-2">
        <select
          value={tempCurrency}
          onChange={(e) => setTempCurrency(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm bg-white font-semibold text-[#030213]"
        >
          <option value="USD">USD ($)</option>
          <option value="BRL">BRL (R$)</option>
          <option value="EUR">EUR (€)</option>
        </select>

        <span className="text-sm font-semibold text-[#b8964f]">{currentSymbol}</span>
        
        <button
          onClick={handleDecrement}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors text-sm"
          title="Diminuir"
        >
          −
        </button>

        <input
          type="number"
          value={tempPrice}
          onChange={handlePriceChange}
          step="0.01"
          min="0"
          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-center"
          autoFocus
        />

        <button
          onClick={handleIncrement}
          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors text-sm"
          title="Aumentar"
        >
          +
        </button>

        <button
          onClick={handleSave}
          className="p-1 bg-[#8b2c2c] hover:bg-[#6b1c1c] text-white rounded transition-colors"
          title="Salvar"
        >
          <Check size={16} />
        </button>

        <button
          onClick={handleCancel}
          className="p-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors"
          title="Cancelar"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 group">
      <span className="text-lg font-semibold text-[#b8964f]">
        {currentSymbol} {displayPrice.toFixed(2)}
      </span>
      
      {isEditMode && (
        <button
          onClick={handleEditClick}
          className="opacity-0 group-hover:opacity-100 p-1 text-[#b8964f] hover:text-[#d4a574] transition-all"
          title="Editar preço"
        >
          <Edit2 size={16} />
        </button>
      )}
    </div>
  );
}
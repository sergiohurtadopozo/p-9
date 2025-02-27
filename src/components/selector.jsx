
import React, { useState, useEffect } from "react";

const CurrencySelector = ({ onCurrencyChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('€'); // Moneda predeterminada: Euro

  // Cargar la moneda seleccionada desde localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Manejar el cambio de moneda
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('currency', currency); // Guardar en localStorage
    onCurrencyChange(currency); // Notificar el cambio al componente padre
  };

  return (
    <div className="currency-selector">
      <label htmlFor="currency" className="mr-2">Seleccionar moneda:</label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="€">€ Euro</option>
        <option value="$">$ Dólar</option>
        <option value="£">£ Libra</option>
      </select>
    </div>
  );
};

export default CurrencySelector;

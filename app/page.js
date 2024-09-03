// feito com nextjs chatgpt estudo e resiliencia (ignorancia)

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [url, setUrl] = useState('');
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      if (data.error) {
        setError(data.error);
        setCategorizedProducts({});
      } else {
        // Ensure the data is an array before proceeding
          const categorized = categorizeProductsFunction(data.produtos);
          setCategorizedProducts(categorized);
	  console.log('categorizados:', categorized);
        }
      
    } catch (error) {
      setError(error.message);
      setCategorizedProducts({});
    }
  };

  function categorizeProductsFunction(products) {
    const categories = {
      'Combos': ['+', 'combo', 'combos'],
      'Proteína': ['carne', 'bife', 'filé','sanduíche', 'sanduiche', 'hamburger', 'frango', 'porco', 'costela', 'picanha', 'parmegiana','boi','hambúrguer','hamburguer'],
      'Massas (de engordar)': ['massa', 'macarrão', 'espaguete', 'lasanha', 'ravioli', 'gnocchi'],
      'Peixes e Frutos do Mar': ['peixe', 'salmão', 'camarão', 'frutos do mar', 'bacalhau'],
      'Líquidos (de beber)': ['bebida', 'suco', 'refrigerante','refri', 'pepsi', 'coca-cola','soda', 'sukita', 'lata', 'jarra', 'energético', 'agua', 'mineral','água', 'cerveja', 'vinho','coca cola','guaraná', 'guarana','guarapan','mate couro', 'mate-couro'],
      'Pizzas': ['pizza', 'calzone', 'brotinho', 'gigante', 'moda'],
      'Saladas': ['salada', 'rúcula', 'humus', 'agrião' ],
      'Sobremesas': ['sobremesa', 'açaí','açai', 'brigadeiro', 'chocolate', 'doce', 'bolo', 'nutella', 'nutela', 'baunilha', 'donut', 'cookie', 'pudim', 'sorvete','beijinho', 'trento', 'valsa', 'baton'],
      'Lanches': ['salgadinhos','coxinha', 'lanche', 'salgado','kibe', 'esfiha', 'cachorro-quente', 'wrap'],
      'Outros': [] // Default category for uncategorized products
    };

    const categorized = [];

    products.forEach((product) => {
      let foundCategory = 'Outros';

      // Check each product against category keywords
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword))) {
          foundCategory = category;
          break;
        }
      }

      // Initialize array for category if it doesn't exist
      if (!categorized[foundCategory]) {
        categorized[foundCategory] = [];
      }

      // Add product to the appropriate category
      categorized[foundCategory].push(product);
    });

    return categorized;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-700 text-white py-6 px-8">
          <CardTitle className="text-center text-3xl font-extrabold tracking-wide">
           Ifood Scraper by Illan 
          </CardTitle>
          <CardDescription className="text-center text-black text-base mt-2 opacity-90">
            Insira o endereço (URL) de um restaurante no ifood para gerar um cardápio automático
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <Button type="submit" className="w-full">
             Gerar Cardápio 
            </Button>
          </form>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {Object.keys(categorizedProducts).length > 0 && (
            Object.entries(categorizedProducts).map(([category, products]) => (
              <div key={category} className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-500">
                  {category}
                </h2>
                <ul className="space-y-6">
                  {products.map((product, index) => (
                    <li
                      key={index}
                      className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-105"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{product.name || 'No Name'}</h3>
                      <p className="text-gray-700 mt-2">{product.description || 'No Description'}</p>
                      <p className="text-red-600 mt-3 font-bold">Preço: {product.price || 'No Price'}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}


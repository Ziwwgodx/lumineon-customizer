exports.handler = async (event, context) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Gestion des requêtes OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    const { config, price, quantity = 1 } = JSON.parse(event.body);

    // Validation des données
    if (!config || !price) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Configuration et prix requis' }),
      };
    }

    // Simulation d'ajout au panier
    const cartItem = {
      id: Date.now().toString(),
      config,
      price,
      quantity,
      timestamp: new Date().toISOString(),
    };

    console.log('🛒 Nouvel article ajouté au panier:', cartItem);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        item: cartItem,
        message: 'Article ajouté au panier avec succès',
      }),
    };
  } catch (error) {
    console.error('❌ Erreur add-to-cart:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Erreur serveur',
        message: error.message,
      }),
    };
  }
};
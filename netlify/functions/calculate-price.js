exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

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

    const { config, premiumOptions = [] } = JSON.parse(event.body);

    if (!config) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Configuration requise' }),
      };
    }

    // Calcul du prix de base
    let basePrice = config.size === '50cm' ? 120 : 200;

    // Augmentation pour texte long (8+ caractères)
    const textLength = config.text ? config.text.length : 0;
    let textSurcharge = 0;
    if (textLength >= 8) {
      const extraChars = textLength - 7;
      textSurcharge = extraChars * 3; // 3€ par caractère supplémentaire
      basePrice += textSurcharge;
    }

    // Options premium
    const premiumPrices = {
      waterproof: 25,
      remote: 35,
      timer: 20,
      installation: 80,
      express: 15
    };

    let premiumTotal = 0;
    premiumOptions.forEach(optionId => {
      if (premiumPrices[optionId]) {
        premiumTotal += premiumPrices[optionId];
      }
    });

    // Calcul des dimensions estimées
    const width = parseInt(config.size);
    const height = Math.round(width * 0.6);

    // Calcul du temps de production
    const productionDays = config.size === '50cm' ? 7 : 10;
    const deliveryDays = premiumOptions.includes('express') ? 1 : 3;

    const pricing = {
      basePrice,
      textSurcharge,
      premiumTotal,
      totalPrice: basePrice + premiumTotal,
      dimensions: {
        width: `${width}cm`,
        height: `${height}cm`
      },
      delivery: {
        production: `${productionDays} jours`,
        shipping: `${deliveryDays} jours`,
        total: `${productionDays + deliveryDays} jours`
      },
      breakdown: {
        base: `Néon ${config.size}`,
        textLength: textLength >= 8 ? `Texte long (${textLength} car.)` : null,
        premium: premiumOptions.map(id => ({
          id,
          price: premiumPrices[id] || 0
        }))
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        pricing,
      }),
    };
  } catch (error) {
    console.error('❌ Erreur calculate-price:', error);
    
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
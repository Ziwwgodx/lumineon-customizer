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
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    // Templates prédéfinis
    const templates = [
      {
        id: 'love',
        name: 'Love',
        category: 'Romantique',
        config: {
          text: 'LOVE',
          color: '#ff0080',
          gradientColors: ['#ff0080', '#ff69b4'],
          useGradient: false,
          font: 'script',
          size: '50cm',
          effect: 'pulse',
          multiline: false,
          lines: ['LOVE'],
          shape: 'text',
          haloIntensity: 15,
          glowRadius: 8,
          textScale: 1
        },
        image: 'https://images.pexels.com/photos/1363876/pexels-photo-1363876.jpeg?auto=compress&cs=tinysrgb&w=400',
        popular: true
      },
      {
        id: 'open',
        name: 'OPEN',
        category: 'Business',
        config: {
          text: 'OPEN',
          color: '#00ff41',
          gradientColors: ['#00ff41', '#32cd32'],
          useGradient: false,
          font: 'tilt-neon',
          size: '100cm',
          effect: 'blink',
          multiline: false,
          lines: ['OPEN'],
          shape: 'text',
          haloIntensity: 12,
          glowRadius: 6,
          textScale: 1
        },
        image: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=400',
        popular: true
      },
      {
        id: 'cafe',
        name: 'CAFÉ',
        category: 'Restaurant',
        config: {
          text: 'CAFÉ',
          color: '#ffff00',
          gradientColors: ['#ffff00', '#ffd700'],
          useGradient: false,
          font: 'modern',
          size: '100cm',
          effect: 'static',
          multiline: false,
          lines: ['CAFÉ'],
          shape: 'text',
          haloIntensity: 18,
          glowRadius: 10,
          textScale: 1
        },
        image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
        popular: false
      }
    ];

    // Filtrage par catégorie si spécifié
    const { category } = event.queryStringParameters || {};
    const filteredTemplates = category && category !== 'Tous' 
      ? templates.filter(t => t.category === category)
      : templates;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        templates: filteredTemplates,
        categories: ['Tous', 'Romantique', 'Business', 'Restaurant', 'Inspirant', 'Maison'],
      }),
    };
  } catch (error) {
    console.error('❌ Erreur get-templates:', error);
    
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
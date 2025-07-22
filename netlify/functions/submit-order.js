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

    const orderData = JSON.parse(event.body);
    
    // Validation des données de commande
    const { items, customerInfo, totalPrice } = orderData;
    
    if (!items || !customerInfo || !totalPrice) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Données de commande incomplètes' }),
      };
    }

    // Génération d'un ID de commande unique
    const orderId = `NEON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Simulation de traitement de commande
    const order = {
      id: orderId,
      items,
      customerInfo,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 jours
    };

    console.log('📦 Nouvelle commande reçue:', order);

    // Ici vous pourriez :
    // - Envoyer un email de confirmation
    // - Sauvegarder en base de données
    // - Intégrer avec un système de paiement
    // - Notifier l'équipe de production

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        order,
        message: 'Commande enregistrée avec succès',
        paymentUrl: `https://payment.example.com/pay/${orderId}`, // URL de paiement simulée
      }),
    };
  } catch (error) {
    console.error('❌ Erreur submit-order:', error);
    
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
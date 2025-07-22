const multipart = require('lambda-multipart-parser');

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

    // Parse multipart form data
    const result = await multipart.parse(event);
    
    const { name, email, phone, message } = result;
    const imageFile = result.files && result.files[0];

    // Validation
    if (!name || !email || !imageFile) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Nom, email et fichier image requis' }),
      };
    }

    // Validation du fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!allowedTypes.includes(imageFile.contentType)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Type de fichier non supporté. Utilisez JPG, PNG ou SVG.' }),
      };
    }

    // Limite de taille (2MB)
    if (imageFile.content.length > 2 * 1024 * 1024) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Fichier trop volumineux. Maximum 2MB.' }),
      };
    }

    // Génération d'un ID de demande
    const requestId = `LOGO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const logoRequest = {
      id: requestId,
      customerInfo: {
        name,
        email,
        phone: phone || 'Non renseigné',
        message: message || 'Aucun message'
      },
      file: {
        name: imageFile.filename,
        type: imageFile.contentType,
        size: imageFile.content.length,
        // En production, vous sauvegarderiez le fichier sur un service de stockage
        // comme AWS S3, Cloudinary, etc.
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    console.log('🎨 Nouvelle demande de logo personnalisé:', logoRequest);

    // Ici vous pourriez :
    // - Sauvegarder le fichier sur un service de stockage
    // - Envoyer un email à l'équipe design
    // - Créer un ticket dans votre système de gestion
    // - Envoyer un email de confirmation au client

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        requestId,
        message: 'Demande de logo personnalisé envoyée avec succès',
        estimatedResponse: '24 heures',
      }),
    };
  } catch (error) {
    console.error('❌ Erreur custom-logo:', error);
    
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
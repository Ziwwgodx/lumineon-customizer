return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Mobile Wizard Menu - Always visible */}
      <div className="lg:hidden">
        <MobileWizard currentStep={currentStep} onStepClick={setCurrentStep} />
      </div>

      {/* Main content with wizard spacing on mobile */}
      <div className="container mx-auto px-4 py-8 lg:px-4 pl-16 lg:pl-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Créateur de Néon LED
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Concevez votre néon LED personnalisé en quelques clics
          </p>
        </div>

        {/* Progress Bar - Desktop only */}
        <div className="hidden lg:block">
          <ProgressBar
            currentStep={currentStep}
            totalSteps={8}
            steps={['Texte', 'Couleurs', 'Style', 'Éclairage', 'Support', 'Fixation', 'Taille', 'Finaliser']}
            onStepClick={setCurrentStep}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="hidden lg:block space-y-6">
            {/* Logo personnalisé - Toujours visible sur mobile */}
            <CustomImageUpload
              isOpen={showCustomImageUpload}
              onClose={() => setShowCustomImageUpload(false)}
              onSubmit={handleCustomImageSubmit}
            />
            <button
              onClick={() => setShowCustomImageUpload(true)}
              className="w-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border-2 border-dashed border-blue-500/50 hover:border-purple-500/50 text-white p-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl mb-6"
            >
              <Upload className="text-blue-400" size={20} />
              <span className="font-semibold">📸 Logo Personnalisé</span>
              <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
            </button>

            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Votre Texte */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 relative z-20">
                  <div className="flex items-center gap-3 mb-4">
                    <Type className="text-blue-400" size={20} />
                    <h3 className="text-xl font-semibold text-white">1. Votre Texte</h3>
                  </div>
                  <input
                    type="text"
                    value={config.text}
                    onChange={(e) => updateConfig({ text: e.target.value })}
                    placeholder="MON NÉON"
                    maxLength={30}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors text-lg"
                  />
                  <div className="text-right text-sm text-gray-400 mt-2">
                    {config.text.length}/30 caractères
                  </div>
                </div>

                {/* Templates */}
                <TemplateGallery onSelectTemplate={handleTemplateSelect} />
              </div>
            )}

            {currentStep === 2 && (
              <TrendingColors
                onColorSelect={(color) => updateConfig({ color })}
                currentColor={config.color}
              />
            )}

            {currentStep === 3 && (
              <AdvancedConfigurator
                config={config}
                updateConfig={updateConfig}
              />
            )}

            {currentStep === 4 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-orange-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">4. Effets d'Éclairage</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'static', name: 'Fixe', desc: 'Éclairage constant' },
                    { id: 'pulse', name: 'Pulsation', desc: 'Battement lumineux' },
                    { id: 'blink', name: 'Clignotant', desc: 'On/Off rythmé' },
                    { id: 'gradient', name: 'Dégradé', desc: 'Transition colorée' }
                  ].map((effect) => (
                    <button
                      key={effect.id}
                      onClick={() => updateConfig({ effect: effect.id })}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        config.effect === effect.id
                          ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{effect.name}</div>
                      <div className="text-sm text-gray-400">{effect.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="text-cyan-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">5. Support Acrylique</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'transparent', name: 'Transparent', desc: 'Effet flottant' },
                    { id: 'black', name: 'Noir', desc: 'Contraste maximal' },
                    { id: 'white', name: 'Blanc', desc: 'Luminosité renforcée' }
                  ].map((support) => (
                    <button
                      key={support.id}
                      onClick={() => updateConfig({ acrylicSupport: support.id })}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        config.acrylicSupport === support.id
                          ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{support.name}</div>
                      <div className="text-sm text-gray-400">{support.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="text-indigo-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">6. Système de Fixation</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'wall', name: 'Fixation Murale', desc: 'Vis et chevilles incluses' },
                    { id: 'hanging', name: 'Suspension', desc: 'Chaînes décoratives' },
                    { id: 'stand', name: 'Support de Table', desc: 'Base stable incluse' }
                  ].map((mounting) => (
                    <button
                      key={mounting.id}
                      onClick={() => updateConfig({ mountingSystem: mounting.id })}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        config.mountingSystem === mounting.id
                          ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="font-semibold">{mounting.name}</div>
                      <div className="text-sm text-gray-400">{mounting.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <Maximize2 className="text-green-400" size={24} />
                  <h3 className="text-xl font-semibold text-white">7. Taille du Néon</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { id: '50cm', name: '50cm', desc: 'Parfait pour intérieur', price: '120€' },
                    { id: '100cm', name: '100cm', desc: 'Impact maximum', price: '200€' }
                  ].map((size) => (
                    <button
                      key={size.id}
                      onClick={() => updateConfig({ size: size.id })}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        config.size === size.id
                          ? 'border-green-400 bg-green-400/10 text-green-400'
                          : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{size.name}</div>
                          <div className="text-sm text-gray-400">{size.desc}</div>
                        </div>
                        <div className="font-bold text-lg">{size.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <PremiumOptions
                  selectedOptions={selectedPremiumOptions}
                  onToggleOption={togglePremiumOption}
                />
                <CustomerReviews />
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="lg:ml-0">
            <NeonPreview3D
              config={config}
              price={calculatePrice()}
              onAddToCart={() => setShowOrderForm(true)}
            />
          </div>
        </div>

        {/* Mobile Step Content - Full width below preview */}
        <div className="lg:hidden mt-8 space-y-6">
          {/* Logo personnalisé - Mobile */}
          <div>
            <CustomImageUpload
              isOpen={showCustomImageUpload}
              onClose={() => setShowCustomImageUpload(false)}
              onSubmit={handleCustomImageSubmit}
            />
            <button
              onClick={() => setShowCustomImageUpload(true)}
              className="w-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border-2 border-dashed border-blue-500/50 hover:border-purple-500/50 text-white p-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Upload className="text-blue-400" size={20} />
              <span className="font-semibold">📸 Logo Personnalisé</span>
              <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
            </button>
          </div>

          {/* Step Content Mobile */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Votre Texte */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 relative z-20">
                <div className="flex items-center gap-3 mb-4">
                  <Type className="text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">1. Votre Texte</h3>
                </div>
                <MobileOptimizedInput
                  value={config.text}
                  onChange={(value) => updateConfig({ text: value })}
                  placeholder="MON NÉON"
                  maxLength={30}
                />
              </div>

              {/* Templates */}
              <TemplateGallery onSelectTemplate={handleTemplateSelect} />
            </div>
          )}

          {currentStep === 2 && (
            <TrendingColors
              onColorSelect={(color) => updateConfig({ color })}
              currentColor={config.color}
            />
          )}

          {currentStep === 3 && (
            <AdvancedConfigurator
              config={config}
              updateConfig={updateConfig}
            />
          )}

          {currentStep === 4 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-orange-400" size={20} />
                <h3 className="text-lg font-semibold text-white">4. Effets d'Éclairage</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'static', name: 'Fixe', desc: 'Éclairage constant' },
                  { id: 'pulse', name: 'Pulsation', desc: 'Battement lumineux' },
                  { id: 'blink', name: 'Clignotant', desc: 'On/Off rythmé' },
                  { id: 'gradient', name: 'Dégradé', desc: 'Transition colorée' }
                ].map((effect) => (
                  <button
                    key={effect.id}
                    onClick={() => updateConfig({ effect: effect.id })}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      config.effect === effect.id
                        ? 'border-orange-400 bg-orange-400/10 text-orange-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold text-sm">{effect.name}</div>
                    <div className="text-xs text-gray-400">{effect.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Package className="text-cyan-400" size={20} />
                <h3 className="text-lg font-semibold text-white">5. Support Acrylique</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'transparent', name: 'Transparent', desc: 'Effet flottant' },
                  { id: 'black', name: 'Noir', desc: 'Contraste maximal' },
                  { id: 'white', name: 'Blanc', desc: 'Luminosité renforcée' }
                ].map((support) => (
                  <button
                    key={support.id}
                    onClick={() => updateConfig({ acrylicSupport: support.id })}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      config.acrylicSupport === support.id
                        ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold text-sm">{support.name}</div>
                    <div className="text-xs text-gray-400">{support.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-indigo-400" size={20} />
                <h3 className="text-lg font-semibold text-white">6. Système de Fixation</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'wall', name: 'Fixation Murale', desc: 'Vis et chevilles incluses' },
                  { id: 'hanging', name: 'Suspension', desc: 'Chaînes décoratives' },
                  { id: 'stand', name: 'Support de Table', desc: 'Base stable incluse' }
                ].map((mounting) => (
                  <button
                    key={mounting.id}
                    onClick={() => updateConfig({ mountingSystem: mounting.id })}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      config.mountingSystem === mounting.id
                        ? 'border-indigo-400 bg-indigo-400/10 text-indigo-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold text-sm">{mounting.name}</div>
                    <div className="text-xs text-gray-400">{mounting.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Maximize2 className="text-green-400" size={20} />
                <h3 className="text-lg font-semibold text-white">7. Taille du Néon</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: '50cm', name: '50cm', desc: 'Parfait pour intérieur', price: '120€' },
                  { id: '100cm', name: '100cm', desc: 'Impact maximum', price: '200€' }
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => updateConfig({ size: size.id })}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      config.size === size.id
                        ? 'border-green-400 bg-green-400/10 text-green-400'
                        : 'border-gray-600 bg-gray-700/30 text-white hover:border-gray-500'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-sm">{size.name}</div>
                        <div className="text-xs text-gray-400">{size.desc}</div>
                      </div>
                      <div className="font-bold text-sm">{size.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-6">
              <PremiumOptions
                selectedOptions={selectedPremiumOptions}
                onToggleOption={togglePremiumOption}
              />
              <CustomerReviews />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center pl-0 lg:pl-0">
          <button
            onClick={() => setShowSaveDesign(true)}
            className="group relative bg-gradient-to-r from-blue-500/20 to-purple-600/20 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/50 hover:border-purple-500/50 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl overflow-hidden"
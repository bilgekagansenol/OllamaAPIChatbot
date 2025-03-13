import React from 'react';

function ModelSelector({ models, selectedModel, onSelectModel }) {
  return (
    <div className="model-selector">
      <label htmlFor="model-select">Model Seçimi:</label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onSelectModel(e.target.value)}
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ModelSelector;

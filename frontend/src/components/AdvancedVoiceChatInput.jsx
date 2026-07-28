import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AdvancedVoiceChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [emotion, setEmotion] = useState('neutral');
  const [emotionConfidence, setEmotionConfidence] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const speechSynthRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsSpeechSynthesis
  } = useSpeechRecognition();

  // Emotion detection using simple keyword analysis (can be enhanced with ML models)
  const detectEmotion = (text) => {
    const lowerText = text.toLowerCase();

    // Positive emotions
    if (lowerText.includes('excited') || lowerText.includes('happy') || lowerText.includes('great') ||
        lowerText.includes('awesome') || lowerText.includes('love') || lowerText.includes('amazing')) {
      return { emotion: 'excited', confidence: 0.8 };
    }

    // Frustrated/negative emotions
    if (lowerText.includes('frustrated') || lowerText.includes('angry') || lowerText.includes('annoyed') ||
        lowerText.includes('confused') || lowerText.includes('stuck') || lowerText.includes('help')) {
      return { emotion: 'frustrated', confidence: 0.7 };
    }

    // Curious/learning emotions
    if (lowerText.includes('curious') || lowerText.includes('learn') || lowerText.includes('understand') ||
        lowerText.includes('explain') || lowerText.includes('how') || lowerText.includes('why')) {
      return { emotion: 'curious', confidence: 0.75 };
    }

    // Default neutral
    return { emotion: 'neutral', confidence: 0.5 };
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message, transcript]);

  // Update message when speech recognition provides transcript
  useEffect(() => {
    if (transcript && listening) {
      setMessage(transcript);
      // Detect emotion from speech input
      const detectedEmotion = detectEmotion(transcript);
      setEmotion(detectedEmotion.emotion);
      setEmotionConfidence(detectedEmotion.confidence);
    }
  }, [transcript, listening]);

  // Initialize speech synthesis
  useEffect(() => {
    if (browserSupportsSpeechSynthesis && !speechSynthRef.current) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, [browserSupportsSpeechSynthesis]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalMessage = message.trim() || transcript?.trim();
    if (finalMessage && !disabled) {
      onSendMessage(finalMessage, { emotion, emotionConfidence, hasFile: !!uploadedFile });
      setMessage('');
      resetTranscript();
      setEmotion('neutral');
      setEmotionConfidence(0);
      setUploadedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      setIsListening(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: language
      });
    }
  };

  const stopListening = () => {
    if (browserSupportsSpeechRecognition) {
      setIsListening(false);
      SpeechRecognition.stopListening();
    }
  };

  const speakMessage = (text) => {
    if (browserSupportsSpeechSynthesis && speechSynthRef.current) {
      setIsSpeaking(true);

      // Cancel any ongoing speech
      speechSynthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = emotion === 'frustrated' ? 0.8 : 0.9; // Slower for frustrated users
      utterance.pitch = emotion === 'excited' ? 1.1 : 1.0; // Higher pitch for excited users
      utterance.volume = 0.8;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);

      // Simulate file analysis (in real implementation, this would use AI vision APIs)
      setTimeout(() => {
        const fileType = file.type.startsWith('image/') ? 'image' : 'document';
        const analysis = {
          type: fileType,
          name: file.name,
          size: file.size,
          content: fileType === 'image' ? 'Image uploaded for analysis' : 'Document uploaded for review'
        };
        setIsAnalyzing(false);
        // You would send this analysis to the backend for processing
      }, 2000);
    }
  };

  // Language options
  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'de-DE', name: 'German' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'pt-BR', name: 'Portuguese' },
    { code: 'ru-RU', name: 'Russian' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ar-SA', name: 'Arabic' }
  ];

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="border-t border-gray-200 dark:border-slate-700 p-4">
        <div className="text-center text-sm text-gray-500 dark:text-slate-400 mb-4">
          Speech recognition is not supported in your browser.
          <br />
          Please use a modern browser like Chrome, Edge, or Safari.
        </div>

        {/* File upload for multi-modal support */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Upload Image or Document
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Upload File
            </button>
            {uploadedFile && (
              <span className="text-sm text-gray-600 dark:text-slate-400">
                {uploadedFile.name}
              </span>
            )}
          </div>
          {isAnalyzing && (
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Analyzing file content...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none max-h-32"
                rows={1}
                disabled={disabled}
              />
            </div>
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 dark:border-slate-700 p-4">
      {/* Language selector and emotion indicator */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 dark:text-slate-400">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Emotion indicator */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-slate-400">Emotion:</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              emotion === 'excited' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
              emotion === 'frustrated' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
              emotion === 'curious' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
            }`}>
              {emotion} ({Math.round(emotionConfidence * 100)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Voice controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {!isListening ? (
            <button
              type="button"
              onClick={startListening}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Voice Input</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopListening}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors animate-pulse"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10l6 4m0-4l-6 4" />
              </svg>
              <span>Stop Recording</span>
            </button>
          )}

          {browserSupportsSpeechSynthesis && !isSpeaking && (
            <button
              type="button"
              onClick={() => speakMessage("Advanced voice features enabled. I can detect your emotional tone and adapt my responses accordingly.")}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Test Voice</span>
            </button>
          )}

          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m-7 0h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Stop Audio</span>
            </button>
          )}
        </div>

        {listening && (
          <div className="text-sm text-blue-600 dark:text-blue-400 animate-pulse">
            🎤 Listening... ({emotion})
          </div>
        )}
      </div>

      {/* File upload for multi-modal support */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt,.js,.py,.html,.css"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            {uploadedFile ? `File: ${uploadedFile.name}` : 'Upload Image/Document'}
          </button>
          {uploadedFile && (
            <button
              type="button"
              onClick={() => setUploadedFile(null)}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
            >
              Remove
            </button>
          )}
        </div>
        {isAnalyzing && (
          <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
            🤖 Analyzing file content with AI vision...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={message || transcript || ''}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={listening ? "Speak now..." : "Type your message or use voice input..."}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none max-h-32 ${
                listening ? 'border-blue-300 dark:border-blue-600' : 'border-gray-300 dark:border-slate-600'
              }`}
              rows={1}
              disabled={disabled}
            />
          </div>
          <button
            type="submit"
            disabled={(!message.trim() && !transcript?.trim()) || disabled}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>

      {transcript && listening && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-700 dark:text-blue-300">
          <strong>Recognized:</strong> {transcript}
        </div>
      )}

      {/* Emotion-based response preview */}
      {emotion !== 'neutral' && emotionConfidence > 0.6 && (
        <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-700 dark:text-yellow-300">💡</span>
            <span className="text-yellow-700 dark:text-yellow-300">
              I detect you're feeling {emotion}. I'll adapt my response to be more {emotion === 'frustrated' ? 'patient and clear' : emotion === 'excited' ? 'energetic and engaging' : 'detailed and explanatory'}.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedVoiceChatInput;

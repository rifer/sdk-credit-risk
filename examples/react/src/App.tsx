import { useEffect, useRef, useState } from 'react';
import './App.css';

// Importar el Web Component
import '@credit-scoring/web-component';

interface EventLog {
  id: number;
  timestamp: string;
  message: string;
  data?: any;
}

function App() {
  const widgetRef = useRef<HTMLElement>(null);
  const [configId, setConfigId] = useState('demo-001');
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [currentTheme, setCurrentTheme] = useState('blue');

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    // Listener para submit-success
    const handleSubmitSuccess = (e: Event) => {
      const customEvent = e as CustomEvent;
      addEventLog('✅ Formulario enviado con éxito', customEvent.detail);
    };

    // Listener para submit-error
    const handleSubmitError = (e: Event) => {
      const customEvent = e as CustomEvent;
      addEventLog('❌ Error al enviar formulario', customEvent.detail);
    };

    widget.addEventListener('submit-success', handleSubmitSuccess);
    widget.addEventListener('submit-error', handleSubmitError);

    addEventLog('🚀 Widget inicializado');

    return () => {
      widget.removeEventListener('submit-success', handleSubmitSuccess);
      widget.removeEventListener('submit-error', handleSubmitError);
    };
  }, []);

  const addEventLog = (message: string, data?: any) => {
    const newLog: EventLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      data,
    };

    setEventLogs((prev) => [newLog, ...prev].slice(0, 10));
  };

  const changeTheme = (theme: string) => {
    const widget = widgetRef.current;
    if (!widget) return;

    const themes: Record<string, Record<string, string>> = {
      blue: {
        '--cs-primary-color': '#0066cc',
        '--cs-secondary-color': '#6c757d',
      },
      green: {
        '--cs-primary-color': '#28a745',
        '--cs-secondary-color': '#20c997',
      },
      purple: {
        '--cs-primary-color': '#6f42c1',
        '--cs-secondary-color': '#e83e8c',
      },
      red: {
        '--cs-primary-color': '#dc3545',
        '--cs-secondary-color': '#fd7e14',
      },
    };

    const themeColors = themes[theme];
    if (themeColors) {
      Object.entries(themeColors).forEach(([prop, value]) => {
        widget.style.setProperty(prop, value);
      });
      setCurrentTheme(theme);
      addEventLog(`🎨 Tema cambiado a: ${theme}`);
    }
  };

  const resetWidget = () => {
    setConfigId('');
    setTimeout(() => {
      setConfigId('demo-001');
      addEventLog('🔄 Widget reseteado');
    }, 100);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏦 Credit Scoring SDK</h1>
        <p>Ejemplo de integración en React</p>
      </header>

      <div className="app-content">
        <div className="widget-section">
          <div className="widget-wrapper">
            {configId && (
              <credit-scoring-widget
                ref={widgetRef}
                config-id={configId}
              />
            )}
          </div>
        </div>

        <aside className="controls-section">
          <div className="controls-card">
            <h3>🎨 Temas</h3>
            <div className="button-group">
              <button
                onClick={() => changeTheme('blue')}
                className={`theme-button blue ${currentTheme === 'blue' ? 'active' : ''}`}
              >
                Azul
              </button>
              <button
                onClick={() => changeTheme('green')}
                className={`theme-button green ${currentTheme === 'green' ? 'active' : ''}`}
              >
                Verde
              </button>
              <button
                onClick={() => changeTheme('purple')}
                className={`theme-button purple ${currentTheme === 'purple' ? 'active' : ''}`}
              >
                Morado
              </button>
              <button
                onClick={() => changeTheme('red')}
                className={`theme-button red ${currentTheme === 'red' ? 'active' : ''}`}
              >
                Rojo
              </button>
            </div>
          </div>

          <div className="controls-card">
            <h3>⚙️ Controles</h3>
            <div className="button-group">
              <button onClick={resetWidget} className="control-button">
                🔄 Resetear Widget
              </button>
            </div>
          </div>

          <div className="controls-card">
            <h3>📋 Event Log</h3>
            <div className="event-log">
              {eventLogs.length === 0 ? (
                <div className="event-log-empty">
                  Los eventos del widget aparecerán aquí...
                </div>
              ) : (
                eventLogs.map((log) => (
                  <div key={log.id} className="event-log-item">
                    <div className="event-timestamp">{log.timestamp}</div>
                    <div className="event-message">{log.message}</div>
                    {log.data && (
                      <pre className="event-data">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>

      <footer className="app-footer">
        <p>
          Construido con <strong>React</strong> + <strong>TypeScript</strong> + <strong>Vite</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;

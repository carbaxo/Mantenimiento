import { useState } from 'react'
import { useAuth } from '../lib/auth'

export default function Login() {
  const { signInWithEmail, configured } = useAuth()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
    setError('')
    const { error } = await signInWithEmail(email.trim())
    if (error) {
      setStatus('error')
      setError(error.message)
    } else {
      setStatus('sent')
    }
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-mark">⚙️</div>
        <h1>Garaje</h1>
        <p className="muted">Mantenimiento de tus vehículos, siempre contigo.</p>

        {!configured ? (
          <div className="config-warning">
            <p><strong>Falta configurar Supabase.</strong></p>
            <p className="small">
              Aún no se han añadido las claves del proyecto. En cuanto estén configuradas,
              aquí aparecerá el formulario de acceso.
            </p>
          </div>
        ) : status === 'sent' ? (
          <div className="login-sent">
            <p>📬 <strong>Revisa tu correo</strong></p>
            <p className="small muted">
              Te hemos enviado un enlace de acceso a <strong>{email}</strong>.
              Ábrelo en este dispositivo para entrar.
            </p>
            <button
              className="link-btn"
              onClick={() => { setStatus('idle'); setEmail('') }}
            >
              Usar otro correo
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button className="email-btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar enlace de acceso'}
            </button>
            {status === 'error' && <p className="login-error small">{error}</p>}
          </form>
        )}

        <p className="login-foot small muted">
          Tus datos se guardan en tu cuenta y se sincronizan entre tus dispositivos.
        </p>
      </div>
    </div>
  )
}

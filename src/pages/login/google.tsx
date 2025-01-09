import { supabase } from '../../../supabaseConfig'

const Kakao = () => {
  const LoginTest = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo:
            'https://vpxgcvxodypztnxelmqx.supabase.co/auth/v1/callback'
        }
      })

      if (error) {
        console.error('Login error:', error)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <button onClick={LoginTest}>
      <h1> Kakao Login</h1>
    </button>
  )
}

export default Kakao

import React, { useState } from 'react'
import { supabase } from '../../../supabaseConfig'
import { useNavigate } from 'react-router-dom'

export function Signup() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          profileImgPath: '/assets/img/profile/default_profile.webp'
        }
      }
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      console.log('회원가입 성공:', data)
      alert('회원가입 성공!')
      navigate('/login')
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: '10px' }}>
          {loading ? '회원가입 중...' : '회원가입'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p>
        이미 계정이 있으신가요?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}>
          로그인
        </button>
      </p>
    </div>
  )
}

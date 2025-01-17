import { test, expect } from '@playwright/test'

test.describe('로그인', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  async function mockSupabaseAuth(page) {
    await page.route('**/auth/sign-in', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            session: {
              access_token: 'fake-access-token',
              refresh_token: 'fake-refresh-token',
              user: {
                id: 'test-user-id',
                email: 'test99@example.com'
              }
            },
            user: {
              id: 'test-user-id',
              email: 'test99@example.com'
            }
          },
          error: null
        })
      })
    })

    // Supabase 비밀번호 로그인 응답 모킹
    await page.route('**/auth/v1/token?grant_type=password', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'fake-access-token',
          refresh_token: 'fake-refresh-token',
          user: {
            id: 'test-user-id',
            email: 'test99@example.com',
            user_metadata: {
              name: 'Test User'
            }
          }
        })
      })
    })

    // userinfo 테이블 응답 모킹
    await page.route('**/rest/v1/userinfo**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'test-user-id',
            email: 'test99@example.com',
            nickname: 'Test User',
            profile_img: '',
            introduction: '',
            subsc_count: 0
          }
        ])
      })
    })

    // 세션 확인 응답 모킹
    await page.route('**/auth/v1/user', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-user-id',
          email: 'test99@example.com',
          user_metadata: {
            name: 'Test User'
          }
        })
      })
    })
  }
  test('이메일 로그인 성공', async ({ page }) => {
    await mockSupabaseAuth(page)

    const authRequestPromise = page.waitForRequest(request =>
      request.url().includes('/auth/v1/token')
    )

    const authResponsePromise = page.waitForResponse(
      response =>
        response.url().includes('/auth/v1/token') && response.status() === 200
    )

    await page.fill(
      'input[placeholder="example@test.com"]',
      'test99@example.com'
    )
    await page.fill('input[type="password"]', 'myTestPassword')

    await page.click('button[type="submit"]')

    const authRequest = await authRequestPromise
    const authResponse = await authResponsePromise

    expect(authRequest.url()).toContain('/auth/v1/token')
    expect(authResponse.status()).toBe(200)
  })

  test('이메일 로그인 실패 - 잘못된 인증 정보', async ({ page }) => {
    await page.route('**/auth/v1/token**', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          error: '로그인 실패하였습니다'
        })
      })
    })

    await page.fill('input[placeholder="example@test.com"]', 'test@example.com')
    await page.fill('input[type="password"]', 'wrongPassword')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/login')
  })

  test('회원가입 페이지 이동', async ({ page }) => {
    await page.click('text=회원가입하기')
    await expect(page).toHaveURL('/signup/email')
  })
})

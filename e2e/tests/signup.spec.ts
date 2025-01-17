import { test, expect } from '@playwright/test'

test.describe('회원가입', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup/email')
  })

  test('회원가입 이메일 → 비밀번호 → 닉네임 → 완료', async ({ page }) => {
    await page.route('**/auth/v1/signup', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            email: 'test456@example.com'
          },
          session: null
        })
      })
    })

    await page.fill(
      'input[placeholder="example@test.com"]',
      'test456@example.com'
    )
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/password')
    await page.fill('input[type="password"]', 'myTest123!')
    await page.fill('input[type="password"] >> nth=1', 'myTest123!')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/nickname')
    await page.fill(
      'input[placeholder="닉네임을 입력하세요"]',
      '플레이라이트유저'
    )
    await page.click('button[type="submit"]')

    await page.waitForSelector('text=회원가입 하시겠습니까?')
    const modalConfirmButton = page.getByRole('button', {
      name: '가입',
      exact: true
    })
    await modalConfirmButton.click()

    await page.waitForNavigation({ url: '/signup/complete', timeout: 10000 })
    expect(page.url()).toBe('http://localhost:5173/signup/complete')
  })

  test('이메일 중복 체크 실패', async ({ page }) => {
    await page.fill('input[placeholder="example@test.com"]', 'hand@asd.com')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/email')
  })

  test('비밀번호 불일치 에러', async ({ page }) => {
    await page.fill(
      'input[placeholder="example@test.com"]',
      'test456@example.com'
    )
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/password')
    await page.fill('input[type="password"]', 'myTest123!')
    await page.fill('input[type="password"] >> nth=1', 'wrongPassword!')

    const submitButton = page.locator('button[type="submit"]')
    expect(await submitButton.isDisabled()).toBeTruthy()
  })

  test('닉네임 입력 후 유효성 검사 실패', async ({ page }) => {
    await page.fill(
      'input[placeholder="example@test.com"]',
      'test456@example.com'
    )
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/password')
    await page.fill('input[type="password"]', 'myTest123!')
    await page.fill('input[type="password"] >> nth=1', 'myTest123!')
    await page.click('button[type="submit"]')

    await expect(page).toHaveURL('/signup/nickname')
    await page.fill('input[placeholder="닉네임을 입력하세요"]', '   ') // 공백 닉네임

    const submitButton = await page.locator('button[type="submit"]')
    expect(await submitButton.isDisabled()).toBeTruthy()
  })
})

import { test, expect } from '@playwright/test'

test.describe('회원가입', () => {
  test('이메일 → 비밀번호 → 닉네임', async ({ page }) => {
    await page.goto('/signup/email')
    await page.fill('input[placeholder="example@test.com"]', 'test@example.com')
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
  })
})

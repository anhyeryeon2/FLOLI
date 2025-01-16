import { test, expect } from '@playwright/test'

test.describe('로그인', () => {
  test('이메일 로그인 성공', async ({ page }) => {
    await page.goto('/login')

    await page.fill('input[placeholder="example@test.com"]', 'test@example.com')
    await page.fill('input[type="password"]', 'myTestPassword')

    await page.click('button[type="submit"]')
    await page.waitForURL('http://localhost:5173/login', { timeout: 30000 })
    console.log('현재 URL:', await page.url())
  })
})

import { test, expect } from '@playwright/test'

test.describe('Sign up flow', () => {
  test('이메일 → 비밀번호 → 닉네임 → 회원가입 완료', async ({ page }) => {
    // 1. 이메일 입력 단계
    await page.goto('/signup/email')

    // 이메일 입력
    await page.fill('input[placeholder="example@test.com"]', 'test@example.com')
    // 다음 버튼 클릭
    await page.click('button[type="submit"]')

    // 비밀번호 화면 진입 확인
    await expect(page).toHaveURL('/signup/password')

    // 2. 비밀번호 입력 단계
    await page.fill('input[type="password"]', 'myTest123!') // 첫 번째 비밀번호
    await page.fill('input[type="password"] >> nth=1', 'myTest123!') // 두 번째 비밀번호(확인)
    // 다음 버튼 클릭
    await page.click('button[type="submit"]')

    // 닉네임 화면 진입 확인
    await expect(page).toHaveURL('/signup/nickname')

    // 3. 닉네임 입력 단계
    await page.fill(
      'input[placeholder="닉네임을 입력하세요"]',
      '플레이라이트유저'
    )
    // 회원가입 버튼 클릭
    await page.click('button[type="submit"]')

    await page.click('button:has-text("가입")')

    // 회원가입 완료 페이지로 이동 확인
    await expect(page).toHaveURL('/signup/complete')

    // 완료 페이지의 특정 요소(예: "가입을 환영합니다" 등)가 있는지 확인
    await expect(page.locator('text=가입 완료')).toBeVisible()
  })
})

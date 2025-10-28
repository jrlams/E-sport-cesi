import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        try:
            # Navigate to the admin page
            await page.goto("http://localhost:80/admin")
            print("Navigated to http://localhost:80/admin")

            # Wait for the login form to be visible
            await page.wait_for_selector('input[type="password"]', timeout=10000)
            print("Login form is visible")

            # Fill in the password and click login
            await page.fill('input[type="password"]', "password")
            await page.click('button[type="submit"]')
            print("Logged in")

            # Wait for the dashboard to load
            await page.wait_for_selector('text="Admin Dashboard"', timeout=10000)
            print("Dashboard is visible")

            # Take a screenshot of the dashboard
            screenshot_path = 'jules-scratch/verification/05_admin_dashboard.png'
            await page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        except Exception as e:
            print(f"An error occurred: {e}")

        finally:
            await browser.close()

if __name__ == '__main__':
    asyncio.run(main())

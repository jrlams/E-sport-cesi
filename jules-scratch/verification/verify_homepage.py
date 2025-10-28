from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost")
    page.screenshot(path="jules-scratch/verification/01_homepage.png")
    page.locator("#schedule").scroll_into_view_if_needed()
    page.screenshot(path="jules-scratch/verification/02_schedule.png")
    page.locator("#games").scroll_into_view_if_needed()
    page.screenshot(path="jules-scratch/verification/03_games.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

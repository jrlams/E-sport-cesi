from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Verify Registration Form
    page.fill('input[name="email"]', 'test@example.com')
    page.fill('input[name="pseudo"]', 'testuser')
    page.select_option('select[name="game"]', 'Valorant')
    page.click('button:has-text("VALIDER MON INSCRIPTION")')
    page.wait_for_selector('text="Inscription réussie !"')

    # Verify Feedback Form
    page.goto("http://localhost:5173/#feedback")
    page.fill('input[name="email"]', 'test@example.com')
    page.click('button[aria-label="Rate 5 of 5"]')
    page.fill('textarea[name="comments"]', 'This is a test comment.')
    page.click('button:has-text("ENVOYER MON FEEDBACK")')
    page.wait_for_selector('text="Merci pour votre feedback !"')

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

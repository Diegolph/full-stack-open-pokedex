const { test, expect } = require('@playwright/test')

// Keep CI independent of the availability/rate limits of the external PokeAPI.
// The actual production server, bundle, routing and UI run in the browser.
test.beforeEach(async ({ page }) => {
  await page.route('https://pokeapi.co/api/v2/pokemon/**', async route => {
    const url = new URL(route.request().url())
    if (url.pathname === '/api/v2/pokemon/') {
      await route.fulfill({ json: { results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' }
      ] } })
      return
    }
    const name = url.pathname.split('/').filter(Boolean).pop()
    await route.fulfill({ json: {
      name,
      types: [{ slot: 1, type: { name: 'grass' } }],
      stats: [{ base_stat: 60, stat: { name: 'hp' } }],
      abilities: [
        { is_hidden: false, ability: { name: 'overgrow' } },
        { is_hidden: true, ability: { name: 'chlorophyll' } }
      ],
      sprites: { front_default: '' }
    } })
  })
})

test('front page can be opened', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'ivysaur', exact: true })).toBeVisible()
  await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
})

test('opens a Pokemon and navigates to the next and previous Pokemon', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'ivysaur', exact: true }).click()
  await expect(page).toHaveURL(/\/pokemon\/ivysaur$/)
  await expect(page.getByText('chlorophyll', { exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Next', exact: true }).click()
  await expect(page).toHaveURL(/\/pokemon\/venusaur$/)
  await expect(page.locator('.pokemon-name')).toHaveText('venusaur')
  await page.getByRole('link', { name: 'Previous', exact: true }).click()
  await expect(page).toHaveURL(/\/pokemon\/ivysaur$/)
})

test('health and version endpoints respond', async ({ request }) => {
  const health = await request.get('/health')
  expect(health.status()).toBe(200)
  expect(await health.text()).toBe('ok')
  const version = await request.get('/version')
  expect(version.status()).toBe(200)
  expect(await version.text()).not.toBe('')
})

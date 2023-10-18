import HomePage from "../pages/home-page.js"
import CartPage from "../pages/cart-page.js"
import SearchPage from "../pages/search-page.js"
import { faker } from '@faker-js/faker'

describe('Cart flow', () => {
    beforeEach(async () => {
        await HomePage.open()
        
    })

    it('Add to cart and verify', async () => {
        await SearchPage.pause()
        const product = faker.commerce.product()
        await SearchPage.searchBar.addValue(product)
        await SearchPage.searchBtn.click()
        const price = await CartPage.price.getText()
        await CartPage.productImg.click()
        await CartPage.addToCart.click()
        await expect(CartPage.successMsg).toHaveTextContaining('Added to Cart')
        await expect(CartPage.price).toHaveTextContaining(price)

    })

    it('Update cart and verify', async () => {
        await SearchPage.pause()
        const product = faker.commerce.product()
        await SearchPage.searchBar.addValue(product)
        await SearchPage.searchBtn.click()
        await CartPage.productImg.click()
        await CartPage.addToCart.click()
        await SearchPage.pause()
        await CartPage.cart.click()
        await CartPage.qty.click()
        await SearchPage.pause()
        await SearchPage.goDown()
        await SearchPage.pause()
        await SearchPage.enter()
        await SearchPage.pause()
        const qty = await CartPage.qty.getText()
        await expect(CartPage.cartCount).toHaveTextContaining(qty)
    })
})
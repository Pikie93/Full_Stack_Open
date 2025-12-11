const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createdBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Testi Testainen',
                username: 'testuukkai',
                password: 'testainen'
            }
        })
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Blogs')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Blogs')).toBeVisible()
    })

    test('user cannot log in with wrong creds', async ({ page }) => {
        await loginWith(page, 'asd', 'asd')
    
        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('wrong username or password')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('asd logged in')).not.toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, 'testuukkai', 'testainen')  
         
        await expect(page.getByText('Testi Testainen logged in')).toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'testuukkai', 'testainen')
        })

        test('a new blog can be created', async ({ page }) => {
            await createdBlog(page, 'Test Title 1', 'Test Author 1', 'www.TestURL1.com')
            await expect(page.getByText('Test Title 1 added')).toBeVisible()
        })

        
        describe('and a blog already exists', () => {
            beforeEach(async ({ page }) => {
                await createdBlog(page, 'Test Title 1', 'Test Author 1', 'www.TestURL1.com')
                })

            test('blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                await page.getByRole('button', { name: 'like' }).click() 
                await expect(page.getByText('likes 1')).toBeVisible()
            })


            test('blog can be deleted by creator', async ({ page }) => {
                page.on('dialog', dialog => dialog.accept());
                await page.getByRole('button', { name: 'Delete' }).click()

                await expect(page.getByText('Test Title 1 Test Author 1')).not.toBeVisible();
            })

            test('delete button is not visible to non-creator', async ({ page, request }) => {
                await request.post('/api/users', {
                    data: {
                        name: 'Testi Nottest',
                        username: 'nottestuukkai',
                        password: 'nottestainen'
                        }
                })

                await page.getByRole('button', { name: 'Logout' }).click()
                await loginWith(page, 'nottestuukkai', 'nottestainen')

                await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0)
            })

            test('blogs are ordered by likes, most first', async ({ page, request }) => {
                await request.post('/api/blogs', {
                    data: { title: 'Least Likes', url: 'url1', author: 'Author1', likes: 1 }
                })
                await request.post('/api/blogs', {
                    data: { title: 'Medium Likes', url: 'url2', author: 'Author2', likes: 5 }
                })
                await request.post('/api/blogs', {
                    data: { title: 'Most Likes', url: 'url3', author: 'Author3', likes: 10 }
                })

                await page.goto('/')

                const blogElements = page.locator('.blog')
                const count = await blogElements.count()
                
                for (let i = 0; i < count; i++) {
                    await blogElements.nth(i).getByRole('button', { name: 'view'}).click()
                }
                const likes = []
                for (let i = 0; i < count; i++) {
                    const likeText = await blogElements.nth(i).locator('[data-testid="likes-count"]').textContent()
                    const likeNumber = Number(likeText.replace('likes', ''))
                    likes.push(likeNumber)
                }

                const sorted = [...likes].sort((a, b) => b - a)
                expect(likes).toEqual(sorted)
            })
        })


    })
})
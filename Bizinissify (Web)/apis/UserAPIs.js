var CryptoJS = require("crypto-js");
const { getSecureConnection, getConnection } = require('../services/mySql');

module.exports = app => {
    app.get('/secureTest', async (req, res) => {
        const token = decrypt(req.header('authorization'))
        getSecureConnection(
            res,
            token,
            `SELECT * FROM posts WHERE id = 1`,
            null,
            (data) => {
                return res.send({
                    'data': data[0] || {}
                })
            }
        )
    })

    app.post('/addPost', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const data = req.body
        data.posted_by = posted_by
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!data.image_url) return res.status(422).send({ 'msg': 'Image URL is required!' })
        if (!data.title) return res.status(422).send({ 'msg': 'Title is required!' })
        if (!data.state_city) return res.status(422).send({ 'msg': 'State / City is required!' })
        if (!data.price) return res.status(422).send({ 'msg': 'Price is required!' })
        if (!data.short_description) return res.status(422).send({ 'msg': 'Short Description is required!' })
        if (!data.long_description) return res.status(422).send({ 'msg': 'Long Description is required!' })
        if (!data.country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!data.category) return res.status(422).send({ 'msg': 'Category is required!' })
        if (!data.last_updated) return res.status(422).send({ 'msg': 'Adding time is required!' })
        getSecureConnection(
            res,
            posted_by,
            'INSERT INTO posts SET ?',
            data,
            () => {
                return res.send({
                    'msg': 'Post Added Successfully!'
                })
            }
        )
    })

    app.post('/addFranchise', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const data = req.body
        data.posted_by = posted_by
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!data.image_url) return res.status(422).send({ 'msg': 'Image URL is required!' })
        if (!data.title) return res.status(422).send({ 'msg': 'Title is required!' })
        if (!data.state_city) return res.status(422).send({ 'msg': 'State / City is required!' })
        if (!data.price) return res.status(422).send({ 'msg': 'Price is required!' })
        if (!data.capital_required_min) return res.status(422).send({ 'msg': 'Capital requirement Min. value is required!' })
        if (!data.capital_required_max) return res.status(422).send({ 'msg': 'Capital requirement Max. value is required!' })
        if (!data.net_worth) return res.status(422).send({ 'msg': 'Net worth is required!' })
        if (!data.short_description) return res.status(422).send({ 'msg': 'Short Description is required!' })
        if (!data.long_description) return res.status(422).send({ 'msg': 'Long Description is required!' })
        if (!data.country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!data.category) return res.status(422).send({ 'msg': 'Category is required!' })
        if (!data.last_updated) return res.status(422).send({ 'msg': 'Adding time is required!' })
        getSecureConnection(
            res,
            posted_by,
            'INSERT INTO franchises SET ?',
            data,
            () => {
                return res.send({
                    'msg': 'Franchise Added Successfully!'
                })
            }
        )
    })

    app.get('/getAllPosts', (req, res) => {
        getConnection(
            res,
            'SELECT id, image_url, title, sub_title, short_description, state_city, price, last_updated FROM posts ORDER BY last_updated DESC',
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'posts': data })
                else res.status(422).send({ 'msg': 'No posts available' })
            }
        )
    })

    app.get('/getAllfranchises', (req, res) => {
        getConnection(
            res,
            'SELECT id, image_url, title, short_description, state_city, price, last_updated FROM franchises ORDER BY last_updated DESC',
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'franchises': data })
                else res.status(422).send({ 'msg': 'No franchises available' })
            }
        )
    })

    app.post('/getFilteredPosts', (req, res) => {
        const { keyword, category, state_city, country, timeStamp, range } = req.body
        let query = `SELECT id, image_url, title, sub_title, short_description, state_city, price, last_updated FROM posts`
        // if (keyword) {
        //     if (category) {
        //         if (state_city) {
        //             if (country) {
        //                 if (timeStamp) {
        //                     query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                     query = query + ` AND category = ${category}`
        //                     query = query + ` AND state_city LIKE '%${state_city}%'`
        //                     query = query + ` AND country = '${country}'`
        //                     query = query + ` AND last_updated > ${timeStamp}`
        //                 } else {
        //                     query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                     query = query + ` AND category = ${category}`
        //                     query = query + ` AND state_city LIKE '%${state_city}%'`
        //                     query = query + ` AND country = '${country}'`
        //                 }
        //             } else {
        //                 if (timeStamp) {
        //                     query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                     query = query + ` AND category = ${category}`
        //                     query = query + ` AND state_city LIKE '%${state_city}%'`
        //                     query = query + ` AND last_updated > ${timeStamp}`
        //                 } else {
        //                     query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                     query = query + ` AND category = ${category}`
        //                     query = query + ` AND state_city LIKE '%${state_city}%'`
        //                 }
        //             }
        //         }
        //         else if (country) {
        //             if (timeStamp) {
        //                 query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                 query = query + ` AND category = ${category}`
        //                 query = query + ` AND country = '${country}'`
        //                 query = query + ` AND last_updated > ${timeStamp}`
        //             } else {
        //                 query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                 query = query + ` AND category = ${category}`
        //                 query = query + ` AND country = '${country}'`
        //             }
        //         } else if (timeStamp) {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND category = ${category}`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         }
        //         else {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND category = ${category}`
        //         }
        //     } else if (state_city) {
        //         if (country) {
        //             if (timeStamp) {
        //                 query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                 query = query + ` AND state_city LIKE '%${state_city}%'`
        //                 query = query + ` AND country = '${country}'`
        //                 query = query + ` AND last_updated > ${timeStamp}`
        //             } else {
        //                 query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //                 query = query + ` AND state_city LIKE '%${state_city}%'`
        //                 query = query + ` AND country = '${country}'`
        //             }
        //         } else if (timeStamp) {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND state_city LIKE '%${state_city}%'`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         } else {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND state_city LIKE '%${state_city}%'`
        //         }
        //     } else if (country) {
        //         if (timeStamp) {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND country = '${country}'`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         } else {
        //             query = query + ` WHERE (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
        //             query = query + ` AND country = '${country}'`
        //         }
        //     } else if (timeStamp) {
        //         query = query + ` WHERE title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%'`
        //         query = query + ` AND last_updated > ${timeStamp}`
        //     }
        //     else query = query + ` WHERE title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%'`
        // } else if (category) {
        //     if (state_city) {
        //         if (country) {
        //             if (timeStamp) {
        //                 query = query + ` WHERE category = ${category}`
        //                 query = query + ` AND state_city LIKE '%${state_city}%'`
        //                 query = query + ` AND country = '${country}'`
        //                 query = query + ` AND last_updated > ${timeStamp}`
        //             } else {
        //                 query = query + ` WHERE category = ${category}`
        //                 query = query + ` AND state_city LIKE '%${state_city}%'`
        //                 query = query + ` AND country = '${country}'`
        //             }
        //         } else if (timeStamp) {
        //             query = query + ` WHERE category = ${category}`
        //             query = query + ` AND state_city LIKE '%${state_city}%'`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         } else {
        //             query = query + ` WHERE category = ${category}`
        //             query = query + ` AND state_city LIKE '%${state_city}%'`
        //         }
        //     }
        //     else if (country) {
        //         if (timeStamp) {
        //             query = query + ` WHERE category = ${category}`
        //             query = query + ` AND country = '${country}'`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         } else {
        //             query = query + ` WHERE category = ${category}`
        //             query = query + ` AND country = '${country}'`
        //         }
        //     }
        //     else if (timeStamp) {
        //         query = query + ` WHERE category = ${category}`
        //         query = query + ` AND last_updated > ${timeStamp}`
        //     }
        //     else query = query + ` WHERE category = ${category}`
        // } else if (state_city) {
        //     if (country) {
        //         if (timeStamp) {
        //             query = query + ` WHERE state_city LIKE '%${state_city}%'`
        //             query = query + ` AND country = '${country}'`
        //             query = query + ` AND last_updated > ${timeStamp}`
        //         } else {
        //             query = query + ` WHERE state_city LIKE '%${state_city}%'`
        //             query = query + ` AND country = '${country}'`
        //         }
        //     } else if (timeStamp) {
        //         query = query + ` WHERE state_city LIKE '%${state_city}%'`
        //         query = query + ` AND last_updated > ${timeStamp}`
        //     } else query = query + ` WHERE state_city LIKE '%${state_city}%'`
        // } else if (country) {
        //     if (timeStamp) {
        //         query = query + ` WHERE country = '${country}'`
        //         query = query + ` AND last_updated > ${timeStamp}`
        //     }
        //     else query = query + ` WHERE country = '${country}'`
        // } else if (timeStamp) query = query + ` WHERE last_updated > ${timeStamp}`


        if (keyword || category || state_city || country || timeStamp || range) {
            query = query + ' WHERE'
            if (keyword) query = query + ` (title LIKE '%${keyword}%' OR sub_title LIKE '%${keyword}%' OR state_city LIKE '%${keyword}%' OR short_description LIKE '%${keyword}%')`
            if (category) {
                if (keyword) query = query + ' AND'
                query = query + ` category = ${category}`
            }
            if (state_city) {
                if (keyword || category) query = query + ' AND'
                query = query + ` state_city LIKE '%${state_city}%'`
            }
            if (country) {
                if (keyword || category || state_city) query = query + ' AND'
                query = query + ` country = '${country}'`
            }
            if (timeStamp) {
                if (keyword || category || state_city || country) query = query + ' AND'
                query = query + ` last_updated > ${timeStamp}`
            }
            if (range) {
                if (keyword || category || state_city || country || timeStamp) query = query + ' AND'
                query = query + ` price <= ${range.replace('$ ', '').replace(',', '')}`
            }
        }
        query = query + ' ORDER BY last_updated DESC'
        getConnection(
            res,
            query,
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'posts': data })
                else res.status(422).send({ 'msg': 'No filtered posts available' })
            }
        )
    })

    app.post('/getPostDetails', (req, res) => {
        const { id } = req.body
        if (!id) return res.status(422).send({ 'msg': 'Post ID is required!' })
        getConnection(
            res,
            `SELECT id, image_url, title, state_city, price, established_on, value_report, long_description, business_owners, country, facilities, support_n_training, reason_for_selling, business_website, demographic_information FROM posts WHERE id = ${id}`,
            null,
            (postDetails) => {
                if (postDetails && postDetails.length) {
                    getConnection(
                        res,
                        `SELECT name, lastName, email, profileImage FROM users WHERE id in (SELECT posted_by FROM posts WHERE id = ${id})`,
                        null,
                        (sellerDetails) => {
                            if (sellerDetails && sellerDetails.length) {
                                return res.send({
                                    'postDetails': postDetails[0],
                                    'sellerDetails': sellerDetails[0]
                                })
                            }
                            else res.status(422).send({ 'msg': 'Seller account is disabled/removed' })
                        }
                    )
                }
                else res.status(422).send({ 'msg': 'Post has been disabled/removed' })
            }
        )
    })

    app.post('/getFranchiseDetails', (req, res) => {
        const { id } = req.body
        if (!id) return res.status(422).send({ 'msg': 'Franchise ID is required!' })
        getConnection(
            res,
            `SELECT id, image_url, title, state_city, price, capital_required_min, capital_required_max, liquid_capital, net_worth, financing, initial_franchise_fee, avg_sales, business_owners, company_units, existing_units, long_description, why_us_title, why_us_description, offers, ideal_candidate, history, support_n_training FROM franchises WHERE id = ${id}`,
            null,
            (franchiseDetails) => {
                if (franchiseDetails && franchiseDetails.length) {
                    getConnection(
                        res,
                        `SELECT name, lastName, email, profileImage FROM users WHERE id in (SELECT posted_by FROM franchises WHERE id = ${id})`,
                        null,
                        (sellerDetails) => {
                            if (sellerDetails && sellerDetails.length) {
                                return res.send({
                                    'franchiseDetails': franchiseDetails[0],
                                    'sellerDetails': sellerDetails[0]
                                })
                            }
                            else res.status(422).send({ 'msg': 'Seller account is disabled/removed' })
                        }
                    )
                }
                else res.status(422).send({ 'msg': 'Franchise has been disabled/removed' })
            }
        )
    })

    app.get('/getOwnPosts', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        getSecureConnection(
            res,
            posted_by,
            `SELECT id, image_url, title, sub_title, short_description, state_city, price, last_updated FROM posts WHERE posted_by = '${posted_by}' ORDER BY last_updated DESC`,
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'ownPosts': data })
                else res.status(422).send({ 'msg': 'No posts available' })
            }
        )
    })

    app.get('/getOwnFranchises', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        getSecureConnection(
            res,
            posted_by,
            `SELECT id, image_url, title, short_description, state_city, price, last_updated FROM franchises WHERE posted_by = '${posted_by}' ORDER BY last_updated DESC`,
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'ownFranchises': data })
                else res.status(422).send({ 'msg': 'No franchise available' })
            }
        )
    })

    app.post('/getPostToEdit', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const { id } = req.body
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!id) return res.status(422).send({ 'msg': 'Post ID is required!' })
        getSecureConnection(
            res,
            posted_by,
            `SELECT *, NULL as posted_by FROM posts WHERE id = ${id} AND posted_by = '${posted_by}'`,
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'postToEdit': data[0] })
                else res.status(422).send({ 'msg': 'Post has been disabled/removed' })
            }
        )
    })

    app.post('/getFranchiseToEdit', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const { id } = req.body
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!id) return res.status(422).send({ 'msg': 'Franchise ID is required!' })
        getSecureConnection(
            res,
            posted_by,
            `SELECT *, NULL as posted_by FROM franchises WHERE id = ${id} AND posted_by = '${posted_by}'`,
            null,
            (data) => {
                if (data && data.length)
                    return res.send({ 'franchiseToEdit': data[0] })
                else res.status(422).send({ 'msg': 'Franchise has been disabled/removed' })
            }
        )
    })

    app.post('/editPost', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const data = req.body
        data.posted_by = posted_by
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!data.id) return res.status(422).send({ 'msg': 'Post ID is required!' })
        if (!data.image_url) return res.status(422).send({ 'msg': 'Image URL is required!' })
        if (!data.title) return res.status(422).send({ 'msg': 'Title is required!' })
        if (!data.state_city) return res.status(422).send({ 'msg': 'State / City is required!' })
        if (!data.price) return res.status(422).send({ 'msg': 'Price is required!' })
        if (!data.short_description) return res.status(422).send({ 'msg': 'Short Description is required!' })
        if (!data.long_description) return res.status(422).send({ 'msg': 'Long Description is required!' })
        if (!data.country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!data.category) return res.status(422).send({ 'msg': 'Category is required!' })
        if (!data.last_updated) return res.status(422).send({ 'msg': 'Adding time is required!' })
        getSecureConnection(
            res,
            posted_by,
            `UPDATE posts SET ? WHERE id = '${data.id}'`,
            data,
            () => {
                return res.send({
                    'msg': 'Post Updated Successfully!'
                })
            }
        )
    })

    app.post('/editFranchise', (req, res) => {
        const posted_by = decrypt(req.header('authorization'))
        const data = req.body
        data.posted_by = posted_by
        if (!posted_by) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!data.id) return res.status(422).send({ 'msg': 'Franchise ID is required!' })
        if (!data.image_url) return res.status(422).send({ 'msg': 'Image URL is required!' })
        if (!data.title) return res.status(422).send({ 'msg': 'Title is required!' })
        if (!data.state_city) return res.status(422).send({ 'msg': 'State / City is required!' })
        if (!data.price) return res.status(422).send({ 'msg': 'Price is required!' })
        if (!data.capital_required_min) return res.status(422).send({ 'msg': 'Capital requirement Min. value is required!' })
        if (!data.capital_required_max) return res.status(422).send({ 'msg': 'Capital requirement Max. value is required!' })
        if (!data.net_worth) return res.status(422).send({ 'msg': 'Net worth is required!' })
        if (!data.short_description) return res.status(422).send({ 'msg': 'Short Description is required!' })
        if (!data.long_description) return res.status(422).send({ 'msg': 'Long Description is required!' })
        if (!data.country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!data.category) return res.status(422).send({ 'msg': 'Category is required!' })
        if (!data.last_updated) return res.status(422).send({ 'msg': 'Adding time is required!' })
        getSecureConnection(
            res,
            posted_by,
            `UPDATE franchises SET ? WHERE id = '${data.id}'`,
            data,
            () => {
                return res.send({
                    'msg': 'Franchise Updated Successfully!'
                })
            }
        )
    })

    app.post('/createAccount', (req, res) => {
        const { id, name, lastName, email } = req.body
        if (!id) return res.status(422).send({ 'msg': 'ID is required!' })
        if (!name || name === ' ') return res.status(422).send({ 'msg': 'First Name is required!' })
        if (lastName === ' ') return res.status(422).send({ 'msg': 'Valid Last Name is required!' })
        if (!email) return res.status(422).send({ 'msg': 'Email is required!' })
        getConnection(
            res,
            'INSERT INTO users SET ?',
            req.body,
            () => {
                return res.send({
                    'msg': 'Account Created Successfully!'
                })
            }
        )
    })

    app.get('/getProfile', (req, res) => {
        const token = decrypt(req.header('authorization'))
        getSecureConnection(
            res,
            token,
            `SELECT *, NULL as id FROM users WHERE id = '${token}'`,
            null,
            (data) => {
                return res.send({
                    'profile': data[0] || {},
                    'msg': 'Profile Fetched Successfully!'
                })
            }
        )
    })

    app.post('/updateProfile', (req, res) => {
        const token = decrypt(req.header('authorization'))
        const data = req.body
        getSecureConnection(
            res,
            token,
            `UPDATE users SET ? WHERE id = '${token}'`,
            data,
            () => {
                return res.send({
                    'msg': 'Profile Updated Successfully!'
                })
            }
        )
    })

    app.post('/addBillingInfo', (req, res) => {
        const user_id = decrypt(req.header('authorization'))
        const { firstName, lastName, phoneNumber, streetAddress, country, city, zipcode } = req.body
        if (!user_id) return res.status(401).send({ 'msg': 'Not Authorized!' })
        if (!firstName) return res.status(422).send({ 'msg': 'First Name is required!' })
        if (!lastName) return res.status(422).send({ 'msg': 'Last Name is required!' })
        if (!phoneNumber) return res.status(422).send({ 'msg': 'PhoneNumber is required!' })
        if (!streetAddress) return res.status(422).send({ 'msg': 'Street Address is required!' })
        if (!country) return res.status(422).send({ 'msg': 'Country is required!' })
        if (!city) return res.status(422).send({ 'msg': 'City is required!' })
        if (!zipcode) return res.status(422).send({ 'msg': 'Zipcode is required!' })
        getSecureConnection(
            res,
            user_id,
            'INSERT INTO billingInfo SET ?',
            { user_id, firstName, lastName, phoneNumber, streetAddress, country, city, zipcode },
            () => {
                return res.send({
                    'msg': 'Billing Profile Created Successfully!'
                })
            }
        )
    })

    app.get('/getBillingInfo', (req, res) => {
        const token = decrypt(req.header('authorization'))
        getSecureConnection(
            res,
            token,
            `SELECT *, NULL as user_id FROM billingInfo WHERE user_id = '${token}'`,
            null,
            (data) => {
                return res.send({
                    'billingInfo': data[0] || null,
                    'msg': 'Billing Info Fetched Successfully!'
                })
            }
        )
    })

    app.post('/updateBillingInfo', (req, res) => {
        const token = decrypt(req.header('authorization'))
        const data = req.body
        getSecureConnection(
            res,
            token,
            `UPDATE billingInfo SET ? WHERE user_id = '${token}'`,
            data,
            () => {
                return res.send({
                    'msg': 'Billing Info Updated Successfully!'
                })
            }
        )
    })
}

function decrypt(token) {
    const decryptedToken = token // ? CryptoJS.AES.decrypt(token, '62426!').toString(CryptoJS.enc.Utf8) : null
    return decryptedToken
}
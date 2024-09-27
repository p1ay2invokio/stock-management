import express from 'express'
import cors from 'cors'
import { appDataSource } from './appDataSource'
import { UsersEntity } from './entities/users.entity'
import { remainItemEntity } from './entities/remainItem.entity'
// import { centerDataSource } from './centerDataSource'
import { CenterEntitiy } from './entities/center.entity'
import axios from 'axios'
import dotenv from 'dotenv'
import { ProductsEntity } from './entities/products.entity'

const env = dotenv.config().parsed

const app = express()

app.use(cors())
app.use(express.json())


app.get("/api/test", async (req: express.Request, res: express.Response) => {
    const users = await appDataSource.createQueryBuilder().select().from(UsersEntity, 'users').execute()

    console.log(users)
    res.status(200).send(users)
})

app.get("/api/remainItem", async (req: express.Request, res: express.Response) => {

    const remainItem = await appDataSource.createQueryBuilder().select().from(remainItemEntity, 'item').execute()


    // console.log(remainItem)
    res.status(200).send(remainItem)
})

app.get("/api/remainItem/:product", async (req: express.Request, res: express.Response) => {

    const { product } = req.params

    const remainItem = await appDataSource.createQueryBuilder().select().from(remainItemEntity, 'item').where("item.Message like :product", { product: `%${product}%` }).execute()

    // console.log(remainItem)
    res.status(200).send(remainItem)
})

app.get("/api/products/:page", async (req: express.Request, res: express.Response) => {

    let page = parseInt(req.params.page)

    let countProduct = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode"]).from(ProductsEntity, "products").getCount()

    let perPage = 20

    let totalPage = Math.ceil(countProduct / perPage)

    const start = (page - 1) * perPage
    const end = start + perPage

    if (page > totalPage || page < 1) {
        res.status(404).send()
    } else {
        console.log(start, end)
        const products = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').limit(perPage).offset(start).execute()

        res.status(200).send({ products: products, qty: products.length, totalPage: totalPage })
    }
})

app.get("/api/search/:keyword", async (req: express.Request, res: express.Response) => {
    let { keyword } = req.params

    let convert_keyword = parseInt(keyword)


    console.log(typeof (convert_keyword))

    if (convert_keyword) {
        let searchProducts = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').where("products.Qty like :keyword", { keyword: `%${keyword}%` }).execute()

        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length })
    } else {
        let searchProducts = await appDataSource.createQueryBuilder().select(["products.Barcode as barcode", "products.Name as name", "products.Qty as qty"]).from(ProductsEntity, 'products').where("products.Name like :keyword", { keyword: `%${keyword}%` }).execute()

        res.status(200).send({ searchProducts: searchProducts, qty: searchProducts.length })
    }
})


// About IP

// app.get("/api/ip", async (req: express.Request, res: express.Response) => {

//     const ip = await centerDataSource.createQueryBuilder().select().from(CenterEntitiy, 'center').execute()

//     console.log(ip)

//     res.status(200).send(ip)
// })

// app.get("/api/ip/:represent", async (req: express.Request, res: express.Response) => {
//     // 0 => doilor
//     // 1 => Maekhan
//     // 2 => Sanpatong

//     const { represent } = req.params

//     const ip = await centerDataSource.createQueryBuilder().select().from(CenterEntitiy, 'center').where("center.id = :rep", { rep: Number(represent) + 1 }).execute()

//     res.status(200).send(ip)
// })

// app.patch("/api/updateConfig", async (req: express.Request, res: express.Response) => {
//     const { listIp } = req.body

//     listIp.map(async (item: { ip: string, tag: string }) => {
//         const updatedConfig = await centerDataSource.createQueryBuilder().update(CenterEntitiy).set({ ip: item.ip }).where({ tag: item.tag }).execute()
//     })

//     res.status(200).send()
// })

// app.patch("/api/changeName/:barcode", async (req: express.Request, res: express.Response) => {
//     // const {barcode} = 
// })

// app.patch("/api/changeNameServer", async (req: express.Request, res: express.Response) => {

// })

app.listen(env?.PORT, () => {
    console.log(`Server is running on port ${env?.PORT}`)
})
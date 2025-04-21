import database from "../service/database.js";

export async function AddProduct(req, res) {
    console.log('POST /Addproducts requested')
    try{
        // ทำการตรวจสอบก่อนที่จะใส่ว่ามัน ว่างไหม
        if (req.body.pdId == null || req.body.pdName == null){
            return res.status(422).json({error:"pdId and pdName is required!!!"})
        }
        // ตรวจสอบว่ามีค่านี้อยู่หรือยัง
        const existsResult = await database.query({
            text: `SELECT EXISTS (SELECT * FROM products WHERE "pdId" = $1)`,
            values: [req.body.pdId]
        })
        // ถ้ามีค่าที่ Query มา
        if(existsResult.rows[0].exists){
            return res.status(409).json({error : `pdId ${req.body.pdId} is Exists!!!`})
        }
        // database.query คือ เป็นฟังชั่นในการติดต่อกับฐานข้อมูล
        const result = await database.query({
            text: `INSERT INTO products ("pdId", "pdName", "pdType", "qty")
                    VALUES ($1,$2,$3,$4)`,
            values: [
                req.body.pdId,
                req.body.pdName,
                req.body.pdType,
                req.body.qty,
            ]
        })
        // สร้างวันที่เผื่อส่งกลับไปให้ client
        // const dateTime = new Date()
        // bodyData.createDate=dateTime
        return res.status(200).json({ message: "success" })        
    }
    catch(err){
        return res.status(500).json({error:err.massage})
    }
    }


export async function GetAllProduct(req, res) {
    console.log('GET /products requested')
    
    try {
        const result = await database.query({
        text: `SELECT * FROM products`
        })
    
        return res.status(200).json(result.rows)
    } catch (err) {
        console.error('Database error:', err)
        return res.status(500).json({ error: err.message })
    }
    }
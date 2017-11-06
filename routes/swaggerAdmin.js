
    /**
     * @swagger
     * definition:
     *   Dashboard:
     *     properties:
     *       _id:
     *         type: string
     *       row:
     *         type: integer
     *         format: int64
     *       column:
     *         type: integer
     *       displayType:
     *         type: integer
     *       item:
     *         $ref: '#/definitions/item'
     *   Admin:
     *     properties:
     *       _id:
     *         type: string
     *       email:
     *         type: string
     *       name:
     *         type: string
     *       roles:
     *         type: array
     *         items:
     *           $ref: '#/definitions/Roles'
     *   UpdateAdmin:
     *     properties:
     *       name:
     *         type: string
     *       roles:
     *         type: array
     *         items:
     *           type: string
     *   Roles:
     *     properties:
     *       _id:
     *         type: string
     *       role:
     *         type: string
     *       privileges:
     *         type: array
     *         items:
     *           type: string
     *   item:
     *     properties:
     *       type:
     *         type: string
     *       data:
     *         $ref: '#/definitions/itemData'
     *   itemData:
     *      type: object
     *      properties:
     *        _id:
     *          type: string
     *        title:
     *          type: string
     *        fullImage:
     *          type: string
     *        halfImage:
     *          type: string
     *   Users:
     *     properties:
     *       usersCount:
     *         type: integer
     *       users:
     *         type: array
     *         items:
     *           $ref: '#/definitions/User'
     *   User:
     *     type: object
     *     properties:
     *       _id:
     *         type: string
     *       createdAt:
     *         type: string
     *       profileData:
     *         $ref: '#/definitions/ProfileData'
     *       profile:
     *         $ref: '#/definitions/Profile'
     *   Profile:
     *     properties:
     *       avatar:
     *         type: string
     *       picture:
     *         type: string
     *       name:
     *         type: string
     *       email:
     *         type: string
     *       location:
     *         type: string
     *       gender:
     *         type: string
     *   ProfileData:
     *     properties:
     *       dressSize:
     *         type: array
     *         items:
     *           type: string
     *       lowerWaistSize:
     *         type: array
     *         items:
     *           type: string
     *       upperWaistSize:
     *         type: array
     *         items:
     *           type: string
     *       bustSize:
     *         type: array
     *         items:
     *           type: string
     *       height:
     *         type: array
     *         items:
     *           type: string
     *       shoeSize:
     *         type: array
     *         items:
     *           type: string
     *       styles:
     *         type: array
     *         items:
     *           type: string
     *
     *   Items:
     *     properties:
     *       itemsCount:
     *         type: integer
     *       items:
     *         type: array
     *         items:
     *           $ref: '#/definitions/ItemDetails'
     *   LikedItems:
     *     properties:
     *       likedItemsCount:
     *         type: integer
     *       likedItems:
     *         type: array
     *         items:
     *           $ref: '#/definitions/ItemDetails'
     *   ItemDetails:
     *     properties:
     *       _id:
     *         type: string
     *       name:
     *         type: string
     *       color:
     *         type: string
     *       description:
     *         type: string
     *       credits:
     *         type: integer
     *       fit:
     *         $ref: '#/definitions/ItemSpec'
     *       brand:
     *         $ref: '#/definitions/ItemSpec'
     *       condition:
     *         $ref: '#/definitions/ItemSpec'
     *       rules:
     *         type: array
     *         items:
     *           $ref: '#/definitions/ItemSpec'
     *       size:
     *         type: array
     *         items:
     *           $ref: '#/definitions/ItemSpec'
     *       images:
     *         type: array
     *         items:
     *           $ref: '#/definitions/Images'
     *       likes:
     *         type: integer
     *       likedBy:
     *         type: boolean
     *         default: false
     *
     *   ItemSpec:
     *     properties:
     *       itemId:
     *         type: string
     *       itemName:
     *         type: string
     *   Images:
     *     properties:
     *       src:
     *         type: string
     *       filter:
     *         type: string
     *       isCover:
     *         type: string
     */

    /**
     * @swagger
     * /api/dashboard:
     *   get:
     *     tags:
     *       - Dashboard
     *     description: Returns categories and curated lists position on dashboard
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Categories And Curated Lists Position On Dashboard
     *         examples:
     *           application/json: |
     *             [
     *                {
     *                  "_id": "595de49fcb91950e008154dc",
     *                  "row": 1,
     *                  "column": 1,
     *                  "displayType": 0,
     *                  "item": {
     *                     "type": "category",
     *                     "data": {
     *                        "_id": "595a1446cb91951900b0b4b0",
     *                        "title": "clothes",
     *                        "fullImage": "http://54.254.175.129:9000/uploads/1499324911301.png",
     *                        "halfImage": "http://54.254.175.129:9000/uploads/1499324964599.png"
     *                    }
     *                  }
     *                }
     *              ]
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Dashboard'
     *       400:
     *         description: Invalid Request
     *
     * /api/users/{pageLimit}/{pageNumber}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns List Of Users
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *       - in: path
     *         name: pageLimit
     *         description: Number Of Users To Display Per Page
     *         type: string
     *       - in: path
     *         name: pageNumber
     *         description: Page Number
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: List Of Users
     *         examples:
     *           application/json: |
     *             [
     *                {
     *                     "_id": "5KcrhFoZyiFYxgcBG",
     *                     "createdAt": "2016-04-26T00:10:38.660Z",
     *                     "profileData": {
     *                       "dressSize": [
     *                         "XS"
     *                       ],
     *                       "waistSize": [
     *                         "26"
     *                       ],
     *                       "shoeSize": [
     *                         "5"
     *                       ],
     *                       "styles": [
     *                         "WESTERN",
     *                         "TRADITIONAL/ETHNIC",
     *                         "SEXY/PARTY",
     *                         "HIGH-STREET",
     *                         "SPORTY/CASUAL"
     *                       ]
     *                     },
     *                     "profile": {
     *                       "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtp1/v/t1.0-1/p50x50/12799242_1579130819072805_6867869792250278175_n.jpg?oh=c",
     *                       "picture": "http://graph.facebook.com/1602737173378836/picture/?type=large",
     *                       "name": "Mohit Kadian",
     *                       "gender": "female",
     *                       "email": "mohit.kadian1992@gmail.com",
     *                      "location": "Noida, India"
     *                     }
     *                   }
     *              ]
     *         schema:
     *             $ref: '#/definitions/Users'
     *       400:
     *         description: Invalid Request
     *
     * /api/users/{userId}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns Details Of User
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *       - in: path
     *         name: userId
     *         description: UserId To Know Details Of User
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Details Of User
     *         examples:
     *           application/json: |
     *
     *                {
     *                     "_id": "5KcrhFoZyiFYxgcBG",
     *                     "createdAt": "2016-04-26T00:10:38.660Z",
     *                     "profileData": {
     *                       "dressSize": [
     *                         "XS"
     *                       ],
     *                       "waistSize": [
     *                         "26"
     *                       ],
     *                       "shoeSize": [
     *                         "5"
     *                       ],
     *                       "styles": [
     *                         "WESTERN",
     *                         "TRADITIONAL/ETHNIC",
     *                         "SEXY/PARTY",
     *                         "HIGH-STREET",
     *                         "SPORTY/CASUAL"
     *                       ]
     *                     },
     *                     "profile": {
     *                       "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtp1/v/t1.0-1/p50x50/12799242_1579130819072805_6867869792250278175_n.jpg?oh=c",
     *                       "picture": "http://graph.facebook.com/1602737173378836/picture/?type=large",
     *                       "name": "Mohit Kadian",
     *                       "gender": "female",
     *                       "email": "mohit.kadian1992@gmail.com",
     *                      "location": "Noida, India"
     *                     }
     *                   }
     *
     *         schema:
     *             $ref: '#/definitions/User'
     *       400:
     *         description: Invalid Request
     *
     * /api/users/items/{userId}/{pageLimit}/{pageNumber}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns Items Uploaded By User
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *       - in: path
     *         name: userId
     *         description: UserId To Know Details Of User
     *         required: true
     *         type: string
     *       - in: path
     *         name: pageLimit
     *         description: Number Of Products Display Per Page
     *         type: string
     *       - in: path
     *         name: pageNumber
     *         description: Page Number To Know Which Page
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Details Of User
     *         examples:
     *           application/json: |
     *
     *                {
     *                     "itemsCount": 2,
     *                     "items": [
     *                       {
     *                         "_id": "224wkAH3XcHF3uH8x",
     *                         "name": "Pencil Skirt",
     *                         "color": "Blue ",
     *                         "description": "Sexy skirt",
     *                         "credits": 2000,
     *                         "category": {
     *                           "itemId": "CLOTHES",
     *                           "itemName": "CLOTHES"
     *                         },
     *                         "subcategories": [
     *                           {
     *                             "itemId": "CLOTHES",
     *                             "itemName": "CLOTHES"
     *                           },
     *                           {
     *                             "itemId": "WESTERN-WEAR",
     *                             "itemName": "WESTERN WEAR"
     *                           },
     *                           {
     *                             "itemId": "SKIRTS",
     *                             "itemName": "SKIRTS"
     *                          },
     *                           {
     *                             "itemName": "KNEE LENGTH",
     *                             "itemId": "CLOTHES_WESTERN-WEAR_SKIRTS_KNEE-LENGTH"
     *                           }
     *                         ],
     *                         "fit": {
     *                           "itemId": "TRUE-TO-SIZE",
     *                           "itemName": "TRUE TO SIZE"
     *                         },
     *                         "brand": {
     *                           "id": "MANGO",
     *                           "name": "MANGO"
     *                         },
     *                         "rules": [
     *                           {
     *                             "itemId": "PERMANENT-SWAP-ONLY",
     *                             "itemName": "PERMANENT SWAP ONLY"
     *                           },
     *                           {
     *                             "itemId": "MESSAGE-BEFORE-PROPOSING-SWAP",
     *                             "itemName": "MESSAGE BEFORE PROPOSING SWAP"
     *                           }
     *                         ],
     *                         "condition": {
     *                           "itemId": "BRAND-NEW-TAG-INTACT",
     *                          "itemName": "BRAND NEW, TAG INTACT"
     *                         },
     *                         "images": [
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures/1459929216752_0_.jpg",
     *                             "filter": "none",
     *                             "isCover": true
     *                           },
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures/1459929216762_1_.jpg",
     *                             "filter": "none",
     *                             "isCover": false
     *                           }
     *                         ],
     *                         "size": [
     *                           {
     *                             "itemId": "WESTERN-M",
     *                             "itemName": "M"
     *                           }
     *                         ],
     *                         "imagesSmall": [
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures-small/1459929216752_0_.jpg",
     *                             "filter": "none",
     *                             "isCover": true
     *                           },
     *                           {
     *                            "src": "http://assets.thisforthat.mobi/pictures-small/1459929216762_1_.jpg",
     *                             "filter": "none",
     *                             "isCover": false
     *                           }
     *                         ],
     *                         "userId": "9pgacWYPmjLiT3FDu",
     *                         "time_created": 1459929167719,
     *                         "time_approved": 1459933802566,
     *                         "time_featured": 1459929167719,
     *                         "time_rejected": 1459929167719,
     *                         "approved": true,
     *                         "rejected": false,
     *                         "featured": false,
     *                         "status": 4,
     *                         "user_profile": {
     *                           "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/c0.3.50.50/p",
     *                           "picture": "http://graph.facebook.com/959295547481255/picture/?type=large",
     *                           "name": "Richa Shrivastava",
     *                           "gender": "female",
     *                           "email": "richa.shrvstv@gmail.com",
     *                           "location": "Bangalore, India"
     *                         },
     *                         "curatedList": [
     *                           "tjCv5ny8t2ruTndvi",
     *                           "yy8aKwj8FG9v3Ccbf",
     *                           "595b34abcb9195190c0ae378"
     *                         ],
     *                         "categoryId": "595a1446cb91951900b0b4b0"
     *                       }
     *                     ]
     *                   }
     *         schema:
     *             $ref: '#/definitions/Items'
     *       400:
     *         description: Invalid Request
     * /api/users/likeditems/{userId}/{pageLimit}/{pageNumber}:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns Items Liked By User
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *       - in: path
     *         name: userId
     *         description: UserId To Know Details Of User
     *         required: true
     *         type: string
     *       - in: path
     *         name: pageLimit
     *         description: Number Of Products Display Per Page
     *         type: string
     *       - in: path
     *         name: pageNumber
     *         description: Page Number To Know Which Page
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Details Of User
     *         examples:
     *           application/json: |
     *
     *                {
     *                     "likedItemsCount": 2,
     *                     "likedItems": [
     *                       {
     *                         "_id": "224wkAH3XcHF3uH8x",
     *                         "name": "Pencil Skirt",
     *                         "color": "Blue ",
     *                         "description": "Sexy skirt",
     *                         "credits": 2000,
     *                         "category": {
     *                           "itemId": "CLOTHES",
     *                           "itemName": "CLOTHES"
     *                         },
     *                         "subcategories": [
     *                           {
     *                             "itemId": "CLOTHES",
     *                             "itemName": "CLOTHES"
     *                           },
     *                           {
     *                             "itemId": "WESTERN-WEAR",
     *                             "itemName": "WESTERN WEAR"
     *                           },
     *                           {
     *                             "itemId": "SKIRTS",
     *                             "itemName": "SKIRTS"
     *                          },
     *                           {
     *                             "itemName": "KNEE LENGTH",
     *                             "itemId": "CLOTHES_WESTERN-WEAR_SKIRTS_KNEE-LENGTH"
     *                           }
     *                         ],
     *                         "fit": {
     *                           "itemId": "TRUE-TO-SIZE",
     *                           "itemName": "TRUE TO SIZE"
     *                         },
     *                         "brand": {
     *                           "id": "MANGO",
     *                           "name": "MANGO"
     *                         },
     *                         "rules": [
     *                           {
     *                             "itemId": "PERMANENT-SWAP-ONLY",
     *                             "itemName": "PERMANENT SWAP ONLY"
     *                           },
     *                           {
     *                             "itemId": "MESSAGE-BEFORE-PROPOSING-SWAP",
     *                             "itemName": "MESSAGE BEFORE PROPOSING SWAP"
     *                           }
     *                         ],
     *                         "condition": {
     *                           "itemId": "BRAND-NEW-TAG-INTACT",
     *                          "itemName": "BRAND NEW, TAG INTACT"
     *                         },
     *                         "images": [
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures/1459929216752_0_.jpg",
     *                             "filter": "none",
     *                             "isCover": true
     *                           },
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures/1459929216762_1_.jpg",
     *                             "filter": "none",
     *                             "isCover": false
     *                           }
     *                         ],
     *                         "size": [
     *                           {
     *                             "itemId": "WESTERN-M",
     *                             "itemName": "M"
     *                           }
     *                         ],
     *                         "imagesSmall": [
     *                           {
     *                             "src": "http://assets.thisforthat.mobi/pictures-small/1459929216752_0_.jpg",
     *                             "filter": "none",
     *                             "isCover": true
     *                           },
     *                           {
     *                            "src": "http://assets.thisforthat.mobi/pictures-small/1459929216762_1_.jpg",
     *                             "filter": "none",
     *                             "isCover": false
     *                           }
     *                         ],
     *                         "userId": "9pgacWYPmjLiT3FDu",
     *                         "time_created": 1459929167719,
     *                         "time_approved": 1459933802566,
     *                         "time_featured": 1459929167719,
     *                         "time_rejected": 1459929167719,
     *                         "approved": true,
     *                         "rejected": false,
     *                         "featured": false,
     *                         "status": 4,
     *                         "user_profile": {
     *                           "avatar": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xat1/v/t1.0-1/c0.3.50.50/p",
     *                           "picture": "http://graph.facebook.com/959295547481255/picture/?type=large",
     *                           "name": "Richa Shrivastava",
     *                           "gender": "female",
     *                           "email": "richa.shrvstv@gmail.com",
     *                           "location": "Bangalore, India"
     *                         },
     *                         "curatedList": [
     *                           "tjCv5ny8t2ruTndvi",
     *                           "yy8aKwj8FG9v3Ccbf",
     *                           "595b34abcb9195190c0ae378"
     *                         ],
     *                         "categoryId": "595a1446cb91951900b0b4b0"
     *                       }
     *                     ]
     *                   }
     *
     *         schema:
     *             $ref: '#/definitions/LikedItems'
     *       400:
     *         description: Invalid Request
     * /api/admins:
     *   get:
     *     tags:
     *       - Admin
     *     description: Returns List Of Admins
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access token
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: List Of All Admins
     *         examples:
     *           application/json: |
     *                 [
     *                   {
     *                     "_id": "595f2e8bf5af540c5cac958c",
     *                     "email": "testuse11r@gmail.com",
     *                     "name": "admin",
     *                     "roles":[
     *                        {
     *                        _id:"878878788",
     *                        role:"admin",
     *                        privileges:[ "ORG_ADD","ADMIN_ADD"]
     *                        }
     *                     ]
     *                    }
     *                 ]
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Admin'
     *       400:
     *         description: Invalid Request
     * /login:
     *  post:
     *     tags:
     *       - Admin
     *     description: Admin Login
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access Token
     *         required: true
     *         type: string
     *       - in: body
     *         name: body
     *         description: Login Details
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *               required: true
     *             password:
     *               type: string
     *               required: true
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Admin Login Auth
     *         examples:
     *           application/json: |
     *
     *                   {
     *                     "_id": "595f2e8bf5af540c5cac958c",
     *                     "email": "testuse11r@gmail.com",
     *                     "name": "admin",
     *                     "roles":[
     *                        {
     *                        _id:"878878788",
     *                        role:"admin",
     *                        privileges:[ "ORG_ADD","ADMIN_ADD"]
     *                        }
     *                     ]
     *                    }
     *
     *         schema:
     *             $ref: '#/definitions/Admin'
     *
     *       400:
     *         description: Invalid Request
     * /register:
     *   post:
     *     tags:
     *       - Admin
     *     description: Create Admin
     *     parameters:
     *       - in: header
     *         name: accesstoken
     *         description: Access Token
     *         required: true
     *         type: string
     *       - in: body
     *         name: body
     *         description: New Admin Details
     *         schema:
     *           type: object
     *           properties:
     *             email:
     *               type: string
     *               required: true
     *             password:
     *               type: string
     *               required: true
     *             name:
     *               type: string
     *             roles:
     *               type: array
     *               items:
     *                 type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Admin Registration Details
     *         examples:
     *           application/json: |
     *
     *                   {
     *                     "_id": "595f2e8bf5af540c5cac958c",
     *                     "email": "testuse11r@gmail.com",
     *                     "name": "admin",
     *                     "roles":[
     *                        {
     *                        _id:"878878788",
     *                        role:"admin",
     *                        privileges:[ "ORG_ADD","ADMIN_ADD"]
     *                        }
     *                     ]
     *                    }
     *
     *         schema:
     *             $ref: '#/definitions/Admin'
     *
     *       400:
     *         description: Invalid Request
     *
     * /api/admins/{adminId}:
     *   get:
     *     tags:
     *       - Admin
     *     description: Returns Details Of Admin
     *     parameters:
     *       - in: path
     *         name: adminId
     *         description: Admin Id
     *         required: true
     *         type: string
     *       - in: header
     *         name: accesstoken
     *         description: Access Token
     *         required: true
     *         type: string
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Admin Details
     *         examples:
     *           application/json: |
     *
     *                   {
     *                     "_id": "595f2e8bf5af540c5cac958c",
     *                     "email": "testuse11r@gmail.com",
     *                     "name": "admin",
     *                     "roles":[
     *                        {
     *                        _id:"878878788",
     *                        role:"admin",
     *                        privileges:[ "ORG_ADD","ADMIN_ADD"]
     *                        }
     *                     ]
     *                    }
     *
     *         schema:
     *             $ref: '#/definitions/Admin'
     *       400:
     *         description: Invalid Request
     *   put:
     *     tags:
     *       - Admin
     *     description: Update Details Of Admin
     *     parameters:
     *       - in: path
     *         name: adminId
     *         description: Admin Id
     *         required: true
     *         type: string
     *       - in: header
     *         name: accesstoken
     *         description: Access Token
     *         required: true
     *         type: string
     *       - in: body
     *         name: admin
     *         description: Admin Details To Update
     *         schema:
     *           $ref: '#/definitions/UpdateAdmin'
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Admin Details
     *         examples:
     *           application/json: |
     *
     *                   {
     *                     "_id": "595f2e8bf5af540c5cac958c",
     *                     "email": "testuse11r@gmail.com",
     *                     "name": "admin",
     *                     "roles":[
     *                        {
     *                        _id:"878878788",
     *                        role:"admin",
     *                        privileges:[ "ORG_ADD","ADMIN_ADD"]
     *                        }
     *                     ]
     *                    }
     *
     *         schema:
     *             $ref: '#/definitions/Admin'
     *       400:
     *         description: Invalid Request
     */





// // // const express = require('express');
// // // const multer  = require('multer');
// // // const upload = multer({ dest: 'uploads/' })

// // // const app = express();

// // // app.post('/upload/image', upload.single('image'), (req, res) => {
// // //   // Обработка загруженного файла
// // //   console.log('File uploaded successfully', req.file);
// // //   res.status(200).send('File uploaded successfully');
// // // });

// // // app.listen(5000, () => {
// // //   console.log('Server started on port 5000');
// // // });

// // // class ClothesController {
// // //   async create(req, res, next) {
// // //       try {
// // //           let {type, description, size, price} = req.body
// // //           console.log( file );
// // //           const clothes = await Clothes.create({ file });

// // //           return res.json(clothes)
// // //       } catch (e) {
// // //           next(ApiError.badRequest(e.message))
// // //       }

// // //   }
// // // }

// const express = require("express");
// const app = express();
// const multer = require("multer");

// // const Image = mongoose.model("Img", imageSchema);

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post("/api/clothes", upload.single("img"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const img = new Image({
//     filename: req.file.originalname,
//     contentType: req.file.mimetype,
//     data: req.file.buffer,
//   });

//   try {
//     await img.save();
//     res.send("File uploaded!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to upload file.");
//   }
// });

// app.listen(5000, () => {
//   console.log("Server listening on port 3000");
// });

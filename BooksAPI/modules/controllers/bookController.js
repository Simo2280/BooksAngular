const bookModel = require('../models/bookModel');

async function getBooksController(req, res) {
    try {

        const result = await bookModel.find({});
        res.send(result);

      } catch (error) {
        console.log(error)
        res.sendStatus(400);
      }
}

async function getBookController(req, res) {
    try {

        const result = await bookModel.findOne({ ISBN:req.query.ISBN });

        if (result.length !== 0) {
            res.send(result);
        } else {
            res.sendStatus(404);
        }
        
      } catch (error) {
        console.log(error)
        res.sendStatus(400);
      }

}

async function postBookController(req, res) {
    try {

        const checkbook =  await bookModel.findOne({ ISBN: req.body.ISBN });

        if (checkbook == null) {

            const bookData = {
            ISBN: req.body.ISBN,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            };

            const doc = new bookModel({ 
                ISBN: bookData.ISBN,
                title: bookData.title,
                author: bookData.author,
                genre: bookData.genre,
                publishedYear: bookData.publishedYear });
            await doc.save();

            res.send(doc);

        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }

}

async function putBookController(req, res) {
    try {
            const checkBook = await bookModel.findOne({ ISBN:req.query.ISBN });

            if(checkBook != null) {

                const updateData = {};

                if (req.body.ISBN) {
                updateData.ISBN = req.body.ISBN;
                }
        
                if (req.body.title) {
                updateData.title = req.body.title;
                }
        
                if (req.body.author) {
                updateData.author = req.body.author;
                }
        
                if (req.body.genre) {
                updateData.genre = req.body.genre;
                }
        
                if (req.body.publishedYear) {
                updateData.publishedYear = req.body.publishedYear;
                }
        
                await bookModel.updateOne({ ISBN: req.query.ISBN }, updateData);
                res.sendStatus(200);

            } else {
                res.sendStatus(404);
            }

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

async function deleteBookController(req, res) {

    try {

            const result = await bookModel.findOneAndDelete({ ISBN:req.query.ISBN });
  
            if (result) {
              res.sendStatus(200);
            } else {
              res.sendStatus(404);
            }

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }


}

module.exports = { getBooksController, getBookController, postBookController, putBookController, deleteBookController };
